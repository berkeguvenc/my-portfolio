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
      <div className="bg-gray-50 rounded-3xl overflow-hidden h-full flex flex-col">
        <div className="relative aspect-[4/3] w-full">
          <img 
            src={project.coverImage} 
            alt={project.title} 
            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>
        
        <div className="flex flex-col p-6 flex-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold tracking-tight text-gray-900">{project.title}</h3>
            <div className="flex gap-2">
              {project.categoryTags.slice(0,1).map((tag, idx) => (
                <span key={idx} className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">{project.description}</p>
          
          <div className="flex items-center gap-6 mt-auto pt-4 border-t border-gray-200/50">
            {project.demoUrl && (
              <Link 
                href={project.demoUrl} 
                target="_blank" 
                className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
              >
                <ExternalLink size={16} /> Live Demo
              </Link>
            )}
            {project.githubUrl && (
              <Link 
                href={project.githubUrl} 
                target="_blank" 
                className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                <FaGithub size={16} /> Source Code
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
