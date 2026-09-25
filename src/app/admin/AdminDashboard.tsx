'use client';

import { useState } from 'react';
import { PortfolioData } from '@/types/portfolio';
import { Save, Copy, Download, Loader2 } from 'lucide-react';

export default function AdminDashboard({ initialData }: { initialData: PortfolioData }) {
  const [data, setData] = useState<PortfolioData>(initialData);
  const [activeTab, setActiveTab] = useState('genel');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

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
      <div className="flex items-center justify-between">
        <div className="flex gap-2 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-zinc-800 text-zinc-100'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-3">
          {message && <span className="text-sm text-emerald-400">{message}</span>}
          <button
            onClick={copyJson}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium bg-zinc-900 border border-zinc-800 rounded-md hover:bg-zinc-800 transition-colors"
          >
            <Copy size={16} /> JSON Kopyala
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-zinc-100 text-zinc-950 rounded-md hover:bg-white transition-colors disabled:opacity-50"
          >
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
          </button>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 min-h-[400px]">
        {activeTab === 'genel' && (
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-lg font-medium mb-4">Kişisel Bilgiler</h2>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">İsim</label>
              <input
                type="text"
                value={data.personal.name}
                onChange={(e) => setData({ ...data, personal: { ...data.personal, name: e.target.value } })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-zinc-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Unvan</label>
              <input
                type="text"
                value={data.personal.role}
                onChange={(e) => setData({ ...data, personal: { ...data.personal, role: e.target.value } })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-zinc-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Biyografi</label>
              <textarea
                value={data.personal.bio}
                onChange={(e) => setData({ ...data, personal: { ...data.personal, bio: e.target.value } })}
                rows={4}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-zinc-500 resize-none"
              />
            </div>
            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                id="isAvailable"
                checked={data.personal.isAvailableForWork}
                onChange={(e) => setData({ ...data, personal: { ...data.personal, isAvailableForWork: e.target.checked } })}
                className="rounded border-zinc-800 bg-zinc-950"
              />
              <label htmlFor="isAvailable" className="text-sm font-medium text-zinc-300">
                Yeni projeler için uygun ("Available for work" rozeti)
              </label>
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
                  featuredProjects: [...data.featuredProjects, { id: Date.now().toString(), title: 'Yeni Proje', description: '', categoryTags: [], coverImage: '', featured: true, order: data.featuredProjects.length }]
                })}
                className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-sm rounded-md"
              >
                + Yeni Proje
              </button>
            </div>
            {data.featuredProjects.map((project, idx) => (
              <div key={project.id} className="p-4 border border-zinc-800 rounded-lg bg-zinc-950/50 space-y-4">
                <div className="flex justify-between">
                  <input
                    type="text"
                    value={project.title}
                    onChange={(e) => {
                      const newProjects = [...data.featuredProjects];
                      newProjects[idx].title = e.target.value;
                      setData({ ...data, featuredProjects: newProjects });
                    }}
                    className="bg-transparent font-medium focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      const newProjects = data.featuredProjects.filter((_, i) => i !== idx);
                      setData({ ...data, featuredProjects: newProjects });
                    }}
                    className="text-red-400 text-sm hover:text-red-300"
                  >
                    Sil
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Açıklama"
                  value={project.description}
                  onChange={(e) => {
                    const newProjects = [...data.featuredProjects];
                    newProjects[idx].description = e.target.value;
                    setData({ ...data, featuredProjects: newProjects });
                  }}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-zinc-500"
                />
                <input
                  type="text"
                  placeholder="Görsel URL"
                  value={project.coverImage}
                  onChange={(e) => {
                    const newProjects = [...data.featuredProjects];
                    newProjects[idx].coverImage = e.target.value;
                    setData({ ...data, featuredProjects: newProjects });
                  }}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-zinc-500"
                />
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
                <div className="flex justify-between">
                  <input
                    type="text"
                    value={build.title}
                    onChange={(e) => {
                      const newBuilds = [...data.builds];
                      newBuilds[idx].title = e.target.value;
                      setData({ ...data, builds: newBuilds });
                    }}
                    className="bg-transparent font-medium focus:outline-none w-1/2"
                  />
                  <button
                    onClick={() => {
                      const newBuilds = data.builds.filter((_, i) => i !== idx);
                      setData({ ...data, builds: newBuilds });
                    }}
                    className="text-red-400 text-sm hover:text-red-300"
                  >
                    Sil
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Açıklama"
                  value={build.description}
                  onChange={(e) => {
                    const newBuilds = [...data.builds];
                    newBuilds[idx].description = e.target.value;
                    setData({ ...data, builds: newBuilds });
                  }}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-zinc-500"
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium mb-4">Skills & Tools (Kategoriler)</h2>
            {data.skills.map((category, idx) => (
              <div key={idx} className="p-4 border border-zinc-800 rounded-lg bg-zinc-950/50 space-y-4">
                <input
                  type="text"
                  value={category.categoryName}
                  onChange={(e) => {
                    const newSkills = [...data.skills];
                    newSkills[idx].categoryName = e.target.value;
                    setData({ ...data, skills: newSkills });
                  }}
                  className="bg-transparent font-medium focus:outline-none w-full border-b border-zinc-800 pb-2"
                />
                <input
                  type="text"
                  value={category.skills.join(', ')}
                  onChange={(e) => {
                    const newSkills = [...data.skills];
                    newSkills[idx].skills = e.target.value.split(',').map(s => s.trim());
                    setData({ ...data, skills: newSkills });
                  }}
                  placeholder="Yetenekler (virgülle ayırın)"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-zinc-500"
                />
              </div>
            ))}
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
                <div className="flex justify-between gap-4">
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) => {
                      const newExp = [...data.experiences];
                      newExp[idx].role = e.target.value;
                      setData({ ...data, experiences: newExp });
                    }}
                    placeholder="Pozisyon / Rol"
                    className="flex-1 bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-zinc-500"
                  />
                  <button
                    onClick={() => {
                      const newExp = data.experiences.filter((_, i) => i !== idx);
                      setData({ ...data, experiences: newExp });
                    }}
                    className="text-red-400 text-sm hover:text-red-300 px-2"
                  >
                    Sil
                  </button>
                </div>
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => {
                      const newExp = [...data.experiences];
                      newExp[idx].company = e.target.value;
                      setData({ ...data, experiences: newExp });
                    }}
                    placeholder="Şirket"
                    className="flex-1 bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-zinc-500"
                  />
                  <input
                    type="text"
                    value={exp.period}
                    onChange={(e) => {
                      const newExp = [...data.experiences];
                      newExp[idx].period = e.target.value;
                      setData({ ...data, experiences: newExp });
                    }}
                    placeholder="2020 - 2023"
                    className="flex-1 bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-zinc-500"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  function tabLabel(id: string) {
    return tabs.find(t => t.id === id)?.label;
  }
}
