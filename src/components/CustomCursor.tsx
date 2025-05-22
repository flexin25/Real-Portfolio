
import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorRing = cursorRingRef.current;
    
    if (!cursor || !cursorRing) return;
    
    const onMouseMove = (e: MouseEvent) => {
      // Position both cursor elements
      const { clientX, clientY } = e;
      cursor.style.left = `${clientX}px`;
      cursor.style.top = `${clientY}px`;
      
      // Add slight delay to the ring for nice effect
      setTimeout(() => {
        cursorRing.style.left = `${clientX}px`;
        cursorRing.style.top = `${clientY}px`;
      }, 80);
    };

    const onMouseDown = () => {
      cursor.classList.add('scale-75');
      cursorRing.classList.add('scale-150');
    };

    const onMouseUp = () => {
      cursor.classList.remove('scale-75');
      cursorRing.classList.remove('scale-150');
    };
    
    // Check for clickable elements
    const checkIfLink = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isLink = target.tagName.toLowerCase() === 'a' || 
                    target.tagName.toLowerCase() === 'button' ||
                    target.closest('a') ||
                    target.closest('button');
      
      setIsPointer(!!isLink);
    };

    // Add event listeners
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousemove', checkIfLink);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    
    // Remove default cursor
    document.body.classList.add('cursor-none');
    
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousemove', checkIfLink);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.body.classList.remove('cursor-none');
    };
  }, []);

  // Don't show custom cursor on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <div 
        ref={cursorRef}
        className={`fixed w-3 h-3 rounded-full bg-cosmic-purple z-50 pointer-events-none transition-transform duration-150 ${
          isPointer ? 'bg-cosmic-neon' : 'bg-cosmic-purple'
        }`}
        style={{ left: '-100px', top: '-100px' }}
      />
      <div 
        ref={cursorRingRef}
        className={`fixed w-8 h-8 border-2 rounded-full z-50 pointer-events-none transition-all duration-150 ${
          isPointer ? 'border-cosmic-neon scale-125' : 'border-cosmic-purple'
        }`}
        style={{ left: '-100px', top: '-100px', transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
};

export default CustomCursor;
