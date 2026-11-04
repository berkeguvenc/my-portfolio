import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, ExternalLink } from 'lucide-react';

interface DetailPageProps {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  links: { label: string; url?: string }[];
  content: string;
  backHref: string;
}

export default function DetailPage({ title, description, image, tags, links, content, backHref }: DetailPageProps) {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <main className="max-w-[760px] mx-auto px-4 md:px-6 py-10 md:py-16 space-y-8">
        <Link href={backHref} className="inline-flex items-center gap-1.5 text-[14px] text-[#878787] hover:text-black transition-colors">
          <ArrowLeft size={16} /> Back
        </Link>

        <header className="space-y-3">
          <h1 className="text-[28px] font-semibold tracking-[-0.56px] text-black md:text-[36px]">{title}</h1>
          <p className="text-[16px] leading-[24px] text-[#616161]">{description}</p>
          {tags.filter(Boolean).length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.filter(Boolean).map((tag, i) => (
                <span key={i} className="rounded-[8px] bg-[#f8f8f8] px-[8px] py-[3px] text-[12px] font-medium uppercase text-[#616161]">{tag}</span>
              ))}
            </div>
          )}
          <div className="flex flex-wrap gap-4">
            {links.filter((l) => l.url).map((l) => (
              <Link key={l.label} href={l.url!} target="_blank" className="inline-flex items-center gap-1.5 text-[14px] text-[#878787] hover:text-black hover:underline transition-colors">
                <ExternalLink size={14} /> {l.label}
              </Link>
            ))}
          </div>
        </header>

        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={title} className="w-full rounded-xl bg-[#f8f8f8] object-cover" />
        )}

        <article className="prose prose-neutral max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </article>
      </main>
    </div>
  );
}
