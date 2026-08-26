import React from 'react';
import Typewriter from 'typewriter-effect';
import { Code2, Mail } from 'lucide-react';
import { LeetCode, Codeforces, CodeChef } from './icons';
import heroData from '../data/hero.json';
import seashoreBg from '../assets/seashore-bg.png';

// Icon resolver — maps social IDs to rendered icons
const SocialIcon = ({ id, size = 18 }) => {
  switch (id) {
    case 'github':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
          <path d="M9 18c-4.51 2-5-2-7-2"/>
        </svg>
      );
    case 'linkedin':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect width="4" height="12" x="2" y="9"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      );
    case 'leetcode':   return <LeetCode size={size} />;
    case 'codeforces': return <Codeforces size={size} />;
    case 'codechef':   return <CodeChef size={size} />;
    case 'email':      return <Mail size={size} strokeWidth={1.5} />;
    default:           return <Code2 size={size} strokeWidth={1.5} />;
  }
};

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={seashoreBg}
          alt="Background"
          className="w-full h-full object-cover object-[70%_center] md:object-center opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/90 via-[#0a0a0a]/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 via-transparent to-transparent"></div>
      </div>

      {/* Content Wrapper */}
      <div className="relative z-10 w-full flex-grow flex flex-col justify-center gap-8 md:gap-12 px-6 pt-24 pb-12 md:px-16 max-w-[1800px] mx-auto">

        {/* Main Hero Content */}
        <main className="space-y-4 md:space-y-5 max-w-4xl animate-fade-in-up">
          <div>
            <p className="text-brand-gray font-space tracking-[0.2em] text-[11px] md:text-sm mb-3 md:mb-4 uppercase">
              Hey, I'm
            </p>
            <h1 className="font-bebas text-[70px] leading-[0.85] md:text-[100px] lg:text-[130px] md:leading-[0.85] tracking-wide">
              ARAVIND <span className="text-brand-teal">TANNERI</span>
            </h1>
            <div className="h-[1px] w-12 md:w-16 bg-brand-gray/40 mt-4 md:mt-6"></div>
          </div>

          {/* Terminal Styled Typewriter tagline */}
          <div className="pt-1 md:pt-2">
            <div className="inline-flex items-center gap-3 bg-[#0d0d0d]/85 border border-white/15 backdrop-blur-md rounded-lg px-4 py-3 md:px-6 md:py-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.5)] max-w-full">
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c941]/80"></span>
              </div>
              <div className="h-4 w-[1px] bg-white/10 mx-1 flex-shrink-0"></div>
              <div className="font-space text-sm md:text-lg lg:text-xl text-emerald-400 font-medium tracking-wide flex items-center min-h-[1.5em] overflow-x-auto">
                <Typewriter
                  options={{
                    strings: heroData.taglines,
                    autoStart: true,
                    loop: true,
                    delay: 45,
                    deleteSpeed: 25,
                    wrapperClassName: 'inline font-space font-medium text-emerald-400',
                    cursorClassName: 'text-brand-teal font-bold animate-pulse ml-0.5',
                  }}
                />
              </div>
            </div>
          </div>

          <div className="pt-2 md:pt-3 font-space space-y-2">
            <p className="tracking-[0.2em] text-[11px] md:text-sm uppercase text-brand-light/90">
              CSE @ NIT ANDHRA PRADESH
            </p>
            <div className="tracking-[0.15em] text-[10px] md:text-xs uppercase text-brand-teal h-4">
              <Typewriter
                options={{
                  strings: heroData.roles,
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  deleteSpeed: 30,
                }}
              />
            </div>
          </div>
        </main>

        {/* Bottom Socials */}
        <footer className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-20">
          <div className="flex flex-col gap-4">
            {/* Social Icons — driven from hero.json */}
            <div className="flex flex-wrap items-center gap-6">
              {heroData.socials.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  title={social.title}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-gray hover:text-brand-teal transition-all hover:scale-110"
                >
                  <SocialIcon id={social.id} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="hidden md:flex absolute right-0 bottom-4 flex-col items-center gap-6 animate-bounce">
            <span className="font-space text-[10px] tracking-[0.4em] text-brand-gray [writing-mode:vertical-lr] rotate-180">
              SCROLL
            </span>
            <div className="w-[1px] h-20 bg-brand-gray/20 relative">
              <div className="absolute bottom-0 w-[5px] h-[5px] rounded-full bg-brand-light -left-[2px]"></div>
            </div>
          </div>

        </footer>
      </div>
    </section>
  );
};

export default Hero;
