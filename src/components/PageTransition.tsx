
import { useEffect, useState } from 'react';

interface PageTransitionProps {
  targetId: string | null;
}

const PageTransition = ({ targetId }: PageTransitionProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!targetId) return;
    
    setIsAnimating(true);
    
    // After animation completes, scroll to target and reset
    setTimeout(() => {
      const element = document.getElementById(targetId.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 500); // Fade out transition duration
    }, 800); // Transition hold duration
    
  }, [targetId]);

  if (!isAnimating) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="absolute inset-0 bg-cosmic-dark animate-transition-fade">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-t-cosmic-purple border-r-cosmic-purple border-b-transparent border-l-transparent rounded-full animate-spin-slow" />
        </div>
      </div>
    </div>
  );
};

export default PageTransition;
