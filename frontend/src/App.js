import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";

function App() {
 const [isMenuOpen, setIsMenuOpen] = useState(false);
 const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    // Set current year for footer
    document.getElementById('year').textContent = new Date().getFullYear();

    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    
    // Apply dark mode class to body
    if (savedDarkMode) {
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    
    if (newDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  const smoothScroll = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80; // Adjust for header height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitStatus(null);

  // Client-side validation before sending
  if (!formData.name || !formData.email || !formData.message) {
    setSubmitStatus({ type: 'error', message: 'Please fill in all required fields.' });
    setIsSubmitting(false);
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    setSubmitStatus({ type: 'error', message: 'Please provide a valid email address.' });
    setIsSubmitting(false);
    return;
  }

  try {
    // Set timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch('https://haris-mern.vercel.app/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      setSubmitStatus({ type: 'success', message: 'Message sent successfully!' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      const data = await response.json();
      setSubmitStatus({ type: 'error', message: data.message || 'Failed to send message.' });
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      setSubmitStatus({ type: 'error', message: 'Request timeout. Please try again.' });
    } else {
      setSubmitStatus({ type: 'error', message: 'Network error. Please try again later.' });
    }
  } finally {
    setIsSubmitting(false);
  }
};
  

  return (
    <div className="App">
      {/* Navigation */}
      <nav>
         <div className="container">
          <a href="#" className="logo" onClick={(e) => { e.preventDefault(); smoothScroll('home'); }}>Muhammad Haris Qureshi</a>
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); smoothScroll('about'); }}>About</a></li>
            <li><a href="#skills" onClick={(e) => { e.preventDefault(); smoothScroll('skills'); }}>Skills</a></li>
            <li><a href="#projects" onClick={(e) => { e.preventDefault(); smoothScroll('projects'); }}>Projects</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); smoothScroll('contact'); }}>Contact</a></li>
            <li>
              <button className="dark-mode-toggle" onClick={toggleDarkMode}>
                {isDarkMode ? (
                  <i className="fas fa-sun"></i>
                ) : (
                  <i className="fas fa-moon"></i>
                )}
              </button>
            </li>
          </ul>
          <div className="hamburger" onClick={toggleMenu}>
            <i className="fas fa-bars"></i>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>
              Hi, I'm <span>Muhammad Haris Qureshi</span>
            </h1>
            <h2>Web Developer</h2>
            <p>
              Hi, I'm Haris Qureshi, a passionate Web Developer based in Islamabad. I'm 24 years old and a proud
              graduate of FUUAST (Federal Urdu University of Arts, Science & Technology).
            </p>
            <p>
              I specialize in the MERN Stack (MongoDB, Express.js, React.js, Node.js) and love working across the full
              spectrum of web development. From designing responsive and visually appealing frontends to building
              scalable and secure backend systems, I enjoy bringing ideas to life through clean, efficient, and
              maintainable code.
            </p>
            <p>
              Beyond just writing code, I continuously explore best practices, improve my problem-solving abilities, and
              stay updated with the latest industry trends. My goal is to become a well-rounded developer capable of
              delivering professional-grade applications that make an impact.
            </p>
            <p>
              I’m eager to collaborate on challenging projects, contribute to innovative ideas, and grow alongside other
              passionate developers. Let’s connect and create something extraordinary together.
            </p>
            <a href="#projects" className="btn">
              View My Work
            </a>
             <a href="my cv.pdf" style={{marginLeft:"30px"}} className="btn">
              View My CV
            </a>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                I'm Muhammad Haris Qureshi, a dedicated Web Developer with a growing expertise in the MERN stack
                (MongoDB, Express.js, React.js, Node.js). I'm based in Islamabad, Pakistan, and I'm 23 years old.
              </p>
              <p>
                I graduated from Federal Urdu University of Arts, Science & Technology (FUUAST) with a strong academic
                foundation in computer science and a passion for building digital solutions. During my time at
                university, I developed a keen interest in full-stack web development, and since then, I've been diving
                deep into the world of modern JavaScript, databases, and backend technologies.
              </p>
              <p>
                My professional journey began with curiosity—how do websites actually work behind the scenes? That
                question led me down the path of learning HTML, CSS, JavaScript, and eventually the full MERN stack.
                I've since built various projects, including interactive frontends, RESTful APIs, and dynamic full-stack
                applications.
              </p>
              <p>
                Every project has been a stepping stone, helping me understand not just code, but real-world
                problem-solving, teamwork, and user experience. Currently, I'm at an intermediate level, constantly
                learning, improving, and applying new techniques to write clean, efficient, and maintainable code.
              </p>
              <p>
                I'm driven by the idea of creating real impact through technology. The ability to turn a simple idea
                into a fully functional web application is what excites me every day. I enjoy solving complex problems,
                building things from scratch, and seeing my work come to life in the hands of users.
              </p>
              <p>
                My short-term goal is to contribute to impactful projects, expand my knowledge, and collaborate with
                experienced developers. Long-term, I aim to grow into a senior developer role, lead development teams,
                and build tools that help people and businesses thrive.
              </p>
              <div className="social-links">
                <a href="https://github.com/H1-coder?tab=repositories">
                  <i className="fab fa-github"></i>
                </a>

                <a href="https://www.linkedin.com/in/muhammad-haris-qureshi-58015b34a/">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
            <div className="about-image">
              <img src="images.jpeg" style={{height:"50rem",objectFit:"cover"}} alt="About Me" />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section">
        <div className="container">
          <h2 className="section-title">My Skills</h2>
          <div className="skills-container">
            <div className="skill-category">
              <h3>Technical Skills</h3>
              <ul>
                <li>HTML/CSS</li>
                <li>JavaScript</li>
                <li>Mongo DB</li>
                <li>Express js</li>
                <li>React</li>
                <li>Node.js</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Design Skills</h3>
              <ul>
                <li>Responsive Design</li>
                <li>Figma Design</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Soft Skills</h3>
              <ul>
                <li>Communication</li>
                <li>Teamwork</li>
                <li>Problem Solving</li>
                <li>Time Management</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <div className="container">
          <h2 className="section-title">My Projects</h2>
          <div className="projects-grid">
            <div className="project-card">
              <img src="tic.jpg" alt="Project 1" />
              <div className="project-info">
                <h3>Tic-tac-Toe</h3>
                <p>Used Html CSS Javascript</p>
                <div className="project-links">
                  <a href="#" className="btn">
                    Live Demo
                  </a>
                  <a href="https://github.com/H1-coder/Game.git" className="btn">
                    Code
                  </a>
                </div>
              </div>
            </div>
            <div className="project-card">
              <img src="Rock.png" alt="Project 2" />
              <div className="project-info">
                <h3>Rock paper scissor</h3>
                <p>Used Html CSS JavaScript</p>
                <div className="project-links">
                  <a href="#" className="btn">
                    Live Demo
                  </a>
                  <a href="https://github.com/H1-coder/rock-paper-game.git" className="btn">
                    Code
                  </a>
                </div>
              </div>
            </div>
            <div className="project-card">
              <img src="SaveReelz.png" alt="Project 3"/>
              <div className="project-info">
                <h3>SaveReelz </h3>
                <p>Used html Css Bootstrap Js react Python</p>
                <div className="project-links">
                  <a href="https://savereelz.com/" className="btn">
                    Live Demo
                  </a>
                  <a href="https://github.com/H1-coder/react-proj/tree/master" className="btn">
                    Code
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-container">
            <div className="contact-info">
              <h3>Contact Information</h3>
              <p>
                <i className="fas fa-envelope"></i> qureshiharis37@gmail.com
              </p>
              <p>
                <i className="fas fa-phone"></i> 03115003150
              </p>
              <p>
                <i className="fas fa-map-marker-alt"></i> Islamabad, Pakistan
              </p>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      
      {submitStatus && (
        <div className={`alert ${submitStatus.type === 'success' ? 'alert-success' : 'alert-error'}`}>
          {submitStatus.message}
        </div>
      )}
      
      <button 
        type="submit" 
        style={{border: "none"}} 
        className="btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>


    </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <p>
            &copy; <span id="year"></span> Muhammad Haris Qureshi. All rights reserved.
          </p>
          <div className="social-links">
            <a href="https://github.com/H1-coder?tab=repositories">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/muhammad-haris-qureshi-58015b34a/">
              <i className="fab fa-linkedin"></i>
            </a>

            <a href="https://www.instagram.com/haris._.qureshii?igsh=MXFsdGNtMHA5Z2xmNA==">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
