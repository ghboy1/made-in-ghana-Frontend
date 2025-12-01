import React, { useState, useEffect } from 'react';

export const VideoPlayer = ({
  videoRef,
  currentVideo,
  isPlaying,
  volume,
  progress,
  currentTime,
  duration,
  playbackSpeed,
  isLoading,
  togglePlay,
  handleTimeUpdate,
  handleSeek,
  handleVolumeChange,
  toggleFullscreen,
  setShowVolume,
  showVolume,
  setShowSpeedMenu,
  showSpeedMenu,
  setPlaybackSpeed,
  isFullscreen,
  setIsPlaying
}) => {
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const handleRetry = () => {
    setError(null);
    setRetryCount(prev => prev + 1);
    
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play()
        .then(() => {
          setError(null);
        })
        .catch(err => {
          console.error("Retry failed:", err);
          setError(`Playback failed: ${err.message}`);
        });
    }
  };

  useEffect(() => {
    const handleError = () => {
      if (videoRef.current) {
        setError("Video could not be loaded. Please check your connection or try another video.");
      }
    };
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('error', handleError);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('error', handleError);
      }
    };
  }, [videoRef, currentVideo, retryCount]);

  return (
    <div className="ghana-movies__modal-player">
      {isLoading && (
        <div className="ghana-movies__loader" aria-label="Loading video">
          <span className="visually-hidden">Loading video...</span>
        </div>
      )}
      
      {error && (
        <div className="video-error">
          <svg viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          <h3>Video Playback Error</h3>
          <p>{error}</p>
          <button onClick={handleRetry}>Retry Playback</button>
        </div>
      )}
      
      <video
        ref={videoRef}
        className="ghana-movies__modal-video"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={(e) => {
          if (!isNaN(e.target.duration)) {
            // Format duration if formatTime is available
            const formattedTime = String(Math.floor(e.target.duration / 60)).padStart(2, '0') + ':' +
                                String(Math.floor(e.target.duration % 60)).padStart(2, '0');
            if (typeof duration === 'function') {
              duration(formattedTime);
            }
          }
        }}
        onPlay={() => typeof setIsPlaying === 'function' && setIsPlaying(true)}
        onPause={() => typeof setIsPlaying === 'function' && setIsPlaying(false)}
        preload="metadata"
      >
        <source src={currentVideo.videoUrl} type="video/mp4" />
        Your browser doesn't support HTML5 video.
      </video>

      <div className="video-controls">
        <div className="progress-bar" onClick={handleSeek}>
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
        
        <div className="controls-bottom">
          <div className="left-controls">
            <button 
              onClick={togglePlay} 
              className="control-btn play-btn"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? 
                <svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg> : 
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              }
            </button>
            
            <span className="time-display">
              {currentTime} / {duration}
            </span>
            
            <div 
              className="volume-control" 
              onMouseEnter={() => setShowVolume(true)} 
              onMouseLeave={() => setShowVolume(false)}
            >
              <button 
                className="control-btn volume-btn"
                aria-label="Volume control"
              >
                <svg viewBox="0 0 24 24">
                  {volume === 0 ? (
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                  ) : volume < 0.5 ? (
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                  ) : (
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                  )}
                </svg>
              </button>
              
              {showVolume && (
                <input
                  type="range"
                  className="volume-slider"
                  min="0" max="1" step="0.05"
                  value={volume}
                  onChange={handleVolumeChange}
                  aria-label="Volume level"
                />
              )}
            </div>
          </div>
          
          <div className="right-controls">
            <div className="speed-control">
              <button 
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                className="control-btn speed-btn"
                aria-haspopup="true"
                aria-expanded={showSpeedMenu}
              >
                {playbackSpeed}x
              </button>
              
              {showSpeedMenu && (
                <div className="speed-menu">
                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map(sp => (
                    <button 
                      key={sp} 
                      onClick={() => {
                        if (videoRef.current) {
                          videoRef.current.playbackRate = sp;
                        }
                        setPlaybackSpeed(sp);
                        setShowSpeedMenu(false);
                      }}
                      className={playbackSpeed === sp ? 'active' : ''}
                    >
                      {sp}x
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button 
              onClick={toggleFullscreen}
              className="control-btn fullscreen-btn"
              aria-label={isFullscreen ? "Exit full screen" : "Enter full screen"}
            >
              {isFullscreen ? 
                <svg viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg> : 
                <svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};