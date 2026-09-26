'use client';

import { motion } from 'framer-motion';
import { SkillCategory } from '@/types/portfolio';

export default function SkillsSection({ skills }: { skills: SkillCategory[] }) {
  return (
    <section id="skills" className="py-24">
      <div className="mb-20">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-16">Skills</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {skills.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="flex flex-col gap-6"
            >
              <div className="text-gray-900 h-8 w-8 flex items-center justify-start">
                {idx === 0 && <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/></svg>}
                {idx === 1 && <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>}
                {idx === 2 && <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M3 15h6"/><path d="M3 18h6"/></svg>}
                {idx >= 3 && <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m21 16-7.1-7.1c-1.4-1.4-3.5-1.4-4.9 0L2 16"/><path d="m21 12-7.1-7.1c-1.4-1.4-3.5-1.4-4.9 0L2 12"/></svg>}
              </div>
              
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold text-gray-900">{category.categoryName}</h3>
                <ul className="flex flex-col gap-3 list-none">
                  {category.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="text-gray-500 text-lg font-normal">
                      {skill}
                    </li>
                  ))}
                </ul>
                
                {category.icons && category.icons.length > 0 && (
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    {category.icons.map((iconSlug, iIdx) => (
                      <div key={iIdx} className="flex items-center justify-center w-12 h-12 rounded-xl border border-gray-100 bg-white shadow-sm p-2.5">
                        <img src={`https://cdn.simpleicons.org/${iconSlug}`} alt={iconSlug} className="w-full h-full object-contain" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
