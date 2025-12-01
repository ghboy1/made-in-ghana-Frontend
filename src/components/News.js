import React, { useState, useEffect } from 'react';
import './News.css';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  // Sample news data
  const newsCategories = ['all', 'business', 'technology', 'entertainment', 'sports'];
  
  const sampleArticles = [
    {
      id: 1,
      title: 'Ghana Tech Summit 2024 Announced',
      category: 'technology',
      date: '2024-03-20',
      excerpt: 'Annual technology conference returns to Accra with focus on AI and blockchain innovations...',
      image: '/images/tech-summit.jpg'
    },
    // Add more articles
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setArticles(sampleArticles);
      setLoading(false);
    }, 1500);
  }, []);

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="news-container">
      <div className="news-header">
        <h1>Latest News</h1>
        <div className="news-controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search"></i>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-filter"
          >
            {newsCategories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-spinner"></div>
      ) : (
        <div className="news-grid">
          {filteredArticles.length > 0 ? (
            filteredArticles.map(article => (
              <article key={article.id} className="news-card">
                <div className="card-image">
                  <img src={article.image} alt={article.title} />
                </div>
                <div className="card-content">
                  <span className="category-badge">{article.category}</span>
                  <h3>{article.title}</h3>
                  <p className="excerpt">{article.excerpt}</p>
                  <div className="card-footer">
                    <span className="date">{new Date(article.date).toLocaleDateString()}</span>
                    <button className="read-more">Read More →</button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="no-articles">
              <i className="fas fa-newspaper"></i>
              <p>No articles found matching your criteria</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default News;