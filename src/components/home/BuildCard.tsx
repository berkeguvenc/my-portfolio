'use client';

import { motion } from 'framer-motion';
import { BuildProject } from '@/types/portfolio';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export default function BuildCard({ build, index }: { build: BuildProject; index: number }) {
  // Try to use a relevant link for the card wrapper
  const mainUrl = build.demoUrl || build.githubUrl || '#';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={mainUrl} target={mainUrl !== '#' ? "_blank" : "_self"} className="group block">
        <div className="flex flex-col gap-2 transition-all duration-300 ease-out group-hover:scale-[1.02] md:gap-4">
          
          <div className="h-[240px] overflow-hidden rounded-xl bg-[#f8f8f8] md:h-[339px]">
            <div className="relative h-full w-full">
              {build.iconUrl ? (
                <img 
                  src={build.iconUrl} 
                  alt={build.title} 
                  className="object-cover absolute inset-0 w-full h-full" 
                />
              ) : (
                <div className="absolute inset-0 bg-gray-200"></div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col gap-3 px-2">
            <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between md:gap-0">
              <h3 className="text-[16px] font-semibold tracking-[-0.32px] text-black md:text-[18px] md:tracking-[-0.36px]">
                {build.title}
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] tracking-[0.11px] whitespace-nowrap text-[#616161] md:text-[12px] md:tracking-[0.12px] uppercase">
                  {build.platformBadge}
                </span>
              </div>
            </div>
            
            <p className="[display:-webkit-box] overflow-hidden text-[14px] leading-[20px] font-normal text-[#616161] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
              {build.description}
            </p>
            
            {build.roleTags && build.roleTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {build.roleTags.map((tag, idx) => (
                  <span key={idx} className="rounded-[8px] bg-[#f8f8f8] px-[8px] py-[3px] text-[12px] leading-[16px] font-medium text-[#616161]">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Optional Links Row (only visible on hover or if specifically needed, but keeping it subtle) */}
            <div className="flex items-center gap-4 mt-2">
              {build.demoUrl && (
                <span className="group-hover:text-black flex items-center gap-1.5 text-[14px] tracking-[-0.28px] text-[#878787] transition-colors md:text-[16px] md:tracking-[-0.32px]">
                  <ExternalLink size={16} /> Live Demo
                </span>
              )}
              {build.githubUrl && (
                <span className="group-hover:text-black flex items-center gap-1.5 text-[14px] tracking-[-0.28px] text-[#878787] transition-colors md:text-[16px] md:tracking-[-0.32px]">
                  <FaGithub size={16} /> Source Code
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
