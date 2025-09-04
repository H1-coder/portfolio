const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration - Restrict to specific origins
const allowedOrigins = [
  'http://localhost:3000', // Local development
  'https://your-frontend-domain.vercel.app', // Replace with your production frontend URL
  'https://yourportfolio.com' // Replace with your custom domain
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

// Security middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

// Rate limiting for contact endpoint
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 contact requests per windowMs
  message: {
    message: 'Too many contact attempts from this IP, please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to contact route
app.use('/api/contact', contactLimiter);

// Create transporter with connection pooling for better performance
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  pool: true,
  maxConnections: 5,
  maxMessages: 100
});

// Contact form endpoint - Optimized version
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        message: 'Name, email, and message are required fields.' 
      });
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Please provide a valid email address.' 
      });
    }

    // Create email content
    const mailOptions = {
      from: process.env.EMAIL_USER, // Use your email as sender
      replyTo: email, // Set reply-to address to user's email
      to: process.env.CONTACT_EMAIL,
      subject: subject || `New message from ${name} - Portfolio Contact`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p>This message was sent from your portfolio contact form.</p>
      `
    };

    // Send email (don't await to make it non-blocking)
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email sending error:', error);
      } else {
        console.log('Contact email sent:', info.response);
      }
    });

    // Send confirmation email to user (optional)
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting me!',
      html: `
        <h2>Thank you for your message, ${name}!</h2>
        <p>I've received your message and will get back to you as soon as possible.</p>
        <p>Best regards,<br>Haris Qureshi</p>
      `
    };

    transporter.sendMail(userMailOptions, (error, info) => {
      if (error) {
        console.error('Confirmation email error:', error);
      } else {
        console.log('Confirmation email sent:', info.response);
      }
    });

    // Send immediate response to client
    res.status(200).json({ 
      message: 'Message sent successfully!' 
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      message: 'Failed to send message. Please try again later.' 
    });
  }
});

// Health check endpoint (no rate limiting)
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    message: 'Server is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint (no rate limiting)
app.get('/', (req, res) => {
  res.json({ 
    message: 'Portfolio Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      contact: '/api/contact'
    }
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error.message === 'Not allowed by CORS') {
    return res.status(403).json({ 
      message: 'CORS policy: Request not allowed' 
    });
  }
  
  console.error('Unhandled error:', error);
  res.status(500).json({ 
    message: 'Internal server error' 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    message: 'Endpoint not found' 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server gracefully...');
  transporter.close();
  process.exit(0);
});