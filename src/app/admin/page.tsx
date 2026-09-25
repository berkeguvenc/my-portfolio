import { getPortfolioData } from '@/lib/portfolio';
import AdminDashboard from './AdminDashboard';
import { notFound } from 'next/navigation';

export default async function AdminPage() {
  // Extra safety check in page as well, though layout handles it
  if (process.env.NODE_ENV === 'production' || process.env.ENABLE_ADMIN_PANEL !== 'true') {
    notFound();
  }

  const data = await getPortfolioData();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Portfolyo Yönetim Paneli</h1>
            <p className="text-sm text-zinc-400">Veriler doğrudan src/data/portfolio.json dosyasına yazılır.</p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Local CMS Aktif
          </span>
        </header>
        <AdminDashboard initialData={data} />
      </div>
    </div>
  );
}