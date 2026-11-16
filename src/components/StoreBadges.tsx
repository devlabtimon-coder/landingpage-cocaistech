import { useEffect, useState, type ReactNode } from 'react';
import appStoreBadge from '../assets/badges/app-store.svg';
import googlePlayBadge from '../assets/badges/google-play.png';
import { STORE_LINKS } from '../data';

const BADGES_ANCHOR = '#baixar-app';

// iPhone/iPad vão para a App Store e Android para o Google Play. O iPad com
// iPadOS se apresenta como Mac, então o toque é o que o diferencia.
function storeLinkForDevice(): string | null {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua) || (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1)) return STORE_LINKS.appStore;
  if (/Android/i.test(ua)) return STORE_LINKS.googlePlay;
  return null;
}

// No celular, leva direto à loja do aparelho; no computador, aos selos da página.
export function DownloadAppLink({
  className = '',
  onClick,
  children,
}: {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  const [href, setHref] = useState(BADGES_ANCHOR);

  useEffect(() => {
    const store = storeLinkForDevice();
    if (store) setHref(store);
  }, []);

  const external = href !== BADGES_ANCHOR;
  return (
    <a
      href={href}
      onClick={onClick}
      className={className}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  );
}

// Selos oficiais das lojas, sem alteração (regras de marca da Apple e do Google).
export function StoreBadges({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a href={STORE_LINKS.appStore} target="_blank" rel="noopener noreferrer" className="rounded-[10px] focus-visible:outline-offset-4">
        <img src={appStoreBadge} alt="Baixar o Ludus na App Store" width={120} height={40} className="h-12 w-auto" />
      </a>
      <a href={STORE_LINKS.googlePlay} target="_blank" rel="noopener noreferrer" className="rounded-[10px] focus-visible:outline-offset-4">
        <img src={googlePlayBadge} alt="Baixar o Ludus no Google Play" width={646} height={192} className="h-12 w-auto" />
      </a>
    </div>
  );
}
