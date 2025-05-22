
// Helper for animate on scroll functionality
export const animateOnScroll = () => {
  const sections = document.querySelectorAll('.section-fade');
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15 }
  );
  
  sections.forEach((section) => {
    observer.observe(section);
  });
  
  return () => {
    sections.forEach((section) => {
      observer.unobserve(section);
    });
  };
};
