'use client';

import { SocialLink } from '@/types/portfolio';
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

export default function Footer({ name, socials }: { name: string; socials: SocialLink[] }) {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="py-12 border-t border-zinc-900/50 mt-20">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-zinc-500 text-sm">
          © {year} {name}. All rights reserved.
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-sm font-medium text-zinc-400">
            Built with Next.js & Tailwind
          </div>
          <div className="flex items-center gap-4">
            {socials.map((social, idx) => {
              const Icon = iconMap[social.platform] || ExternalLink;
              return (
                <Link 
                  key={idx} 
                  href={social.url}
                  target="_blank"
                  className="text-zinc-500 hover:text-zinc-100 transition-colors"
                  aria-label={social.label}
                >
                  <Icon size={18} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
