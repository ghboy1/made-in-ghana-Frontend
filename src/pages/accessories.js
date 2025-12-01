import React from 'react';
import './accessories.css';

function Accessories() {
  const items = [
    { name: 'USB-C Cable', price: 25.00, image: 'https://via.placeholder.com/150' },
    { name: 'Wireless Mouse', price: 120.00, image: 'https://via.placeholder.com/150' },
    { name: 'Bluetooth Earbuds', price: 250.00, image: 'https://via.placeholder.com/150' },
    { name: 'Portable Charger', price: 150.00, image: 'https://via.placeholder.com/150' },
    { name: 'HDMI Cable', price: 35.00, image: 'https://via.placeholder.com/150' },
    { name: 'Laptop Stand', price: 180.00, image: 'https://via.placeholder.com/150' },
    { name: 'Webcam Cover', price: 20.00, image: 'https://via.placeholder.com/150' },
    { name: 'Screen Cleaning Kit', price: 25.00, image: 'https://via.placeholder.com/150' },
    { name: 'Ethernet Adapter', price: 50.00, image: 'https://via.placeholder.com/150' },
    { name: 'SD Card Reader', price: 40.00, image: 'https://via.placeholder.com/150' },
  ];

  return (
    <div className="accessories-page">
      <h1>Electronics Accessories</h1>
      <div className="items-grid">
        {items.map((item, index) => (
          <div key={index} className="item-card">
            <img src={item.image} alt={item.name} />
            <h2>{item.name}</h2>
            <p>₵{item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Accessories;