'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('work');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['work', 'builds', 'skills', 'about'];
      let current = '';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            current = section;
          }
        }
      }
      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };
    
    // Initial check
    setTimeout(handleScroll, 100);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'work', label: 'Work' },
    { id: 'builds', label: 'Builds' },
    { id: 'skills', label: 'Skills' },
    { id: 'about', label: 'About' }
  ];

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed bottom-4 left-1/2 z-50 flex h-[48px] w-auto -translate-x-1/2 items-center rounded-[77px] bg-[rgba(38,41,46,0.85)] px-[4px] py-[4px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.3)] backdrop-blur-md md:top-4 md:bottom-auto md:h-[43px] md:px-[5px] md:py-[5px]"
    >
      {navItems.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="relative z-10 flex h-[40px] items-center justify-center rounded-[61px] px-4 text-center text-[13px] font-medium tracking-[-0.26px] transition-all duration-200 hover:bg-[rgba(255,255,255,0.05)] md:h-[33px] md:px-5 md:text-[14px] md:tracking-[-0.28px]"
            style={{ color: isActive ? '#111111' : '#ffffff' }}
          >
            {isActive && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 rounded-[31px] bg-white"
                initial={false}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 whitespace-nowrap">{item.label}</span>
          </button>
        );
      })}
    </motion.div>
  );
}
