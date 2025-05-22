
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import StarBackground from './StarBackground';

const Hero = () => {
  const [text, setText] = useState('');
  const [fullText] = useState('I forge mystical digital experiences.');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      setTimeout(() => {
        setText(text + fullText[index]);
        setIndex(index + 1);
      }, 70); // Slower typing for dramatic effect
    }
  }, [index, text, fullText]);

  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden">
      <StarBackground />
      
      <div className="absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-col items-start gap-5 px-6 sm:px-16">
        <div>
          <h1 className="cosmic-heading tracking-wider">
            Greetings, I am <span className="text-primary cosmic-glow">Your Name</span>
          </h1>
          
          <div className="h-8 sm:h-12 overflow-hidden">
            <p className="cosmic-subheading mt-2">{text}<span className="animate-pulse">|</span></p>
          </div>
        </div>

        <p className="cosmic-text max-w-3xl mt-4">
          Digital architect dwelling in the shadows of code and design.
          I specialize in crafting otherworldly experiences with modern technologies
          that bridge realms between imagination and reality.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <a href="#projects">
            <Button className="cosmic-btn portal-effect">
              View My Creations
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </a>
          <a href="#contact">
            <Button variant="outline" className="bg-transparent border border-primary text-primary hover:bg-primary/10 py-3 px-8 rounded-xl">
              Summon Me
            </Button>
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 w-full flex justify-center items-center">
        <a href="#about" aria-label="Scroll to About section" className="w-9 h-14 rounded-3xl border-2 border-cosmic-light flex justify-center items-start p-2">
          <div className="w-2 h-2 rounded-full bg-cosmic-light animate-bounce hover:bg-primary transition-colors" />
        </a>
      </div>

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center">
        <div className="w-full h-[300px] bg-gradient-to-t from-background to-transparent absolute bottom-0" />
      </div>
    </section>
  );
};

export default Hero;
