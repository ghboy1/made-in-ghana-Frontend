import React from 'react';

export const MovieDetails = ({ movie }) => {
  return (
    <div className="ghana-movies__modal-details">
      <h2 className="ghana-movies__modal-title">{movie.title}</h2>
      <div className="ghana-movies__modal-meta">
        <span className="ghana-movies__meta-item">{movie.year}</span>
        <span className="ghana-movies__meta-item">{movie.genre}</span>
        <span className="ghana-movies__meta-item">{movie.runtime}</span>
        <span className="ghana-movies__meta-item">⭐ {movie.rating}</span>
      </div>
      <p className="ghana-movies__modal-desc">{movie.description}</p>
    </div>
  );
};