
import { useEffect, useRef } from 'react';
import { BookOpen, Code, Heart, Monitor } from 'lucide-react';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const skills = [
    { name: "Frontend Development", icon: <Monitor className="w-10 h-10 text-cosmic-purple" /> },
    { name: "Backend Development", icon: <Code className="w-10 h-10 text-cosmic-purple" /> },
    { name: "UI/UX Design", icon: <Heart className="w-10 h-10 text-cosmic-purple" /> },
    { name: "Technical Writing", icon: <BookOpen className="w-10 h-10 text-cosmic-purple" /> }
  ];

  return (
    <section ref={sectionRef} id="about" className="section-fade py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-16">
        <h2 className="cosmic-heading mb-6">About Me</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <p className="cosmic-text mb-6">
              I'm a passionate developer with several years of experience in building web applications.
              My journey in tech began when I discovered my love for solving complex problems through code.
              Since then, I've been on a continuous learning path, exploring new technologies and methodologies
              to create better, more efficient solutions.
            </p>
            
            <p className="cosmic-text">
              I believe in writing clean, maintainable code and creating intuitive user experiences.
              When I'm not coding, you can find me exploring new tech trends, contributing to open-source
              projects, or sharing knowledge with the developer community.
            </p>
            
            <div className="mt-10">
              <h3 className="text-2xl font-bold text-white mb-4">My Skills</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {skills.map((skill, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-4 p-4 rounded-lg bg-cosmic-blue/30 border border-cosmic-purple/20 hover:bg-cosmic-blue/40 transition-colors"
                  >
                    {skill.icon}
                    <span className="text-white font-medium">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="cosmic-card flex flex-col justify-center items-center p-8">
            <div className="w-48 h-48 rounded-full border-4 border-cosmic-purple mb-6 overflow-hidden">
              <div className="w-full h-full bg-cosmic-blue/50 flex items-center justify-center text-4xl text-cosmic-purple">
                YN
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-white">Your Name</h3>
            <p className="text-cosmic-light">Full Stack Developer</p>
            
            <div className="w-full bg-cosmic-blue/20 h-1 my-6">
              <div className="bg-cosmic-purple h-full w-[75%]"></div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full text-center">
              <div>
                <p className="text-cosmic-purple text-2xl font-bold">5+</p>
                <p className="text-cosmic-light text-sm">Years Experience</p>
              </div>
              <div>
                <p className="text-cosmic-purple text-2xl font-bold">20+</p>
                <p className="text-cosmic-light text-sm">Projects</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
