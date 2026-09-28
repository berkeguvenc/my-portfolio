import { useState, useEffect } from 'react';
import { Loader2, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { useTranslations } from 'next-intl';

interface ImagePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

export default function ImagePickerModal({ isOpen, onClose, onSelect }: ImagePickerModalProps) {
  const t = useTranslations('Modals.ImagePicker');
  const [availableImages, setAvailableImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetch('/api/admin/images')
        .then(res => res.ok ? res.json() : { images: [] })
        .then(data => setAvailableImages(data.images || []))
        .catch(console.error);
    }
  }, [isOpen]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    
    setIsUploading(true);
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        const uploadedData = await res.json();
        setAvailableImages(prev => [uploadedData.url, ...prev]);
        onSelect(uploadedData.url);
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
    setIsUploading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <Card className="w-full max-w-3xl max-h-[80vh] flex flex-col">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>{t('title')}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}><X size={20} /></Button>
        </CardHeader>
        <CardContent className="flex flex-col flex-1 overflow-hidden space-y-6">
          <div>
            <label className="flex flex-col items-center justify-center w-full h-32 px-4 transition bg-zinc-950 border-2 border-zinc-800 border-dashed rounded-xl cursor-pointer hover:border-emerald-500/50">
              <div className="flex items-center space-x-2">
                {isUploading ? <Loader2 className="animate-spin text-zinc-400" size={24} /> : <Upload className="text-zinc-400" size={24} />}
                <span className="font-medium text-zinc-400">{isUploading ? t('uploading') : t('uploadText')}</span>
              </div>
              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isUploading} />
            </label>
          </div>

          <div className="flex-1 overflow-y-auto min-h-0">
            <Label className="mb-4 block">{t('availableImages')}</Label>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
              {availableImages.map((img, i) => (
                <div key={i} onClick={() => { onSelect(img); onClose(); }} className="relative aspect-square rounded-lg border border-zinc-800 overflow-hidden bg-zinc-950 cursor-pointer group hover:border-emerald-500">
                  <img src={img} alt="media" className="object-cover w-full h-full opacity-70 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 flex items-end p-2 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] text-zinc-300 truncate w-full">{img.split('/').pop()}</span>
                  </div>
                </div>
              ))}
              {availableImages.length === 0 && (
                <div className="col-span-full py-8 text-center text-zinc-500 text-sm">{t('noImages')}</div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
