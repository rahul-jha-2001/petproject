import { useState, useEffect } from 'react';

const DarkenOverTime = () => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 12 * 60 * 60 * 1000; // 12 hours in milliseconds
    
    const updateOpacity = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const newOpacity = Math.min(elapsed / duration, 0.8); // Max darkness of 80%
      setOpacity(newOpacity);
    };

    const interval = setInterval(updateOpacity, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: `rgba(0, 0, 0, ${opacity})`,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
};

export default function LetMeThink() {
    return (
      <main>
        <h1>Your Content Here</h1>
        <p>This page will gradually darken over time</p>
        
        {/* Add the component at the end */}
        <DarkenOverTime />
      </main>
    )
  }