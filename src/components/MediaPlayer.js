import React, { useEffect, useRef, useState } from 'react';
import { useMedia } from '../contexts/MediaContext';
import './MediaPlayer.css';

const MediaPlayer = () => {
  const {
    currentMedia,
    isPlaying,
    volume,
    progress,
    setProgress,
    setIsPlaying,
    setCurrentTime,
    mediaType,
    duration,
    setDuration,
    togglePlayPause,
    setVolume,
    currentTime,
  } = useMedia();

  const mediaRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [playerSize, setPlayerSize] = useState(localStorage.getItem('playerSize') || 'medium');

  // Handle media events
  useEffect(() => {
    const mediaEl = mediaRef.current;
    if (!mediaEl) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    mediaEl.addEventListener('play', handlePlay);
    mediaEl.addEventListener('pause', handlePause);
    mediaEl.addEventListener('ended', handleEnded);
    mediaEl.addEventListener('loadedmetadata', () => {
      setDuration(mediaEl.duration || 0);
    });

    return () => {
      mediaEl.removeEventListener('play', handlePlay);
      mediaEl.removeEventListener('pause', handlePause);
      mediaEl.removeEventListener('ended', handleEnded);
    };
  }, [setIsPlaying, setDuration]);

  // Sync playback state
  useEffect(() => {
    if (mediaRef.current) {
      isPlaying ? mediaRef.current.play() : mediaRef.current.pause();
    }
  }, [isPlaying]);

  // Update volume
  useEffect(() => {
    if (mediaRef.current) {
      mediaRef.current.volume = volume;
    }
  }, [volume]);

  // Update playback speed
  useEffect(() => {
    if (mediaRef.current) {
      mediaRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  // Handle time updates
  const handleTimeUpdate = () => {
    if (mediaRef.current) {
      setCurrentTime(mediaRef.current.currentTime);
      setProgress((mediaRef.current.currentTime / duration) * 100 || 0);
    }
  };

  // Handle seeking
  const handleSeek = (e) => {
    if (mediaRef.current) {
      const rect = e.target.getBoundingClientRect();
      const seekPosition = (e.clientX - rect.left) / rect.width;
      mediaRef.current.currentTime = seekPosition * duration;
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      mediaRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!mediaRef.current) return;

      switch (e.key) {
        case ' ': // Play/Pause
          e.preventDefault();
          togglePlayPause();
          break;
        case 'ArrowRight': // Seek forward 10s
          mediaRef.current.currentTime = Math.min(mediaRef.current.currentTime + 10, duration);
          break;
        case 'ArrowLeft': // Seek backward 10s
          mediaRef.current.currentTime = Math.max(mediaRef.current.currentTime - 10, 0);
          break;
        case 'ArrowUp': // Volume up
          setVolume(Math.min(volume + 0.1, 1));
          break;
        case 'ArrowDown': // Volume down
          setVolume(Math.max(volume - 0.1, 0));
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlayPause, setVolume, volume, duration]);

  // Handle size change
  const handleSizeChange = (size) => {
    setPlayerSize(size);
    localStorage.setItem('playerSize', size);
  };

  if (!currentMedia) return <div className="media-player-placeholder">No media selected</div>;

  return (
    <div className={`media-player ${mediaType}-player ${playerSize}`}>
      {mediaType === 'video' ? (
        <video
          ref={mediaRef}
          src={currentMedia.url}
          onTimeUpdate={handleTimeUpdate}
          onClick={togglePlayPause}
          controls={false}
        />
      ) : (
        <audio
          ref={mediaRef}
          src={currentMedia.url}
          onTimeUpdate={handleTimeUpdate}
          controls={false}
        />
      )}

      <div className="media-info">
        <h3>{currentMedia.title || 'Unknown Title'}</h3>
        <p>{currentMedia.artist || 'Unknown Artist'}</p>
      </div>

      <div
        className="media-controls"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {showControls && (
          <>
            <button onClick={togglePlayPause} className="control-btn play-pause">
              {isPlaying ? '⏸' : '▶'}
            </button>

            <div className="time-info">
              <span className="current-time">
                {new Date(currentTime * 1000).toISOString().substr(11, 8)}
              </span>
              <span className="duration">
                {new Date(duration * 1000).toISOString().substr(11, 8)}
              </span>
            </div>

            <div className="progress-bar" onClick={handleSeek}>
              <div className="progress" style={{ width: `${progress}%` }} />
            </div>

            <div className="volume-control">
              <span className="volume-icon">🔊</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
              />
            </div>

            <div className="playback-speed">
              <select
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
              >
                <option value={0.5}>0.5x</option>
                <option value={1}>1x</option>
                <option value={1.5}>1.5x</option>
                <option value={2}>2x</option>
              </select>
            </div>

            {mediaType === 'video' && (
              <button onClick={toggleFullscreen} className="control-btn fullscreen-btn">
                {isFullscreen ? '⤹' : '⤢'}
              </button>
            )}

            <div className="size-controls">
              <button onClick={() => handleSizeChange('small')} className="control-btn">
                S
              </button>
              <button onClick={() => handleSizeChange('medium')} className="control-btn">
                M
              </button>
              <button onClick={() => handleSizeChange('large')} className="control-btn">
                L
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MediaPlayer;