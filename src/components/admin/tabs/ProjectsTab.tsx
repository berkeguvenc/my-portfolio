import { PortfolioData } from '@/types/portfolio';
import { Card, CardContent } from '@/components/ui/Card';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Image as ImageIcon, GripVertical } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Reorder } from 'framer-motion';
import { FeaturedProject } from '@/types/portfolio';

interface ProjectsTabProps {
  data: PortfolioData;
  setData: (data: PortfolioData) => void;
  openImageModal: (callback: (url: string) => void) => void;
  openConfirmModal: (title: string, desc: string, onConfirm: () => void) => void;
}

export default function ProjectsTab({ data, setData, openImageModal, openConfirmModal }: ProjectsTabProps) {
  const t = useTranslations('ProjectsTab');
  
  const handleReorder = (newOrder: FeaturedProject[]) => {
    const updated = newOrder.map((item, index) => ({ ...item, order: index + 1 }));
    setData({ ...data, featuredProjects: updated });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">{t('title')}</h2>
        <Button variant="default" onClick={() => setData({ ...data, featuredProjects: [...data.featuredProjects, { id: Date.now().toString(), title: t('newProjectTitle'), description: '', categoryTags: [], coverImage: '', websiteUrl: '', githubUrl: '', featured: true, order: data.featuredProjects.length > 0 ? Math.max(...data.featuredProjects.map(p => p.order || 0)) + 1 : 1 }] })}>
          {t('addProject')}
        </Button>
      </div>

      <Reorder.Group axis="y" values={data.featuredProjects} onReorder={handleReorder} className="grid gap-6">
        {data.featuredProjects.map((project, idx) => (
          <Reorder.Item key={project.id} value={project}>
            <Card className="relative group">
              <div className="absolute top-4 left-4 cursor-grab active:cursor-grabbing z-10 text-zinc-500 hover:text-zinc-300 transition-colors">
                <GripVertical size={20} />
              </div>
              <CardContent className="pt-12 space-y-4">
                <div className="space-y-1">
                  <Label>{t('projectTitle')}</Label>
                  <Input value={project.title} onChange={(e) => { const n = [...data.featuredProjects]; n[idx].title = e.target.value; setData({ ...data, featuredProjects: n }) }} />
                </div>
              <div className="space-y-1">
                <Label>{t('description')}</Label>
                <Textarea value={project.description} onChange={(e) => { const n = [...data.featuredProjects]; n[idx].description = e.target.value; setData({ ...data, featuredProjects: n }) }} />
              </div>
              <div className="space-y-1">
                <Label>{t('imageUrl')}</Label>
                <div className="flex gap-2">
                  <Input value={project.coverImage} onChange={(e) => { const n = [...data.featuredProjects]; n[idx].coverImage = e.target.value; setData({ ...data, featuredProjects: n }) }} />
                  <Button variant="outline" onClick={() => openImageModal((url) => { const n = [...data.featuredProjects]; n[idx].coverImage = url; setData({ ...data, featuredProjects: n }) })} className="whitespace-nowrap"><ImageIcon size={16} /> {t('select')}</Button>
                </div>
              </div>
              <div className="space-y-1">
                <Label>{t('categoryTags')}</Label>
                <Input value={project.categoryTags.join(',')} onChange={(e) => { const n = [...data.featuredProjects]; n[idx].categoryTags = e.target.value.split(','); setData({ ...data, featuredProjects: n }) }} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>{t('websiteUrl')}</Label>
                  <Input value={project.websiteUrl || ''} onChange={(e) => { const n = [...data.featuredProjects]; n[idx].websiteUrl = e.target.value; setData({ ...data, featuredProjects: n }) }} />
                </div>
                <div className="space-y-1">
                  <Label>{t('githubUrl')}</Label>
                  <Input value={project.githubUrl || ''} onChange={(e) => { const n = [...data.featuredProjects]; n[idx].githubUrl = e.target.value; setData({ ...data, featuredProjects: n }) }} />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="destructive" onClick={() => openConfirmModal(t('deleteConfirmTitle'), t('deleteConfirmDesc'), () => setData({ ...data, featuredProjects: data.featuredProjects.filter((_, i) => i !== idx) }))}>{t('deleteProject')}</Button>
              </div>
            </CardContent>
          </Card>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}
