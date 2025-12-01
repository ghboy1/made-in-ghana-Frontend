import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HonoreeCard from './HonoreeCard';
import { honorees } from '../../data/honoreesData';
import './HonoreesSection.css';

const HonoreesSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentHonoree, setCurrentHonoree] = useState(null);
  const [visibleHonorees, setVisibleHonorees] = useState(8); // Initial display count
  
  // Initialize AOS if not already done elsewhere
  useEffect(() => {
    // If you're initializing AOS here, uncomment this:
    // AOS.init({
    //   duration: 800,
    //   easing: 'ease-out',
    //   once: false,
    //   mirror: true
    // });
    
    // If you need to refresh AOS when honorees are loaded or changed
    // AOS.refresh();
  }, [visibleHonorees]);
  
  // Open modal with honoree details
  const openModal = (id) => {
    const honoree = honorees.find(h => h.id === id);
    if (honoree) {
      setCurrentHonoree(honoree);
      setModalOpen(true);
      document.body.classList.add('modal-open');
    }
  };
  
  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setCurrentHonoree(null);
    document.body.classList.remove('modal-open');
  };
  
  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) closeModal();
    };
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.classList.remove('modal-open');
    };
  }, []);
  
  // Close modal when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('honoree-modal-overlay')) {
      closeModal();
    }
  };
  
  // Show more honorees
  const showMoreHonorees = () => {
    setVisibleHonorees(prev => Math.min(prev + 4, honorees.length));
  };
  
  return (
    <section className="honorees-section">
      <div className="container">
        <div className="section-heading">
          <h2 
            className="section-title" 
            data-aos="zoom-in-up"
            data-aos-duration="800"
          >
            HONOREES
            <div className="title-decoration"></div>
          </h2>
          <p 
            className="section-description" 
            data-aos="fade-up" 
            data-aos-delay="300"
            data-aos-duration="1000"
          >
            Celebrating Ghana's visionary business leaders and entrepreneurs who are transforming industries
          </p>
        </div>
        
        <div className="honorees-grid">
          {honorees.slice(0, visibleHonorees).map((honoree, index) => (
            <HonoreeCard 
              key={honoree.id} 
              honoree={honoree} 
              index={index}
              openModal={openModal}
            />
          ))}
        </div>
        
        {visibleHonorees < honorees.length && (
          <div 
            className="show-more-wrap" 
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            <button 
              className="show-more-btn" 
              onClick={showMoreHonorees}
              data-aos="flip-up"
              data-aos-delay="200"
            >
              View More Honorees
            </button>
          </div>
        )}
        
        {visibleHonorees >= honorees.length && (
          <div 
            className="show-all-wrap" 
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            <Link 
              to="/honorees" 
              className="view-all-link"
              data-aos="zoom-in" 
              data-aos-delay="200"
            >
              View All Honorees
            </Link>
          </div>
        )}
      </div>
      
      {/* Modal - Enhanced with animation */}
      {modalOpen && currentHonoree && (
        <div 
          className="honoree-modal-overlay"
          onClick={handleBackdropClick}
        >
          <div className="honoree-modal">
            <button 
              className="modal-close-btn" 
              onClick={closeModal}
              aria-label="Close modal"
            >
              <svg viewBox="0 0 460.775 460.775" xmlns="http://www.w3.org/2000/svg">
                <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"></path>
              </svg>
            </button>
            
            <div className="modal-content">
              <div className="modal-image-wrapper">
                <div className="modal-circle-container">
                  <img 
                    src={currentHonoree.image || '/images/honorees/placeholder.jpg'} 
                    alt={currentHonoree.name} 
                    className="modal-img-circle"
                  />
                </div>
              </div>
              
              <div className="modal-details">
                <h2 className="modal-name">{currentHonoree.name}</h2>
                
                <div className="modal-info-item">
                  <span className="modal-info-label">Job Title</span>
                  <p><strong>{currentHonoree.position}</strong></p>
                </div>
                
                <div className="modal-info-item">
                  <span className="modal-info-label">Company</span>
                  <p><strong>{currentHonoree.company}</strong></p>
                </div>
                
                <div className="modal-bio">
                  <p>{currentHonoree.bio}</p>
                </div>
                
                <Link to={currentHonoree.fullBioLink} className="modal-bio-link">
                  Full Bio
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HonoreesSection;