import * as LucideIcons from 'lucide-react';
import * as FaIcons from 'react-icons/fa';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { useTranslations } from 'next-intl';

const commonLucideIcons = [
  'Globe', 'Server', 'PenTool', 'Database', 'Smartphone', 'Monitor', 'Code', 'Cpu', 'Cloud',
  'Layout', 'Settings', 'Terminal', 'Shield', 'Zap', 'Palette', 'Box', 'Briefcase', 'Camera',
  'Coffee', 'Compass', 'Figma', 'Folder', 'Headphones', 'Layers', 'Mail', 'Map', 'MessageSquare',
  'Music', 'Video', 'Wifi', 'Star', 'Heart', 'User', 'Users', 'Search', 'Home'
];

const socialFaIcons = [
  'FaGithub', 'FaLinkedin', 'FaTwitter', 'FaInstagram', 'FaYoutube', 
  'FaFacebook', 'FaTwitch', 'FaDribbble', 'FaFigma', 'FaEnvelope', 'FaMedium',
  'FaReddit', 'FaDiscord', 'FaTiktok', 'FaSnapchat', 'FaWhatsapp', 'FaTelegram',
  'FaSkype', 'FaSlack', 'FaSpotify', 'FaSoundcloud', 'FaVimeo', 'FaBehance',
  'FaPinterest', 'FaTumblr', 'FaVk', 'FaWeixin', 'FaLine', 'FaAppStore', 'FaGooglePlay'
];

interface IconPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'common' | 'socials';
  onSelect: (iconName: string) => void;
}

export default function IconPickerModal({ isOpen, onClose, type, onSelect }: IconPickerModalProps) {
  const t = useTranslations('Modals.IconPicker');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <Card className="w-full max-w-3xl max-h-[80vh] flex flex-col bg-zinc-950 border-zinc-800 shadow-2xl">
        <CardHeader className="flex flex-row justify-between items-center border-b border-zinc-800 pb-4">
          <CardTitle>{type === 'socials' ? t('titleSocial') : t('titleCommon')}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-zinc-400 hover:text-white">
            <X size={20} />
          </Button>
        </CardHeader>
        <CardContent className="overflow-y-auto pt-6">
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
            {(type === 'socials' ? socialFaIcons : commonLucideIcons).map((iconName) => {
              const Icon = type === 'socials' ? (FaIcons as unknown as Record<string, React.ElementType>)[iconName] : (LucideIcons as unknown as Record<string, React.ElementType>)[iconName];
              if (!Icon) return null;
              return (
                <div 
                  key={iconName} 
                  className="flex flex-col items-center gap-2 p-3 rounded-lg border border-zinc-800 hover:border-zinc-500 hover:bg-zinc-900 cursor-pointer transition-colors"
                  onClick={() => {
                    onSelect(iconName);
                    onClose();
                  }}
                >
                  <Icon size={24} className={type === 'socials' ? '' : 'text-zinc-400'} />
                  <span className="text-[10px] text-zinc-500 text-center break-all">
                    {iconName}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
