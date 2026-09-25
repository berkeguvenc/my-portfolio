'use client';

import { motion } from 'framer-motion';
import { PersonalInfo, SocialLink } from '@/types/portfolio';
import { ExternalLink, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import Link from 'next/link';

const iconMap: Record<string, any> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  x: FaTwitter,
  email: Mail,
  instagram: FaInstagram,
  youtube: FaYoutube,
};

export default function Hero({ personal, socials }: { personal: PersonalInfo; socials: SocialLink[] }) {
  return (
    <section id="top" className="pt-32 pb-20 md:pt-48 md:pb-32 flex flex-col items-start justify-center min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {personal.isAvailableForWork && (
          <div className="flex items-center gap-2 mb-6 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium text-emerald-400">Available for new projects</span>
          </div>
        )}

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-100 mb-4">
          {personal.name}
        </h1>
        <h2 className="text-xl md:text-2xl text-zinc-400 font-medium mb-6">
          {personal.role}
        </h2>
        
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
          {personal.bio}
        </p>

        <div className="flex items-center gap-4">
          {socials.map((social, idx) => {
            const Icon = iconMap[social.platform] || ExternalLink;
            return (
              <Link 
                key={idx} 
                href={social.url}
                target="_blank"
                className="p-3 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 hover:border-zinc-700 transition-all group"
                aria-label={social.label}
              >
                <Icon size={20} className="group-hover:scale-110 transition-transform" />
              </Link>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
