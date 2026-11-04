import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPortfolioData } from '@/lib/portfolio';
import DetailPage from '@/components/home/DetailPage';

async function getProject(id: string) {
  const data = await getPortfolioData();
  const project = data.featuredProjects.find((p) => p.id === id);
  return project?.content ? project : null;
}

export async function generateMetadata({ params }: PageProps<'/work/[id]'>): Promise<Metadata> {
  const { id } = await params;
  const project = await getProject(id);
  return project ? { title: project.title, description: project.description } : {};
}

export default async function WorkDetail({ params }: PageProps<'/work/[id]'>) {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) notFound();

  return (
    <DetailPage
      title={project.title}
      description={project.description}
      image={project.coverImage}
      tags={project.categoryTags}
      links={[
        { label: 'Website', url: project.websiteUrl },
        { label: 'Source Code', url: project.githubUrl },
      ]}
      content={project.content!}
      backHref="/#work"
    />
  );
}
