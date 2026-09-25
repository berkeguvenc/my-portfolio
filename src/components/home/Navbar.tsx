'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Navbar({ resumeUrl }: { resumeUrl?: string }) {
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
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900/50"
    >
      <div className="flex items-center gap-6">
        <button onClick={() => scrollTo('top')} className="text-sm font-semibold tracking-wide text-zinc-100 hover:text-white transition-colors">
          BERKE G.
        </button>
        <nav className="hidden md:flex items-center gap-4">
          <button onClick={() => scrollTo('work')} className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors">Work</button>
          <button onClick={() => scrollTo('builds')} className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors">Builds</button>
          <button onClick={() => scrollTo('skills')} className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors">Skills</button>
          <button onClick={() => scrollTo('experience')} className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors">Experience</button>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        {resumeUrl && (
          <Link 
            href={resumeUrl} 
            target="_blank"
            className="text-sm font-medium px-4 py-2 rounded-full border border-zinc-800 text-zinc-300 hover:bg-zinc-900 transition-all hover:text-zinc-100"
          >
            Resume
          </Link>
        )}
        <button onClick={() => scrollTo('contact')} className="text-sm font-medium px-4 py-2 rounded-full bg-zinc-100 text-zinc-950 hover:bg-white transition-all">
          Contact
        </button>
      </div>
    </motion.header>
  );
}
