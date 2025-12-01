import React, { useState } from "react";
import "./Recommendations.css";

const Recommendations = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Sample recommendations data
  const recommendations = [
    {
      id: 1,
      name: "Handwoven Kente Cloth",
      price: "GH₵ 89",
      image: "/images/kente.jpg",
      rating: 4.5,
      tags: ["Traditional", "Handmade"],
    },
    {
      id: 2,
      name: "Shea Butter Bundle",
      price: "GH₵ 24",
      image: "/images/shea.jpg",
      rating: 4.8,
      tags: ["Organic", "Skincare"],
    },
    {
      id: 3,
      name: "Adinkra Symbol Art",
      price: "GH₵ 150",
      image: "/images/adinkra.jpg",
      rating: 4.7,
      tags: ["Cultural", "Decor"],
    },
    {
      id: 4,
      name: "Beaded Jewelry Set",
      price: "GH₵ 65",
      image: "/images/beads.jpg",
      rating: 4.6,
      tags: ["Fashion", "Handmade"],
    },
    {
      id: 5,
      name: "Wooden Drum (Djembe)",
      price: "GH₵ 320",
      image: "/images/djembe.jpg",
      rating: 4.9,
      tags: ["Music", "Traditional"],
    },
    {
      id: 6,
      name: "Batik Print Dress",
      price: "GH₵ 180",
      image: "/images/batik.jpg",
      rating: 4.4,
      tags: ["Fashion", "Handmade"],
    },
  ];

  // Filter recommendations based on search query
  const filteredRecommendations = recommendations.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="recommendations-page">
      <header className="recommendations-header">
        <h1>Product Recommendations</h1>
        <p>Discover the best products made in Ghana, curated just for you!</p>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i className="fa fa-search"></i>
        </div>
      </header>

      <div className="recommendations-grid">
        {filteredRecommendations.length > 0 ? (
          filteredRecommendations.map((product) => (
            <div key={product.id} className="recommendation-card">
              <div className="card-image">
                <img src={product.image} alt={product.name} />
                <div className="card-overlay">
                  <span className="price-tag">{product.price}</span>
                  <span className="rating">⭐ {product.rating}</span>
                </div>
              </div>
              <div className="card-content">
                <h3>{product.name}</h3>
                <div className="tags">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="action-buttons">
                  <button className="save-btn">Save</button>
                  <button className="explore-btn">Explore</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No products found. Try searching for something else!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendations;