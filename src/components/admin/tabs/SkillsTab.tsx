import { PortfolioData } from '@/types/portfolio';
import { Card, CardContent } from '@/components/ui/Card';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { LayoutGrid } from 'lucide-react';

interface SkillsTabProps {
  data: PortfolioData;
  setData: (data: PortfolioData) => void;
  openIconModal: (type: 'common' | 'socials', callback: (iconName: string) => void) => void;
  openLucideHelp: () => void;
  openSimpleIconsHelp: () => void;
}

export default function SkillsTab({ data, setData, openIconModal, openLucideHelp, openSimpleIconsHelp }: SkillsTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Yetenek Kategorileri</h2>
        <Button variant="default" onClick={() => setData({ ...data, skills: [...data.skills, { categoryName: 'Yeni Kategori', skills: [] }] })}>
          + Yeni Kategori Ekle
        </Button>
      </div>
      <div className="grid gap-6">
        {data.skills.map((category, idx) => (
          <Card key={idx} className="relative group">
            <Button variant="ghost" size="sm" className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity z-10" onClick={() => setData({ ...data, skills: data.skills.filter((_, i) => i !== idx) })}>Sil</Button>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-1">
                <Label>Kategori Adı</Label>
                <Input value={category.categoryName} onChange={(e) => { const n = [...data.skills]; n[idx].categoryName = e.target.value; setData({ ...data, skills: n }); }} className="font-medium" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-zinc-400">Yetenekler (Virgülle ayırın)</Label>
                <Input value={category.skills.join(',')} onChange={(e) => { const n = [...data.skills]; n[idx].skills = e.target.value.split(','); setData({ ...data, skills: n }); }} placeholder="Örn: TypeScript, React, Node.js" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <Label className="text-xs text-zinc-400">Kategori İkonu (Lucide)</Label>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-zinc-400 hover:text-white" onClick={openLucideHelp} title="Nasıl Kullanılır?">?</Button>
                  </div>
                  <div className="flex gap-2">
                    <Input value={category.lucideIcon || ''} onChange={(e) => { const n = [...data.skills]; n[idx].lucideIcon = e.target.value; setData({ ...data, skills: n }); }} placeholder="Boş bırakırsanız ikon gözükmez" />
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="shrink-0 h-9 w-9 bg-zinc-800"
                      title="İkon Seç"
                      onClick={() => {
                        openIconModal('common', (iconName: string) => {
                          const n = [...data.skills];
                          n[idx].lucideIcon = iconName;
                          setData({ ...data, skills: n });
                        });
                      }}
                    >
                      <LayoutGrid size={16} />
                    </Button>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <Label className="text-xs text-zinc-400">Teknoloji Logoları (SimpleIcons slug)</Label>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-zinc-400 hover:text-white" onClick={openSimpleIconsHelp} title="Nasıl Kullanılır?">?</Button>
                  </div>
                  <Input value={(category.icons || []).join(',')} onChange={(e) => { const n = [...data.skills]; n[idx].icons = e.target.value.split(','); setData({ ...data, skills: n }); }} placeholder="Örn: typescript, react, nodedotjs" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
