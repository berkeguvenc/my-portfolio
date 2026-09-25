import { notFound } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV === 'production' || process.env.ENABLE_ADMIN_PANEL !== 'true') {
    notFound();
  }
  return <div className="min-h-screen bg-neutral-950 text-neutral-50">{children}</div>;
}
