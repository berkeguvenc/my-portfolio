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
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center px-6 py-2 bg-gray-900/90 backdrop-blur-md rounded-full shadow-lg"
    >
      <nav className="flex items-center gap-6">
        <button onClick={() => scrollTo('work')} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Work</button>
        <button onClick={() => scrollTo('builds')} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Builds</button>
        <button onClick={() => scrollTo('skills')} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Skills</button>
        <button onClick={() => scrollTo('about')} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">About</button>
      </nav>
    </motion.header>
  );
}
