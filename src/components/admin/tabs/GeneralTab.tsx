import { useState } from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Image as ImageIcon, LayoutGrid, Upload, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface GeneralTabProps {
  data: PortfolioData;
  setData: (data: PortfolioData) => void;
  openImageModal: (callback: (url: string) => void) => void;
  openIconModal: (type: 'common' | 'socials', callback: (iconName: string) => void) => void;
  openFaHelp: () => void;
}

export default function GeneralTab({ data, setData, openImageModal, openIconModal, openFaHelp }: GeneralTabProps) {
  const t = useTranslations('GeneralTab');
  const [isUploadingCV, setIsUploadingCV] = useState(false);

  const handleCVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    
    setIsUploadingCV(true);
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        const uploadedData = await res.json();
        const newUrl = uploadedData.url;
        const newFooter = data.footer ? { ...data.footer } : {};
        if (newFooter.links) {
          newFooter.links = newFooter.links.map(link => 
            link.label.toLowerCase() === 'resume' || link.label.toLowerCase() === 'cv' 
              ? { ...link, url: newUrl } 
              : link
          );
        }
        setData({ 
          ...data, 
          personal: { ...data.personal, resumeUrl: newUrl },
          footer: newFooter as typeof data.footer
        });
      }
    } catch (error) {
      console.error('CV upload failed', error);
    }
    setIsUploadingCV(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('personalInfo')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>{t('name')}</Label>
              <Input value={data.personal.name} onChange={(e) => setData({ ...data, personal: { ...data.personal, name: e.target.value } })} />
            </div>
            <div className="space-y-1">
              <Label>{t('role')}</Label>
              <Input value={data.personal.role} onChange={(e) => setData({ ...data, personal: { ...data.personal, role: e.target.value } })} />
            </div>
          </div>
          <div className="space-y-1">
            <Label>{t('location')}</Label>
            <Input value={data.personal.location || ''} onChange={(e) => setData({ ...data, personal: { ...data.personal, location: e.target.value } })} />
          </div>
          <div className="space-y-1">
            <Label>{t('avatar')}</Label>
            <div className="flex gap-2">
              <Input value={data.personal.avatarUrl || ''} onChange={(e) => setData({ ...data, personal: { ...data.personal, avatarUrl: e.target.value } })} />
              <Button variant="outline" onClick={() => openImageModal((url) => setData({ ...data, personal: { ...data.personal, avatarUrl: url } }))} className="gap-2 whitespace-nowrap"><ImageIcon size={16} /> {t('select')}</Button>
            </div>
          </div>
          <div className="space-y-1">
            <Label>{t('cv')}</Label>
            <div className="flex gap-2">
              <Input 
                value={data.personal.resumeUrl || ''} 
                onChange={(e) => {
                  const newUrl = e.target.value;
                  const newFooter = data.footer ? { ...data.footer } : {};
                  if (newFooter.links) {
                    newFooter.links = newFooter.links.map(link => 
                      link.label.toLowerCase() === 'resume' || link.label.toLowerCase() === 'cv' 
                        ? { ...link, url: newUrl } 
                        : link
                    );
                  }
                  setData({ 
                    ...data, 
                    personal: { ...data.personal, resumeUrl: newUrl },
                    footer: newFooter as typeof data.footer
                  });
                }} 
                placeholder={t('cvPlaceholder')}
                className="flex-1"
              />
              <div className="relative">
                <Button variant="outline" className="gap-2 whitespace-nowrap" type="button" disabled={isUploadingCV}>
                  {isUploadingCV ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                  {isUploadingCV ? t('uploading') : t('upload')}
                </Button>
                {!isUploadingCV && (
                  <input 
                    type="file" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept=".pdf,.doc,.docx"
                    onChange={handleCVUpload}
                    title="CV Yükle"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <Label>{t('bio')}</Label>
            <Textarea value={data.personal.bio} onChange={(e) => setData({ ...data, personal: { ...data.personal, bio: e.target.value } })} rows={3} />
          </div>
          
          <div className="space-y-1 pt-4 border-t border-zinc-800">
            <Label className="text-emerald-400 font-semibold mb-2 block">{t('aboutSection')}</Label>
          </div>
          
          <div className="space-y-1">
            <Label>{t('about')}</Label>
            <Textarea value={data.personal.about || ''} onChange={(e) => setData({ ...data, personal: { ...data.personal, about: e.target.value } })} rows={5} />
          </div>
          <div className="space-y-1">
            <Label>{t('aboutImage')}</Label>
            <div className="flex gap-2">
              <Input value={data.personal.aboutImage || ''} onChange={(e) => setData({ ...data, personal: { ...data.personal, aboutImage: e.target.value } })} />
              <Button variant="outline" onClick={() => openImageModal((url) => setData({ ...data, personal: { ...data.personal, aboutImage: url } }))} className="gap-2 whitespace-nowrap"><ImageIcon size={16} /> {t('select')}</Button>
            </div>
          </div>
          
          <div className="space-y-1 pt-4 border-t border-zinc-800">
            <Label className="text-emerald-400 font-semibold mb-2 block">{t('workStatus')}</Label>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 sm:items-end">
            <div className="flex items-center gap-2 sm:pb-3">
              <input 
                type="checkbox" 
                id="isAvailableForWork" 
                checked={data.personal.isAvailableForWork || false} 
                onChange={(e) => setData({ ...data, personal: { ...data.personal, isAvailableForWork: e.target.checked } })}
                className="rounded border-zinc-700 bg-zinc-900 text-emerald-500 focus:ring-emerald-500 w-4 h-4"
              />
              <Label htmlFor="isAvailableForWork" className="cursor-pointer">{t('availableForWork')}</Label>
            </div>
            
            <div className="space-y-1 flex-1">
              <Label>{t('statusText')}</Label>
              <Input value={data.personal.statusText || ''} onChange={(e) => setData({ ...data, personal: { ...data.personal, statusText: e.target.value } })} placeholder={t('statusPlaceholder')} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>{t('socialLinks')}</CardTitle>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setData({ ...data, socials: [...data.socials, { platform: '', url: '', label: '' }] })}
          >
            {t('add')}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3 text-xs text-zinc-400 w-full hidden md:flex mb-2 px-1">
            <div className="w-[30%]">{t('iconSelect')}</div>
            <div className="w-[25%]">{t('displayName')}</div>
            <div className="flex-1">{t('url')}</div>
          </div>
          {data.socials.map((social, idx) => (
            <div key={idx} className="flex flex-col md:flex-row gap-3 items-start md:items-center p-3 md:p-0 border border-zinc-800 md:border-none rounded-lg">
              <div className="w-full md:w-[30%] flex gap-2">
                <Input value={social.platform} onChange={(e) => { const s = [...data.socials]; s[idx].platform = e.target.value; setData({ ...data, socials: s }) }} placeholder={t('iconPlaceholder')} />
                <Button variant="outline" size="icon" className="shrink-0 h-9 w-9 bg-zinc-800" title={t('iconSelect')} onClick={() => {
                    openIconModal('socials', (iconName: string) => {
                      const s = [...data.socials];
                      s[idx].platform = iconName;
                      setData({ ...data, socials: s });
                    });
                  }}>
                  <LayoutGrid size={16} />
                </Button>
                <Button variant="ghost" size="icon" className="shrink-0 h-9 w-9 text-zinc-400 hover:text-white" onClick={openFaHelp} title={t('howToUse')}>
                  ?
                </Button>
              </div>
              <Input className="w-full md:w-[25%]" value={social.label} onChange={(e) => { const s = [...data.socials]; s[idx].label = e.target.value; setData({ ...data, socials: s }) }} placeholder={t('labelPlaceholder')} />
              <div className="w-full flex-1 flex gap-3">
                <Input value={social.url} onChange={(e) => { const s = [...data.socials]; s[idx].url = e.target.value; setData({ ...data, socials: s }) }} placeholder="URL" />
                <Button variant="destructive" className="shrink-0" onClick={() => { const s = data.socials.filter((_, i) => i !== idx); setData({ ...data, socials: s }) }}>{t('delete')}</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
