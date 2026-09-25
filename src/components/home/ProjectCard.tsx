'use client';

import { motion } from 'framer-motion';
import { FeaturedProject } from '@/types/portfolio';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import Link from 'next/link';

export default function ProjectCard({ project, index }: { project: FeaturedProject; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col"
    >
      <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden mb-6 bg-black/5">
        <img 
          src={project.coverImage} 
          alt={project.title} 
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      </div>
      
      <div className="flex flex-col px-2">
        <div className="flex items-center gap-4 mb-3">
          <h3 className="text-[28px] font-bold tracking-tight text-black leading-none">{project.title}</h3>
          <div className="flex gap-2">
            {project.categoryTags.map((tag, idx) => (
              <span key={idx} className="text-[13px] font-medium tracking-wide text-black/50 uppercase">
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <p className="text-black/60 text-lg leading-relaxed mb-6 max-w-lg">{project.description}</p>
        
        <div className="flex items-center gap-6 mt-auto">
          {project.demoUrl && (
            <Link 
              href={project.demoUrl} 
              target="_blank" 
              className="flex items-center gap-2 text-sm font-medium text-black hover:text-black/70 transition-colors"
            >
              <ExternalLink size={18} /> Live Demo
            </Link>
          )}
          {project.githubUrl && (
            <Link 
              href={project.githubUrl} 
              target="_blank" 
              className="flex items-center gap-2 text-sm font-medium text-black/50 hover:text-black transition-colors"
            >
              <FaGithub size={18} /> Source Code
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
