import { getPortfolioData } from '@/lib/portfolio';
import Navbar from '@/components/home/Navbar';
import Hero from '@/components/home/Hero';
import FeaturedWorkSection from '@/components/home/FeaturedWorkSection';
import ProjectsSection from '@/components/home/ProjectsSection';
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

        <FeaturedWorkSection projects={data.featuredProjects} />
        
        <ProjectsSection builds={data.builds} />

        <SkillsSection skills={data.skills} />

        <ExperienceSection experiences={data.experiences} />
        
        {data.personal.about && <AboutSection about={data.personal.about} aboutImage={data.personal.aboutImage} />}

        <Footer name={data.personal.name} socials={data.socials} footer={data.footer} />
      </main>
    </div>
  );
}
