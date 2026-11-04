import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPortfolioData } from '@/lib/portfolio';
import DetailPage from '@/components/home/DetailPage';

async function getBuild(id: string) {
  const data = await getPortfolioData();
  const build = data.builds.find((b) => b.id === id);
  return build?.content ? build : null;
}

export async function generateMetadata({ params }: PageProps<'/builds/[id]'>): Promise<Metadata> {
  const { id } = await params;
  const build = await getBuild(id);
  return build ? { title: build.title, description: build.description } : {};
}

export default async function BuildDetail({ params }: PageProps<'/builds/[id]'>) {
  const { id } = await params;
  const build = await getBuild(id);
  if (!build) notFound();

  return (
    <DetailPage
      title={build.title}
      description={build.description}
      image={build.iconUrl}
      tags={[build.platformBadge, ...(build.roleTags || [])]}
      links={[
        { label: 'Website', url: build.links?.website },
        { label: 'GitHub', url: build.links?.githubUrl },
        { label: 'Play Store', url: build.links?.googlePlay },
        { label: 'App Store', url: build.links?.appStore },
      ]}
      content={build.content!}
      backHref="/#builds"
    />
  );
}
