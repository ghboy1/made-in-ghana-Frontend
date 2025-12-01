import React, { useRef, useEffect } from 'react';
import './HonoreeCard.css';

const HonoreeCard = ({ honoree, index, openModal }) => {
  // Calculate delay for animation based on index
  const delay = (index % 4) * 200;
  const cardRef = useRef(null);
  
  // Add parallax effect on mouse movement
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    const handleMouseMove = (e) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      
      const xPercent = x / width - 0.5;
      const yPercent = y / height - 0.5;
      
      const imageElement = card.querySelector('.honoree-img-circle');
      if (imageElement) {
        imageElement.style.transform = `
          translate(${xPercent * 10}px, ${yPercent * 10}px)
          scale(1.05)
        `;
      }
    };
    
    const handleMouseLeave = () => {
      const imageElement = card.querySelector('.honoree-img-circle');
      if (imageElement) {
        imageElement.style.transform = 'translate(0, 0) scale(1)';
      }
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <div 
      className="honoree-card" 
      data-aos={index % 2 === 0 ? "fade-up-right" : "fade-up-left"}
      data-aos-delay={delay}
      data-aos-duration="800"
      data-aos-anchor-placement="center-bottom"
      ref={cardRef}
    >
      <div 
        className="honoree-image-wrapper"
        onClick={() => openModal(honoree.id)}
      >
        <div className="honoree-circle-border">
          <div className="honoree-image-container">
            <img 
              src={honoree.image || '/images/honorees/placeholder.jpg'} 
              alt={honoree.name} 
              className="honoree-img-circle"
            />
          </div>
        </div>
      </div>
      <h3 
        className="honoree-name"
        data-aos="fade-up"
        data-aos-delay={delay + 100}
      >
        <span onClick={() => openModal(honoree.id)}>
          {honoree.name}
        </span>
      </h3>
      <p 
        className="honoree-position"
        data-aos="fade-up"
        data-aos-delay={delay + 200}
      >
        {honoree.position}
      </p>
      <p 
        className="honoree-company"
        data-aos="fade-up" 
        data-aos-delay={delay + 300}
      >
        {honoree.company}
      </p>
    </div>
  );
};

export default HonoreeCard;