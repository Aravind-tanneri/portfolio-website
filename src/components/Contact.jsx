import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
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

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className={`px-6 py-24 md:px-16 md:py-32 max-w-[1200px] mx-auto min-h-[70vh] flex flex-col justify-center transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'}`}
    >
      <div className="text-center space-y-8 max-w-3xl mx-auto">
        <p className="font-space text-brand-teal text-xs tracking-[0.2em] uppercase">What's Next?</p>
        <h3 className="font-bebas text-5xl md:text-7xl lg:text-[90px] leading-[0.9] tracking-wide">LET'S WORK <span className="text-brand-teal">TOGETHER</span></h3>
        <p className="text-brand-gray font-light text-sm md:text-base leading-relaxed">
          I'm currently looking for new opportunities. Whether you have a question, a project proposal, or just want to say hi, I'll try my best to get back to you!
        </p>
        
        <div className="pt-8 flex flex-col sm:flex-row justify-center items-center gap-6">
          <a href="mailto:tanneriaravind2007@gmail.com" className="group flex items-center gap-3 font-space text-sm tracking-widest px-8 py-4 bg-brand-teal text-[#0a0a0a] hover:bg-white transition-colors font-bold">
            SAY HELLO
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
      
        {/* Terminal-style Footer */}
      <div className="mt-12 md:mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-brand-gray text-[10px] font-space tracking-widest uppercase">
        <p>aravind@nit-ap:~$ exit 0</p>
        <p>uptime: ∞ · status: 200 OK</p>
      </div>
    </section>
  );
};

export default Contact;
