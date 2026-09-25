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
    <section id="top" className="pt-24 pb-20 md:pt-32 md:pb-32 flex flex-col items-start justify-center min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        {personal.avatarUrl && (
          <img 
            src={personal.avatarUrl} 
            alt={personal.name} 
            className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover mb-12 shadow-sm"
          />
        )}

        <h1 className="text-4xl md:text-5xl lg:text-[56px] font-medium tracking-[-0.02em] text-black mb-12 leading-[1.1] max-w-[90%]">
          Hey, I'm {personal.name.split(' ')[0]}. {personal.bio}
        </h1>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          {personal.resumeUrl && (
            <Link 
              href={personal.resumeUrl}
              target="_blank"
              className="flex items-center gap-2 text-[17px] font-medium text-black/40 hover:text-black transition-colors"
            >
              Resume
            </Link>
          )}
          {socials.map((social, idx) => {
            const Icon = iconMap[social.platform] || ExternalLink;
            return (
              <Link 
                key={idx} 
                href={social.url}
                target="_blank"
                className="flex items-center gap-2 text-[17px] font-medium text-black/80 hover:text-black transition-colors"
                aria-label={social.label}
              >
                <Icon size={20} />
                {social.label}
              </Link>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
