import { useEffect } from 'react';

export const useFloatingLikes = (containerId) => {
  useEffect(() => {
    const createFloatingLike = () => {
      const container = document.getElementById(containerId);
      if (!container) return;
      
      const like = document.createElement('div');
      like.className = 'floating-like';
      
      // Randomize position
      const posX = Math.random() * 100;
      like.style.left = `${posX}%`;
      
      const posYStart = Math.random() * 100;
      like.style.top = `${posYStart}%`;
      
      // Randomize size
      const sizeVariation = 0.6 + Math.random() * 0.4;
      like.style.transform = `scale(${sizeVariation})`;
      
      container.appendChild(like);
      
      // Remove after animation completes
      setTimeout(() => {
        if (container.contains(like)) {
          container.removeChild(like);
        }
      }, 5000);
    };
    
    // Initial likes
    for (let i = 0; i < 2; i++) {
      setTimeout(() => createFloatingLike(), Math.random() * 2000);
    }
    
    // Continuous like creation
    const intervalId = setInterval(() => {
      if (Math.random() > 0.75) { // 25% chance to create a like
        createFloatingLike();
      }
    }, 3500);
    
    return () => clearInterval(intervalId);
  }, [containerId]);
};