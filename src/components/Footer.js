import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
// Make sure to install react-icons: npm install react-icons
import { FaFacebook, FaTwitter, FaInstagram, FaTiktok, FaEnvelope, FaInfoCircle, FaNewspaper, FaPhone } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-top">
        {/* Column 1: Company Info */}
        <div className="footer-column">
        <h3>Made In Ghana</h3>
          <p>
          We facilitate connections for Ghanaians with essential services, news,
           and opportunities. Join us to stay informed about
            all that Ghana has to offer.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul className="quick-links">
            <li>
              <Link to="/contact" className="nav-link">
                <FaEnvelope className="link-icon" />
                Email Us
              </Link>
            </li>
    <li>
      <Link to="/about-us" className="nav-link">
        <FaInfoCircle className="link-icon" />
        About Us
      </Link>
    </li>
            <li>
              <a href="#news">
                <FaNewspaper className="link-icon" />
                News
              </a>
            </li>
        <li>
          <Link to="/contact" className="nav-link">
            <FaPhone className="link-icon" />
            Contact
          </Link>
        </li>
      </ul>
    </div>

    {/* Column 3: Follow Us */}
        <div className="footer-column">
          <h3>Follow Us</h3>
          <ul className="social-links">
            <li>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <FaFacebook className="social-icon" />
                Facebook
              </a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <FaTwitter className="social-icon" />
                Twitter
              </a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <FaInstagram className="social-icon" />
                Instagram
              </a>
            </li>
            <li>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer">
                <FaTiktok className="social-icon" />
                TikTok
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="footer-column">
          <h3>Stay Connected</h3>
          <p>Subscribe to our newsletter for updates</p>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email Address"
            />
            <button type="submit">Subscribe</button>
          </form>
          <div className="app-download">
            <button className="app-store">
              <img src="/logo.png" alt="Download on App Store" />
            </button>
            <button className="google-play">
              <img src="/logo.png" alt="Get it on Google Play" />
            </button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Made In Ghana. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;