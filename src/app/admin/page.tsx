import { getPortfolioData } from '@/lib/portfolio';
import AdminDashboard from './AdminDashboard';
import { notFound } from 'next/navigation';

export default async function AdminPage() {
  // Extra safety check in page as well, though layout handles it
  if (process.env.NODE_ENV === 'production' && process.env.ENABLE_ADMIN_PANEL !== 'true') {
    notFound();
  }

  const data = await getPortfolioData();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        <AdminDashboard initialData={data} />
      </div>
    </div>
  );
}