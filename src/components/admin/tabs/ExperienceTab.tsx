import { PortfolioData } from '@/types/portfolio';
import { Card, CardContent } from '@/components/ui/Card';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { GripVertical } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Reorder } from 'framer-motion';
import { ExperienceItem } from '@/types/portfolio';
import DraggableItem from '@/components/admin/DraggableItem';

interface ExperienceTabProps {
  data: PortfolioData;
  setData: (data: PortfolioData) => void;
  openConfirmModal: (title: string, desc: string, onConfirm: () => void) => void;
}

export default function ExperienceTab({ data, setData, openConfirmModal }: ExperienceTabProps) {
  const t = useTranslations('ExperienceTab');

  const handleReorder = (newOrder: ExperienceItem[]) => {
    const updated = newOrder.map((item, index) => ({ ...item, order: index + 1 }));
    setData({ ...data, experiences: updated });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">{t('title')}</h2>
        <Button variant="default" onClick={() => setData({ ...data, experiences: [...data.experiences, { id: Date.now().toString(), period: 'YYYY - YYYY', company: t('newCompany'), role: t('newExperience'), order: data.experiences.length > 0 ? Math.max(...data.experiences.map(e => e.order || 0)) + 1 : 1 }] })}>
          {t('addExperience')}
        </Button>
      </div>

      <Reorder.Group axis="y" values={data.experiences} onReorder={handleReorder} className="grid gap-6">
        {data.experiences.map((exp, idx) => (
          <DraggableItem key={exp.id} value={exp}>
            {(controls) => (
              <Card className="relative group">
                <div 
                  className="absolute top-4 right-4 cursor-grab active:cursor-grabbing z-10 text-zinc-500 hover:text-zinc-300 transition-colors touch-none select-none"
                  onPointerDown={(e) => {
                    controls.start(e);
                    e.preventDefault();
                  }}
                >
                  <GripVertical size={20} />
                </div>
                <CardContent className="pt-12 space-y-4">
              <div className="space-y-1">
                <Label>{t('role')}</Label>
                <Input value={exp.role} onChange={(e) => { const n = [...data.experiences]; n[idx].role = e.target.value; setData({ ...data, experiences: n }); }} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>{t('company')}</Label>
                  <Input value={exp.company} onChange={(e) => { const n = [...data.experiences]; n[idx].company = e.target.value; setData({ ...data, experiences: n }); }} />
                </div>
                <div className="space-y-1">
                  <Label>{t('period')}</Label>
                  <Input value={exp.period} onChange={(e) => { const n = [...data.experiences]; n[idx].period = e.target.value; setData({ ...data, experiences: n }); }} placeholder={t('periodPlaceholder')} />
                </div>
              </div>
              <div className="space-y-1">
                <Label>{t('description')}</Label>
                <Textarea value={exp.description || ''} onChange={(e) => { const n = [...data.experiences]; n[idx].description = e.target.value; setData({ ...data, experiences: n }); }} placeholder={t('descriptionPlaceholder')} rows={3} />
              </div>
              <div className="space-y-1">
                <Label>{t('companyUrl')}</Label>
                <Input value={exp.companyUrl || ''} onChange={(e) => { const n = [...data.experiences]; n[idx].companyUrl = e.target.value; setData({ ...data, experiences: n }); }} />
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="destructive" onClick={() => openConfirmModal(t('deleteConfirmTitle'), t('deleteConfirmDesc'), () => setData({ ...data, experiences: data.experiences.filter((_, i) => i !== idx) }))}>{t('delete')}</Button>
              </div>
            </CardContent>
          </Card>
            )}
          </DraggableItem>
        ))}
      </Reorder.Group>
    </div>
  );
}
