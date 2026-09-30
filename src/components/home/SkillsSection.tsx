'use client';

import { motion } from 'framer-motion';
import { SkillCategory } from '@/types/portfolio';

import * as LucideIcons from 'lucide-react';

export default function SkillsSection({ skills, title = "Skills & Tools" }: { skills: SkillCategory[]; title?: string }) {
  return (
    <div id="skills" className="scroll-mt-[64px] md:scroll-mt-[120px]">
      <div className="space-y-10 md:space-y-14">
        <div>
          <h2 className="text-[24px] leading-[32px] font-semibold tracking-[-0.48px] text-black md:text-[32px] md:leading-[40px] md:tracking-[-0.64px]">
            {title}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-12 md:gap-y-14 lg:grid-cols-4">
          {skills.map((category, idx) => {
            const IconComponent = category.lucideIcon ? (LucideIcons as unknown as Record<string, React.ElementType>)[category.lucideIcon] : null;

            return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="flex flex-col"
            >
              {IconComponent && (
                <div className="mb-8 h-10 w-10 md:mb-12 text-gray-900 flex items-center justify-start">
                  <IconComponent size={40} strokeWidth={1.5} />
                </div>
              )}
              
              <h3 className="mb-4 text-[20px] leading-[28px] font-semibold tracking-[-0.44px] text-black md:text-[24px] md:leading-[32px] md:tracking-[-0.48px]">
                {category.categoryName}
              </h3>
              
              <ul className="mb-6 space-y-2">
                {category.skills.map((skill, sIdx) => (
                  <li key={sIdx} className="text-[16px] leading-[24px] font-normal tracking-[-0.36px] text-[#878787] md:text-[18px]">
                    {skill}
                  </li>
                ))}
              </ul>
              
              {category.icons && category.icons.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {category.icons.map((iconSlug, iIdx) => (
                    <div key={iIdx} className="group/icon relative flex items-center justify-center p-1.5 rounded-[8px] bg-white border border-gray-100/60 shadow-sm w-[44px] h-[44px]">
                      <img 
                        src={`https://cdn.simpleicons.org/${iconSlug}`} 
                        alt={iconSlug} 
                        className="h-7 w-7 object-contain transition-transform duration-200 ease-out group-hover/icon:scale-110" 
                      />
                      <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 translate-y-1 rounded-[6px] bg-black px-2 py-1 text-[12px] leading-[16px] font-medium whitespace-nowrap text-white opacity-0 shadow-[0px_4px_12px_rgba(0,0,0,0.12)] transition-all duration-200 ease-out group-hover/icon:translate-y-0 group-hover/icon:opacity-100 z-10">
                        {iconSlug}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
