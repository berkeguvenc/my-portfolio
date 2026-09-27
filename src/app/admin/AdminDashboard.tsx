'use client';

import { useState } from 'react';
import { PortfolioData, SocialLink } from '@/types/portfolio';
import * as LucideIcons from 'lucide-react';
import { Save, Copy, Loader2, Image as ImageIcon, X, Upload, LayoutGrid } from 'lucide-react';

import IconPickerModal from '@/components/admin/IconPickerModal';
import HelpModals from '@/components/admin/HelpModals';
import ImagePickerModal from '@/components/admin/ImagePickerModal';

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
              <div className="space-y-1">
                <Label>Hakkında (About)</Label>
                <Textarea value={data.personal.about || ''} onChange={(e) => setData({ ...data, personal: { ...data.personal, about: e.target.value } })} rows={5} />
              </div>
              <div className="space-y-1">
                <Label>Hakkında (About) Görseli</Label>
                <div className="flex gap-2">
                  <Input value={data.personal.aboutImage || ''} onChange={(e) => setData({ ...data, personal: { ...data.personal, aboutImage: e.target.value } })} />
                  <Button variant="outline" onClick={() => openImageModal((url) => setData({ ...data, personal: { ...data.personal, aboutImage: url } }))} className="gap-2 whitespace-nowrap"><ImageIcon size={16} /> Seç</Button>
                </div>
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
              <Button variant="outline" size="sm" onClick={() => setData({ ...data, socials: [...data.socials, { platform: 'Globe', label: 'Yeni Link', url: '' }] })}>
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
                        setIconModalTarget(() => (iconName: string) => {
                          const s = [...data.socials];
                          s[idx].platform = iconName;
                          setData({ ...data, socials: s });
                        });
                        setIconModalType('socials');
                        setIsIconModalOpen(true);
                      }}>
                      <LayoutGrid size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="shrink-0 h-9 w-9 text-zinc-400 hover:text-white" onClick={() => setIsFaHelpOpen(true)} title="Nasıl Kullanılır?">
                      ?
                    </Button>
                  </div>
                  <Input value={social.label} onChange={(e) => { const s = [...data.socials]; s[idx].label = e.target.value; setData({ ...data, socials: s }) }} placeholder="İsim (örn: LinkedIn)" className="w-full md:w-[25%]" />
                  <Input value={social.url} onChange={(e) => { const s = [...data.socials]; s[idx].url = e.target.value; setData({ ...data, socials: s }) }} placeholder="URL (https://...)" className="w-full md:flex-1" />
                  <Button variant="ghost" className="text-red-400 hover:text-red-500 hover:bg-red-400/10 w-full md:w-auto mt-1 md:mt-0" onClick={() => setData({ ...data, socials: data.socials.filter((_, i) => i !== idx) })}>Sil</Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>Footer Ayarları</CardTitle>
              <Button variant="outline" size="sm" onClick={() => setData({ ...data, footer: { ...data.footer, links: [...(data.footer?.links || []), { label: 'Yeni Link', url: '' }] } })}>
                + Link Ekle
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label>Footer Metni (Telif Hakkı vs.)</Label>
                <Input value={data.footer?.text || ''} onChange={(e) => setData({ ...data, footer: { ...data.footer, text: e.target.value } })} placeholder="Örn: © 2026 John Doe" />
              </div>
              <div className="space-y-3">
                <Label className="text-zinc-400">Özel Linkler</Label>
                {(data.footer?.links || []).map((link, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <Input value={link.label} onChange={(e) => { const l = [...(data.footer?.links || [])]; l[idx].label = e.target.value; setData({ ...data, footer: { ...data.footer, links: l } }) }} placeholder="Link Adı (Örn: Özgeçmiş)" className="w-1/2" />
                    <Input value={link.url} onChange={(e) => { const l = [...(data.footer?.links || [])]; l[idx].url = e.target.value; setData({ ...data, footer: { ...data.footer, links: l } }) }} placeholder="URL (/resume.pdf)" />
                    <Button variant="ghost" className="text-red-400 hover:text-red-500 hover:bg-red-400/10" onClick={() => setData({ ...data, footer: { ...data.footer, links: (data.footer?.links || []).filter((_, i) => i !== idx) } })}>X</Button>
                  </div>
                ))}
              </div>
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
                      <Input value={build.roleTags.join(',')} onChange={(e) => { const n = [...data.builds]; n[idx].roleTags = e.target.value.split(','); setData({ ...data, builds: n }) }} />
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
                      <Label>Google Play URL</Label>
                      <Input value={build.links?.googlePlay || ''} onChange={(e) => { const n = [...data.builds]; n[idx].links = { ...n[idx].links, googlePlay: e.target.value }; setData({ ...data, builds: n }) }} />
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

        <TabsContent value="skills" className="space-y-6">
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
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-zinc-400 hover:text-white" onClick={() => setIsLucideHelpOpen(true)} title="Nasıl Kullanılır?">?</Button>
                      </div>
                      <div className="flex gap-2">
                        <Input value={category.lucideIcon || ''} onChange={(e) => { const n = [...data.skills]; n[idx].lucideIcon = e.target.value; setData({ ...data, skills: n }); }} placeholder="Boş bırakırsanız ikon gözükmez" />
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="shrink-0 h-9 w-9 bg-zinc-800"
                          title="İkon Seç"
                          onClick={() => {
                            setIconModalTarget(() => (iconName: string) => {
                              const n = [...data.skills];
                              n[idx].lucideIcon = iconName;
                              setData({ ...data, skills: n });
                            });
                            setIconModalType('common');
                            setIsIconModalOpen(true);
                          }}
                        >
                          <LayoutGrid size={16} />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <Label className="text-xs text-zinc-400">Teknoloji Logoları (SimpleIcons slug)</Label>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-zinc-400 hover:text-white" onClick={() => setIsSimpleIconsHelpOpen(true)} title="Nasıl Kullanılır?">?</Button>
                      </div>
                      <Input value={(category.icons || []).join(',')} onChange={(e) => { const n = [...data.skills]; n[idx].icons = e.target.value.split(','); setData({ ...data, skills: n }); }} placeholder="Örn: typescript, react, nodedotjs" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
                  <div className="space-y-1">
                    <Label>Rol / Pozisyon</Label>
                    <Input value={exp.role} onChange={(e) => { const n = [...data.experiences]; n[idx].role = e.target.value; setData({ ...data, experiences: n }); }} />
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
                    <Label>Açıklama (Opsiyonel)</Label>
                    <Textarea value={exp.description || ''} onChange={(e) => { const n = [...data.experiences]; n[idx].description = e.target.value; setData({ ...data, experiences: n }); }} placeholder="Bu rolde neler yaptınız?" rows={3} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label>Şirket URL (Opsiyonel)</Label>
                      <Input value={exp.companyUrl || ''} onChange={(e) => { const n = [...data.experiences]; n[idx].companyUrl = e.target.value; setData({ ...data, experiences: n }); }} />
                    </div>
                    <div className="space-y-1">
                      <Label>Sıra</Label>
                      <Input type="number" value={exp.order} onChange={(e) => { const n = [...data.experiences]; n[idx].order = Number(e.target.value); setData({ ...data, experiences: n }); }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
