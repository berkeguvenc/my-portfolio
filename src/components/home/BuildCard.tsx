'use client';

import { motion } from 'framer-motion';
import { BuildProject } from '@/types/portfolio';
import { ExternalLink, Smartphone } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import Link from 'next/link';

export default function BuildCard({ build, index }: { build: BuildProject; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group flex flex-col items-center text-center px-4 py-8"
    >
      <div className="w-[120px] h-[120px] md:w-[160px] md:h-[160px] rounded-[32px] md:rounded-[40px] overflow-hidden mb-8 shadow-sm flex items-center justify-center bg-black/5">
        {build.iconUrl ? (
          <img src={build.iconUrl} alt={build.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out" />
        ) : (
          <div className="w-1/2 h-1/2 bg-black/10 rounded-2xl"></div>
        )}
      </div>
      
      <div className="flex flex-col items-center flex-1 w-full">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-2xl font-bold tracking-tight text-black">{build.title}</h3>
          <span className="text-[11px] font-semibold tracking-wider text-black/50 uppercase">
            {build.platformBadge}
          </span>
        </div>
        
        <p className="text-black/60 text-[15px] leading-relaxed mb-6 max-w-sm">{build.description}</p>
        
        <div className="flex gap-2 flex-wrap justify-center mt-auto">
          {build.roleTags.map((tag, idx) => (
            <span key={idx} className="text-[13px] text-black/60 font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
