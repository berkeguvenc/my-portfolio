'use client';

import { motion } from 'framer-motion';

export default function AboutSection({ about, aboutImage }: { about: string; aboutImage?: string }) {
  if (!about && !aboutImage) return null;
  
  return (
    <div id="about" className="scroll-mt-[64px] md:scroll-mt-[120px]">
      <div className="space-y-6 md:space-y-8">
        <div>
          <h2 className="text-[24px] leading-[32px] font-semibold tracking-[-0.48px] text-black md:text-[32px] md:leading-[40px] md:tracking-[-0.64px]">
            About
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row gap-8 items-start max-w-4xl"
        >
          {aboutImage && (
            <div className="w-full md:w-[280px] shrink-0">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#f8f8f8] shadow-sm">
                <img 
                  src={aboutImage} 
                  alt="About" 
                  className="absolute inset-0 w-full h-full object-cover" 
                />
              </div>
            </div>
          )}
          
          <div className="flex-1">
            <p className="text-[16px] leading-[28px] font-normal tracking-[-0.32px] text-[#616161] md:text-[18px] md:leading-[32px] md:tracking-[-0.36px] whitespace-pre-wrap">
              {about}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
