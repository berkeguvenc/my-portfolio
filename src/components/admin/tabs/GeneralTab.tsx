import { PortfolioData } from '@/types/portfolio';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Image as ImageIcon, LayoutGrid } from 'lucide-react';

interface GeneralTabProps {
  data: PortfolioData;
  setData: (data: PortfolioData) => void;
  openImageModal: (callback: (url: string) => void) => void;
  openIconModal: (type: 'common' | 'socials', callback: (iconName: string) => void) => void;
  openFaHelp: () => void;
}

export default function GeneralTab({ data, setData, openImageModal, openIconModal, openFaHelp }: GeneralTabProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>SEO Meta Bilgileri</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label>Site Başlığı</Label>
            <Input value={data.meta.title} onChange={(e) => setData({ ...data, meta: { ...data.meta, title: e.target.value } })} />
          </div>
          <div className="space-y-1">
            <Label>Site Açıklaması</Label>
            <Textarea value={data.meta.description} onChange={(e) => setData({ ...data, meta: { ...data.meta, description: e.target.value } })} />
          </div>
          <div className="space-y-1">
            <Label>OG Görseli</Label>
            <div className="flex gap-2">
              <Input value={data.meta.ogImage} onChange={(e) => setData({ ...data, meta: { ...data.meta, ogImage: e.target.value } })} />
              <Button variant="outline" onClick={() => openImageModal((url) => setData({ ...data, meta: { ...data.meta, ogImage: url } }))} className="gap-2 whitespace-nowrap"><ImageIcon size={16} /> Seç</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Kişisel Bilgiler</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>İsim</Label>
              <Input value={data.personal.name} onChange={(e) => setData({ ...data, personal: { ...data.personal, name: e.target.value } })} />
            </div>
            <div className="space-y-1">
              <Label>Unvan</Label>
              <Input value={data.personal.role} onChange={(e) => setData({ ...data, personal: { ...data.personal, role: e.target.value } })} />
            </div>
          </div>
          <div className="space-y-1">
            <Label>Konum</Label>
            <Input value={data.personal.location || ''} onChange={(e) => setData({ ...data, personal: { ...data.personal, location: e.target.value } })} />
          </div>
          <div className="space-y-1">
            <Label>Avatar Görseli</Label>
            <div className="flex gap-2">
              <Input value={data.personal.avatarUrl || ''} onChange={(e) => setData({ ...data, personal: { ...data.personal, avatarUrl: e.target.value } })} />
              <Button variant="outline" onClick={() => openImageModal((url) => setData({ ...data, personal: { ...data.personal, avatarUrl: url } }))} className="gap-2 whitespace-nowrap"><ImageIcon size={16} /> Seç</Button>
            </div>
          </div>
          <div className="space-y-1">
            <Label>Özgeçmiş URL (Resume)</Label>
            <Input value={data.personal.resumeUrl || ''} onChange={(e) => setData({ ...data, personal: { ...data.personal, resumeUrl: e.target.value } })} />
          </div>
          <div className="space-y-1">
            <Label>Biyografi</Label>
            <Textarea value={data.personal.bio} onChange={(e) => setData({ ...data, personal: { ...data.personal, bio: e.target.value } })} rows={3} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Sosyal Medya Linkleri</CardTitle>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setData({ ...data, socials: [...data.socials, { platform: '', url: '', label: '' }] })}
          >
            + Ekle
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3 text-xs text-zinc-400 w-full hidden md:flex mb-2 px-1">
            <div className="w-[30%]">İkon Seçimi</div>
            <div className="w-[25%]">Görünecek İsim</div>
            <div className="flex-1">URL Linki</div>
          </div>
          {data.socials.map((social, idx) => (
            <div key={idx} className="flex flex-col md:flex-row gap-3 items-start md:items-center p-3 md:p-0 border border-zinc-800 md:border-none rounded-lg">
              <div className="w-full md:w-[30%] flex gap-2">
                <Input value={social.platform} onChange={(e) => { const s = [...data.socials]; s[idx].platform = e.target.value; setData({ ...data, socials: s }) }} placeholder="İkon (örn: Github)" />
                <Button variant="outline" size="icon" className="shrink-0 h-9 w-9 bg-zinc-800" title="İkon Seç" onClick={() => {
                    openIconModal('socials', (iconName: string) => {
                      const s = [...data.socials];
                      s[idx].platform = iconName;
                      setData({ ...data, socials: s });
                    });
                  }}>
                  <LayoutGrid size={16} />
                </Button>
                <Button variant="ghost" size="icon" className="shrink-0 h-9 w-9 text-zinc-400 hover:text-white" onClick={openFaHelp} title="Nasıl Kullanılır?">
                  ?
                </Button>
              </div>
              <Input className="w-full md:w-[25%]" value={social.label} onChange={(e) => { const s = [...data.socials]; s[idx].label = e.target.value; setData({ ...data, socials: s }) }} placeholder="örn: GitHub, Twitter" />
              <div className="w-full flex-1 flex gap-3">
                <Input value={social.url} onChange={(e) => { const s = [...data.socials]; s[idx].url = e.target.value; setData({ ...data, socials: s }) }} placeholder="URL" />
                <Button variant="destructive" className="shrink-0" onClick={() => { const s = data.socials.filter((_, i) => i !== idx); setData({ ...data, socials: s }) }}>Sil</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
