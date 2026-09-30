'use client';

import { motion } from 'framer-motion';
import { PersonalInfo, SocialLink } from '@/types/portfolio';
import * as FaIcons from 'react-icons/fa';
import * as LucideIcons from 'lucide-react';
import Link from 'next/link';

export default function Hero({ personal, socials }: { personal: PersonalInfo; socials: SocialLink[] }) {
  return (
    <motion.header 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8 mb-20 md:mt-[100px] md:mb-36"
    >
      <div className="mb-6 flex flex-col gap-6 md:mb-8 md:gap-8">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          {personal.avatarUrl && (
            <div 
              className="relative h-16 w-16 shrink-0 rounded-full p-[1px] md:h-20 md:w-20"
              style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(200, 200, 200, 0.6) 100%)',
                boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.06), 0 3px 12px rgba(0, 0, 0, 0.08)'
              }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-full">
                <div 
                  className="absolute inset-0 rounded-full z-10" 
                  style={{
                    backgroundImage: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.15) 100%)'
                  }}
                />
                <img 
                  src={personal.avatarUrl} 
                  alt={personal.name} 
                  className="relative h-full w-full object-cover"
                />
              </div>
            </div>
          )}
          
          {personal.isAvailableForWork && (
            <div className="flex items-center gap-2 rounded-[20px] border border-gray-200/60 bg-white/50 backdrop-blur-md px-3 py-1.5 text-sm font-medium text-gray-900 shadow-sm mt-2 sm:mt-0">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              {personal.statusText || 'Available for new projects'}
            </div>
          )}
        </div>

        <h1>
          <p className="text-[20px] leading-normal font-normal tracking-[-0.6px] text-[#111111] md:text-[32px] md:leading-[1.5] md:tracking-[-0.6px]">
            Hey, I’m {personal.name.split(' ')[0]}. {personal.bio}
          </p>
        </h1>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {personal.resumeUrl && (
          <div>
            <Link 
              href={personal.resumeUrl}
              target="_blank"
              className="flex items-center gap-2 rounded-[49px] bg-[#111111] px-4 py-3 text-[16px] font-medium tracking-[-0.48px] text-white transition-colors hover:bg-[#303030]"
            >
              Resume
            </Link>
          </div>
        )}
        
        {socials.map((social, idx) => {
          const Icon = social.platform ? (FaIcons as unknown as Record<string, React.ElementType>)[social.platform] || (LucideIcons as unknown as Record<string, React.ElementType>)[social.platform] || LucideIcons.ExternalLink : LucideIcons.ExternalLink;
          return (
            <div key={idx}>
              <Link 
                href={social.url}
                target="_blank"
                className="flex items-center gap-2 rounded-[49px] bg-[#f8f8f8] px-3 py-2.5 text-[16px] font-medium tracking-[-0.48px] text-[#303030] transition-colors hover:bg-[#e8e8e8] md:px-4 md:py-3"
                aria-label={social.label}
              >
                <Icon size={18} />
                <span className="hidden md:inline">{social.label}</span>
              </Link>
            </div>
          );
        })}
      </div>
    </motion.header>
  );
}
