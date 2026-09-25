'use client';

import { motion } from 'framer-motion';

export default function Navbar() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center px-6 py-3 bg-white/80 backdrop-blur-md border border-black/5 rounded-full shadow-[0_4px_30px_rgba(0,0,0,0.05)]"
    >
      <nav className="flex items-center gap-6">
        <button onClick={() => scrollTo('work')} className="text-[15px] font-medium text-black/60 hover:text-black transition-colors">Work</button>
        <button onClick={() => scrollTo('builds')} className="text-[15px] font-medium text-black/60 hover:text-black transition-colors">Builds</button>
        <button onClick={() => scrollTo('skills')} className="text-[15px] font-medium text-black/60 hover:text-black transition-colors">Skills</button>
        <button onClick={() => scrollTo('about')} className="text-[15px] font-medium text-black/60 hover:text-black transition-colors">About</button>
      </nav>
    </motion.header>
  );
}
