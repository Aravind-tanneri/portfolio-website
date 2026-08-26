import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github } from './icons';
import projectsData from '../data/projects.json';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
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
      id="projects" 
      ref={sectionRef}
      className={`px-6 py-24 md:px-16 md:py-32 max-w-[1200px] mx-auto min-h-screen transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'}`}
    >
      <h3 className="font-bebas text-4xl md:text-6xl tracking-wide mb-12">CD <span className="text-brand-teal">PROJECTS</span></h3>
      
      <div className="space-y-24">
        {projectsData.map((project) => (
          <div key={project.id} className="flex flex-col md:flex-row gap-8 md:gap-12 items-start group">
            <div className="w-full md:w-1/2 aspect-video bg-[#111] rounded-lg border border-white/10 flex items-center justify-center text-brand-gray/30 overflow-hidden relative">
              <span className="font-space text-sm tracking-widest z-10"><img src={project.image} alt={project.imageAlt} className="w-full h-full object-cover"></img></span>
              <div className="absolute inset-0 bg-brand-teal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="w-full md:w-1/2 space-y-6 pt-2">
              <div className="space-y-2">
                <p className="font-space text-brand-teal text-xs tracking-[0.2em]">{project.number} / {project.category}</p>
                <h4 className="font-bebas text-3xl md:text-5xl group-hover:text-brand-teal transition-colors duration-300">{project.title}</h4>
              </div>
              <p className="text-brand-gray leading-relaxed font-light text-sm md:text-base">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-3 font-space text-xs text-brand-light">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 border border-white/10 rounded-full">{tag}</span>
                ))}
              </div>

              <div className="flex items-center gap-4 pt-2 font-space text-xs">
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-teal/10 text-brand-teal border border-brand-teal/30 hover:bg-brand-teal hover:text-black font-medium transition-all duration-300"
                  >
                    <ExternalLink size={15} />
                    <span>Live Demo</span>
                  </a>
                )}
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-brand-light border border-white/10 hover:border-white/30 hover:text-white transition-all duration-300"
                  >
                    <Github size={15} />
                    <span>Source Code</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
