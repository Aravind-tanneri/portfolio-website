import React, { useEffect, useRef, useState } from 'react';
import experiences from '../data/experiences.json';

// Map type → accent color & label
const typeConfig = {
  education:   { color: 'text-brand-teal',   border: 'border-brand-teal',   bg: 'bg-brand-teal/10',   dot: 'bg-brand-teal',   label: 'EDU'         },
  project:     { color: 'text-[#8b9cf5]',    border: 'border-[#8b9cf5]',    bg: 'bg-[#8b9cf5]/10',    dot: 'bg-[#8b9cf5]',    label: 'PROJECT'     },
  achievement: { color: 'text-[#f5c87a]',    border: 'border-[#f5c87a]',    bg: 'bg-[#f5c87a]/10',    dot: 'bg-[#f5c87a]',    label: 'ACHIEVEMENT' },
  work:        { color: 'text-[#f58b8b]',    border: 'border-[#f58b8b]',    bg: 'bg-[#f58b8b]/10',    dot: 'bg-[#f58b8b]',    label: 'WORK'        },
  learning:     { color: 'text-[#f59f9f]',    border: 'border-[#f59f9f]',    bg: 'bg-[#f59f9f]/10',    dot: 'bg-[#f59f9f]',    label: 'LEARNING'     },
};

const Card = ({ item, cfg, align }) => (
  <div className={`space-y-2 ${align === 'right' ? 'text-left' : 'text-right'}`}>
    <p className={`font-space text-[9px] tracking-[0.2em] uppercase ${cfg.color}`}>{item.period}</p>
    <h4 className="font-bebas text-2xl md:text-3xl tracking-wide text-white">{item.title}</h4>
    <p className="font-space text-[10px] text-brand-gray/70 tracking-wide">{item.org} · {item.location}</p>
    <p className="text-brand-gray text-xs leading-relaxed font-light">{item.description}</p>
    <div className={`flex flex-wrap gap-2 pt-1 ${align === 'right' ? 'justify-start' : 'justify-end'}`}>
      {item.tags.map(tag => (
        <span key={tag} className={`font-space text-[8px] tracking-widest px-2 py-0.5 border rounded-full ${cfg.border} ${cfg.color}`}>{tag}</span>
      ))}
    </div>
  </div>
);

const TimelineItem = ({ item, index, isVisible }) => {
  const cfg = typeConfig[item.type] || typeConfig.project;
  const isLeft = index % 2 === 0; // even = card on left, odd = card on right

  return (
    <div
      className={`relative transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >

      {/* ── Desktop: two-column alternating with perfectly centered dot ── */}
      <div className="hidden md:flex relative items-center w-full min-h-[110px]">
        {/* Left column */}
        <div className="w-1/2 pr-12">
          {isLeft && <Card item={item} cfg={cfg} align="left" />}
        </div>

        {/* Centre dot + badge (exact 50% coordinate) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
          <div className={`w-4 h-4 rounded-full border-2 ${cfg.border} ${cfg.bg} flex items-center justify-center bg-[#0a0a0a]`}>
            <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`}></div>
          </div>
          <div className={`mt-2 font-space text-[7px] tracking-[0.15em] px-2 py-0.5 border rounded-full ${cfg.border} ${cfg.color} ${cfg.bg} whitespace-nowrap bg-[#0a0a0a]`}>
            {cfg.label}
          </div>
        </div>

        {/* Right column */}
        <div className="w-1/2 pl-12">
          {!isLeft && <Card item={item} cfg={cfg} align="right" />}
        </div>
      </div>

      {/* ── Mobile: vertical left-border card ── */}
      <div className="md:hidden flex gap-4 items-start">
        <div className="flex flex-col items-center flex-shrink-0 mt-1">
          <div className={`w-3 h-3 rounded-full border-2 ${cfg.border} ${cfg.bg} flex items-center justify-center`}>
            <div className={`w-1 h-1 rounded-full ${cfg.dot}`}></div>
          </div>
          <div className={`w-[1px] flex-1 mt-2 ${cfg.bg}`} style={{ minHeight: '100%', background: 'rgba(255,255,255,0.06)' }}></div>
        </div>
        <div className={`flex-1 space-y-2 pb-2 border-l ${cfg.border} pl-4`}>
          <p className={`font-space text-[9px] tracking-[0.2em] uppercase ${cfg.color}`}>{item.period}</p>
          <h4 className="font-bebas text-xl tracking-wide text-white">{item.title}</h4>
          <p className="font-space text-[10px] text-brand-gray/70">{item.org} · {item.location}</p>
          <p className="text-brand-gray text-xs leading-relaxed font-light">{item.description}</p>
          <div className="flex flex-wrap gap-2 pt-1">
            {item.tags.map(tag => (
              <span key={tag} className={`font-space text-[8px] tracking-widest px-2 py-0.5 border rounded-full ${cfg.border} ${cfg.color}`}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};


const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className={`px-6 py-24 md:px-16 md:py-32 max-w-[1200px] mx-auto transition-all duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <h3 className="font-bebas text-4xl md:text-6xl tracking-wide mb-16 md:mb-24">
        GIT <span className="text-brand-teal">LOG</span>
      </h3>

      {/* Timeline wrapper */}
      <div className="relative">
        {/* Vertical centre line — desktop only */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>

        <div className="flex flex-col gap-12 md:gap-16">
          {experiences.map((item, i) => (
            <TimelineItem key={item.id} item={item} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
