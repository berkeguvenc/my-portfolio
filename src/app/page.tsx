import { getPortfolioData } from '@/lib/portfolio';
import Navbar from '@/components/home/Navbar';
import Hero from '@/components/home/Hero';
import ProjectCard from '@/components/home/ProjectCard';
import BuildCard from '@/components/home/BuildCard';
import SkillsSection from '@/components/home/SkillsSection';
import ExperienceSection from '@/components/home/ExperienceSection';
import Footer from '@/components/home/Footer';

export default async function Home() {
  const data = await getPortfolioData();

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-gray-200 selection:text-gray-900">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 md:px-6 pt-24 flex flex-col gap-12">
        <Hero personal={data.personal} socials={data.socials} />

        <section id="work" className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {data.featuredProjects.sort((a, b) => a.order - b.order).map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </div>
        </section>

        <section id="builds" className="py-16">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">Projects from Design to Launch</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.builds.sort((a, b) => a.order - b.order).map((build, idx) => (
              <BuildCard key={build.id} build={build} index={idx} />
            ))}
          </div>
        </section>

        <SkillsSection skills={data.skills} tools={data.tools} />
        <ExperienceSection experiences={data.experiences} />

        <Footer name={data.personal.name} socials={data.socials} />
      </main>
    </div>
  );
}
