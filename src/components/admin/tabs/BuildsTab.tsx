import { PortfolioData } from '@/types/portfolio';
import { Card, CardContent } from '@/components/ui/Card';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Image as ImageIcon, GripVertical } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Reorder } from 'framer-motion';
import { BuildProject } from '@/types/portfolio';
import DraggableItem from '@/components/admin/DraggableItem';

interface BuildsTabProps {
  data: PortfolioData;
  setData: (data: PortfolioData) => void;
  openImageModal: (callback: (url: string) => void) => void;
  openConfirmModal: (title: string, desc: string, onConfirm: () => void) => void;
}

export default function BuildsTab({ data, setData, openImageModal, openConfirmModal }: BuildsTabProps) {
  const t = useTranslations('BuildsTab');
  
  const handleReorder = (newOrder: BuildProject[]) => {
    const updated = newOrder.map((item, index) => ({ ...item, order: index + 1 }));
    setData({ ...data, builds: updated });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">{t('title')}</h2>
        <Button variant="default" onClick={() => setData({ ...data, builds: [...data.builds, { id: Date.now().toString(), title: t('newBuild'), description: '', platformBadge: 'WEB', roleTags: [], iconUrl: '', links: {}, order: data.builds.length > 0 ? Math.max(...data.builds.map(b => b.order || 0)) + 1 : 1 }] })}>
          {t('addBuild')}
        </Button>
      </div>

      <Reorder.Group axis="y" values={data.builds} onReorder={handleReorder} className="grid gap-6">
        {data.builds.map((build, idx) => (
          <DraggableItem key={build.id} value={build}>
            {(controls) => (
              <Card className="relative group">
                <div 
                  className="absolute top-4 right-4 cursor-grab active:cursor-grabbing z-10 text-zinc-500 hover:text-zinc-300 transition-colors touch-none select-none"
                  onPointerDown={(e) => {
                    controls.start(e);
                    e.preventDefault();
                  }}
                >
                  <GripVertical size={20} />
                </div>
                <CardContent className="pt-12 space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 space-y-1">
                  <Label>{t('buildTitle')}</Label>
                  <Input value={build.title} onChange={(e) => { const n = [...data.builds]; n[idx].title = e.target.value; setData({ ...data, builds: n }) }} />
                </div>
                <div className="space-y-1">
                  <Label>{t('platform')}</Label>
                  <Input value={build.platformBadge} onChange={(e) => { const n = [...data.builds]; n[idx].platformBadge = e.target.value; setData({ ...data, builds: n }) }} />
                </div>
              </div>
              <div className="space-y-1">
                <Label>{t('description')}</Label>
                <Textarea value={build.description} onChange={(e) => { const n = [...data.builds]; n[idx].description = e.target.value; setData({ ...data, builds: n }) }} />
              </div>
              <div className="space-y-1">
                <Label>{t('iconUrl')}</Label>
                <div className="flex gap-2">
                  <Input value={build.iconUrl || ''} onChange={(e) => { const n = [...data.builds]; n[idx].iconUrl = e.target.value; setData({ ...data, builds: n }) }} />
                  <Button variant="outline" onClick={() => openImageModal((url) => { const n = [...data.builds]; n[idx].iconUrl = url; setData({ ...data, builds: n }) })} className="whitespace-nowrap"><ImageIcon size={16} /> {t('select')}</Button>
                </div>
              </div>
              <div className="space-y-1">
                <Label>{t('roles')}</Label>
                <Input value={build.roleTags.join(',')} onChange={(e) => { const n = [...data.builds]; n[idx].roleTags = e.target.value.split(','); setData({ ...data, builds: n }) }} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>{t('website')}</Label>
                  <Input value={build.links?.website || ''} onChange={(e) => { const n = [...data.builds]; n[idx].links = { ...n[idx].links, website: e.target.value }; setData({ ...data, builds: n }) }} />
                </div>
                <div className="space-y-1">
                  <Label>{t('githubUrl')}</Label>
                  <Input value={build.links?.githubUrl || ''} onChange={(e) => { const n = [...data.builds]; n[idx].links = { ...n[idx].links, githubUrl: e.target.value }; setData({ ...data, builds: n }) }} />
                </div>
                <div className="space-y-1">
                  <Label>{t('googlePlay')}</Label>
                  <Input value={build.links?.googlePlay || ''} onChange={(e) => { const n = [...data.builds]; n[idx].links = { ...n[idx].links, googlePlay: e.target.value }; setData({ ...data, builds: n }) }} />
                </div>
                <div className="space-y-1">
                  <Label>{t('appStore')}</Label>
                  <Input value={build.links?.appStore || ''} onChange={(e) => { const n = [...data.builds]; n[idx].links = { ...n[idx].links, appStore: e.target.value }; setData({ ...data, builds: n }) }} />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="destructive" onClick={() => openConfirmModal(t('deleteConfirmTitle'), t('deleteConfirmDesc'), () => setData({ ...data, builds: data.builds.filter((_, i) => i !== idx) }))}>{t('delete')}</Button>
              </div>
            </CardContent>
          </Card>
            )}
          </DraggableItem>
        ))}
      </Reorder.Group>
    </div>
  );
}
