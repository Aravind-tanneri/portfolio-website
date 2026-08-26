import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Experience from './components/Experience';
import About from './components/About';
import Pwd from './components/Pwd';
import Contact from './components/Contact';

const App = () => {
  return (
    <div className="relative w-full min-h-screen bg-[#0a0a0a] text-white font-inter selection:bg-brand-teal/30">
      <Navbar />
      <Hero />
      <Projects />
      <Experience />
      <About />
      <Pwd />
      <Contact />
    </div>
  );
};

export default App;
