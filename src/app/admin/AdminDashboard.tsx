'use client';

import { useState } from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Save, Copy, Download, Loader2, Image as ImageIcon, X, Upload } from 'lucide-react';

export default function AdminDashboard({ initialData }: { initialData: PortfolioData }) {
  const [data, setData] = useState<PortfolioData>(initialData);
  const [activeTab, setActiveTab] = useState('genel');
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
        const data = await res.json();
        setAvailableImages(data.images);
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
        const data = await res.json();
        setAvailableImages(prev => [data.url, ...prev]);
        if (imageModalTarget) {
          imageModalTarget(data.url);
          setIsImageModalOpen(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
    setIsUploading(false);
  };

  const tabs = [
    { id: 'genel', label: 'Genel & Sosyal' },
    { id: 'work', label: 'Work (Projeler)' },
    { id: 'builds', label: 'Builds' },
    { id: 'skills', label: 'Skills & Tools' },
    { id: 'experience', label: 'Deneyim' },
  ];

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
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex w-full lg:w-auto overflow-x-auto no-scrollbar gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-zinc-800 text-zinc-100'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-3 w-full lg:w-auto justify-end flex-shrink-0">
          {message && <span className="text-sm text-emerald-400">{message}</span>}
          <button
            onClick={copyJson}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-zinc-900 border border-zinc-800 rounded-md hover:bg-zinc-800 transition-colors whitespace-nowrap"
          >
            <Copy size={16} /> JSON Kopyala
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-zinc-100 text-zinc-950 rounded-md hover:bg-white transition-colors disabled:opacity-50 whitespace-nowrap"
          >
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
          </button>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 min-h-[400px]">
        {activeTab === 'genel' && (
          <div className="space-y-8 max-w-2xl">
            {/* Meta */}
            <div>
              <h2 className="text-lg font-medium mb-4 text-zinc-100">Meta Bilgileri (SEO)</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Site Başlığı</label>
                  <input type="text" value={data.meta.title} onChange={(e) => setData({ ...data, meta: { ...data.meta, title: e.target.value } })} className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-zinc-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Site Açıklaması</label>
                  <textarea value={data.meta.description} onChange={(e) => setData({ ...data, meta: { ...data.meta, description: e.target.value } })} className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-zinc-500 resize-none" rows={2} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">OG Görseli (og.png)</label>
                  <div className="flex gap-2">
                    <input type="text" value={data.meta.ogImage} onChange={(e) => setData({ ...data, meta: { ...data.meta, ogImage: e.target.value } })} className="flex-1 bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-zinc-500" placeholder="/og.png" />
                    <button onClick={() => openImageModal((url) => setData({ ...data, meta: { ...data.meta, ogImage: url } }))} className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-sm rounded-md text-zinc-300 flex items-center gap-2"><ImageIcon size={16} /> Seç</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal */}
            <div className="pt-4 border-t border-zinc-800">
              <h2 className="text-lg font-medium mb-4 text-zinc-100">Kişisel Bilgiler & Görseller</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">İsim</label>
                    <input type="text" value={data.personal.name} onChange={(e) => setData({ ...data, personal: { ...data.personal, name: e.target.value } })} className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-zinc-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Unvan</label>
                    <input type="text" value={data.personal.role} onChange={(e) => setData({ ...data, personal: { ...data.personal, role: e.target.value } })} className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-zinc-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Konum</label>
                  <input type="text" value={data.personal.location || ''} onChange={(e) => setData({ ...data, personal: { ...data.personal, location: e.target.value } })} className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-zinc-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Avatar Görseli (URL veya /avatar.jpg)</label>
                  <div className="flex gap-2">
                    <input type="text" value={data.personal.avatarUrl || ''} onChange={(e) => setData({ ...data, personal: { ...data.personal, avatarUrl: e.target.value } })} className="flex-1 bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-zinc-500" placeholder="/avatar.jpg" />
                    <button onClick={() => openImageModal((url) => setData({ ...data, personal: { ...data.personal, avatarUrl: url } }))} className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-sm rounded-md text-zinc-300 flex items-center gap-2"><ImageIcon size={16} /> Seç</button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Özgeçmiş (Resume) URL</label>
                  <input type="text" value={data.personal.resumeUrl || ''} onChange={(e) => setData({ ...data, personal: { ...data.personal, resumeUrl: e.target.value } })} className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-zinc-500" placeholder="/resume.pdf" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Biyografi</label>
                  <textarea value={data.personal.bio} onChange={(e) => setData({ ...data, personal: { ...data.personal, bio: e.target.value } })} rows={3} className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-zinc-500 resize-none" />
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <input type="checkbox" id="isAvailable" checked={data.personal.isAvailableForWork} onChange={(e) => setData({ ...data, personal: { ...data.personal, isAvailableForWork: e.target.checked } })} className="rounded border-zinc-800 bg-zinc-950" />
                  <label htmlFor="isAvailable" className="text-sm font-medium text-zinc-300">Yeni projeler için uygun ("Available for work")</label>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="pt-4 border-t border-zinc-800">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-zinc-100">Sosyal Medya Linkleri</h2>
                <button onClick={() => setData({ ...data, socials: [...data.socials, { platform: 'x', label: 'Yeni Link', url: '' }] })} className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-sm rounded-md">+ Ekle</button>
              </div>
              <div className="space-y-3">
                {data.socials.map((social, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input type="text" value={social.platform} onChange={(e) => { const s = [...data.socials]; s[idx].platform = e.target.value; setData({ ...data, socials: s }) }} placeholder="Platform (github, x, vb.)" className="w-1/4 bg-zinc-950 border border-zinc-800 rounded-md px-3 py-1.5 text-sm" />
                    <input type="text" value={social.label} onChange={(e) => { const s = [...data.socials]; s[idx].label = e.target.value; setData({ ...data, socials: s }) }} placeholder="Görünecek İsim" className="w-1/4 bg-zinc-950 border border-zinc-800 rounded-md px-3 py-1.5 text-sm" />
                    <input type="text" value={social.url} onChange={(e) => { const s = [...data.socials]; s[idx].url = e.target.value; setData({ ...data, socials: s }) }} placeholder="URL" className="flex-1 bg-zinc-950 border border-zinc-800 rounded-md px-3 py-1.5 text-sm" />
                    <button onClick={() => setData({ ...data, socials: data.socials.filter((_, i) => i !== idx) })} className="text-red-400 hover:text-red-300 px-2">X</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'work' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Öne Çıkan Projeler (Work)</h2>
              <button
                onClick={() => setData({
                  ...data,
                  featuredProjects: [...data.featuredProjects, { id: Date.now().toString(), title: 'Yeni Proje', description: '', categoryTags: [], coverImage: '', demoUrl: '', githubUrl: '', featured: true, order: data.featuredProjects.length }]
                })}
                className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-sm rounded-md"
              >
                + Yeni Proje
              </button>
            </div>
            {data.featuredProjects.map((project, idx) => (
              <div key={project.id} className="p-4 border border-zinc-800 rounded-lg bg-zinc-950/50 space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1 space-y-3">
                    <input type="text" placeholder="Proje Başlığı" value={project.title} onChange={(e) => { const n = [...data.featuredProjects]; n[idx].title = e.target.value; setData({ ...data, featuredProjects: n }) }} className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm font-bold" />
                    <textarea placeholder="Açıklama" value={project.description} onChange={(e) => { const n = [...data.featuredProjects]; n[idx].description = e.target.value; setData({ ...data, featuredProjects: n }) }} className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm h-20 resize-none" />
                    <div className="flex gap-2">
                      <input type="text" placeholder="Görsel URL (/images/project.png)" value={project.coverImage} onChange={(e) => { const n = [...data.featuredProjects]; n[idx].coverImage = e.target.value; setData({ ...data, featuredProjects: n }) }} className="flex-1 bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm" />
                      <button onClick={() => openImageModal((url) => { const n = [...data.featuredProjects]; n[idx].coverImage = url; setData({ ...data, featuredProjects: n }) })} className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-sm rounded-md text-zinc-300 flex items-center"><ImageIcon size={16} /></button>
                    </div>
                    <div className="flex gap-2">
                      <input type="text" placeholder="Etiketler (virgülle ayırın, örn: DASHBOARD, WEB)" value={project.categoryTags.join(', ')} onChange={(e) => { const n = [...data.featuredProjects]; n[idx].categoryTags = e.target.value.split(',').map(t=>t.trim()).filter(Boolean); setData({ ...data, featuredProjects: n }) }} className="flex-1 bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm" />
                      <input type="number" placeholder="Sıra (Order)" value={project.order} onChange={(e) => { const n = [...data.featuredProjects]; n[idx].order = Number(e.target.value); setData({ ...data, featuredProjects: n }) }} className="w-24 bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm" />
                    </div>
                    <div className="flex gap-2">
                      <input type="text" placeholder="Canlı Link (Demo URL)" value={project.demoUrl || ''} onChange={(e) => { const n = [...data.featuredProjects]; n[idx].demoUrl = e.target.value; setData({ ...data, featuredProjects: n }) }} className="flex-1 bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm" />
                      <input type="text" placeholder="Github Link (Opsiyonel)" value={project.githubUrl || ''} onChange={(e) => { const n = [...data.featuredProjects]; n[idx].githubUrl = e.target.value; setData({ ...data, featuredProjects: n }) }} className="flex-1 bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm" />
                    </div>
                  </div>
                  <button onClick={() => setData({ ...data, featuredProjects: data.featuredProjects.filter((_, i) => i !== idx) })} className="text-red-400 hover:text-red-300 p-2 h-fit">Sil</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'builds' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Builds & Side Projects</h2>
              <button
                onClick={() => setData({
                  ...data,
                  builds: [...data.builds, { id: Date.now().toString(), title: 'Yeni Build', description: '', platformBadge: 'WEB', roleTags: [], iconUrl: '', links: {}, order: data.builds.length }]
                })}
                className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-sm rounded-md"
              >
                + Yeni Build
              </button>
            </div>
            {data.builds.map((build, idx) => (
              <div key={build.id} className="p-4 border border-zinc-800 rounded-lg bg-zinc-950/50 space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex gap-2">
                      <input type="text" placeholder="Build Başlığı" value={build.title} onChange={(e) => { const n = [...data.builds]; n[idx].title = e.target.value; setData({ ...data, builds: n }) }} className="flex-1 bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm font-bold" />
                      <input type="text" placeholder="Platform (iOS, WEB)" value={build.platformBadge} onChange={(e) => { const n = [...data.builds]; n[idx].platformBadge = e.target.value; setData({ ...data, builds: n }) }} className="w-32 bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm" />
                    </div>
                    <textarea placeholder="Açıklama" value={build.description} onChange={(e) => { const n = [...data.builds]; n[idx].description = e.target.value; setData({ ...data, builds: n }) }} className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm h-16 resize-none" />
                    <div className="flex gap-2">
                      <input type="text" placeholder="Logo/İkon URL (/images/app-icon.png)" value={build.iconUrl || ''} onChange={(e) => { const n = [...data.builds]; n[idx].iconUrl = e.target.value; setData({ ...data, builds: n }) }} className="flex-1 bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm" />
                      <button onClick={() => openImageModal((url) => { const n = [...data.builds]; n[idx].iconUrl = url; setData({ ...data, builds: n }) })} className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-sm rounded-md text-zinc-300 flex items-center"><ImageIcon size={16} /></button>
                    </div>
                    <div className="flex gap-2">
                      <input type="text" placeholder="Roller (Design, Frontend vb.)" value={build.roleTags.join(', ')} onChange={(e) => { const n = [...data.builds]; n[idx].roleTags = e.target.value.split(',').map(t=>t.trim()).filter(Boolean); setData({ ...data, builds: n }) }} className="flex-1 bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm" />
                      <input type="number" placeholder="Sıra" value={build.order} onChange={(e) => { const n = [...data.builds]; n[idx].order = Number(e.target.value); setData({ ...data, builds: n }) }} className="w-24 bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm" />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <input type="text" placeholder="Web URL" value={build.links?.website || ''} onChange={(e) => { const n = [...data.builds]; n[idx].links = { ...n[idx].links, website: e.target.value }; setData({ ...data, builds: n }) }} className="bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm" />
                      <input type="text" placeholder="Github URL" value={build.links?.github || ''} onChange={(e) => { const n = [...data.builds]; n[idx].links = { ...n[idx].links, github: e.target.value }; setData({ ...data, builds: n }) }} className="bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm" />
                      <input type="text" placeholder="App Store URL" value={build.links?.appStore || ''} onChange={(e) => { const n = [...data.builds]; n[idx].links = { ...n[idx].links, appStore: e.target.value }; setData({ ...data, builds: n }) }} className="bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm" />
                    </div>
                  </div>
                  <button onClick={() => setData({ ...data, builds: data.builds.filter((_, i) => i !== idx) })} className="text-red-400 hover:text-red-300 p-2 h-fit">Sil</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Skills (Kategoriler)</h2>
                <button onClick={() => setData({ ...data, skills: [...data.skills, { categoryName: 'Yeni Kategori', skills: [] }] })} className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-sm rounded-md">+ Kategori Ekle</button>
              </div>
              <div className="space-y-4">
                {data.skills.map((category, idx) => (
                  <div key={idx} className="p-4 border border-zinc-800 rounded-lg bg-zinc-950/50 space-y-3 flex items-start gap-4">
                    <div className="flex-1 space-y-3">
                      <input type="text" value={category.categoryName} onChange={(e) => { const n = [...data.skills]; n[idx].categoryName = e.target.value; setData({ ...data, skills: n }); }} className="bg-transparent font-medium focus:outline-none w-full border-b border-zinc-800 pb-2" />
                      <input type="text" value={category.skills.join(', ')} onChange={(e) => { const n = [...data.skills]; n[idx].skills = e.target.value.split(',').map(s => s.trim()).filter(Boolean); setData({ ...data, skills: n }); }} placeholder="Yetenekler (virgülle ayırın)" className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-zinc-500" />
                    </div>
                    <button onClick={() => setData({ ...data, skills: data.skills.filter((_, i) => i !== idx) })} className="text-red-400 hover:text-red-300 mt-2">Sil</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Tools (Araçlar)</h2>
                <button onClick={() => setData({ ...data, tools: [...(data.tools || []), { name: 'Yeni Araç' }] })} className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-sm rounded-md">+ Araç Ekle</button>
              </div>
              <div className="space-y-3">
                {(data.tools || []).map((tool, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input type="text" value={tool.name} onChange={(e) => { const t = [...data.tools]; t[idx].name = e.target.value; setData({ ...data, tools: t }); }} placeholder="Araç Adı (Örn: Figma)" className="flex-1 bg-zinc-950 border border-zinc-800 rounded-md px-3 py-1.5 text-sm" />
                    <input type="text" value={tool.iconName || ''} onChange={(e) => { const t = [...data.tools]; t[idx].iconName = e.target.value; setData({ ...data, tools: t }); }} placeholder="İkon Adı (opsiyonel)" className="w-1/3 bg-zinc-950 border border-zinc-800 rounded-md px-3 py-1.5 text-sm" />
                    <button onClick={() => setData({ ...data, tools: data.tools.filter((_, i) => i !== idx) })} className="text-red-400 hover:text-red-300 px-2">X</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Deneyim (Experience)</h2>
              <button
                onClick={() => setData({
                  ...data,
                  experiences: [...data.experiences, { id: Date.now().toString(), period: 'YYYY - YYYY', company: 'Şirket', role: 'Rol', order: data.experiences.length }]
                })}
                className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-sm rounded-md"
              >
                + Yeni Deneyim
              </button>
            </div>
            {data.experiences.map((exp, idx) => (
              <div key={exp.id} className="p-4 border border-zinc-800 rounded-lg bg-zinc-950/50 space-y-4 flex flex-col">
                <div className="flex gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex gap-2">
                      <input type="text" value={exp.role} onChange={(e) => { const n = [...data.experiences]; n[idx].role = e.target.value; setData({ ...data, experiences: n }); }} placeholder="Pozisyon / Rol" className="flex-1 bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-zinc-500 font-bold" />
                      <input type="number" value={exp.order} onChange={(e) => { const n = [...data.experiences]; n[idx].order = Number(e.target.value); setData({ ...data, experiences: n }); }} placeholder="Sıra" className="w-24 bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-zinc-500" />
                    </div>
                    <div className="flex gap-2">
                      <input type="text" value={exp.company} onChange={(e) => { const n = [...data.experiences]; n[idx].company = e.target.value; setData({ ...data, experiences: n }); }} placeholder="Şirket" className="flex-1 bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-zinc-500" />
                      <input type="text" value={exp.period} onChange={(e) => { const n = [...data.experiences]; n[idx].period = e.target.value; setData({ ...data, experiences: n }); }} placeholder="Tarih (Örn: 2024 - Present)" className="w-1/3 bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-zinc-500" />
                    </div>
                    <input type="text" value={exp.companyUrl || ''} onChange={(e) => { const n = [...data.experiences]; n[idx].companyUrl = e.target.value; setData({ ...data, experiences: n }); }} placeholder="Şirket Web Sitesi URL'si (Opsiyonel)" className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-zinc-500" />
                  </div>
                  <button onClick={() => setData({ ...data, experiences: data.experiences.filter((_, i) => i !== idx) })} className="text-red-400 hover:text-red-300 p-2 h-fit">Sil</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isImageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-full max-w-3xl max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-zinc-100">Görsel Seç / Yükle</h2>
              <button onClick={() => setIsImageModalOpen(false)} className="text-zinc-400 hover:text-zinc-100"><X size={24} /></button>
            </div>
            
            <div className="mb-6">
              <label className="flex items-center justify-center w-full h-32 px-4 transition bg-zinc-950 border-2 border-zinc-800 border-dashed rounded-xl appearance-none cursor-pointer hover:border-emerald-500/50 focus:outline-none">
                <span className="flex items-center space-x-2">
                  {isUploading ? <Loader2 className="animate-spin text-zinc-400" size={24} /> : <Upload className="text-zinc-400" size={24} />}
                  <span className="font-medium text-zinc-400">{isUploading ? 'Yükleniyor...' : 'Yeni Görsel Yükle (Tıkla veya Sürükle)'}</span>
                </span>
                <input type="file" name="file_upload" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isUploading} />
              </label>
            </div>

            <h3 className="text-sm font-medium text-zinc-400 mb-4">Mevcut Görseller</h3>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-4 overflow-y-auto no-scrollbar pb-2">
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
        </div>
      )}
    </div>
  );

  function tabLabel(id: string) {
    return tabs.find(t => t.id === id)?.label;
  }
}
