'use client';

import { motion } from 'framer-motion';
import { ExperienceItem } from '@/types/portfolio';
import { ExternalLink } from 'lucide-react';

export default function ExperienceSection({ experiences }: { experiences: ExperienceItem[] }) {
  const sortedExperiences = [...experiences].sort((a, b) => a.order - b.order);

  return (
    <div id="experience" className="scroll-mt-[64px] md:scroll-mt-[120px]">
      <div className="space-y-10 md:space-y-14">
        <div>
          <h2 className="text-[24px] leading-[32px] font-semibold tracking-[-0.48px] text-black md:text-[32px] md:leading-[40px] md:tracking-[-0.64px]">
            Experience
          </h2>
        </div>

        <div className="flex flex-col gap-8">
          {sortedExperiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-8 group border-b border-gray-100/60 pb-8 last:border-0 last:pb-0"
            >
              <div className="text-[14px] leading-[20px] tracking-[-0.28px] md:text-[16px] md:tracking-[-0.32px] font-normal text-[#878787] shrink-0 md:w-32">
                {exp.period}
              </div>
              
              <div className="flex-1 flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                <div className="flex items-center gap-2 text-[16px] font-semibold tracking-[-0.32px] text-black md:text-[18px] md:tracking-[-0.36px]">
                  {exp.company}
                  {exp.companyUrl && (
                    <a href={exp.companyUrl} target="_blank" rel="noreferrer" className="text-[#878787] hover:text-black transition-colors">
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
                <span className="hidden md:inline text-[#878787]">•</span>
                <h3 className="text-[16px] font-medium tracking-[-0.32px] text-[#616161] md:text-[18px] md:tracking-[-0.36px]">
                  {exp.role}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
