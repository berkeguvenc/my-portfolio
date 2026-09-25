'use client';

import { motion } from 'framer-motion';
import { ExperienceItem } from '@/types/portfolio';
import { ExternalLink } from 'lucide-react';

export default function ExperienceSection({ experiences }: { experiences: ExperienceItem[] }) {
  const sortedExperiences = [...experiences].sort((a, b) => a.order - b.order);

  return (
    <section id="experience" className="py-24">
      <div className="mb-16">
        <h2 className="text-4xl font-bold tracking-tight text-black mb-4">Experience</h2>
      </div>

      <div className="space-y-16">
        {sortedExperiences.map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="flex flex-col md:flex-row gap-4 md:gap-24 group"
          >
            <div className="md:w-48 text-[17px] font-medium text-black">
              {exp.period}
            </div>
            
            <div className="flex-1 flex flex-col">
              <div className="flex items-center gap-2 text-black/60 text-lg mb-1">
                {exp.company}
                {exp.companyUrl && (
                  <a href={exp.companyUrl} target="_blank" rel="noreferrer" className="text-black/40 hover:text-black transition-colors">
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
              <h3 className="text-[22px] font-bold text-black">
                {exp.role}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
