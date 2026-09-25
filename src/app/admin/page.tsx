import { notFound } from 'next/navigation';
import portfolioData from '@/data/portfolio.json';
import { PortfolioData } from '@/types/portfolio';

export default function AdminPage() {
    // Sadece yerelde ve .env açıkken görünür, aksi takdirde 404
    const isEnabled = process.env.ENABLE_ADMIN_PANEL === 'true' && process.env.NODE_ENV === 'development';

    if (!isEnabled) {
        notFound();
    }

    const initialData = portfolioData as PortfolioData;

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8 font-sans">
            <div className="max-w-4xl mx-auto space-y-6">
                <header className="flex items-center justify-between border-b border-zinc-800 pb-4">
                    <div>
                        <h1 className="text-xl font-semibold">Portfolyo Yönetim Paneli</h1>
                        <p className="text-sm text-zinc-400">Veriler doğrudan src/data/portfolio.json dosyasına yazılır.</p>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Local CMS Aktif
                    </span>
                </header>

                {/* IDE yapay zekası Faz 2'de buraya Tab ve Form bileşenlerini dolduracaktır */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                    <p className="text-sm text-zinc-400">
                        Hoş geldin! plan.md doğrultusunda form bileşenleri bu alana eklenecektir.
                    </p>
                </div>
            </div>
        </div>
    );
}