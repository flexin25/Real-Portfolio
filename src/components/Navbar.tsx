
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

const navLinks = [
  { title: "About", id: "#about" },
  { title: "Projects", id: "#projects" },
  { title: "Contact", id: "#contact" },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/yourusername", ariaLabel: "GitHub Profile" },
  { icon: Linkedin, href: "https://linkedin.com/in/yourusername", ariaLabel: "LinkedIn Profile" },
  { icon: Mail, href: "mailto:your.email@example.com", ariaLabel: "Email Contact" },
];

const Navbar = () => {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [targetSection, setTargetSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Update active link based on scroll position
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight && sectionId) {
          const correspondingLink = navLinks.find(link => link.id === `#${sectionId}`);
          if (correspondingLink && active !== correspondingLink.title) {
            setActive(correspondingLink.title);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [active]);

  const handleNavLinkClick = (title: string, id: string) => {
    setActive(title);
    setToggle(false);
    setTargetSection(id);
  };

  return (
    <>
      <PageTransition targetId={targetSection} />
      
      <nav
        className={`w-full flex items-center py-5 fixed top-0 z-20 transition-all duration-300 ${
          scrolled ? "glass-nav" : "bg-transparent"
        }`}
      >
        <div className='w-full flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <a
            href='/'
            className='flex items-center gap-2'
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <p className='text-white text-[18px] font-bold cursor-pointer flex group'>
              <span className='text-cosmic-purple cosmic-glow transition-all duration-300 group-hover:text-cosmic-neon'>{'<'}</span>
              <span className="relative overflow-hidden">
                <span className="inline-block transition-transform duration-300 group-hover:translate-y-[-100%]">Portfolio</span>
                <span className="absolute top-0 left-0 translate-y-[100%] transition-transform duration-300 group-hover:translate-y-0 text-cosmic-neon">Portfolio</span>
              </span>
              <span className='text-cosmic-purple cosmic-glow transition-all duration-300 group-hover:text-cosmic-neon'>{' />'}</span>
            </p>
          </a>

          <div className='hidden sm:flex items-center gap-10'>
            <ul className='flex gap-10'>
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className="relative overflow-hidden"
                >
                  <a 
                    href={link.id}
                    className={`${
                      active === link.title ? "text-cosmic-purple" : "text-white"
                    } hover:text-cosmic-purple text-[18px] font-medium cursor-pointer transition-colors flex items-center`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavLinkClick(link.title, link.id);
                    }}
                  >
                    {link.title}
                    <span className={`block absolute bottom-0 left-0 w-full h-[2px] transition-transform duration-300 ${
                      active === link.title ? "bg-cosmic-purple scale-x-100" : "bg-cosmic-purple scale-x-0"
                    } origin-left hover:scale-x-100`}></span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  className="text-white hover:text-cosmic-purple transition-colors group"
                >
                  <social.icon size={20} className="transition-transform duration-300 group-hover:rotate-12" />
                </a>
              ))}
            </div>
          </div>

          <div className='sm:hidden flex items-center'>
            {toggle ? (
              <Button variant="ghost" size="icon" onClick={() => setToggle(!toggle)}>
                <X className="h-6 w-6 text-white" />
              </Button>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setToggle(!toggle)}>
                <Menu className="h-6 w-6 text-white" />
              </Button>
            )}

            <div
              className={`${
                !toggle ? "hidden" : "flex"
              } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl cosmic-blur`}
            >
              <ul className='flex flex-col justify-end items-start gap-4'>
                {navLinks.map((link) => (
                  <li
                    key={link.id}
                    className={`${
                      active === link.title ? "text-cosmic-purple" : "text-white"
                    } font-poppins font-medium cursor-pointer text-[16px]`}
                    onClick={() => handleNavLinkClick(link.title, link.id)}
                  >
                    <a href={link.id}>{link.title}</a>
                  </li>
                ))}
                <li className="flex gap-4 pt-2">
                  {socialLinks.map((social, index) => (
                    <a 
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.ariaLabel}
                      className="text-white hover:text-cosmic-purple transition-colors"
                    >
                      <social.icon size={18} />
                    </a>
                  ))}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

// Import component at the top level
import PageTransition from './PageTransition';

export default Navbar;
