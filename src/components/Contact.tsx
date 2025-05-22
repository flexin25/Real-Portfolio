
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  
  const [loading, setLoading] = useState(false);
  
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate sending an email
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Success",
        description: "Your message has been sent. I'll get back to you soon!",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    }, 2000);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: "Email",
      content: "your.email@example.com",
      href: "mailto:your.email@example.com",
    },
    {
      icon: <Phone className="w-6 h-6 text-primary" />,
      title: "Phone",
      content: "+1 (123) 456-7890",
      href: "tel:+11234567890",
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      title: "Location",
      content: "San Francisco, CA",
      href: "https://maps.google.com/?q=San+Francisco,+CA",
    },
  ];

  return (
    <section ref={sectionRef} id="contact" className="section-fade py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-16">
        <h2 className="cosmic-heading mb-2">Get In Touch</h2>
        <p className="cosmic-text mb-10">
          Have a project in mind or want to collaborate? Feel free to reach out!
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3 cosmic-card">
            <h3 className="text-2xl font-bold text-white mb-6">Send Me a Message</h3>
            
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-muted-foreground">Your Name</label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="What's your name?"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-secondary/40 border-primary/30 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-muted-foreground">Your Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="What's your email address?"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-secondary/40 border-primary/30 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-2 text-muted-foreground">Your Message</label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="What would you like to discuss?"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-secondary/40 border-primary/30 text-white resize-none"
                  />
                </div>
                <div>
                  <Button type="submit" className="cosmic-btn w-full" disabled={loading}>
                    {loading ? (
                      <span className="flex items-center">
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.href}
                target={info.title !== "Phone" ? "_blank" : undefined}
                rel={info.title !== "Phone" ? "noopener noreferrer" : undefined}
                className="cosmic-card flex items-start space-x-4 hover:bg-secondary/50 transition-colors"
              >
                <div className="bg-secondary/60 p-3 rounded-full">{info.icon}</div>
                <div>
                  <h3 className="text-lg font-medium text-white">{info.title}</h3>
                  <p className="text-muted-foreground">{info.content}</p>
                </div>
              </a>
            ))}
            
            <div className="cosmic-card">
              <h3 className="text-xl font-bold text-white mb-4">Connect With Me</h3>
              <p className="text-muted-foreground mb-4">
                Follow me on social media to stay updated with my latest projects and tech insights.
              </p>
              <div className="flex space-x-4">
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="cosmic-btn w-10 h-10 p-0 flex items-center justify-center rounded-full">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="cosmic-btn w-10 h-10 p-0 flex items-center justify-center rounded-full">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="mailto:your.email@example.com" className="cosmic-btn w-10 h-10 p-0 flex items-center justify-center rounded-full">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
