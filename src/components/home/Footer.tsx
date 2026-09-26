'use client';

import { SocialLink } from '@/types/portfolio';
import { Mail, ArrowUp } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const iconMap: Record<string, any> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  x: FaTwitter,
  email: Mail,
  instagram: FaInstagram,
  youtube: FaYoutube,
};

export default function Footer({ name, socials, footer }: { name: string; socials: SocialLink[]; footer?: { text?: string; links?: { label: string; url: string }[] } }) {
  const year = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer id="about" className="py-12 mt-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center flex-wrap justify-center gap-6 text-[14px] font-medium tracking-[-0.28px] text-[#878787]">
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
            
            {/* Custom Links from JSON */}
            {footer?.links?.map((link, idx) => (
              <Link
                key={`custom-${idx}`}
                href={link.url}
                target={link.url.startsWith('http') ? '_blank' : '_self'}
                className="hover:text-black transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="text-[14px] font-medium tracking-[-0.28px] text-[#878787] text-center">
            {footer?.text ? footer.text : `© ${year} ${name}`}
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            onClick={scrollToTop}
            type="button"
            className="fixed right-4 bottom-20 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(38,41,46,0.85)] text-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.3)] backdrop-blur-md transition-colors hover:bg-[rgba(58,61,66,0.9)] md:bottom-4"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} strokeWidth={2} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
