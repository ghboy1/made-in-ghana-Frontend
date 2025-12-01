import { useState, useEffect } from 'react';

export const useScrollToTop = (threshold = 300) => {
  const [showScroll, setShowScroll] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.pageYOffset > threshold);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);
  
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  
  return { showScroll, scrollTop };
};