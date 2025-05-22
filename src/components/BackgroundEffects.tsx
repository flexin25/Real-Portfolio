
import { useEffect, useRef } from 'react';

const BackgroundEffects = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Setup canvas
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Particle system
    const particles: Particle[] = [];
    const particleCount = Math.min(60, Math.floor(window.innerWidth / 20));
    
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
      hue: number;
      orbitRadius: number;
      orbitAngle: number;
      orbitSpeed: number;
      shouldOrbit: boolean;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.hue = Math.random() > 0.7 ? 265 : 200 + Math.random() * 60; // Purple or blue tints
        this.color = `hsl(${this.hue}, 100%, ${Math.random() * 20 + 60}%)`;
        this.opacity = Math.random() * 0.5 + 0.1;
        
        // Orbit properties (some particles will orbit)
        this.orbitRadius = Math.random() * 50 + 20;
        this.orbitAngle = Math.random() * Math.PI * 2;
        this.orbitSpeed = (Math.random() - 0.5) * 0.02;
        this.shouldOrbit = Math.random() > 0.7;
      }

      update() {
        if (this.shouldOrbit) {
          // Orbital movement
          this.orbitAngle += this.orbitSpeed;
          const centerX = this.x - this.orbitRadius;
          const centerY = this.y - this.orbitRadius;
          this.x = centerX + Math.cos(this.orbitAngle) * this.orbitRadius;
          this.y = centerY + Math.sin(this.orbitAngle) * this.orbitRadius;
        } else {
          // Linear movement
          this.x += this.speedX;
          this.y += this.speedY;
          
          // Wrap around edges
          if (this.x < 0) this.x = canvas.width;
          if (this.x > canvas.width) this.x = 0;
          if (this.y < 0) this.y = canvas.height;
          if (this.y > canvas.height) this.y = 0;
          
          // Slowly change speed to create organic movement
          this.speedX += (Math.random() - 0.5) * 0.01;
          this.speedY += (Math.random() - 0.5) * 0.01;
          
          // Limit speed
          this.speedX = Math.max(-0.7, Math.min(0.7, this.speedX));
          this.speedY = Math.max(-0.7, Math.min(0.7, this.speedY));
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color}${Math.floor(this.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Add gothic portals (mysterious circular formations)
    const portals = [];
    const portalCount = 2 + Math.floor(Math.random() * 3);
    
    for (let i = 0; i < portalCount; i++) {
      portals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 100 + 50,
        hue: 265, // Purple
        phase: Math.random() * Math.PI * 2
      });
    }
    
    // Animation loop
    const animate = () => {
      // Create a dark, transparent fading effect
      ctx.fillStyle = 'rgba(10, 1, 24, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw mysterious portals
      portals.forEach(portal => {
        portal.phase += 0.01;
        const gradient = ctx.createRadialGradient(
          portal.x, portal.y, 0,
          portal.x, portal.y, portal.radius
        );
        gradient.addColorStop(0, `hsla(${portal.hue}, 100%, 50%, ${0.1 + Math.sin(portal.phase) * 0.05})`);
        gradient.addColorStop(0.5, `hsla(${portal.hue}, 100%, 20%, ${0.05 + Math.sin(portal.phase) * 0.02})`);
        gradient.addColorStop(1, 'hsla(265, 100%, 10%, 0)');
        
        ctx.beginPath();
        ctx.arc(portal.x, portal.y, portal.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Draw connections between nearby particles
      connectParticles();
      
      requestAnimationFrame(animate);
    };
    
    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            const opacity = 0.1 * (1 - distance / 150);
            const hue = (particles[i].hue + particles[j].hue) / 2;
            ctx.strokeStyle = `hsla(${hue}, 100%, 70%, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <>
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full z-[-2] bg-gradient-to-b from-[#0a0118] to-[#150538]"
      />
      <div className="gothic-fog" />
    </>
  );
};

export default BackgroundEffects;
