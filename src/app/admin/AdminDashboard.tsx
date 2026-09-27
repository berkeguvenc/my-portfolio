'use client';

import { useState } from 'react';
import { PortfolioData, SocialLink } from '@/types/portfolio';
import * as LucideIcons from 'lucide-react';
import { Save, Copy, Loader2, Image as ImageIcon, X, Upload, LayoutGrid } from 'lucide-react';

import IconPickerModal from '@/components/admin/IconPickerModal';
import HelpModals from '@/components/admin/HelpModals';
import ImagePickerModal from '@/components/admin/ImagePickerModal';

import GeneralTab from '@/components/admin/tabs/GeneralTab';
import ProjectsTab from '@/components/admin/tabs/ProjectsTab';
import BuildsTab from '@/components/admin/tabs/BuildsTab';
import SkillsTab from '@/components/admin/tabs/SkillsTab';
import ExperienceTab from '@/components/admin/tabs/ExperienceTab';
import SettingsTab from '@/components/admin/tabs/SettingsTab';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';

export default function AdminDashboard({ initialData }: { initialData: PortfolioData }) {
  const [data, setData] = useState<PortfolioData>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageModalTarget, setImageModalTarget] = useState<((url: string) => void) | null>(null);

  const [isIconModalOpen, setIsIconModalOpen] = useState(false);
  const [iconModalTarget, setIconModalTarget] = useState<((iconName: string) => void) | null>(null);
  const [iconModalType, setIconModalType] = useState<'common' | 'socials'>('common');

  const [isLucideHelpOpen, setIsLucideHelpOpen] = useState(false);
  const [isFaHelpOpen, setIsFaHelpOpen] = useState(false);
  const [isSimpleIconsHelpOpen, setIsSimpleIconsHelpOpen] = useState(false);

  const openImageModal = (callback: (url: string) => void) => {
    setImageModalTarget(() => callback);
    setIsImageModalOpen(true);
  };

  const openIconModal = (type: 'common' | 'socials', callback: (iconName: string) => void) => {
    setIconModalType(type);
    setIconModalTarget(() => callback);
    setIsIconModalOpen(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage('');
    try {
      // Clean up array fields before saving to remove empty items and trailing spaces
      const cleanedData = {
        ...data,
        featuredProjects: data.featuredProjects.map(p => ({ 
          ...p, 
          categoryTags: p.categoryTags.map(t => t.trim()).filter(Boolean) 
        })),
        builds: data.builds.map(b => ({ 
          ...b, 
          roleTags: b.roleTags.map(t => t.trim()).filter(Boolean) 
        })),
        skills: data.skills.map(s => ({ 
          ...s, 
          skills: s.skills.map(sk => sk.trim()).filter(Boolean),
          icons: (s.icons || []).map(ic => ic.trim()).filter(Boolean)
        }))
      };

      const res = await fetch('/api/admin/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanedData),
      });
      
      if (res.ok) {
        setMessage('Değişiklikler başarıyla kaydedildi!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Kaydedilirken hata oluştu.');
      }
    } catch (error) {
      setMessage('Bir hata oluştu.');
    }
    setIsSaving(false);
  };

  const copyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setMessage('JSON kopyalandı!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-zinc-900 border border-zinc-800 p-5 rounded-xl gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold tracking-tight">Portfolyo Yönetim Paneli</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Local CMS Aktif
            </span>
          </div>
          <p className="text-sm text-zinc-400">Veriler doğrudan <code className="text-zinc-300">src/data/portfolio.json</code> dosyasına yazılır.</p>
        </div>
        
        <div className="flex items-center gap-3">
          {message && <span className="text-sm text-emerald-400 font-medium">{message}</span>}
          <Button variant="outline" onClick={copyJson} className="gap-2 h-9">
            <Copy size={16} /> JSON
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white h-9">
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="genel">
        <TabsList className="grid grid-cols-6 bg-zinc-900/50 p-1 mb-6 rounded-lg w-full overflow-x-auto">
          <TabsTrigger value="genel">Genel & Sosyal</TabsTrigger>
          <TabsTrigger value="work">Projeler</TabsTrigger>
          <TabsTrigger value="builds">Ürünler</TabsTrigger>
          <TabsTrigger value="skills">Yetenekler</TabsTrigger>
          <TabsTrigger value="experience">Deneyim</TabsTrigger>
          <TabsTrigger value="settings">Site Ayarları</TabsTrigger>
        </TabsList>

        <TabsContent value="genel">
          <GeneralTab 
            data={data} 
            setData={setData} 
            openImageModal={openImageModal} 
            openIconModal={openIconModal}
            openFaHelp={() => setIsFaHelpOpen(true)}
          />
        </TabsContent>

        <TabsContent value="work">
          <ProjectsTab data={data} setData={setData} openImageModal={openImageModal} />
        </TabsContent>

        <TabsContent value="builds">
          <BuildsTab data={data} setData={setData} openImageModal={openImageModal} />
        </TabsContent>

        <TabsContent value="skills">
          <SkillsTab 
            data={data} 
            setData={setData} 
            openIconModal={openIconModal} 
            openLucideHelp={() => setIsLucideHelpOpen(true)}
            openSimpleIconsHelp={() => setIsSimpleIconsHelpOpen(true)}
          />
        </TabsContent>

        <TabsContent value="experience">
          <ExperienceTab data={data} setData={setData} />
        </TabsContent>

        <TabsContent value="settings">
          <SettingsTab data={data} setData={setData} openImageModal={openImageModal} />
        </TabsContent>
      </Tabs>

      <ImagePickerModal 
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onSelect={(url) => {
          if (imageModalTarget) {
            imageModalTarget(url);
          }
        }}
      />

      <IconPickerModal 
        isOpen={isIconModalOpen}
        onClose={() => setIsIconModalOpen(false)}
        type={iconModalType}
        onSelect={(iconName) => {
          if (iconModalTarget) {
            iconModalTarget(iconName);
          }
        }}
      />

      <HelpModals 
        isLucideOpen={isLucideHelpOpen}
        onLucideClose={() => setIsLucideHelpOpen(false)}
        isFaOpen={isFaHelpOpen}
        onFaClose={() => setIsFaHelpOpen(false)}
        isSimpleIconsOpen={isSimpleIconsHelpOpen}
        onSimpleIconsClose={() => setIsSimpleIconsHelpOpen(false)}
      />
    </div>
  );
}
