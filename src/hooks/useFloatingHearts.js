import { useEffect } from 'react';

export const useFloatingHearts = (containerId) => {
  useEffect(() => {
    const createFloatingHeart = () => {
      const container = document.getElementById(containerId);
      if (!container) return;
      
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      
      // Randomize color
      const colorVariants = ['red', 'pink', 'purple'];
      const randomColor = colorVariants[Math.floor(Math.random() * colorVariants.length)];
      heart.classList.add(`heart-${randomColor}`);
      
      // Randomize position
      const posX = Math.random() * 100;
      heart.style.left = `${posX}%`;
      
      const posYStart = Math.random() * 100;
      heart.style.top = `${posYStart}%`;
      
      // Randomize size
      const sizeVariation = 0.5 + Math.random() * 0.5;
      heart.style.transform = `scale(${sizeVariation})`;
      
      container.appendChild(heart);
      
      // Remove after animation completes
      setTimeout(() => {
        if (container.contains(heart)) {
          container.removeChild(heart);
        }
      }, 4500);
    };
    
    // Initial hearts
    for (let i = 0; i < 3; i++) {
      setTimeout(() => createFloatingHeart(), Math.random() * 2000);
    }
    
    // Continuous heart creation
    const intervalId = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance to create a heart
        createFloatingHeart();
      }
    }, 2500);
    
    return () => clearInterval(intervalId);
  }, [containerId]);
};