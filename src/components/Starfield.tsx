import React, { useEffect, useRef } from 'react';

const Starfield: React.FC = () => {
  const starfieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = starfieldRef.current;
    if (!container) return;

    const createStar = () => {
      const star = document.createElement('div');
      star.className = 'star';
      
      // Random position
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      
      // Random animation duration and opacity
      star.style.setProperty('--duration', `${2 + Math.random() * 4}s`);
      star.style.setProperty('--opacity', `${0.3 + Math.random() * 0.7}`);
      
      return star;
    };

    // Create initial stars
    const starCount = Math.floor((window.innerWidth * window.innerHeight) / 10000);
    for (let i = 0; i < starCount; i++) {
      container.appendChild(createStar());
    }

    // Cleanup
    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return <div ref={starfieldRef} className="starfield" />;
};

export default Starfield;