import React, { useEffect, useRef, useState } from 'react';
import aboutData from '../data/about.json';

// Terminal progress bar component
const ProgressBar = ({ label, pct, delay = 0 }) => {
  const [current, setCurrent] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrent((prev) => {
          if (prev >= pct) {
            clearInterval(interval);
            return pct;
          }
          return prev + 1;
        });
      }, 30);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [started, pct, delay]);

  useEffect(() => {
    setStarted(true);
  }, []);

  const filled = Math.round((current / 100) * 24);
  const bar = '█'.repeat(filled) + '░'.repeat(24 - filled);

  return (
    <div className="font-space text-[10px] md:text-xs space-y-1">
      <div className="flex justify-between text-brand-gray/70">
        <span className="tracking-wide text-brand-light/90">&gt; {label}</span>
        <span className="text-brand-teal font-medium">{current}%</span>
      </div>
      <div className="text-brand-teal/70 tracking-[0.05em] overflow-hidden whitespace-nowrap font-mono">
        [{bar}]
      </div>
    </div>
  );
};

const Pwd = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('status');
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
      id="pwd"
      ref={sectionRef}
      className={`px-6 py-24 md:px-16 md:py-32 max-w-[1200px] mx-auto transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-4">
        <div>
          <p className="font-space text-brand-teal text-xs tracking-[0.25em] uppercase mb-3">
            Present Working Directory
          </p>
          <h3 className="font-bebas text-4xl md:text-6xl tracking-wide">
            SYSTEM & <span className="text-brand-teal">OS STATUS</span>
          </h3>
        </div>
        <div className="font-space text-xs text-brand-gray/60 tracking-wider">
          <span className="text-brand-teal">$</span> pwd &nbsp;→&nbsp;{' '}
          <span className="text-brand-light">/home/aravind/workspace</span>
        </div>
      </div>

      {/* Main Terminal Window */}
      <div className="border border-white/10 rounded-xl bg-[#0d0d0d]/90 backdrop-blur-xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#141414]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]/80 hover:opacity-100 transition-opacity"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]/80 hover:opacity-100 transition-opacity"></div>
            <div className="w-3 h-3 rounded-full bg-[#28c941]/80 hover:opacity-100 transition-opacity"></div>
            <span className="ml-3 font-space text-[11px] text-brand-gray/60 tracking-widest hidden sm:inline">
              aravind@archlinux: ~ (zsh)
            </span>
          </div>

          {/* Terminal Tabs */}
          <div className="flex items-center gap-1 font-space text-[10px] tracking-wider">
            <button
              onClick={() => setActiveTab('status')}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'status'
                  ? 'bg-white/10 text-brand-teal font-medium'
                  : 'text-brand-gray/50 hover:text-white'
              }`}
            >
              status.sh
            </button>
            <button
              onClick={() => setActiveTab('sysinfo')}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'sysinfo'
                  ? 'bg-white/10 text-brand-teal font-medium'
                  : 'text-brand-gray/50 hover:text-white'
              }`}
            >
              sysinfo
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-6 md:p-8 space-y-6 font-space text-xs">
          {activeTab === 'status' ? (
            <>
              {/* Command 1: whoami */}
              <div className="space-y-1.5">
                <p className="text-brand-gray/60 flex items-center gap-2">
                  <span className="text-brand-teal">$</span> whoami --details
                </p>
                <div className="pl-4 text-brand-light/90 space-y-0.5">
                  <p className="font-medium text-white">{aboutData.currentWork.title}</p>
                  <p className="text-brand-gray/70">
                    {aboutData.currentWork.org} &nbsp;·&nbsp; {aboutData.currentWork.year}
                  </p>
                </div>
              </div>

              <div className="h-[1px] bg-white/5 my-4"></div>

              {/* Command 2: focus */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-brand-gray/60 flex items-center gap-2">
                    <span className="text-brand-teal">$</span> focus --list --progress
                  </p>
                  <span className="font-space text-[10px] text-brand-teal/80 tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-ping"></span>
                    ACTIVE
                  </span>
                </div>

                <div className="space-y-4 pl-0 md:pl-2">
                  {isVisible &&
                    aboutData.currentWork.focus.map((item, i) => (
                      <ProgressBar
                        key={item.label}
                        label={item.label}
                        pct={item.pct}
                        delay={i * 300}
                      />
                    ))}
                </div>
              </div>
            </>
          ) : (
            /* Tab 2: Neofetch / Sysinfo */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-brand-gray/80">
              <div className="space-y-2 border-r border-white/5 pr-4">
                <p className="text-brand-teal font-bold tracking-widest text-sm">
                  ARAVIND TANNERI @ NIT-ANDHRA
                </p>
                <p className="text-brand-gray/40">-------------------------</p>
                <p>
                  <span className="text-brand-teal font-medium">OS:</span> Arch Linux x86_64
                </p>
                <p>
                  <span className="text-brand-teal font-medium">Host:</span> NIT Andhra Pradesh (CSE'29)
                </p>
                <p>
                  <span className="text-brand-teal font-medium">Kernel:</span> 8.4.4-zen 8(DSA & Web)
                </p>
                <p>
                  <span className="text-brand-teal font-medium">Uptime:</span> 2nd Year B.Tech
                </p>
                <p>
                  <span className="text-brand-teal font-medium">Shell:</span> zsh 5.9
                </p>
              </div>

              <div className="space-y-2">
                <p>
                  <span className="text-brand-teal font-medium">Editor:</span> VS Code
                </p>
                <p>
                  <span className="text-brand-teal font-medium">Languages:</span> C++, Python, JS, TS
                </p>
                <p>
                  <span className="text-brand-teal font-medium">Focus:</span> Competitive Programming & Fullstack
                </p>
                <p>
                  <span className="text-brand-teal font-medium">Terminal:</span> Alacritty / Ghostty
                </p>
                <div className="pt-2 flex gap-1.5">
                  <span className="w-4 h-3 bg-red-500 rounded-sm"></span>
                  <span className="w-4 h-3 bg-yellow-500 rounded-sm"></span>
                  <span className="w-4 h-3 bg-green-500 rounded-sm"></span>
                  <span className="w-4 h-3 bg-teal-500 rounded-sm"></span>
                  <span className="w-4 h-3 bg-blue-500 rounded-sm"></span>
                  <span className="w-4 h-3 bg-purple-500 rounded-sm"></span>
                </div>
              </div>
            </div>
          )}

          {/* Command Prompt Line */}
          <div className="pt-3 flex items-center gap-2 text-brand-gray/40 text-[11px] border-t border-white/5">
            <span className="text-brand-teal">$</span>
            <span className="text-brand-light/70 font-mono">pwd</span>
            <span className="animate-pulse text-brand-teal font-bold">█</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pwd;
