import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmModal({ isOpen, title, description, onClose, onConfirm }: ConfirmModalProps) {
  const t = useTranslations('Modals.ConfirmModal');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <Card className="w-[90vw] max-w-[340px] relative bg-zinc-950 border-zinc-800 shadow-2xl">
        <Button variant="ghost" size="sm" className="absolute top-3 right-3 text-zinc-400 hover:text-white h-8 w-8 p-0" onClick={onClose}>
          <X size={18} />
        </Button>
        <CardHeader className="p-5 pb-2 pt-6">
          <CardTitle className="text-lg text-zinc-100 leading-tight pr-6">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-5 pt-0 space-y-5">
          <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              {t('cancel')}
            </Button>
            <Button variant="destructive" size="sm" onClick={() => { onConfirm(); onClose(); }}>
              {t('confirm')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
