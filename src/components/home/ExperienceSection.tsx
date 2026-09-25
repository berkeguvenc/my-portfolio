'use client';

import { motion } from 'framer-motion';
import { ExperienceItem } from '@/types/portfolio';
import { ExternalLink } from 'lucide-react';

export default function ExperienceSection({ experiences }: { experiences: ExperienceItem[] }) {
  const sortedExperiences = [...experiences].sort((a, b) => a.order - b.order);

  return (
    <section id="experience" className="py-20 border-t border-zinc-900/50">
      <div className="mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-100 mb-4">Experience</h2>
        <p className="text-zinc-400 max-w-2xl">
          My professional journey.
        </p>
      </div>

      <div className="space-y-12">
        {sortedExperiences.map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 group"
          >
            <div className="md:w-48 text-sm font-medium text-zinc-500 mt-1">
              {exp.period}
            </div>
            
            <div className="flex-1 relative pb-12 md:pb-0">
              <div className="absolute left-[-24px] md:left-[-48px] top-2 bottom-[-48px] md:bottom-0 w-px bg-zinc-800 hidden md:block" />
              <div className="absolute left-[-27.5px] md:left-[-51.5px] top-2 w-2 h-2 rounded-full bg-zinc-700 group-hover:bg-emerald-500 transition-colors hidden md:block" />
              
              <h3 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                {exp.role}
              </h3>
              
              <div className="mt-2 text-lg text-zinc-400 font-medium flex items-center gap-2">
                {exp.company}
                {exp.companyUrl && (
                  <a href={exp.companyUrl} target="_blank" rel="noreferrer" className="text-zinc-600 hover:text-zinc-300 transition-colors">
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
