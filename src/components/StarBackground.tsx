
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
      
      // Color - some stars are purple for the gothic theme
      if (Math.random() > 0.7) {
        star.style.background = "rgba(110, 0, 255, 0.8)";
        star.style.boxShadow = "0 0 4px 1px rgba(110, 0, 255, 0.5)";
      }
      
      // Add star to container
      container.appendChild(star);
    }
    
    // Add constellation lines
    createConstellations(container);
  };
  
  const createConstellations = (container: HTMLDivElement) => {
    // Create 2-3 constellations
    const constellationCount = Math.floor(Math.random() * 2) + 2;
    
    for (let c = 0; c < constellationCount; c++) {
      // Each constellation has 4-7 stars
      const pointCount = Math.floor(Math.random() * 4) + 4;
      const points = [];
      
      // Constellation position and size
      const centerX = Math.random() * 80 + 10; // Keep away from edges (percent)
      const centerY = Math.random() * 80 + 10;
      const radius = Math.random() * 15 + 5; // Size of constellation (percent)
      
      // Create constellation points
      for (let i = 0; i < pointCount; i++) {
        // Position stars in a small cluster
        const angle = (Math.PI * 2 / pointCount) * i;
        const variance = Math.random() * radius * 0.5;
        const x = centerX + Math.cos(angle) * (radius + variance);
        const y = centerY + Math.sin(angle) * (radius + variance);
        
        // Create the star
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = '2px';
        star.style.height = '2px';
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.opacity = "1";
        star.style.background = "rgba(183, 0, 255, 0.9)";
        star.style.boxShadow = "0 0 5px 2px rgba(110, 0, 255, 0.7)";
        star.style.zIndex = "1";
        
        container.appendChild(star);
        points.push({ x, y });
      }
      
      // Connect the stars with lines to form constellation
      for (let i = 0; i < points.length - 1; i++) {
        const line = document.createElement('div');
        line.className = 'constellation-line';
        
        // Calculate line position and angle
        const x1 = points[i].x;
        const y1 = points[i].y;
        const x2 = points[i + 1].x;
        const y2 = points[i + 1].y;
        
        const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const angle = Math.atan2(y2 - y1, x2 - x1);
        
        // Style the line
        line.style.position = 'absolute';
        line.style.width = `${length}%`;
        line.style.height = '1px';
        line.style.background = 'linear-gradient(90deg, rgba(110, 0, 255, 0.1), rgba(110, 0, 255, 0.3), rgba(110, 0, 255, 0.1))';
        line.style.top = `${y1}%`;
        line.style.left = `${x1}%`;
        line.style.transformOrigin = '0 0';
        line.style.transform = `rotate(${angle}rad)`;
        line.style.opacity = '0.4';
        line.style.zIndex = '0';
        
        container.appendChild(line);
      }
    }
  };
  
  // Add parallax effect
  const handleMouseMove = (e: MouseEvent) => {
    if (!starsContainerRef.current) return;
    
    const container = starsContainerRef.current;
    const stars = container.querySelectorAll('.star');
    const constellationLines = container.querySelectorAll('.constellation-line');
    
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    stars.forEach((star, index) => {
      const depth = 0.5 + (index % 3) * 0.1; // Different depths for parallax
      const translateX = (mouseX - 0.5) * depth * 20;
      const translateY = (mouseY - 0.5) * depth * 20;
      
      (star as HTMLElement).style.transform = `translate(${translateX}px, ${translateY}px)`;
    });
    
    // Move constellation lines with slightly less intensity
    constellationLines.forEach((line, index) => {
      const depth = 0.3 + (index % 3) * 0.05; 
      const translateX = (mouseX - 0.5) * depth * 15;
      const translateY = (mouseY - 0.5) * depth * 15;
      
      const currentTransform = (line as HTMLElement).style.transform;
      const rotateValue = currentTransform.match(/rotate\(([^)]+)\)/)?.[0] || '';
      
      (line as HTMLElement).style.transform = `translate(${translateX}px, ${translateY}px) ${rotateValue}`;
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
