import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

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
  return (
    <>
      {isLucideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <Card className="w-full max-w-lg relative bg-zinc-950 border-zinc-800 shadow-2xl">
            <Button variant="ghost" size="sm" className="absolute top-4 right-4 text-zinc-400 hover:text-white" onClick={onLucideClose}>
              <X size={20} />
            </Button>
            <CardHeader>
              <CardTitle className="text-xl">Lucide İkonları Nasıl Kullanılır?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-zinc-300">
              <p>Eğer "İkon Seç" menüsündeki ikonlar yeterli gelmezse, kütüphanedeki 1000'den fazla ikondan herhangi birini kullanabilirsiniz:</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li><a href="https://lucide.dev/icons" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">lucide.dev/icons</a> adresine gidin.</li>
                <li>İstediğiniz ikonu aratın (İngilizce olarak, örn: "star", "camera").</li>
                <li>İkonun sayfasına veya üzerine tıkladığınızda çıkan isme bakın.</li>
                <li>İsmi, kelimelerin baş harfleri büyük olacak şekilde (PascalCase) buradaki kutuya yazın.<br/><span className="text-xs text-zinc-500 mt-1 block">Örnek: `arrow-right` için <strong className="text-white">ArrowRight</strong>, `message-square` için <strong className="text-white">MessageSquare</strong> yazmalısınız.</span></li>
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
              <CardTitle className="text-xl">Sosyal Ağ İkonları Nasıl Kullanılır?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-zinc-300">
              <p>Eğer "İkon Seç" menüsündeki popüler logolar yeterli gelmezse, <strong>react-icons/fa</strong> kütüphanesindeki logoları kullanabilirsiniz:</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li><a href="https://react-icons.github.io/react-icons/icons/fa/" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">FontAwesome İkonları</a> adresine gidin.</li>
                <li>İstediğiniz markanın logosunu aratın (örn: "github", "accessible").</li>
                <li>İkon ismini, <strong>birebir aynı olacak şekilde (Fa ile başlayan)</strong> buradaki kutuya yazın.</li>
              </ol>
              <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800 mt-2">
                <span className="text-xs text-zinc-500 mb-1 block">Doğru Kullanım Örnekleri:</span>
                <ul className="list-disc pl-5 space-y-1 text-white font-mono text-xs">
                  <li>FaAccessibleIcon</li>
                  <li>FaGithub</li>
                  <li>FaTwitter</li>
                </ul>
              </div>
              <p className="text-xs text-zinc-500 mt-2">Not: Sadece "Fa" ile başlayan (FontAwesome) ikonlar desteklenmektedir.</p>
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
              <CardTitle className="text-xl">SimpleIcons Logoları Nasıl Kullanılır?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-zinc-300">
              <p>SimpleIcons, dünyadaki binlerce marka ve teknolojinin logolarını sağlayan ücretsiz bir kütüphanedir.</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li><a href="https://simpleicons.org/" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">simpleicons.org</a> adresine gidin.</li>
                <li>İstediğiniz teknolojiyi (örn: "react", "next.js") aratın.</li>
                <li>İkonun üzerine tıklayıp <strong>slug</strong> ismini kopyalayın (genellikle her şey küçük harftir).</li>
                <li>O ismi virgülle ayırarak buradaki kutuya yazın.<br/><span className="text-xs text-zinc-500 mt-1 block">Örnek: React için <strong className="text-white">react</strong>, Next.js için <strong className="text-white">nextdotjs</strong>, Node.js için <strong className="text-white">nodedotjs</strong>.</span></li>
              </ol>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
