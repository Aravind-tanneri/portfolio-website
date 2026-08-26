import React, { useEffect, useRef, useState } from 'react';
import aboutData from '../data/about.json';
import profileImg from '../assets/profile.jpeg';

// Terminal progress bar component
const ProgressBar = ({ label, pct, delay = 0 }) => {
  const [current, setCurrent] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrent(prev => {
          if (prev >= pct) {
            clearInterval(interval);
            return pct;
          }
          return prev + 1;
        });
      }, 50);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [started, pct, delay]);

  // expose a way for parent to trigger start
  useEffect(() => {
    setStarted(true);
  }, []);

  const filled = Math.round((current / 100) * 24);
  const bar = '█'.repeat(filled) + '░'.repeat(24 - filled);

  return (
    <div className="font-space text-[10px] md:text-xs space-y-1">
      <div className="flex justify-between text-brand-gray/70">
        <span className="tracking-wide">&gt; {label}</span>
        <span className="text-brand-teal">{current}%</span>
      </div>
      <div className="text-brand-teal/60 tracking-[0.05em] overflow-hidden whitespace-nowrap">
        [{bar}]
      </div>
    </div>
  );
};

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
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
      id="about"
      ref={sectionRef}
      className={`px-6 py-24 md:px-16 md:py-32 max-w-[1200px] mx-auto transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'}`}
    >
      <h3 className="font-bebas text-4xl md:text-6xl tracking-wide mb-12 md:mb-16">
        {aboutData.heading.split(' ')[0]} <span className="text-brand-teal">{aboutData.heading.split(' ')[1]}</span>
      </h3>

      {/* Top: Profile image + bio */}
      <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start mb-20 md:mb-28">

        {/* Profile Image */}
        <div className="w-full md:w-2/5 flex-shrink-0">
          <div className="relative w-full aspect-[3/4] overflow-hidden rounded-sm border border-white/10 group">
            <img
              src={profileImg}
              alt="Aravind Tanneri"
              className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/70 via-transparent to-transparent"></div>
            {/* Teal tint on hover */}
            <div className="absolute inset-0 bg-brand-teal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            {/* Corner labels */}
            <div className="absolute top-4 left-4 font-space text-[9px] tracking-[0.2em] text-brand-gray/60 uppercase">Aravind Tanneri</div>
            <div className="absolute bottom-4 right-4 font-space text-[9px] tracking-[0.2em] text-brand-teal/60 uppercase">NIT ANDHRA CSE'29</div>
          </div>
        </div>

        {/* Bio + Skills */}
        <div className="w-full md:w-3/5 space-y-8 font-light text-brand-gray text-sm md:text-base leading-relaxed pt-2">
          {aboutData.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          {/* Skill Icons */}
          <div className="pt-6">
            <p className="font-space text-brand-teal text-[10px] tracking-[0.2em] mb-5 uppercase">Tech Stack</p>
            <div className="flex flex-wrap gap-3">
              {aboutData.skills.map((skill) => (
                <div
                  key={skill.name}
                  title={skill.name}
                  className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-brand-teal/10 hover:border-brand-teal/30 transition-all duration-200 cursor-default group/skill"
                >
                  <img src={skill.icon} alt={skill.name} className="w-5 h-5 opacity-70 group-hover/skill:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
