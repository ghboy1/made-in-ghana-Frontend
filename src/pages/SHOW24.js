import React from 'react';
import { Link } from 'react-router-dom';
import './SHOW24.css';

const SHOW24 = () => {  
  const valueChains = [
    {
      id: 'museums',
      title: 'Museums and Monuments',
      description: 'Celebrating Ghana\'s rich history through modern, interactive museums and historical monuments.',
      image: process.env.PUBLIC_URL + '/image2.jpg',
      link: '/show24/museums'
    },
    {
      id: 'nkrumah',
      title: 'Legacy of Nkrumah',
      description: 'Preserving and promoting the vision and achievements of Ghana\'s founding father.',
      image: process.env.PUBLIC_URL + '/Black Ghana.png',
      link: '/show24/nkrumah'
    },
    {
      id: 'culinary',
      title: 'Culinary Heritage',
      description: 'Showcasing Ghana\'s diverse food traditions and contemporary gastronomy innovations.',
      image: process.env.PUBLIC_URL + '/GHANA BREAD.jpg',
      link: '/show24/culinary'
    },
    {
      id: 'textiles',
      title: 'Textiles and Fashion',
      description: 'Celebrating Ghana\'s iconic kente, adinkra, and contemporary fashion designs.',
      image: process.env.PUBLIC_URL + '/kente.avif',
      link: '/show24/textiles'
    },
    {
      id: 'festivals',
      title: 'Re-engineered Festivals',
      description: 'Revitalizing Ghana\'s traditional festivals as modern cultural experiences.',
      image: process.env.PUBLIC_URL + '/Authentic Adinkra Fabric2.jpg',
      link: '/show24/festivals'
    },
    {
      id: 'music',
      title: 'Popular Music and Dance',
      description: 'Supporting Ghana\'s vibrant music scene from highlife to afrobeats and beyond.',
      image: process.env.PUBLIC_URL + '/background.mp4',
      link: '/show24/music'
    }
  ];

  const strategies = [
    {
      title: 'Content and Talent Development',
      description: 'National Creators Academy and community-based arts hubs',
      icon: '🎓'
    },
    {
      title: 'Infrastructure Activation',
      description: 'Revitalization of 250 community centres into CAT hubs',
      icon: '🏛️'
    },
    {
      title: 'Market Access and Exports',
      description: 'Licensing platforms, diaspora networks, and festival tourism',
      icon: '🌍'
    },
    {
      title: 'Cultural Enterprise Financing',
      description: '24H+ Value Chain Financing Facility',
      icon: '💰'
    },
    {
      title: 'Cultural Identity Integration',
      description: '"The Ghana Story" framework',
      icon: '📖'
    }
  ];
  return (
    <div className="show24-container">
      <div className="show24-hero" style={{ 
        backgroundImage: `linear-gradient(rgba(0, 107, 63, 0.7), rgba(0, 107, 63, 0.9)), url(${process.env.PUBLIC_URL}/kente.avif)` 
      }}>
        <div className="show24-overlay"></div>
        <div className="show24-hero-content">
          <h1>SHOW24</h1>
          <h2>Culture, Arts and Tourism as Engines of Identity and Income</h2>
          <p>Repositioning Ghana's creative heritage for global impact</p>
          <button className="show24-cta">Explore Ghanaian Culture</button>
        </div>
      </div>

      <section className="show24-intro">
        <div className="show24-intro-content">
          <h2>Reclaiming Culture as a Strategic Asset</h2>
          <p>
            SHOW24 repositions Ghana's culture, arts, and tourism (CAT) sectors as dynamic engines of job creation, 
            national pride, and export growth. It recognises that culture is not just heritage—it is a system of production, 
            meaning making, and influence.
          </p>
          <p>
            Ghana's long history—from ancient West African civilisations and anti-colonial struggles to 
            Pan-African leadership and diasporic connections—offers rich material for world-class storytelling 
            and creative enterprise. SHOW24 shifts the narrative, reclaiming culture as both a strategic value 
            chain and a unifying force for national development.
          </p>
        </div>
      </section>

      <section className="show24-value-chains">
        <h2>Six Catalytic Cultural, Arts, and Tourism Value Chains</h2>      <div className="value-chains-grid">
          {valueChains.map((chain) => (
            <div className="value-chain-card" key={chain.id}>
              <div className="chain-image">
                <img src={chain.image} alt={chain.title} className="value-chain-img" />
              </div>
              <div className="chain-content">
                <h3>{chain.title}</h3>
                <p>{chain.description}</p>
                <Link to={chain.link} className="chain-link">Discover More</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="show24-strategy">
        <h2>Our Five-Part Strategy</h2>
        <div className="strategy-grid">
          {strategies.map((strategy, index) => (
            <div className="strategy-card" key={index}>
              <div className="strategy-icon">{strategy.icon}</div>
              <h3>{strategy.title}</h3>
              <p>{strategy.description}</p>
            </div>
          ))}
        </div>
      </section>      <section className="show24-vision" style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(${process.env.PUBLIC_URL}/accra night.png)` 
      }}>
        <div className="vision-overlay"></div>
        <div className="vision-content">
          <h2>SHOW24 Vision</h2>
          <p>
            SHOW24 reframes creativity as a national asset and identity as infrastructure. It brings coherence 
            to fragmented sectors, delivers dignified jobs, and builds a globally competitive creative economy. 
          </p>
          <p>
            With every festival scaled, museum launched, fabric exported, or story told, Ghana becomes not only 
            a producer of goods but a producer of meaning, pride, and value on the global stage.
          </p>
          <button className="vision-cta">Join the Movement</button>
        </div>
      </section>

      <section className="show24-featured-products">
        <h2>Featured Products</h2>
        <p>Explore authentic Ghanaian products from our cultural value chains</p>
        <div className="featured-products-slider">
          {/* Product cards would be dynamically loaded here */}
          <div className="product-placeholder">
            <p>Loading featured products...</p>
          </div>
        </div>
        <Link to="/products" className="view-all-link">View All Products</Link>
      </section>
    </div>
  );
};

export default SHOW24;
