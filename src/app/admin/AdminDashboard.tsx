'use client';

import { useState } from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Save, Copy, Loader2, Image as ImageIcon, X, Upload } from 'lucide-react';
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
  const [availableImages, setAvailableImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const openImageModal = async (callback: (url: string) => void) => {
    setImageModalTarget(() => callback);
    setIsImageModalOpen(true);
    try {
      const res = await fetch('/api/admin/images');
      if (res.ok) {
        const fetchedData = await res.json();
        setAvailableImages(fetchedData.images);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    
    setIsUploading(true);
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        const uploadedData = await res.json();
        setAvailableImages(prev => [uploadedData.url, ...prev]);
        if (imageModalTarget) {
          imageModalTarget(uploadedData.url);
          setIsImageModalOpen(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
    setIsUploading(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/admin/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
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
    <div className="space-y-6 mt-6">
      <div className="flex flex-col sm:flex-row justify-between items-center bg-zinc-900 border border-zinc-800 p-4 rounded-xl gap-4">
        <h2 className="text-xl font-bold">Portfolyo İçerik Yönetimi</h2>
        <div className="flex items-center gap-3">
          {message && <span className="text-sm text-emerald-400 font-medium">{message}</span>}
          <Button variant="outline" onClick={copyJson} className="gap-2">
            <Copy size={16} /> JSON
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="genel">
        <TabsList className="grid grid-cols-5 bg-zinc-900/50 p-1 mb-6 rounded-lg w-full max-w-3xl overflow-x-auto">
          <TabsTrigger value="genel">Genel & Sosyal</TabsTrigger>
          <TabsTrigger value="work">Projeler</TabsTrigger>
          <TabsTrigger value="builds">Ürünler (Builds)</TabsTrigger>
          <TabsTrigger value="skills">Yetenekler</TabsTrigger>
          <TabsTrigger value="experience">Deneyim</TabsTrigger>
        </TabsList>

        <TabsContent value="genel" className="space-y-6">
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
              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" id="isAvailable" checked={data.personal.isAvailableForWork} onChange={(e) => setData({ ...data, personal: { ...data.personal, isAvailableForWork: e.target.checked } })} className="w-4 h-4 rounded border-zinc-800 bg-zinc-950" />
                <Label htmlFor="isAvailable" className="cursor-pointer">Yeni projeler için uygun (Available for work)</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>Sosyal Medya Linkleri</CardTitle>
              <Button variant="outline" size="sm" onClick={() => setData({ ...data, socials: [...data.socials, { platform: 'x', label: 'Yeni Link', url: '' }] })}>
                + Ekle
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.socials.map((social, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <Input value={social.platform} onChange={(e) => { const s = [...data.socials]; s[idx].platform = e.target.value; setData({ ...data, socials: s }) }} placeholder="Platform (github vb.)" className="w-1/4" />
                  <Input value={social.label} onChange={(e) => { const s = [...data.socials]; s[idx].label = e.target.value; setData({ ...data, socials: s }) }} placeholder="Görünecek İsim" className="w-1/4" />
                  <Input value={social.url} onChange={(e) => { const s = [...data.socials]; s[idx].url = e.target.value; setData({ ...data, socials: s }) }} placeholder="URL" />
                  <Button variant="ghost" className="text-red-400 hover:text-red-500 hover:bg-red-400/10" onClick={() => setData({ ...data, socials: data.socials.filter((_, i) => i !== idx) })}>X</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="work" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Öne Çıkan Projeler (Work)</h2>
            <Button variant="default" onClick={() => setData({ ...data, featuredProjects: [...data.featuredProjects, { id: Date.now().toString(), title: 'Yeni Proje', description: '', categoryTags: [], coverImage: '', demoUrl: '', githubUrl: '', featured: true, order: data.featuredProjects.length }] })}>
              + Yeni Proje Ekle
            </Button>
          </div>
          <div className="grid gap-6">
            {data.featuredProjects.map((project, idx) => (
              <Card key={project.id} className="relative group">
                <Button variant="ghost" size="sm" className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity z-10" onClick={() => setData({ ...data, featuredProjects: data.featuredProjects.filter((_, i) => i !== idx) })}>Sil</Button>
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
                    <Input value={project.categoryTags.join(', ')} onChange={(e) => { const n = [...data.featuredProjects]; n[idx].categoryTags = e.target.value.split(',').map(t=>t.trim()).filter(Boolean); setData({ ...data, featuredProjects: n }) }} />
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
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="builds" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Ürünler (Builds)</h2>
            <Button variant="default" onClick={() => setData({ ...data, builds: [...data.builds, { id: Date.now().toString(), title: 'Yeni Build', description: '', platformBadge: 'WEB', roleTags: [], iconUrl: '', links: {}, order: data.builds.length }] })}>
              + Yeni Ürün Ekle
            </Button>
          </div>
          <div className="grid gap-6">
            {data.builds.map((build, idx) => (
              <Card key={build.id} className="relative group">
                <Button variant="ghost" size="sm" className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity z-10" onClick={() => setData({ ...data, builds: data.builds.filter((_, i) => i !== idx) })}>Sil</Button>
                <CardContent className="pt-6 space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 space-y-1">
                      <Label>Başlık</Label>
                      <Input value={build.title} onChange={(e) => { const n = [...data.builds]; n[idx].title = e.target.value; setData({ ...data, builds: n }) }} />
                    </div>
                    <div className="space-y-1">
                      <Label>Platform</Label>
                      <Input value={build.platformBadge} onChange={(e) => { const n = [...data.builds]; n[idx].platformBadge = e.target.value; setData({ ...data, builds: n }) }} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label>Açıklama</Label>
                    <Textarea value={build.description} onChange={(e) => { const n = [...data.builds]; n[idx].description = e.target.value; setData({ ...data, builds: n }) }} />
                  </div>
                  <div className="space-y-1">
                    <Label>İkon/Logo URL</Label>
                    <div className="flex gap-2">
                      <Input value={build.iconUrl || ''} onChange={(e) => { const n = [...data.builds]; n[idx].iconUrl = e.target.value; setData({ ...data, builds: n }) }} />
                      <Button variant="outline" onClick={() => openImageModal((url) => { const n = [...data.builds]; n[idx].iconUrl = url; setData({ ...data, builds: n }) })} className="whitespace-nowrap"><ImageIcon size={16} /> Seç</Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label>Roller (Virgülle ayırın)</Label>
                      <Input value={build.roleTags.join(', ')} onChange={(e) => { const n = [...data.builds]; n[idx].roleTags = e.target.value.split(',').map(t=>t.trim()).filter(Boolean); setData({ ...data, builds: n }) }} />
                    </div>
                    <div className="space-y-1">
                      <Label>Sıra</Label>
                      <Input type="number" value={build.order} onChange={(e) => { const n = [...data.builds]; n[idx].order = Number(e.target.value); setData({ ...data, builds: n }) }} />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <Label>Website URL</Label>
                      <Input value={build.links?.website || ''} onChange={(e) => { const n = [...data.builds]; n[idx].links = { ...n[idx].links, website: e.target.value }; setData({ ...data, builds: n }) }} />
                    </div>
                    <div className="space-y-1">
                      <Label>Github URL</Label>
                      <Input value={build.links?.github || ''} onChange={(e) => { const n = [...data.builds]; n[idx].links = { ...n[idx].links, github: e.target.value }; setData({ ...data, builds: n }) }} />
                    </div>
                    <div className="space-y-1">
                      <Label>App Store URL</Label>
                      <Input value={build.links?.appStore || ''} onChange={(e) => { const n = [...data.builds]; n[idx].links = { ...n[idx].links, appStore: e.target.value }; setData({ ...data, builds: n }) }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-8">
          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>Yetenek Kategorileri</CardTitle>
              <Button variant="outline" size="sm" onClick={() => setData({ ...data, skills: [...data.skills, { categoryName: 'Yeni Kategori', skills: [] }] })}>
                + Kategori Ekle
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.skills.map((category, idx) => (
                <div key={idx} className="flex gap-4 items-start p-4 border border-zinc-800 rounded-lg">
                  <div className="flex-1 space-y-3">
                    <Input value={category.categoryName} onChange={(e) => { const n = [...data.skills]; n[idx].categoryName = e.target.value; setData({ ...data, skills: n }); }} placeholder="Kategori Adı" className="font-bold border-none px-0 text-lg shadow-none" />
                    <Input value={category.skills.join(', ')} onChange={(e) => { const n = [...data.skills]; n[idx].skills = e.target.value.split(',').map(s => s.trim()).filter(Boolean); setData({ ...data, skills: n }); }} placeholder="Yetenekler (virgülle ayırın)" />
                  </div>
                  <Button variant="ghost" className="text-red-400" onClick={() => setData({ ...data, skills: data.skills.filter((_, i) => i !== idx) })}>Sil</Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>Araçlar & Teknolojiler</CardTitle>
              <Button variant="outline" size="sm" onClick={() => setData({ ...data, tools: [...(data.tools || []), { name: 'Yeni Araç' }] })}>
                + Araç Ekle
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {(data.tools || []).map((tool, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <Input value={tool.name} onChange={(e) => { const t = [...data.tools]; t[idx].name = e.target.value; setData({ ...data, tools: t }); }} placeholder="Araç Adı (Örn: Figma)" className="flex-1" />
                  <Input value={tool.iconName || ''} onChange={(e) => { const t = [...data.tools]; t[idx].iconName = e.target.value; setData({ ...data, tools: t }); }} placeholder="İkon Adı (opsiyonel)" className="w-1/3" />
                  <Button variant="ghost" className="text-red-400 hover:text-red-500 hover:bg-red-400/10" onClick={() => setData({ ...data, tools: data.tools.filter((_, i) => i !== idx) })}>X</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experience" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Deneyim (Experience)</h2>
            <Button variant="default" onClick={() => setData({ ...data, experiences: [...data.experiences, { id: Date.now().toString(), period: 'YYYY - YYYY', company: 'Şirket', role: 'Rol', order: data.experiences.length }] })}>
              + Yeni Deneyim Ekle
            </Button>
          </div>
          <div className="grid gap-6">
            {data.experiences.map((exp, idx) => (
              <Card key={exp.id} className="relative group">
                <Button variant="ghost" size="sm" className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity z-10" onClick={() => setData({ ...data, experiences: data.experiences.filter((_, i) => i !== idx) })}>Sil</Button>
                <CardContent className="pt-6 space-y-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-3 space-y-1">
                      <Label>Rol / Pozisyon</Label>
                      <Input value={exp.role} onChange={(e) => { const n = [...data.experiences]; n[idx].role = e.target.value; setData({ ...data, experiences: n }); }} />
                    </div>
                    <div className="space-y-1">
                      <Label>Sıra</Label>
                      <Input type="number" value={exp.order} onChange={(e) => { const n = [...data.experiences]; n[idx].order = Number(e.target.value); setData({ ...data, experiences: n }); }} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label>Şirket</Label>
                      <Input value={exp.company} onChange={(e) => { const n = [...data.experiences]; n[idx].company = e.target.value; setData({ ...data, experiences: n }); }} />
                    </div>
                    <div className="space-y-1">
                      <Label>Dönem</Label>
                      <Input value={exp.period} onChange={(e) => { const n = [...data.experiences]; n[idx].period = e.target.value; setData({ ...data, experiences: n }); }} placeholder="Örn: 2024 - Present" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label>Şirket URL (Opsiyonel)</Label>
                    <Input value={exp.companyUrl || ''} onChange={(e) => { const n = [...data.experiences]; n[idx].companyUrl = e.target.value; setData({ ...data, experiences: n }); }} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {isImageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <Card className="w-full max-w-3xl max-h-[80vh] flex flex-col">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>Görsel Seç / Yükle</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setIsImageModalOpen(false)}><X size={20} /></Button>
            </CardHeader>
            <CardContent className="flex flex-col flex-1 overflow-hidden space-y-6">
              <div>
                <label className="flex flex-col items-center justify-center w-full h-32 px-4 transition bg-zinc-950 border-2 border-zinc-800 border-dashed rounded-xl cursor-pointer hover:border-emerald-500/50">
                  <div className="flex items-center space-x-2">
                    {isUploading ? <Loader2 className="animate-spin text-zinc-400" size={24} /> : <Upload className="text-zinc-400" size={24} />}
                    <span className="font-medium text-zinc-400">{isUploading ? 'Yükleniyor...' : 'Yeni Görsel Yükle (Tıkla veya Sürükle)'}</span>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isUploading} />
                </label>
              </div>

              <div className="flex-1 overflow-y-auto min-h-0">
                <Label className="mb-4 block">Mevcut Görseller</Label>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
                  {availableImages.map((img, i) => (
                    <div key={i} onClick={() => { if(imageModalTarget) imageModalTarget(img); setIsImageModalOpen(false); }} className="relative aspect-square rounded-lg border border-zinc-800 overflow-hidden bg-zinc-950 cursor-pointer group hover:border-emerald-500">
                      <img src={img} alt="media" className="object-cover w-full h-full opacity-70 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-0 flex items-end p-2 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[10px] text-zinc-300 truncate w-full">{img.split('/').pop()}</span>
                      </div>
                    </div>
                  ))}
                  {availableImages.length === 0 && (
                    <div className="col-span-full py-8 text-center text-zinc-500 text-sm">Hiç görsel bulunamadı.</div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
