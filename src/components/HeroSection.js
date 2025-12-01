import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './HeroSection.css';

function HeroSection() {
  // Carousel settings for smooth sliding
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="hero-container">
      {/* Welcome Message moved above the carousel */}
      <div className="welcome-message">
        <h1>Welcome to Made in Ghana</h1>
      </div>
      {/* Carousel */}
      <Slider {...settings} className="hero-slider">
        <div>
          <img
            src="/ecobank.jpg"
            alt="Ecobank Banner"
            className="hero-image"
          />
        </div>
        <div>
          <img
            src="/Black Ghana.png"
            alt="Hero Banner 2"
            className="hero-image"
          />
        </div>
        {/* Add more slides here as needed */}
      </Slider>
    </div>
  );
}

export default HeroSection;