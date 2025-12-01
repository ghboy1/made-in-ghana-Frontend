import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <section className="intro">
        <h1>About Us</h1>
        <p>
          Made in Ghana is dedicated to showcasing the finest products crafted by Ghanaian artisans. Our platform connects local talent with global audiences, celebrating the rich cultural heritage of Ghana through quality and authenticity.
        </p>
      </section>

      <section className="mission-statement">
        <h2>Our Mission</h2>
        <p>
          At Made in Ghana, our mission is to promote and celebrate the rich heritage of Ghanaian craftsmanship. We aim to connect local artisans with global markets, ensuring that their unique products reach customers who appreciate quality and authenticity.
        </p>
      </section>

      <section className="vision-statement">
        <h2>Our Vision</h2>
        <p>
          To be the leading platform for Ghanaian-made products, fostering sustainable growth for artisans and preserving Ghana's cultural legacy for future generations.
        </p>
      </section>

      <section className="company-history">
        <h2>Our History</h2>
        <p>
          Founded in 2020, Made in Ghana started as a small initiative to support local businesses during challenging times. Over the years, we have grown into a thriving platform that showcases the best of Ghanaian products, from textiles and jewelry to home decor and more.
        </p>
      </section>

      <section className="team-members">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <img src="/RH.svg" alt="Husein R. - CEO & Founder" />
            <h3>HUSEIN R.</h3>
            <p>CEO & Founder</p>
          </div>
          <div className="team-member">
            <img src="/MUTA.svg" alt="Mutawakilu S. - Head of Operations" />
            <h3>MUTAWAKILU S.</h3>
            <p>Head of Operations</p>
          </div>
          <div className="team-member">
            <img src="/HR.svg" alt="Hawa H. - Marketing Director" />
            <h3>HAWA H.</h3>
            <p>Marketing Director</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Join Our Community</h2>
        <p>Sign up for our newsletter to stay updated on new products, artisan stories, and exclusive offers.</p>
        <button className="cta-button">Subscribe Now</button>
      </section>
    </div>
  );
};

export default AboutUs;