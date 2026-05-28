import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import cityHallBg from './cityhall.jpg'; 
import Reports from './Reports'; 

const Header = () => (
  <header className="header">
    <div className="header-container">
      <div className="header-left">
        <div className="logo-group">
          <img src="davaologo.png" alt="Davao" className="logo" />
          <img src="caologo.jpg" alt="CAO" className="logo" />
        </div>
        <div className="header-text">
          <h1>City Accountant’s Office</h1>
          <p>City Government of Davao</p>
        </div>
      </div>
      <div className="legal-tag">
        <small>RA No. 7160 | City Ord. No. 298</small>
      </div>
    </div>
  </header>
);

const ServiceCard = ({ title, items, icon, subtitle }) => (
  <div className="card">
    <div className="card-icon"><i className={`fa-solid ${icon}`}></i></div>
    <h3>{title}</h3>
    {subtitle && <p className="subtitle"><em>{subtitle}</em></p>}
    <ul>
      {items.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  </div>
);

const Home = ({ formData, setFormData, isSubmitting, handleContactSubmit }) => {
  const cityServices = [
    "Processing of Vouchers/Payrolls/Contracts",
    "Employee Remittances (GSIS, HDMF, Philhealth)",
    "BIR Forms 2316, 2306, 2307",
    "Accountant’s Advice of Local Check Disbursement",
    "Availability of Funds"
  ];

  const barangayServices = [
    "Recording of transactions (182 Barangays)",
    "Statement of Income & Expenditures",
    "Accountant’s Certification for cash accounts",
    "Status of Cash Advances",
    "Unappropriated Surplus"
  ];

  return (
    <>
      <section 
        id="home" 
        className="hero-section"
        style={{ backgroundImage: `linear-gradient(rgba(0, 51, 102, 0.75), rgba(0, 51, 102, 0.75)), url(${cityHallBg})` }}
      >
        <div className="hero-content">
          <h2>Safeguarding Davao’s Resources</h2>
          <p>Ensuring economic, efficient, and effective systems for the city government's funds and properties.</p>
          <div className="hero-buttons">
            <a href="#services" className="cta-button">Our Services</a>
            <Link to="/reports" className="cta-button secondary">View Reports</Link>
          </div>
        </div>
      </section>

      <main className="container">
        <section id="mandate" className="section">
          <div className="section-header">
            <h2>Our Mandate</h2>
            <div className="accent-line"></div>
          </div>
          <p className="mandate-text">
            The City Accountant’s Office is responsible for the accounting & internal audit services as well as the preparation of Financial Statements in accordance with and in compliance with the Philippine Public Sector Accounting Standards (PPSAS). The Office was established in view of the  SP Res. No. 1722, City Ord. No. 298, S-1991, mandated by RA No. 7160, Local Gov’t Code – 1991. The creation of the City Accountant’s Office was geared towards economic, efficient and effective system of safeguarding the city government’s funds and properties against loss or wastage through illegal or improper disposal.
          </p>
        </section>

        <section id="services" className="section">
          <h2>Our Services</h2>
          <div className="grid">
            <ServiceCard title="City Transactions" icon="fa-city" items={cityServices} />
            <ServiceCard title="Barangay Transactions" icon="fa-house-user" subtitle="Facilitating 182 Barangays" items={barangayServices} />
          </div>
        </section>

        {/* --- CONTACT SECTION: Integrated Physical Details & Form --- */}
        <section id="contact" className="section">
          <div className="section-header">
            <h2>Connect with Us</h2>
            <div className="accent-line"></div>
          </div>
          
          <div className="contact-layout">
            <div className="contact-info">
              <div className="info-card">
                <i className="fa-solid fa-location-dot"></i>
                <div className="info-text">
                  <h4>Office Address</h4>
                  <p>2nd Floor, City Hall Building, <br />City Hall Drive, Davao City, 8000</p>
                </div>
              </div>

              <div className="info-card">
                <i className="fa-solid fa-phone"></i>
                <div className="info-text">
                  <h4>Phone Numbers</h4>
                  <p>Direct: (082) 222-0888<br />Local: 224 / 225</p>
                </div>
              </div>

              <div className="info-card">
                <i className="fa-solid fa-envelope"></i>
                <div className="info-text">
                  <h4>Official Email</h4>
                  <p>cao@davaocity.gov.ph</p>
                </div>
              </div>

              <div className="info-card">
                <i className="fa-solid fa-clock"></i>
                <div className="info-text">
                  <h4>Office Hours</h4>
                  <p>Monday - Friday<br />8:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>

            <div className="contact-container">
              <h3>Send an Inquiry</h3>
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your name" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Email Addressess</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Enter your email" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Your Message</label>
                  <textarea 
                    rows="4" 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="How can we help you?" 
                    required
                  ></textarea>
                </div>
                <button type="submit" className="cta-button" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '' });
  
  const { hash, pathname } = useLocation();

  // Handle cross-page smooth scrolling (e.g., from /reports to /#contact)
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash, pathname]);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost/PROJECT-OJT/save_inquiry.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});
      const result = await response.json();
      
      if (result.status === "success") {
        setNotification({ show: true, message: `Salamat, ${formData.name}! Inquiry sent.` });
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      setNotification({ show: true, message: "Error connecting to server." });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setNotification({ show: false, message: '' }), 4000);
    }
  };

  return (
    <div className="App">
      <div className={`notification-toast ${notification.show ? 'show' : ''}`}>
        <div className="toast-content">
          <i className="fa-solid fa-circle-check"></i>
          <span>{notification.message}</span>
        </div>
        <div className="progress-bar"></div>
      </div>

      <Header />
      
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/#mandate">Mandate</Link>
        <Link to="/#services">Services</Link>
        <Link to="/reports">Reports</Link>
        <Link to="/#contact">Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={
          <Home 
            formData={formData} 
            setFormData={setFormData} 
            isSubmitting={isSubmitting} 
            handleContactSubmit={handleContactSubmit} 
          />
        } />
        <Route path="/reports" element={<Reports />} />
      </Routes>

      <footer className="footer">
        <p>&copy; 2026 City Accountant's Office - City Government of Davao</p>
      </footer>
    </div>
  );
}

export default App;