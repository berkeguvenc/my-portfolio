import { PortfolioData, PortfolioSection } from '@/types/portfolio';
import { useTranslations } from 'next-intl';
import { Reorder } from 'framer-motion';
import { GripVertical, Eye, EyeOff } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

interface LayoutTabProps {
  data: PortfolioData;
  setData: (data: PortfolioData) => void;
}

export default function LayoutTab({ data, setData }: LayoutTabProps) {
  const t = useTranslations('LayoutTab');

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
  
  const heroSection = sortedSections.find(s => s.type === 'Hero') || sortedSections[0];
  const draggableSections = sortedSections.filter(s => s.type !== 'Hero');

  const handleReorder = (newOrder: PortfolioSection[]) => {
    const updatedHero = { ...heroSection, order: 1 };
    const updatedOthers = newOrder.map((section, index) => ({
      ...section,
      order: index + 2,
    }));
    setData({ ...data, sections: [updatedHero, ...updatedOthers] });
  };

  const toggleVisibility = (id: string) => {
    const updatedSections = sections.map((s) => {
      if (s.id === id) {
        return { ...s, visible: !s.visible };
      }
      return s;
    });
    setData({ ...data, sections: updatedSections });
  };

  return (
    <Card className="bg-zinc-900/50 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-xl text-zinc-100">{t('title')}</CardTitle>
        <p className="text-sm text-zinc-400">{t('description')}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {heroSection && (
            <div className="flex items-center justify-between p-4 bg-zinc-900 border border-zinc-700/50 rounded-lg">
              <div className="flex items-center gap-4 opacity-70">
                <GripVertical className="text-zinc-600" size={20} />
                <span className="font-medium text-zinc-400">
                  {t(`sectionNames.${heroSection.type}`)} (Locked)
                </span>
              </div>
              <button
                type="button"
                onClick={() => toggleVisibility(heroSection.id)}
                className={`p-2 rounded-md transition-colors ${
                  heroSection.visible 
                    ? 'text-emerald-400 hover:bg-emerald-400/10' 
                    : 'text-zinc-500 hover:bg-zinc-700'
                }`}
                title={heroSection.visible ? 'Visible' : 'Hidden'}
              >
                {heroSection.visible ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          )}
          <Reorder.Group 
            axis="y" 
            values={draggableSections} 
            onReorder={handleReorder}
            className="space-y-3"
          >
            {draggableSections.map((section) => (
              <Reorder.Item 
                key={section.id} 
              value={section}
              className="flex items-center justify-between p-4 bg-zinc-800/50 border border-zinc-700/50 rounded-lg cursor-grab active:cursor-grabbing hover:border-emerald-500/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <GripVertical className="text-zinc-500" size={20} />
                <span className="font-medium text-zinc-200">
                  {t(`sectionNames.${section.type}`)}
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleVisibility(section.id);
                }}
                className={`p-2 rounded-md transition-colors ${
                  section.visible 
                    ? 'text-emerald-400 hover:bg-emerald-400/10' 
                    : 'text-zinc-500 hover:bg-zinc-700'
                }`}
                title={section.visible ? 'Visible' : 'Hidden'}
              >
                {section.visible ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </Reorder.Item>
          ))}
          </Reorder.Group>
        </div>
      </CardContent>
    </Card>
  );
}
