import React from 'react';

export const MovieGrid = ({ genre, movies, watchlist, openModal, addToWatchlist }) => {
  return (
    <div className="ghana-movies__section">
      <h2 className="ghana-movies__section-title">{genre}</h2>
      <div className="ghana-movies__grid">
        {movies.map(movie => (
          <div key={movie.id} className="ghana-movies__card">
            <div 
              className="ghana-movies__card-thumb"
              onClick={() => openModal(movie)}
            >
              <img 
                src={movie.thumbnail} 
                alt={movie.title}
                className="ghana-movies__card-img"
              />
              <div className="ghana-movies__card-overlay">
                <svg className="ghana-movies__play-icon" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
            <div className="ghana-movies__card-info">
              <h3 className="ghana-movies__card-title">{movie.title}</h3>
              <div className="ghana-movies__card-meta">
                <span>{movie.year}</span>
                <span>{movie.runtime}</span>
                <span>⭐ {movie.rating}</span>
              </div>
              <button 
                className={`ghana-movies__watchlist-btn ${watchlist.some(w => w.id === movie.id) ? 'active' : ''}`}
                onClick={() => addToWatchlist(movie)}
                aria-label={`${watchlist.some(w => w.id === movie.id) ? 'Remove from' : 'Add to'} watchlist`}
              >
                {watchlist.some(w => w.id === movie.id) ? '✓' : '+'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};