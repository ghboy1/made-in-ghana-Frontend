import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const CategoryCarousel = ({ items, currentSlide, setCurrentSlide, nextSlide, prevSlide }) => {
  return (
    <section className="category-carousel">
      <div className="carousel-container">
        <button 
          className="carousel-arrow prev"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <FaArrowLeft />
        </button>
        
        <div className="carousel-content">
          {items.map((item, index) => (
            <motion.div 
              key={item.id}
              className={`carousel-slide ${currentSlide === index ? 'active' : ''}`}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: currentSlide === index ? 1 : 0,
                x: currentSlide === index ? 0 : (currentSlide > index ? -100 : 100)
              }}
              transition={{ duration: 0.5 }}
              aria-hidden={currentSlide !== index}
            >
              <div className="slide-content">
                <div className="slide-text">
                  {item.badge && <span className="slide-badge">{item.badge}</span>}
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                  <Link to={item.link} className="btn-primary">Explore Collection</Link>
                </div>
                <div className="slide-image">
                  <img src={item.image} alt={item.title} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <button 
          className="carousel-arrow next"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <FaArrowRight />
        </button>
      </div>
      
      <div className="carousel-indicators">
        {items.map((item, index) => (
          <button
            key={item.id}
            className={`carousel-indicator ${currentSlide === index ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={currentSlide === index}
          />
        ))}
      </div>
    </section>
  );
};

export default React.memo(CategoryCarousel);