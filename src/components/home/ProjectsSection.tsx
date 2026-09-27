import { BuildProject } from '@/types/portfolio';
import BuildCard from './BuildCard';

interface ProjectsSectionProps {
  builds: BuildProject[];
  title?: string;
}

export default function ProjectsSection({ builds, title = "Projects" }: ProjectsSectionProps) {
  return (
    <div id="builds" className="scroll-mt-[64px] md:scroll-mt-[120px]">
      <div className="space-y-6 md:space-y-8">
        <h2 className="text-[20px] font-semibold tracking-[-0.4px] text-black md:text-[24px] md:tracking-[-0.48px]">
          {title}
        </h2>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-3">
          {builds.sort((a, b) => a.order - b.order).map((build, idx) => (
            <BuildCard key={build.id} build={build} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}
