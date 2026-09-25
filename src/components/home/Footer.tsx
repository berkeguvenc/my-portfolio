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
    <footer id="about" className="py-12 border-t border-gray-100 mt-20">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-6 text-sm font-medium text-gray-500">
          {socials.map((social, idx) => (
            <Link 
              key={idx} 
              href={social.url}
              target="_blank"
              className="hover:text-gray-900 transition-colors"
              aria-label={social.label}
            >
              {social.label}
            </Link>
          ))}
          <Link href="/resume.pdf" target="_blank" className="hover:text-gray-900 transition-colors">Resume</Link>
        </div>

        <div className="text-gray-400 text-sm">
          © {year} {name}
        </div>
      </div>
    </footer>
  );
}
