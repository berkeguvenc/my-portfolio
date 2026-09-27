import { PortfolioData } from '@/types/portfolio';
import { Card, CardContent } from '@/components/ui/Card';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Image as ImageIcon } from 'lucide-react';

interface ProjectsTabProps {
  data: PortfolioData;
  setData: (data: PortfolioData) => void;
  openImageModal: (callback: (url: string) => void) => void;
}

export default function ProjectsTab({ data, setData, openImageModal }: ProjectsTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Öne Çıkan Projeler (Featured Work)</h2>
        <Button variant="default" onClick={() => setData({ ...data, featuredProjects: [...data.featuredProjects, { id: Date.now().toString(), title: 'Yeni Proje', description: '', categoryTags: [], coverImage: '', demoUrl: '', githubUrl: '', featured: true, order: data.featuredProjects.length }] })}>
          + Yeni Proje Ekle
        </Button>
      </div>

      <div className="grid gap-6">
        {data.featuredProjects.map((project, idx) => (
          <Card key={project.id} className="relative group">
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Proje Başlığı</Label>
                  <Input value={project.title} onChange={(e) => { const n = [...data.featuredProjects]; n[idx].title = e.target.value; setData({ ...data, featuredProjects: n }) }} />
                </div>
                <div className="space-y-1">
                  <Label>Sıra (Order)</Label>
                  <Input type="number" value={project.order} onChange={(e) => { const n = [...data.featuredProjects]; n[idx].order = Number(e.target.value); setData({ ...data, featuredProjects: n }) }} />
                </div>
              </div>
              <div className="space-y-1">
                <Label>Açıklama</Label>
                <Textarea value={project.description} onChange={(e) => { const n = [...data.featuredProjects]; n[idx].description = e.target.value; setData({ ...data, featuredProjects: n }) }} />
              </div>
              <div className="space-y-1">
                <Label>Görsel URL</Label>
                <div className="flex gap-2">
                  <Input value={project.coverImage} onChange={(e) => { const n = [...data.featuredProjects]; n[idx].coverImage = e.target.value; setData({ ...data, featuredProjects: n }) }} />
                  <Button variant="outline" onClick={() => openImageModal((url) => { const n = [...data.featuredProjects]; n[idx].coverImage = url; setData({ ...data, featuredProjects: n }) })} className="whitespace-nowrap"><ImageIcon size={16} /> Seç</Button>
                </div>
              </div>
              <div className="space-y-1">
                <Label>Kategori Etiketleri (Virgülle ayırın)</Label>
                <Input value={project.categoryTags.join(',')} onChange={(e) => { const n = [...data.featuredProjects]; n[idx].categoryTags = e.target.value.split(','); setData({ ...data, featuredProjects: n }) }} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Canlı Demo Linki</Label>
                  <Input value={project.demoUrl || ''} onChange={(e) => { const n = [...data.featuredProjects]; n[idx].demoUrl = e.target.value; setData({ ...data, featuredProjects: n }) }} />
                </div>
                <div className="space-y-1">
                  <Label>Github Linki</Label>
                  <Input value={project.githubUrl || ''} onChange={(e) => { const n = [...data.featuredProjects]; n[idx].githubUrl = e.target.value; setData({ ...data, featuredProjects: n }) }} />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="destructive" onClick={() => setData({ ...data, featuredProjects: data.featuredProjects.filter((_, i) => i !== idx) })}>Projeyi Sil</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
