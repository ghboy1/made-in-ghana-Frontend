import { useEffect, useCallback } from 'react';

export const useFloatingFlags = (containerId) => {
  // Extract the function to use with useCallback
  const createFloatingFlag = useCallback(() => {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const flag = document.createElement('div');
    flag.className = 'floating-flag';
    
    // Randomize position
    const posX = Math.random() * 100;
    flag.style.left = `${posX}%`;
    
    const posYStart = Math.random() * 70 + 30;
    flag.style.top = `${posYStart}%`;
    
    // Randomize size
    const sizeVariation = 0.5 + Math.random() * 0.5;
    flag.style.transform = `scale(${sizeVariation})`;
    
    container.appendChild(flag);
    
    // Remove after animation completes
    setTimeout(() => {
      if (container.contains(flag)) {
        container.removeChild(flag);
      }
    }, 6000);
  }, [containerId]); // Add containerId as dependency
  
  useEffect(() => {
    // Initial flags
    for (let i = 0; i < 4; i++) {
      setTimeout(() => createFloatingFlag(), Math.random() * 2000);
    }
    
    // Continuous flag creation
    const intervalId = setInterval(() => {
      if (Math.random() > 0.6) { // 40% chance to create a flag
        createFloatingFlag();
      }
    }, 3000);
    
    return () => clearInterval(intervalId);
  }, [createFloatingFlag]); // Use createFloatingFlag as dependency
};