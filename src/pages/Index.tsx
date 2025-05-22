
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import BackgroundEffects from "@/components/BackgroundEffects";
import { animateOnScroll } from "@/helpers/animateOnScroll";

const Index = () => {
  useEffect(() => {
    // Set up smooth scrolling behavior
    document.documentElement.style.scrollBehavior = "smooth";
    
    // Animate elements on scroll
    const cleanup = animateOnScroll();
    
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
      cleanup();
    };
  }, []);

  return (
    <div className="relative bg-cosmic-dark text-white overflow-x-hidden">
      <CustomCursor />
      <BackgroundEffects />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
