import { getPortfolioData } from '@/lib/portfolio';
import { PortfolioSection } from '@/types/portfolio';
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

  const defaultSections: PortfolioSection[] = [
    { id: 'hero', type: 'Hero', visible: true, order: 1 },
    { id: 'work', type: 'Work', visible: true, order: 2 },
    { id: 'builds', type: 'Builds', visible: true, order: 3 },
    { id: 'skills', type: 'Skills', visible: true, order: 4 },
    { id: 'experience', type: 'Experience', visible: true, order: 5 },
    { id: 'about', type: 'About', visible: true, order: 6 },
  ];

  const sections = data.sections || defaultSections;
  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-gray-200 selection:text-gray-900">
      <Navbar navTitles={data.navTitles} />

      <main className="max-w-[1200px] mx-auto px-4 md:px-6 py-4 space-y-20 md:space-y-36">
        {sortedSections.filter(s => s.visible).map((section) => {
          switch (section.type) {
            case 'Hero': 
              return <Hero key={section.id} personal={data.personal} socials={data.socials} />;
            case 'Work': 
              return <FeaturedWorkSection key={section.id} projects={data.featuredProjects} title={data.sectionTitles?.featuredProjects} />;
            case 'Builds': 
              return <ProjectsSection key={section.id} builds={data.builds} title={data.sectionTitles?.builds} />;
            case 'Skills': 
              return <SkillsSection key={section.id} skills={data.skills} title={data.sectionTitles?.skills} />;
            case 'Experience': 
              return <ExperienceSection key={section.id} experiences={data.experiences} title={data.sectionTitles?.experiences} />;
            case 'About': 
              return data.personal.about ? <AboutSection key={section.id} about={data.personal.about} aboutImage={data.personal.aboutImage} /> : null;
            default: 
              return null;
          }
        })}

        <Footer name={data.personal.name} socials={data.socials} footer={data.footer} />
      </main>
    </div>
  );
}
