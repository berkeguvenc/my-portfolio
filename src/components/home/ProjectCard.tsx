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
      className="group relative flex flex-col bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-colors"
    >
      <div className="relative h-64 overflow-hidden bg-zinc-950">
        <img 
          src={project.coverImage} 
          alt={project.title} 
          className="object-cover w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
      </div>
      
      <div className="flex flex-col flex-1 p-6 z-10 -mt-10">
        <div className="flex gap-2 flex-wrap mb-3">
          {project.categoryTags.map((tag, idx) => (
            <span key={idx} className="text-[10px] font-semibold tracking-wider text-zinc-300 bg-zinc-800/80 px-2 py-1 rounded backdrop-blur-md">
              {tag.toUpperCase()}
            </span>
          ))}
        </div>
        
        <h3 className="text-2xl font-bold text-zinc-100 mb-2">{project.title}</h3>
        <p className="text-zinc-400 text-sm mb-6 flex-1">{project.description}</p>
        
        <div className="flex items-center gap-4 mt-auto">
          {project.demoUrl && (
            <Link 
              href={project.demoUrl} 
              target="_blank" 
              className="flex items-center gap-2 text-sm font-medium text-zinc-100 hover:text-emerald-400 transition-colors"
            >
              <ExternalLink size={16} /> Live Demo
            </Link>
          )}
          {project.githubUrl && (
            <Link 
              href={project.githubUrl} 
              target="_blank" 
              className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              <FaGithub size={16} /> Source Code
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
