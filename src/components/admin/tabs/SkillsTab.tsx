import { PortfolioData } from '@/types/portfolio';
import { Card, CardContent } from '@/components/ui/Card';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { LayoutGrid } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface SkillsTabProps {
  data: PortfolioData;
  setData: (data: PortfolioData) => void;
  openIconModal: (type: 'common' | 'socials', callback: (iconName: string) => void) => void;
  openLucideHelp: () => void;
  openSimpleIconsHelp: () => void;
}

export default function SkillsTab({ data, setData, openIconModal, openLucideHelp, openSimpleIconsHelp }: SkillsTabProps) {
  const t = useTranslations('SkillsTab');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">{t('title')}</h2>
        <Button variant="default" onClick={() => setData({ ...data, skills: [...data.skills, { categoryName: t('newCategory'), skills: [] }] })}>
          {t('addCategory')}
        </Button>
      </div>

      <div className="grid gap-6">
        {data.skills.map((category, idx) => (
          <Card key={idx} className="relative group">
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-1">
                <Label>{t('categoryName')}</Label>
                <Input value={category.categoryName} onChange={(e) => { const n = [...data.skills]; n[idx].categoryName = e.target.value; setData({ ...data, skills: n }); }} className="font-medium" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-zinc-400">{t('skills')}</Label>
                <Input value={category.skills.join(',')} onChange={(e) => { const n = [...data.skills]; n[idx].skills = e.target.value.split(','); setData({ ...data, skills: n }); }} placeholder={t('skillsPlaceholder')} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <Label className="text-xs text-zinc-400">{t('lucideIcon')}</Label>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-zinc-400 hover:text-white" onClick={openLucideHelp} title={t('howToUse')}>?</Button>
                  </div>
                  <div className="flex gap-2">
                    <Input value={category.lucideIcon || ''} onChange={(e) => { const n = [...data.skills]; n[idx].lucideIcon = e.target.value; setData({ ...data, skills: n }); }} placeholder={t('lucidePlaceholder')} />
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="shrink-0 h-9 w-9 bg-zinc-800"
                      title={t('iconSelect')}
                      onClick={() => {
                        openIconModal('common', (iconName: string) => {
                          const n = [...data.skills];
                          n[idx].lucideIcon = iconName;
                          setData({ ...data, skills: n });
                        });
                      }}
                    >
                      <LayoutGrid size={16} />
                    </Button>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <Label className="text-xs text-zinc-400">{t('techLogos')}</Label>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-zinc-400 hover:text-white" onClick={openSimpleIconsHelp} title={t('howToUse')}>?</Button>
                  </div>
                  <Input value={(category.icons || []).join(',')} onChange={(e) => { const n = [...data.skills]; n[idx].icons = e.target.value.split(','); setData({ ...data, skills: n }); }} placeholder={t('logosPlaceholder')} />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="destructive" onClick={() => setData({ ...data, skills: data.skills.filter((_, i) => i !== idx) })}>{t('delete')}</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
