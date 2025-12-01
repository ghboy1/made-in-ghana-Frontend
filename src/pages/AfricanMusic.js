import { Link } from 'react-router-dom';
import './AfricanMusic.css';
import { useMemo } from 'react';
import MusicTopBar from '../components/MusicTopBar';
const AfricanMusic = () => {
  const hotArtists = useMemo(() => [
    'Burna Boy', 'Wizkid', 'Davido', 'Angelique Kidjo',
    'Yemi Alade', 'Shatta Wale', 'Fally Ipupa', 'Tiwa Savage',
    'Diamond Platnumz', 'Mr Eazi'
  ], []);

  const playlists = useMemo(() => [
    { 
      name: 'Afrobeat Fusion', 
      artists: ['Burna Boy', 'Wizkid', 'Tiwa Savage', 'Davido'] 
    },
    { 
      name: 'Highlife Classics', 
      artists: ['E.T. Mensah', 'King Bruce', 'Nana Ampadu', 'Pat Thomas'] 
    },
    { 
      name: 'Azonto Hits', 
      artists: ['Shatta Wale', 'Stonebwoy', 'R2Bees', 'Fuse ODG'] 
    },
    { 
      name: 'Afropop Now', 
      artists: ['Rema', 'Ayra Starr', 'Tems', 'Fireboy DML'] 
    },
  ], []);

  const hotSongs = useMemo(() => [
    { song: 'Ye', artist: 'Burna Boy' },
    { song: 'Fall', artist: 'Davido' },
    { song: 'Essence', artist: 'Wizkid ft. Tems' },
    { song: 'Johnny', artist: 'Yemi Alade' },
    { song: 'African Queen', artist: '2Baba' },
    { song: 'Kpo K3K3', artist: 'Stonebwoy' },
  ], []);

  return (
    <div className="african-music-container">
      <header className="music-header">
        <h1 className="music-title">GHANA/AFRICAN MUSIC</h1>
      </header>

      <section className="hot-artists-section">
        <h2 className="section-header">Hot African Artists</h2>
        <div className="artist-grid">
          {hotArtists.map((artist, index) => (
            <div key={`${artist}-${index}`} className="artist-card">
              {artist}
            </div>
          ))}
        </div>
      </section>

      <section className="new-playlists-section">
        <h2 className="section-header">New Release Playlists</h2>
        <div className="playlist-grid">
          {playlists.map((playlist, index) => (
            <div key={`${playlist.name}-${index}`} className="playlist-card">
              <h3 className="playlist-name">{playlist.name}</h3>
              <p className="artist-list">
                {playlist.artists.join(', ')} and more
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="hot-songs-section">
        <h2 className="section-header">Hot African Songs</h2>
        <div className="songs-grid">
          {hotSongs.map((track, index) => (
            <div key={`${track.song}-${index}`} className="song-card">
              <div className="song-info">
                <h3 className="song-title">{track.song}</h3>
                <p className="song-artist">{track.artist}</p>
              </div>
              <button className="play-button" aria-label={`Play ${track.song}`}>
                Play
              </button>
            </div>
          ))}
        </div>
      </section>

      <div className="signin-cta">
        <h2 className="cta-heading">Sign in for Unlimited access to African Music</h2>
        <Link to="/login" className="cta-button">
          Sign In Now
        </Link>
      </div>

      <div className="music-library-link-wrapper">
        <Link to="/music-library" className="music-library-link">
          Explore Full Ghana Music Library →
        </Link>
      </div>
    </div>
  );
};

export default AfricanMusic;