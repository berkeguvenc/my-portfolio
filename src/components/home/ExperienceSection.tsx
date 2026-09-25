'use client';

import { motion } from 'framer-motion';
import { ExperienceItem } from '@/types/portfolio';
import { ExternalLink } from 'lucide-react';

export default function ExperienceSection({ experiences }: { experiences: ExperienceItem[] }) {
  const sortedExperiences = [...experiences].sort((a, b) => a.order - b.order);

  return (
    <section id="experience" className="py-24">
      <div className="mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Experience</h2>
      </div>

      <div className="flex flex-col gap-8">
        {sortedExperiences.map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-8 group border-b border-gray-100 pb-8 last:border-0 last:pb-0"
          >
            <div className="text-sm italic text-gray-500 shrink-0 md:w-32">
              {exp.period}
            </div>
            
            <div className="flex-1 flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
              <div className="flex items-center gap-2 text-gray-900 font-bold text-lg">
                {exp.company}
                {exp.companyUrl && (
                  <a href={exp.companyUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors">
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
              <span className="hidden md:inline text-gray-300">•</span>
              <h3 className="text-lg font-bold text-gray-700">
                {exp.role}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
