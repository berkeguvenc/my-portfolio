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
      className="group flex flex-col p-5 bg-zinc-900 border border-zinc-800 rounded-2xl hover:bg-zinc-800/50 hover:border-zinc-700 transition-all"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700">
          {build.iconUrl ? (
            <img src={build.iconUrl} alt={build.title} className="w-8 h-8 object-contain" />
          ) : (
            <div className="w-8 h-8 bg-zinc-700 rounded-lg"></div>
          )}
        </div>
        <span className="text-[10px] font-semibold tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded">
          {build.platformBadge.toUpperCase()}
        </span>
      </div>
      
      <h3 className="text-lg font-bold text-zinc-100 mb-2">{build.title}</h3>
      <p className="text-sm text-zinc-400 mb-4 flex-1">{build.description}</p>
      
      <div className="flex gap-2 flex-wrap mb-4">
        {build.roleTags.map((tag, idx) => (
          <span key={idx} className="text-xs text-zinc-500 bg-zinc-950 px-2 py-1 rounded border border-zinc-800">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-zinc-800/50">
        {build.links?.website && (
          <Link href={build.links.website} target="_blank" className="text-zinc-400 hover:text-zinc-100 transition-colors">
            <ExternalLink size={18} />
          </Link>
        )}
        {build.links?.github && (
          <Link href={build.links.github} target="_blank" className="text-zinc-400 hover:text-zinc-100 transition-colors">
            <FaGithub size={18} />
          </Link>
        )}
        {build.links?.appStore && (
          <Link href={build.links.appStore} target="_blank" className="text-zinc-400 hover:text-zinc-100 transition-colors">
            <Smartphone size={18} />
          </Link>
        )}
      </div>
    </motion.div>
  );
}
