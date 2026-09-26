'use client';

import { motion } from 'framer-motion';
import { FeaturedProject } from '@/types/portfolio';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export default function ProjectCard({ project, index }: { project: FeaturedProject; index: number }) {
  // Using the first available URL as the main link for the card wrapper
  const mainUrl = project.demoUrl || project.githubUrl || '#';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="group block">
        <div className="flex flex-col gap-2 transition-all duration-300 ease-out group-hover:scale-[1.02] md:gap-4">
          
          {/* Image Wrapper */}
          <div className="h-[240px] overflow-hidden rounded-xl bg-[#f8f8f8] md:h-[339px]">
            <div className="relative h-full w-full">
              <img 
                src={project.coverImage} 
                alt={project.title} 
                className="object-cover absolute inset-0 w-full h-full"
              />
            </div>
          </div>

          {/* Content Wrapper */}
          <div className="flex flex-col gap-2 px-2">
            <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between md:gap-0">
              <h3 className="text-[16px] font-semibold tracking-[-0.32px] text-black md:text-[18px] md:tracking-[-0.36px]">
                {project.title}
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                {project.categoryTags.map((tag, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    {idx > 0 && (
                      <div className="h-[4px] w-[4px] rounded-full bg-[#616161] md:h-[5px] md:w-[5px]"></div>
                    )}
                    <span className="text-[11px] tracking-[0.11px] whitespace-nowrap text-[#616161] md:text-[12px] md:tracking-[0.12px] uppercase">
                      {tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <p className="[display:-webkit-box] overflow-hidden text-[16px] leading-[20px] font-normal text-[#616161] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
              {project.description}
            </p>

            {/* Clickable Action Links */}
            <div className="flex items-center gap-4 mt-2 relative z-10">
              {project.demoUrl && (
                <Link
                  href={project.demoUrl}
                  target="_blank"
                  className="group/link flex items-center gap-1.5 text-[14px] tracking-[-0.28px] text-[#878787] hover:text-black transition-colors md:text-[16px] md:tracking-[-0.32px]"
                >
                  <ExternalLink size={16} /> <span className="group-hover/link:underline">Live Demo</span>
                </Link>
              )}
              {project.githubUrl && (
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  className="group/link flex items-center gap-1.5 text-[14px] tracking-[-0.28px] text-[#878787] hover:text-black transition-colors md:text-[16px] md:tracking-[-0.32px]"
                >
                  <FaGithub size={16} /> <span className="group-hover/link:underline">Source Code</span>
                </Link>
              )}
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
