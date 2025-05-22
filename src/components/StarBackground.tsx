
import { useEffect, useRef } from 'react';

const StarBackground = () => {
  const starsContainerRef = useRef<HTMLDivElement>(null);

  const createStars = () => {
    if (!starsContainerRef.current) return;
    
    const container = starsContainerRef.current;
    container.innerHTML = '';
    
    const count = 200;
    
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      const size = Math.random() * 2;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.opacity = `${Math.random()}`;
      
      // Position
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      
      // Animation
      star.style.setProperty('--duration', `${3 + Math.random() * 7}`);
      
      // Add star to container
      container.appendChild(star);
    }
  };
  
  // Add parallax effect
  const handleMouseMove = (e: MouseEvent) => {
    if (!starsContainerRef.current) return;
    
    const container = starsContainerRef.current;
    const stars = container.querySelectorAll('.star');
    
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    stars.forEach((star, index) => {
      const depth = 0.5 + (index % 3) * 0.1; // Different depths for parallax
      const translateX = (mouseX - 0.5) * depth * 20;
      const translateY = (mouseY - 0.5) * depth * 20;
      
      (star as HTMLElement).style.transform = `translate(${translateX}px, ${translateY}px)`;
    });
  };
  
  useEffect(() => {
    createStars();
    window.addEventListener('resize', createStars);
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('resize', createStars);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return <div ref={starsContainerRef} className="stars-container" />;
};

export default StarBackground;
