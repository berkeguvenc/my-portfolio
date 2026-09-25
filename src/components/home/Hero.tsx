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

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-8 leading-[1.1] max-w-[90%]">
          Hey, I'm {personal.name.split(' ')[0]}. {personal.bio}
        </h1>

        <div className="flex flex-row items-center gap-4 flex-wrap">
          {personal.resumeUrl && (
            <Link 
              href={personal.resumeUrl}
              target="_blank"
              className="flex items-center gap-2 text-base font-medium text-gray-500 hover:text-gray-900 transition-colors"
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
                className="flex items-center gap-2 text-base font-medium text-gray-900 hover:text-gray-600 transition-colors"
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
