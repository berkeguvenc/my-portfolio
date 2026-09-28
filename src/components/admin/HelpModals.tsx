import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { useTranslations } from 'next-intl';

interface HelpModalsProps {
  isLucideOpen: boolean;
  onLucideClose: () => void;
  isFaOpen: boolean;
  onFaClose: () => void;
  isSimpleIconsOpen: boolean;
  onSimpleIconsClose: () => void;
}

export default function HelpModals({
  isLucideOpen,
  onLucideClose,
  isFaOpen,
  onFaClose,
  isSimpleIconsOpen,
  onSimpleIconsClose
}: HelpModalsProps) {
  const t = useTranslations('Modals.HelpModals');

  return (
    <>
      {isLucideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <Card className="w-full max-w-lg relative bg-zinc-950 border-zinc-800 shadow-2xl">
            <Button variant="ghost" size="sm" className="absolute top-4 right-4 text-zinc-400 hover:text-white" onClick={onLucideClose}>
              <X size={20} />
            </Button>
            <CardHeader>
              <CardTitle className="text-xl">{t('lucideTitle')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-zinc-300">
              <p>{t('lucideDesc')}</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li><a href="https://lucide.dev/icons" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">lucide.dev/icons</a> {t('lucideStep1').replace('lucide.dev/icons ', '')}</li>
                <li>{t('lucideStep2')}</li>
                <li>{t('lucideStep3')}</li>
                <li>{t('lucideStep4')}<br/><span className="text-xs text-zinc-500 mt-1 block">{t('lucideExample')}</span></li>
              </ol>
            </CardContent>
          </Card>
        </div>
      )}

      {isFaOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <Card className="w-full max-w-lg relative bg-zinc-950 border-zinc-800 shadow-2xl">
            <Button variant="ghost" size="sm" className="absolute top-4 right-4 text-zinc-400 hover:text-white" onClick={onFaClose}>
              <X size={20} />
            </Button>
            <CardHeader>
              <CardTitle className="text-xl">{t('faTitle')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-zinc-300">
              <p>{t('faDesc')}</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li><a href="https://react-icons.github.io/react-icons/icons/fa/" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">FontAwesome Icons</a> {t('faStep1').replace('FontAwesome Icons ', '')}</li>
                <li>{t('faStep2')}</li>
                <li>{t('faStep3')}</li>
              </ol>
              <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800 mt-2">
                <span className="text-xs text-zinc-500 mb-1 block">{t('faGoodExample')}</span>
                <ul className="list-disc pl-5 space-y-1 text-white font-mono text-xs">
                  <li>FaAccessibleIcon</li>
                  <li>FaGithub</li>
                  <li>FaTwitter</li>
                </ul>
              </div>
              <p className="text-xs text-zinc-500 mt-2">{t('faNote')}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {isSimpleIconsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <Card className="w-full max-w-lg flex flex-col relative bg-zinc-950 border-zinc-800 shadow-2xl">
            <Button variant="ghost" size="sm" className="absolute top-4 right-4 text-zinc-400 hover:text-white" onClick={onSimpleIconsClose}>
              <X size={20} />
            </Button>
            <CardHeader>
              <CardTitle className="text-xl">{t('simpleTitle')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-zinc-300">
              <p>{t('simpleDesc')}</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li><a href="https://simpleicons.org/" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">simpleicons.org</a> {t('simpleStep1').replace('simpleicons.org ', '')}</li>
                <li>{t('simpleStep2')}</li>
                <li>{t('simpleStep3')}</li>
                <li>{t('simpleStep4')}<br/><span className="text-xs text-zinc-500 mt-1 block">{t('simpleExample')}</span></li>
              </ol>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
