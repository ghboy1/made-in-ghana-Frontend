import React from 'react';
import { Link } from 'react-router-dom';
import './CONNECT24.css';

const CONNECT24 = () => {
  // Define the key components of CONNECT24
  const keyComponents = [
    {
      id: 'volta-lake',
      title: 'Volta Lake: Ghana\'s Inland Freight Corridor',
      description: 'At the heart of CONNECT24 is the activation of the Volta Lake as a low-cost, high-capacity logistics spine. With investments in port terminals at Buipe, Yeji, Akosombo, and Mpakadan, and intermodal links to farms, factories, and rail, the lake will connect northern production zones to southern markets and ports.',
      image: process.env.PUBLIC_URL + '/volta-lake.jpg',
      investments: 'New port terminals and intermodal connections.',
      impact: 'Logistics costs reduced from over 40% to below 20% of product value, unlocking trade flows.'
    },
    {
      id: 'cold-chain',
      title: 'Cold Chain and Warehouse Infrastructure',
      description: 'CONNECT24 tackles post-harvest losses by investing in cold chain and warehouse infrastructure, ensuring perishable goods reach markets in top condition.',
      image: process.env.PUBLIC_URL + '/warehouse.jpg',
      investments: 'Cold storage and modern warehouses at key nodes.',
      impact: 'Post-harvest losses cut by half, boosting producer incomes.'
    },
    {
      id: 'ports',
      title: 'Modernized Port and Customs Systems',
      description: 'Upgraded port infrastructure and digital customs systems will streamline trade, reducing delays and costs.',
      image: process.env.PUBLIC_URL + '/port.jpg',
      investments: 'New equipment and 24/7 digital customs platforms.',
      impact: 'Clearance times halved, trade volumes increased.'
    },
    {
      id: 'marketplaces',
      title: 'Structured Aggregation and Digital Marketplaces',
      description: 'Digital platforms and aggregation centers will connect 500,000 producers to markets with real-time price access and reliable flows for GROW24 and MAKE24.',
      image: process.env.PUBLIC_URL + '/marketplace.jpg',
      investments: 'Digital marketplaces and aggregation hubs.',
      impact: 'Empowered producers and efficient market access.'
    },
    {
      id: 'tamale',
      title: 'Tamale Airport: Regional Air Cargo Hub',
      description: 'Developing Tamale Airport into an air cargo hub will boost high-value exports, enhancing Ghana\'s global competitiveness.',
      image: process.env.PUBLIC_URL + '/airport.jpg',
      investments: 'Runway upgrades and cargo facilities.',
      impact: 'Lower export costs and increased volumes.'
    }
  ];

  // Define the challenges
  const challenges = [
    {
      title: 'High Logistics Costs',
      description: 'Over 40% of product value is consumed by logistics, undermining competitiveness.'
    },
    {
      title: 'Post-Harvest Losses',
      description: 'Up to 30-40% of perishable goods are lost due to inadequate storage and refrigeration.'
    },
    {
      title: 'Congested Ports',
      description: 'Delays and inefficiencies at ports like Tema and Takoradi inflate trade costs.'
    },
    {
      title: 'Fragmented Markets',
      description: 'Producers lack access to structured markets and real-time price data.'
    },
    {
      title: 'Underutilized Corridors',
      description: 'The Volta Lake\'s potential as a freight corridor remains untapped.'
    }
  ];

  return (
    <div className="connect24-container">
      {/* Hero Section */}
      <div className="connect24-hero">
        <div className="connect24-overlay"></div>
        <div className="connect24-hero-content">
          <h1>CONNECT24</h1>
          <h2>Supply Chains, Logistics, and Market Systems</h2>
          <p>Ghana's Strategic Blueprint for a Connected, Productive, and Export-Ready Economy</p>
          <button className="connect24-cta">Explore Supply Chains</button>
        </div>
      </div>

      {/* Introduction Section */}
      <section className="connect24-intro">
        <div className="container">
          <h2>Fixing the Broken Links Between Production and Prosperity</h2>
          <p>
            The CONNECT24 Sub-Programme is Ghana's ambitious plan to fix the broken links between production 
            and prosperity. It targets one of the nation's most persistent barriers to competitiveness: 
            inefficient, high-cost supply chains and fragmented market systems. From crippling post-harvest 
            losses and rural isolation to congested ports and informal markets, these bottlenecks drain value 
            at every stage of production. CONNECT24 transforms this reality by building an integrated, multimodal 
            logistics and market ecosystem—designed to move goods faster, cheaper, and smarter across Ghana and beyond.
          </p>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="connect24-challenges">
        <div className="container">
          <h2>The Challenges</h2>
          <div className="challenges-grid">
            {challenges.map((challenge, index) => (
              <div className="challenge-card" key={index}>
                <div className="challenge-icon">{index + 1}</div>
                <h3>{challenge.title}</h3>
                <p>{challenge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Components Section */}
      <section className="connect24-components">
        <div className="container">
          <h2>Key Components of CONNECT24</h2>
          <div className="components-content">
            {keyComponents.map((component, index) => (
              <div className={`component-row ${index % 2 === 0 ? 'row-even' : 'row-odd'}`} key={component.id}>
                <div className="component-image">
                  <img src={component.image} alt={component.title} onError={(e) => {
                    e.target.src = process.env.PUBLIC_URL + '/placeholder.jpg';
                  }} />
                </div>
                <div className="component-details">
                  <h3>{component.title}</h3>
                  <p>{component.description}</p>
                  <div className="component-stats">
                    <div className="stat">
                      <h4>Investment</h4>
                      <p>{component.investments}</p>
                    </div>
                    <div className="stat">
                      <h4>Impact</h4>
                      <p>{component.impact}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="connect24-vision">
        <div className="connect24-overlay"></div>
        <div className="container">
          <div className="vision-content">
            <h2>The Vision for a Connected Ghana</h2>
            <p>
              CONNECT24 strengthens Ghana's ability to compete from farm gate to market to export. 
              With the Volta Lake as a national logistics spine and modern systems enabling 24/7 operations, 
              Ghana will not only feed itself and supply its industries—it will compete confidently in 
              regional and global markets. This is the infrastructure of a connected, productive, and 
              export-ready economy.
            </p>
            <p>
              By reducing logistics costs from over 40% of product value to below 20%, CONNECT24 unlocks 
              national and regional trade flows. The program's investments in cold chain and warehouse 
              infrastructure, modernized port and customs systems, and digital marketplaces ensure that 
              goods move efficiently, reducing waste, lowering costs, and connecting producers to structured 
              markets and buyers across Ghana, the region, and the world.
            </p>
            <button className="vision-cta">Join the Revolution</button>
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section className="connect24-products">
        <div className="container">
          <h2>Products Powered by Connected Supply Chains</h2>
          <p>Discover products that benefit from Ghana's improved logistics network</p>
          <div className="products-showcase">
            <div className="product-placeholder">
              Coming soon: A showcase of products benefiting from improved supply chains
            </div>
            <Link to="/products" className="products-link">Browse All Products</Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="connect24-cta-section">
        <div className="container">
          <h2>Be Part of Ghana's Logistics Transformation</h2>
          <p>
            Whether you're a producer looking to access markets, a logistics provider, 
            or a buyer seeking quality Ghanaian products, CONNECT24 creates opportunities 
            for all stakeholders in the supply chain.
          </p>
          <div className="cta-buttons">
            <Link to="/register-business" className="cta-button primary">Register Your Business</Link>
            <Link to="/partner-program" className="cta-button secondary">Become a Partner</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CONNECT24;
