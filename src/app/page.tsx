import { getPortfolioData } from '@/lib/portfolio';
import Navbar from '@/components/home/Navbar';
import Hero from '@/components/home/Hero';
import ProjectCard from '@/components/home/ProjectCard';
import BuildCard from '@/components/home/BuildCard';
import SkillsSection from '@/components/home/SkillsSection';
import ExperienceSection from '@/components/home/ExperienceSection';
import AboutSection from '@/components/home/AboutSection';
import Footer from '@/components/home/Footer';

export default async function Home() {
  const data = await getPortfolioData();

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-gray-200 selection:text-gray-900">
      <Navbar />

      <main className="max-w-[1200px] mx-auto px-4 md:px-6 py-4 space-y-20 md:space-y-36">
        <Hero personal={data.personal} socials={data.socials} />

        <div id="work" className="scroll-mt-[64px] md:scroll-mt-[120px]">
          <div className="space-y-6 md:space-y-8">
            <h2 className="text-[20px] font-semibold tracking-[-0.4px] text-black md:text-[24px] md:tracking-[-0.48px]">
              Featured Work
            </h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
              {data.featuredProjects.sort((a, b) => a.order - b.order).map((project, idx) => (
                <ProjectCard key={project.id} project={project} index={idx} />
              ))}
            </div>
          </div>
        </div>

        <div id="builds" className="scroll-mt-[64px] md:scroll-mt-[120px]">
          <div className="space-y-6 md:space-y-8">
            <h2 className="text-[20px] font-semibold tracking-[-0.4px] text-black md:text-[24px] md:tracking-[-0.48px]">
              Projects from Design to Launch
            </h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-3">
              {data.builds.sort((a, b) => a.order - b.order).map((build, idx) => (
                <BuildCard key={build.id} build={build} index={idx} />
              ))}
            </div>
          </div>
        </div>

        <SkillsSection skills={data.skills} />
        <ExperienceSection experiences={data.experiences} />
        {data.personal.about && <AboutSection about={data.personal.about} aboutImage={data.personal.aboutImage} />}

        <Footer name={data.personal.name} socials={data.socials} footer={data.footer} />
      </main>
    </div>
  );
}
