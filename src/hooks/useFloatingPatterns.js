import { useEffect } from 'react';

export const useFloatingPatterns = (containerId) => {
  useEffect(() => {
    const createFloatingPattern = () => {
      const container = document.getElementById(containerId);
      if (!container) return;

      const pattern = document.createElement('div');
      pattern.className = 'floating-pattern';

      // Full list of Adinkra symbols
      const symbols = [
        '☥', '✦', '✧', '❖', '◆', '◇', '✺', '✹', '✵', '✶', '✷', '✸', '✴', '✳', '✲', '✱',
        '✿', '❀', '❁', '❂', '❃', '❄', '❅', '❆', '❇', '❈', '❉', '❊', '❋', '✢', '✣', '✤',
        '✥', '✪', '✫', '✬', '✭', '✮', '✯', '✰', '✱', '✲', '✳', '✴', '✵', '✶', '✷', '✸',
        '✹', '✺', '✻', '✼', '✽', '✾', '✿', '❀', '❁', '❂', '❃', '❄', '❅', '❆', '❇', '❈',
        '❉', '❊', '❋', '☀', '☼', '☽', '☾', '☿', '♀', '♂', '♁', '♃', '♄', '♅', '♆', '♇',
        '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓', '♔', '♕', '♖', '♗',
        '♘', '♙', '♚', '♛', '♜', '♝', '♞', '♟'
      ];
      const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      pattern.textContent = randomSymbol;

      // Randomize colors from Ghana flag
      const colors = ['#006B3F', '#FCD116', '#CE1126', '#000000'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      pattern.style.color = randomColor;

      // Randomize position
      const posX = Math.random() * 100;
      pattern.style.left = `${posX}%`;

      const posYStart = Math.random() * 100;
      pattern.style.top = `${posYStart}%`;

      // Randomize size
      const sizeVariation = 0.8 + Math.random() * 1.5;
      pattern.style.fontSize = `${sizeVariation}rem`;

      // Add rotation and opacity animation
      pattern.style.opacity = '0';
      pattern.style.transform = `rotate(${Math.random() * 360}deg)`;
      pattern.style.transition = 'all 7s ease-in-out';

      // Append to container
      container.appendChild(pattern);

      // Trigger animation
      setTimeout(() => {
        pattern.style.opacity = '1';
        pattern.style.transform = `translateY(-200%) rotate(${Math.random() * 360}deg)`;
      }, 50);

      // Remove after animation completes
      setTimeout(() => {
        if (container.contains(pattern)) {
          container.removeChild(pattern);
        }
      }, 7000);
    };

    // Initial patterns
    for (let i = 0; i < 5; i++) {
      setTimeout(() => createFloatingPattern(), Math.random() * 3000);
    }

    // Continuous pattern creation
    const intervalId = setInterval(() => {
      if (Math.random() > 0.4) {
        createFloatingPattern();
      }
    }, 4000);

    return () => clearInterval(intervalId);
  }, [containerId]);
};