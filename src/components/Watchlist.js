import React, { useState, useEffect } from 'react';
import './Watchlist.css';

const Watchlist = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const videoCategories = ['All', 'Movies', 'TV Shows', 'Documentaries'];

  // Sample videos data - replace with actual data fetching in production
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: 'The African Dream',
      year: 2022,
      duration: '1h 45m',
      rating: 4.8,
      category: 'Movies',
      thumbnail: 'https://example.com/thumb1.jpg',
      price: { rent: '$3.99', buy: '$12.99' },
      description: 'A powerful story of hope and perseverance.',
      director: 'Ama Johnson',
      cast: ['Kofi Mensah', 'Abena Osei', 'John Smith'],
      trailer: 'https://example.com/trailer1.mp4'
    },
    {
      id: 2,
      title: "Ghana's Untold Stories",
      year: 2021,
      duration: '55m',
      rating: 4.5,
      category: 'Documentaries',
      thumbnail: 'https://example.com/thumb2.jpg',
      price: { rent: '$2.99', buy: '$9.99' },
      description: 'Exploring the hidden gems of Ghana.',
      director: 'Kwame Boateng',
      cast: ['Narrator: Efua Owusu'],
      trailer: 'https://example.com/trailer2.mp4'
    }
  ]);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => setLoading(false), 1500);
  }, []);

  // Filter and sort videos based on search term, category, and sort option
  useEffect(() => {
    let result = [...videos];
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(video => 
        video.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(video => video.category === selectedCategory);
    }
    
    // Sort videos
    result.sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      } else if (sortBy === 'year') {
        return b.year - a.year;
      } else if (sortBy === 'price') {
        // Extract numeric value from price string
        const priceA = parseFloat(a.price.buy.replace(/[^0-9.]/g, ''));
        const priceB = parseFloat(b.price.buy.replace(/[^0-9.]/g, ''));
        return priceA - priceB;
      }
      return 0;
    });
    
    setFilteredVideos(result);
  }, [videos, searchTerm, selectedCategory, sortBy]);

  const toggleWatchlist = (videoId) => {
    setWatchlist(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  return (
    <div className="watchlist">
      <header className="watchlist__header">
        <h1 className="watchlist__title">African Cinema Hub 🎬</h1>
        
        <div className="watchlist__controls">
          <div className="watchlist__search">
            <input
              type="text"
              className="watchlist__search-input"
              placeholder="Search movies and shows..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search videos"
            />
            <svg className="watchlist__search-icon" viewBox="0 0 24 24">
              <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"/>
            </svg>
          </div>

          <div className="watchlist__sort">
            <select
              className="watchlist__sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="rating">Rating</option>
              <option value="year">Release Year</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>
      </header>

      <nav className="watchlist__nav">
        {videoCategories.map(category => (
          <button
            key={category}
            className={`watchlist__nav-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </nav>

      {loading ? (
        <div className="watchlist__loading">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="watchlist__skeleton">
              <div className="watchlist__skeleton-thumb"></div>
              <div className="watchlist__skeleton-line"></div>
              <div className="watchlist__skeleton-line"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="watchlist__grid">
          {filteredVideos.map(video => (
            <article key={video.id} className="watchlist__card">
              <div className="watchlist__card-thumb">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  loading="lazy"
                  className="watchlist__card-img"
                />
                
                <div className="watchlist__card-overlay">
                  <button 
                    className={`watchlist__fav ${watchlist.includes(video.id) ? 'active' : ''}`}
                    onClick={() => toggleWatchlist(video.id)}
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </button>
                  
                  <div className="watchlist__card-prices">
                    <span className="watchlist__card-rent">{video.price.rent}</span>
                    <span className="watchlist__card-buy">{video.price.buy}</span>
                  </div>
                </div>
              </div>

              <div className="watchlist__card-body">
                <h3 className="watchlist__card-title">{video.title}</h3>
                <div className="watchlist__card-meta">
                  <span>{video.year}</span>
                  <span>{video.duration}</span>
                  <span className="watchlist__card-rating">★ {video.rating}</span>
                </div>
                <button 
                  className="watchlist__card-detail"
                  onClick={() => setSelectedVideo(video)}
                >
                  View Details
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {selectedVideo && (
        <div className="watchlist__modal">
          <div className="watchlist__modal-content">
            <button 
              className="watchlist__modal-close"
              onClick={() => setSelectedVideo(null)}
            >
              &times;
            </button>
            
            <div className="watchlist__modal-player">
              <video controls autoPlay className="watchlist__modal-video">
                <source src={selectedVideo.trailer} type="video/mp4" />
              </video>
            </div>

            <div className="watchlist__modal-info">
              <h2 className="watchlist__modal-title">{selectedVideo.title}</h2>
              <p className="watchlist__modal-descr">{selectedVideo.description}</p>
              
              <div className="watchlist__modal-stats">
                <div className="watchlist__modal-stat">
                  <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"/></svg>
                  <span>{selectedVideo.category}</span>
                </div>
                <div className="watchlist__modal-stat">
                  <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                  <span>{selectedVideo.duration}</span>
                </div>
              </div>

              <div className="watchlist__modal-actions">
                <button className="watchlist__modal-action watchlist__modal-rent">
                  <span className="watchlist__modal-price">{selectedVideo.price.rent}</span>
                  <span className="watchlist__modal-actiontext">48h Rental</span>
                </button>
                <button className="watchlist__modal-action watchlist__modal-buy">
                  <span className="watchlist__modal-price">{selectedVideo.price.buy}</span>
                  <span className="watchlist__modal-actiontext">Own Forever</span>
                </button>
              </div>

              <div className="watchlist__modal-crew">
                <h4>Director</h4>
                <p>{selectedVideo.director}</p>
              </div>
              <div className="watchlist__modal-crewitem">
                <h4>Cast</h4>
                <p>{selectedVideo.cast.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Watchlist;