import { createContext, useContext, useState, useCallback, useMemo } from 'react';

const MediaContext = createContext();

export function MediaProvider({ children }) {
  const [currentMedia, setCurrentMedia] = useState({
    url: '',
    title: 'Unknown Title',
    artist: 'Unknown Artist',
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1); // Default volume: 100%
  const [progress, setProgress] = useState(0); // Progress in percentage
  const [playlist, setPlaylist] = useState([]); // Array of media items
  const [currentTime, setCurrentTime] = useState(0); // Current playback time in seconds
  const [mediaType, setMediaType] = useState('audio'); // Default type: audio
  const [duration, setDuration] = useState(0); // Total duration in seconds

  // Toggle play/pause state
  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  // Add media to the playlist
  const addToPlaylist = useCallback((media) => {
    setPlaylist((prev) => {
      if (prev.some((item) => item.url === media.url)) {
        return prev; // Avoid duplicates
      }
      return [...prev, media];
    });
  }, []);

  // Remove media from the playlist
  const removeFromPlaylist = useCallback((mediaUrl) => {
    setPlaylist((prev) => prev.filter((item) => item.url !== mediaUrl));
  }, []);

  // Clear the playlist
  const clearPlaylist = useCallback(() => {
    setPlaylist([]);
  }, []);

  // Memoize the context value to optimize performance
  const value = useMemo(
    () => ({
      currentMedia,
      setCurrentMedia,
      isPlaying,
      setIsPlaying,
      togglePlayPause,
      volume,
      setVolume,
      progress,
      setProgress,
      playlist,
      setPlaylist,
      addToPlaylist,
      removeFromPlaylist,
      clearPlaylist,
      currentTime,
      setCurrentTime,
      mediaType,
      setMediaType,
      duration,
      setDuration,
    }),
    [
      currentMedia,
      isPlaying,
      togglePlayPause,
      volume,
      progress,
      playlist,
      currentTime,
      mediaType,
      duration,
      addToPlaylist,
      removeFromPlaylist,
      clearPlaylist,
    ]
  );

  return <MediaContext.Provider value={value}>{children}</MediaContext.Provider>;
}

export const useMedia = () => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMedia must be used within a MediaProvider');
  }
  return context;
};