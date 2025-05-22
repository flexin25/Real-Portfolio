
import { ChevronRight, Github, Heart, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = [
    { title: "Home", href: "#" },
    { title: "About", href: "#about" },
    { title: "Projects", href: "#projects" },
    { title: "Contact", href: "#contact" },
  ];

  return (
    <footer className="relative pt-32 pb-10 overflow-hidden">
      {/* Star particles for footer */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 50 }).map((_, index) => (
          <div
            key={index}
            className="absolute bg-white w-[1px] h-[1px] rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random(),
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-16 relative z-10">
        {/* Wave separator */}
        <div className="absolute top-0 left-0 w-full h-20 overflow-hidden">
          <svg
            className="absolute bottom-0 left-0 w-full h-full text-cosmic-purple opacity-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="currentColor"
              d="M0,64L60,96C120,128,240,192,360,192C480,192,600,128,720,117.3C840,107,960,149,1080,154.7C1200,160,1320,128,1380,112L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            />
          </svg>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Column 1 */}
          <div>
            <a
              href="/"
              className="flex items-center gap-2 mb-6"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <p className="text-white text-2xl font-bold cursor-pointer flex">
                <span className="text-cosmic-purple cosmic-glow">{"<"}</span>
                Portfolio
                <span className="text-cosmic-purple cosmic-glow">{" />"}</span>
              </p>
            </a>
            <p className="text-cosmic-light mb-6">
              Creating innovative web solutions with a focus on performance, aesthetics, and user experience.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-10 h-10 rounded-full bg-cosmic-blue/40 flex items-center justify-center border border-cosmic-purple/20 hover:bg-cosmic-blue/80 transition-all duration-300"
              >
                <Github className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-10 h-10 rounded-full bg-cosmic-blue/40 flex items-center justify-center border border-cosmic-purple/20 hover:bg-cosmic-blue/80 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a
                href="mailto:your.email@example.com"
                aria-label="Email Contact"
                className="w-10 h-10 rounded-full bg-cosmic-blue/40 flex items-center justify-center border border-cosmic-purple/20 hover:bg-cosmic-blue/80 transition-all duration-300"
              >
                <Mail className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="flex items-center text-cosmic-light hover:text-cosmic-purple transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 text-cosmic-purple" />
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <span className="flex items-center text-cosmic-light">
                  <ChevronRight className="w-4 h-4 mr-2 text-cosmic-purple" />
                  Web Development
                </span>
              </li>
              <li>
                <span className="flex items-center text-cosmic-light">
                  <ChevronRight className="w-4 h-4 mr-2 text-cosmic-purple" />
                  UI/UX Design
                </span>
              </li>
              <li>
                <span className="flex items-center text-cosmic-light">
                  <ChevronRight className="w-4 h-4 mr-2 text-cosmic-purple" />
                  Mobile App Development
                </span>
              </li>
              <li>
                <span className="flex items-center text-cosmic-light">
                  <ChevronRight className="w-4 h-4 mr-2 text-cosmic-purple" />
                  Technical Consultation
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li>
                <p className="text-cosmic-light">
                  <Mail className="w-4 h-4 mr-2 inline-block text-cosmic-purple" />
                  your.email@example.com
                </p>
              </li>
              <li>
                <p className="text-cosmic-light">
                  <Phone className="w-4 h-4 mr-2 inline-block text-cosmic-purple" />
                  +1 (123) 456-7890
                </p>
              </li>
              <li>
                <p className="text-cosmic-light">
                  <MapPin className="w-4 h-4 mr-2 inline-block text-cosmic-purple" />
                  San Francisco, CA
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="pt-8 border-t border-cosmic-purple/20 text-center">
          <p className="text-cosmic-light">
            © {currentYear} Your Name. All rights reserved.
          </p>
          <p className="flex items-center justify-center mt-2 text-cosmic-light text-sm">
            Made with 
            <Heart className="w-4 h-4 mx-1 text-cosmic-purple animate-pulse" /> 
            and React
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { Phone, MapPin } from 'lucide-react';
