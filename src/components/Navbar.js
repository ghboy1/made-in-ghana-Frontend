import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import Countdown from 'react-countdown';
import HamburgerMenu from './HamburgerMenu';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [promoIndex, setPromoIndex] = useState(0);
  const menuRef = useRef(null);

  const promos = [
    'Spring Deal Days - Save 20%',
    'New Arrivals from Ghana',
    'Limited Time Offers',
  ];

  // Cycle through promotional messages every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPromoIndex((prev) => (prev + 1) % promos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [promos.length]);

  // Close hamburger menu with Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  // Focus the menu container when it opens
  useEffect(() => {
    if (isMenuOpen && menuRef.current) {
      menuRef.current.focus();
    }
  }, [isMenuOpen]);

  // Custom renderer for the countdown timer
  const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render something when the countdown is complete
      return <span className="countdown-complete">Offer Ended</span>;
    } else {
      return (
        <div className="countdown-timer">
          <span>{days}d</span>
          <span>{hours}h</span>
          <span>{minutes}m</span>
          <span>{seconds}s</span>
        </div>
      );
    }
  };

  // Sale end date (24 hours from now)
  const saleEndDate = new Date(Date.now() + 86400000);

  return (
    <>
      {/* Removed the main-nav that contained logo and account */}
      
      <div className="secondary-nav">
        <div className="nav-left">
          <div 
            className="hamburger-container"
            onMouseEnter={() => setIsMenuOpen(true)}
            onMouseLeave={() => setIsMenuOpen(false)}
          >
            <button
              className="hamburger-btn"
              aria-expanded={isMenuOpen}
              aria-controls="hmenu-container"
            >
              <i className="hm-icon"></i>
              <span className="hm-icon-label">All</span>
            </button>
           
            {/* Overlay removed - not needed for hover behavior */}
            <div
              className={`hmenu-container ${isMenuOpen ? 'open' : ''}`}
              id="hmenu-container"
              ref={menuRef}
              tabIndex="-1"
            >
              <HamburgerMenu onClose={() => setIsMenuOpen(false)} />
            </div>
          </div>

          <nav className="nav-links" aria-label="Main navigation">
            <NavLink to="/bestsellers" activeClassName="active">
              BEST SELLERS
            </NavLink>            <NavLink to="/SHOW24" activeClassName="active">
               SHOW24
            </NavLink>
            <NavLink to="/new-releases" activeClassName="active">
              NEW RELEASES
            </NavLink>            <NavLink to="/CONNECT24" activeClassName="active">
              CONNECT24
            </NavLink>
            <NavLink to="/books" activeClassName="active">
              BOOKS
            </NavLink>
            <NavLink to="/fashion" activeClassName="active">
              FASHION
            </NavLink>
            <NavLink to="/SupplierShowcase" activeClassName="active">
             SUPPLIERS
            </NavLink>
            <NavLink to="/ghana-media" activeClassName="active">
              Discover Ghana
            </NavLink>
          </nav>
        </div>
        <div className="nav-right">
          <span className="promo-text">{promos[promoIndex]}</span>
          <div className="promo-dots">
            {promos.map((_, index) => (
              <span
                key={index}
                className={`promo-dot ${index === promoIndex ? 'active' : ''}`}
                onClick={() => setPromoIndex(index)}
                role="button"
                aria-label={`View promo ${index + 1}`}
                tabIndex="0"
              />
            ))}
          </div>
          <span className="countdown-label">Offer ends in: </span>
          <Countdown
            date={saleEndDate}
            renderer={countdownRenderer}
          />
        </div>
      </div>
    </>
  );
}

export default Navbar;
