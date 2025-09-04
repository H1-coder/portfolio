const nodemailer = require('nodemailer');

// Debug: Check if environment variables are loaded
console.log('Environment check:', {
  hasEmailUser: !!process.env.EMAIL_USER,
  hasEmailPass: !!process.env.EMAIL_PASS,
  hasContactEmail: !!process.env.CONTACT_EMAIL
});

// Create transporter - FIXED: use createTransport (not createTransporter)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

module.exports = async function handler(req, res) {
  console.log('API called - Method:', req.method);
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;
    console.log('Received data:', { name, email, subject: subject || 'No subject' });

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required fields.' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address.' });
    }

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      replyTo: email,
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

    console.log('Attempting to send email...');
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');

    res.status(200).json({ message: 'Message sent successfully!' });

  } catch (error) {
    console.error('Full error details:', {
      message: error.message,
      stack: error.stack,
      code: error.code
    });
    
    res.status(500).json({ 
      message: 'Failed to send message. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};