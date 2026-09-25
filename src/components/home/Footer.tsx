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
    <footer id="about" className="py-12 border-t border-black/5 mt-20">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-6 text-[15px] font-medium text-black/60">
          {socials.map((social, idx) => (
            <Link 
              key={idx} 
              href={social.url}
              target="_blank"
              className="hover:text-black transition-colors"
              aria-label={social.label}
            >
              {social.label}
            </Link>
          ))}
          <Link href="/resume.pdf" target="_blank" className="hover:text-black transition-colors">Resume</Link>
        </div>

        <div className="text-black/40 text-[15px]">
          © {year} {name}
        </div>
      </div>
    </footer>
  );
}
