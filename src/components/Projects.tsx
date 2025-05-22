import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Project {
  id: number;
  name: string;
  description: string;
  tags: { name: string; color: string }[];
  image: string;
  source_code_link: string;
  demo_link: string;
}

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Replace with your actual GitHub username
        const username = "yourusername";
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch GitHub repositories");
        }
        
        const repos = await response.json();
        
        // Transform the data into our project format
        const transformedProjects = repos.map((repo: any, index: number) => ({
          id: index + 1,
          name: repo.name,
          description: repo.description || "No description available",
          tags: [
            {
              name: repo.language || "N/A",
              color: getLanguageColor(repo.language),
            },
            {
              name: `Stars: ${repo.stargazers_count}`,
              color: "text-yellow-300",
            },
            {
              name: `Forks: ${repo.forks_count}`,
              color: "text-blue-300",
            },
          ],
          image: `https://opengraph.githubassets.com/1/${username}/${repo.name}`,
          source_code_link: repo.html_url,
          demo_link: repo.homepage || repo.html_url,
        }));
        
        setProjects(transformedProjects);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching GitHub projects:", error);
        setError("Failed to load projects. Please try again later.");
        setLoading(false);
        
        // Fallback to sample projects if GitHub API fails
        setProjects(sampleProjects);
      }
    };
    
    fetchProjects();
    
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

  // Helper function to get color based on programming language
  const getLanguageColor = (language: string | null) => {
    const colors: Record<string, string> = {
      JavaScript: "text-yellow-300",
      TypeScript: "text-blue-400",
      Python: "text-green-300",
      Java: "text-red-400",
      HTML: "text-orange-400",
      CSS: "text-blue-300",
      Ruby: "text-red-500",
    };
    
    return colors[language || ""] || "text-gray-300";
  };

  // Sample projects as fallback
  const sampleProjects = [
    {
      id: 1,
      name: "E-Commerce Platform",
      description: "A modern e-commerce solution with React, Node.js, and MongoDB featuring user authentication, product catalog, and secure checkout.",
      tags: [
        { name: "React", color: "text-blue-300" },
        { name: "Node.js", color: "text-green-300" },
        { name: "MongoDB", color: "text-green-400" },
      ],
      image: "https://via.placeholder.com/500x300?text=E-Commerce+Project",
      source_code_link: "https://github.com/yourusername/ecommerce-project",
      demo_link: "https://github.com/yourusername/ecommerce-project",
    },
    {
      id: 2,
      name: "Task Management App",
      description: "A productivity app for managing tasks with drag-and-drop functionality, user collaboration, and real-time updates.",
      tags: [
        { name: "React", color: "text-blue-300" },
        { name: "Firebase", color: "text-yellow-300" },
        { name: "Tailwind CSS", color: "text-blue-400" },
      ],
      image: "https://via.placeholder.com/500x300?text=Task+Manager",
      source_code_link: "https://github.com/yourusername/task-manager",
      demo_link: "https://github.com/yourusername/task-manager",
    },
    {
      id: 3,
      name: "Weather Dashboard",
      description: "An interactive weather dashboard that provides current conditions, forecasts, and historical data for locations worldwide.",
      tags: [
        { name: "JavaScript", color: "text-yellow-300" },
        { name: "WeatherAPI", color: "text-blue-300" },
        { name: "CSS", color: "text-blue-400" },
      ],
      image: "https://via.placeholder.com/500x300?text=Weather+Dashboard",
      source_code_link: "https://github.com/yourusername/weather-app",
      demo_link: "https://github.com/yourusername/weather-app",
    },
  ];

  return (
    <section ref={sectionRef} id="projects" className="section-fade py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-16">
        <h2 className="cosmic-heading mb-2">My Projects</h2>
        <p className="cosmic-text mb-10">
          Check out some of my recent work from GitHub repositories.
          These projects showcase my skills and expertise with various technologies.
        </p>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-cosmic-purple border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="cosmic-card text-center py-10">
            <p className="text-white">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="cosmic-card group"
              >
                <div className="relative w-full h-[180px] overflow-hidden rounded-2xl mb-5">
                  <img 
                    src={project.image} 
                    alt={project.name} 
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 flex justify-end p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2">
                      <a 
                        href={project.source_code_link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label="View source code"
                        className="cosmic-btn group w-10 h-10 rounded-full flex items-center justify-center p-0"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      <a 
                        href={project.demo_link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label="View live demo"
                        className="cosmic-btn group w-10 h-10 rounded-full flex items-center justify-center p-0"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-white text-xl font-bold mb-2 group-hover:text-cosmic-purple transition-colors">{project.name}</h3>
                
                <p className="cosmic-text mb-5 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className={`text-sm font-medium px-2.5 py-0.5 rounded-full bg-cosmic-blue/50 ${tag.color}`}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
                
                <a 
                  href={project.source_code_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-cosmic-purple hover:text-cosmic-neon transition-colors"
                >
                  View Project
                  <ArrowRight className="ml-1 w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex justify-center mt-12">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
            <Button className="cosmic-btn group">
              <Github className="w-5 h-5 mr-2" />
              View More Projects
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
