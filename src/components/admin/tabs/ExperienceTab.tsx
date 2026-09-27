import { PortfolioData } from '@/types/portfolio';
import { Card, CardContent } from '@/components/ui/Card';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

interface ExperienceTabProps {
  data: PortfolioData;
  setData: (data: PortfolioData) => void;
}

export default function ExperienceTab({ data, setData }: ExperienceTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Deneyim (Experience)</h2>
        <Button variant="default" onClick={() => setData({ ...data, experiences: [...data.experiences, { id: Date.now().toString(), period: 'YYYY - YYYY', company: 'Şirket', role: 'Rol', order: data.experiences.length }] })}>
          + Yeni Deneyim Ekle
        </Button>
      </div>

      <div className="grid gap-6">
        {data.experiences.map((exp, idx) => (
          <Card key={exp.id} className="relative group">
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-1">
                <Label>Rol / Pozisyon</Label>
                <Input value={exp.role} onChange={(e) => { const n = [...data.experiences]; n[idx].role = e.target.value; setData({ ...data, experiences: n }); }} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Şirket</Label>
                  <Input value={exp.company} onChange={(e) => { const n = [...data.experiences]; n[idx].company = e.target.value; setData({ ...data, experiences: n }); }} />
                </div>
                <div className="space-y-1">
                  <Label>Dönem</Label>
                  <Input value={exp.period} onChange={(e) => { const n = [...data.experiences]; n[idx].period = e.target.value; setData({ ...data, experiences: n }); }} placeholder="Örn: 2024 - Present" />
                </div>
              </div>
              <div className="space-y-1">
                <Label>Açıklama (Opsiyonel)</Label>
                <Textarea value={exp.description || ''} onChange={(e) => { const n = [...data.experiences]; n[idx].description = e.target.value; setData({ ...data, experiences: n }); }} placeholder="Bu rolde neler yaptınız?" rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Şirket URL (Opsiyonel)</Label>
                  <Input value={exp.companyUrl || ''} onChange={(e) => { const n = [...data.experiences]; n[idx].companyUrl = e.target.value; setData({ ...data, experiences: n }); }} />
                </div>
                <div className="space-y-1">
                  <Label>Sıra</Label>
                  <Input type="number" value={exp.order} onChange={(e) => { const n = [...data.experiences]; n[idx].order = Number(e.target.value); setData({ ...data, experiences: n }); }} />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="destructive" onClick={() => setData({ ...data, experiences: data.experiences.filter((_, i) => i !== idx) })}>Deneyimi Sil</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
