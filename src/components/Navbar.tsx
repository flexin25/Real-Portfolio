
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavLinkClick = (title: string) => {
    setActive(title);
    setToggle(false);
  };

  return (
    <nav
      className={`w-full flex items-center py-5 fixed top-0 z-20 transition-all duration-300 ${
        scrolled ? "glass-nav" : "bg-transparent"
      }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <a
          href='/'
          className='flex items-center gap-2'
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <p className='text-white text-[18px] font-bold cursor-pointer flex'>
            <span className='text-cosmic-purple cosmic-glow'>{'<'}</span>
            Portfolio
            <span className='text-cosmic-purple cosmic-glow'>{' />'}</span>
          </p>
        </a>

        <div className='hidden sm:flex items-center gap-10'>
          <ul className='flex gap-10'>
            {navLinks.map((link) => (
              <li
                key={link.id}
                className={`${
                  active === link.title ? "text-cosmic-purple" : "text-white"
                } hover:text-cosmic-purple text-[18px] font-medium cursor-pointer transition-colors`}
                onClick={() => handleNavLinkClick(link.title)}
              >
                <a href={link.id}>{link.title}</a>
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
                className="text-white hover:text-cosmic-purple transition-colors"
              >
                <social.icon size={20} />
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
                  onClick={() => handleNavLinkClick(link.title)}
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
  );
};

export default Navbar;
