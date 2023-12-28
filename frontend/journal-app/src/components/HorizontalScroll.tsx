import React, { ReactNode, useRef, useState } from 'react';
import { useSpring, animated } from 'react-spring';

interface HorizontalScrollProps {
    children: ReactNode;
  }

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ children }) => {
  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -200, // Adjust the scroll distance as needed
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 200, // Adjust the scroll distance as needed
        behavior: 'smooth',
      });
    }
  };

  const [{ x }, set] = useSpring(() => ({ x: 0 }));

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollX = containerRef.current.scrollLeft;
      set({ x: scrollX });
      setScrollPosition(scrollX);
    }
  };

  return (
    <div className="relative">
      <button className="scroll-button left" onClick={scrollLeft} disabled={scrollPosition === 0}>
        &#8249;
      </button>
      <div
        ref={containerRef}
        className="overflow-x-auto whitespace-nowrap"
        onScroll={handleScroll}
        style={{ scrollSnapType: 'x mandatory' }}
      >
        <animated.div
          style={{
            transform: x.interpolate((x) => `translate3d(${-x}px,0,0)`),
          }}
        >
          {children}
        </animated.div>
      </div>
      <button className="scroll-button right" onClick={scrollRight}>
        &#8250;
      </button>
    </div>
  );
};

export default HorizontalScroll;
