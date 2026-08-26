import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'cd projects',   href: '#projects'   },
  { label: 'git log',       href: '#experience' },
  { label: 'whoami',        href: '#about'      },
  { label: 'pwd',           href: '#pwd'        },
  { label: 'touch contact', href: '#contact'    },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add bg when scrolled past hero
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on link click
  const handleLinkClick = () => setOpen(false);

  return (
    <>
      {/* Fixed top bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? 'bg-[#0a0a0a]/70 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_32px_rgba(0,0,0,0.5)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-6 md:px-16 py-5 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="text-xl md:text-2xl font-light tracking-widest font-space hover:opacity-70 transition-opacity text-white">
            src<span className="text-[#7a9c8b]">/</span>
          </a>

          {/* Desktop nav links — right side */}
          <div className="hidden md:flex items-center gap-8 font-space text-[11px] tracking-[0.2em] uppercase">
            {navLinks.map((link, i) => (
              <React.Fragment key={link.href}>
                <a
                  href={link.href}
                  onClick={handleLinkClick}
                  className="relative text-[#a3a3a3] hover:text-white transition-colors pb-1 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#7a9c8b] transition-all duration-300 group-hover:w-full"></span>
                </a>
                {i < navLinks.length - 1 && (
                  <span className="text-white/10">/</span>
                )}
              </React.Fragment>
            ))}

            {/* Hamburger — desktop (hidden, only mobile uses it) */}
            <button
              onClick={() => setOpen(o => !o)}
              aria-label="Toggle menu"
              className="ml-4 text-white hover:text-[#7a9c8b] transition-colors focus:outline-none"
            >
              {open ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>
          </div>

          {/* Mobile: hamburger only */}
          <button
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
            className="md:hidden text-white hover:text-[#7a9c8b] transition-colors focus:outline-none"
          >
            {open ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
          </button>
        </div>

        {/* Dropdown menu panel */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-[#0a0a0a]/70 backdrop-blur-xl border-t border-white/5 px-6 md:px-16 py-6 flex flex-col gap-5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="font-space text-sm tracking-[0.25em] uppercase text-[#a3a3a3] hover:text-white transition-colors hover:pl-2 duration-200 flex items-center group w-fit"
              >
                <span className="text-[#7a9c8b] mr-3">/</span>
                <span className="relative pb-0.5">
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#7a9c8b] transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
