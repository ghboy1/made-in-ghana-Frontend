import React from 'react';

export const GenreNav = ({ genres, selectedGenre, setSelectedGenre }) => {
  return (
    <div className="ghana-movies__nav">
      {genres.map(genre => (
        <button
          key={genre}
          className={`ghana-movies__nav-btn ${selectedGenre === genre ? 'active' : ''}`}
          onClick={() => setSelectedGenre(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};