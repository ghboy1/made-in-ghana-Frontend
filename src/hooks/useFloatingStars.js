import { useEffect } from 'react';

export const useFloatingStars = (containerId) => {
  useEffect(() => {
    const createFloatingStar = () => {
      const container = document.getElementById(containerId);
      if (!container) return;
      
      const star = document.createElement('div');
      star.className = 'floating-star';
      
      const colorClasses = ['color-red', 'color-gold', 'color-green', 'color-black'];
      const randomColorClass = colorClasses[Math.floor(Math.random() * colorClasses.length)];
      star.classList.add(randomColorClass);
      
      const posX = Math.random() * 100;
      star.style.left = `${posX}%`;
      
      const posYStart = Math.random() * 70 + 30;
      star.style.top = `${posYStart}%`;
      
      const sizeVariation = 0.7 + Math.random() * 0.6;
      star.style.transform = `scale(${sizeVariation})`;
      
      container.appendChild(star);
      
      setTimeout(() => {
        if (container.contains(star)) {
          container.removeChild(star);
        }
      }, 4100);
    };
    
    // Initial stars
    for (let i = 0; i < 8; i++) {
      setTimeout(() => createFloatingStar(), Math.random() * 2000);
    }
    
    // Continuous star creation
    const intervalId = setInterval(() => {
      const starCount = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < starCount; i++) {
        setTimeout(() => createFloatingStar(), Math.random() * 1000);
      }
    }, 2000);
    
    return () => clearInterval(intervalId);
  }, [containerId]);
};