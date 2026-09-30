import { useState } from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Image as ImageIcon, Upload, Download } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface SettingsTabProps {
  data: PortfolioData;
  setData: (data: PortfolioData) => void;
  openImageModal: (callback: (url: string) => void) => void;
}

export default function SettingsTab({ data, setData, openImageModal }: SettingsTabProps) {
  const t = useTranslations('SettingsTab');
  const [localMessage, setLocalMessage] = useState('');

  const copyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setLocalMessage(t('jsonCopied'));
    setTimeout(() => setLocalMessage(''), 3000);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && parsed.personal) {
          setData(parsed);
          setLocalMessage(t('importSuccess'));
          setTimeout(() => setLocalMessage(''), 3000);
        } else {
          setLocalMessage(t('importError'));
          setTimeout(() => setLocalMessage(''), 3000);
        }
      } catch (error) {
        setLocalMessage(t('importError'));
        setTimeout(() => setLocalMessage(''), 3000);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('backupRestore')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-zinc-400 mb-4">{t('backupDesc')}</p>
          <div className="flex gap-4 items-center flex-wrap">
            <div className="relative">
              <Button variant="outline" className="gap-2 text-zinc-300 hover:text-white hover:bg-zinc-800">
                <Upload size={16} /> {t('importJson')}
              </Button>
              <input 
                type="file" 
                accept=".json"
                onChange={handleImportJson}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                title={t('importJson')}
              />
            </div>
            <Button variant="outline" onClick={copyJson} className="gap-2 text-zinc-300 hover:text-white hover:bg-zinc-800">
              <Download size={16} /> {t('exportJson')}
            </Button>
            {localMessage && (
              <span className="text-sm text-emerald-400 font-medium bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full whitespace-nowrap">
                {localMessage}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('seoMeta')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label>{t('siteTitle')}</Label>
            <Input value={data.meta.title} onChange={(e) => setData({ ...data, meta: { ...data.meta, title: e.target.value } })} />
          </div>
          <div className="space-y-1">
            <Label>{t('siteDesc')}</Label>
            <Textarea value={data.meta.description} onChange={(e) => setData({ ...data, meta: { ...data.meta, description: e.target.value } })} />
          </div>
          <div className="space-y-1">
            <Label>{t('favicon')}</Label>
            <div className="flex gap-2">
              <Input value={data.meta.favicon || ''} onChange={(e) => setData({ ...data, meta: { ...data.meta, favicon: e.target.value } })} />
              <Button variant="outline" onClick={() => openImageModal((url) => setData({ ...data, meta: { ...data.meta, favicon: url } }))} className="gap-2 whitespace-nowrap"><ImageIcon size={16} /> {t('select')}</Button>
            </div>
          </div>
          <div className="space-y-1">
            <Label>{t('ogImage')}</Label>
            <div className="flex gap-2">
              <Input value={data.meta.ogImage} onChange={(e) => setData({ ...data, meta: { ...data.meta, ogImage: e.target.value } })} />
              <Button variant="outline" onClick={() => openImageModal((url) => setData({ ...data, meta: { ...data.meta, ogImage: url } }))} className="gap-2 whitespace-nowrap"><ImageIcon size={16} /> {t('select')}</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('navNames')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-zinc-400 mb-4">{t('navHelp')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Work</Label>
              <Input 
                value={data.navTitles?.work || ''} 
                onChange={(e) => setData({ ...data, navTitles: { ...data.navTitles, work: e.target.value } })} 
                placeholder="Örn: Work" 
              />
            </div>
            <div className="space-y-1">
              <Label>Builds</Label>
              <Input 
                value={data.navTitles?.builds || ''} 
                onChange={(e) => setData({ ...data, navTitles: { ...data.navTitles, builds: e.target.value } })} 
                placeholder="Örn: Builds" 
              />
            </div>
            <div className="space-y-1">
              <Label>Skills</Label>
              <Input 
                value={data.navTitles?.skills || ''} 
                onChange={(e) => setData({ ...data, navTitles: { ...data.navTitles, skills: e.target.value } })} 
                placeholder="Örn: Skills" 
              />
            </div>
            <div className="space-y-1">
              <Label>About</Label>
              <Input 
                value={data.navTitles?.about || ''} 
                onChange={(e) => setData({ ...data, navTitles: { ...data.navTitles, about: e.target.value } })} 
                placeholder="Örn: About" 
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('sectionTitles')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-zinc-400 mb-4">{t('sectionHelp')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1">
              <Label className="text-emerald-400">Featured Work (Öne Çıkan Projeler)</Label>
              <Input 
                value={data.sectionTitles?.featuredProjects || ''} 
                onChange={(e) => setData({ ...data, sectionTitles: { ...data.sectionTitles, featuredProjects: e.target.value } })} 
                placeholder="Örn: Featured Work" 
              />
            </div>
            <div className="space-y-1">
              <Label className="text-emerald-400">Projects (Ürünler)</Label>
              <Input 
                value={data.sectionTitles?.builds || ''} 
                onChange={(e) => setData({ ...data, sectionTitles: { ...data.sectionTitles, builds: e.target.value } })} 
                placeholder="Örn: Projects" 
              />
            </div>
            <div className="space-y-1">
              <Label className="text-emerald-400">Skills & Tools (Yetenekler)</Label>
              <Input 
                value={data.sectionTitles?.skills || ''} 
                onChange={(e) => setData({ ...data, sectionTitles: { ...data.sectionTitles, skills: e.target.value } })} 
                placeholder="Örn: Skills & Tools" 
              />
            </div>
            <div className="space-y-1">
              <Label className="text-emerald-400">Experience (Deneyim)</Label>
              <Input 
                value={data.sectionTitles?.experiences || ''} 
                onChange={(e) => setData({ ...data, sectionTitles: { ...data.sectionTitles, experiences: e.target.value } })} 
                placeholder="Örn: Experience" 
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
