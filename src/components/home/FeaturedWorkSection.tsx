import { FeaturedProject } from '@/types/portfolio';
import ProjectCard from './ProjectCard';

interface FeaturedWorkSectionProps {
  projects: FeaturedProject[];
}

export default function FeaturedWorkSection({ projects }: FeaturedWorkSectionProps) {
  return (
    <div id="work" className="scroll-mt-[64px] md:scroll-mt-[120px]">
      <div className="space-y-6 md:space-y-8">
        <h2 className="text-[20px] font-semibold tracking-[-0.4px] text-black md:text-[24px] md:tracking-[-0.48px]">
          Featured Work
        </h2>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
          {projects.sort((a, b) => a.order - b.order).map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}
