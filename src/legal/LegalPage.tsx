import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Mail, Printer } from 'lucide-react';
import logo from '../assets/logo-ludus.webp';
import { CONTACT_EMAIL } from '../data';
import { SplashDecor } from '../components/Decor';
import { Footer } from '../components/Footer';
import { LEGAL_DOCS, type LegalBlock, type LegalDoc } from './content';

const DOC_LINKS = [
  { id: 'termos', label: 'Termos de Uso', short: 'Termos', href: '/ludus/termos/' },
  { id: 'privacidade', label: 'Privacidade', short: 'Privacidade', href: '/ludus/privacidade/' },
] as const;

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
}

// Destaca no índice a seção que está sendo lida.
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id)));
        const first = ids.find((id) => visible.has(id));
        if (first) setActive(first);
      },
      { rootMargin: '-96px 0px -60% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);

  return active;
}

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case 'p':
      return <p className="text-[17px] leading-[1.75] text-ink-soft">{block.text}</p>;

    case 'note':
      return (
        <p className="rounded-2xl border-l-4 border-yellow bg-lavender px-5 py-4 text-[15px] leading-relaxed text-ink-soft">
          {block.text}
        </p>
      );

    case 'list':
      return (
        <ul className="space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3.5 text-[17px] leading-[1.7] text-ink-soft">
              <span aria-hidden className="mt-[0.7em] size-2 shrink-0 rounded-full bg-yellow" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case 'points':
      return (
        <div className="overflow-hidden rounded-3xl border border-line">
          <table className="w-full text-left">
            <caption className="bg-lavender-2 px-5 py-3.5 text-left text-sm font-extrabold tracking-wide text-indigo uppercase">
              {block.caption}
            </caption>
            <thead className="sr-only">
              <tr>
                <th scope="col">Situação</th>
                <th scope="col">Pontos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {block.rows.map((row) => {
                const positive = row.value > 0;
                return (
                  <tr key={row.event} className="align-top">
                    <th scope="row" className="px-5 py-4 font-normal">
                      <span className="block text-[16px] leading-snug text-ink">{row.event}</span>
                      {row.note && <span className="mt-1 block text-sm leading-snug text-ink-mute">{row.note}</span>}
                    </th>
                    <td className="w-24 px-5 py-4 text-right">
                      <span
                        className={`tabular inline-flex min-w-14 justify-center rounded-full px-3 py-1 text-[15px] font-extrabold ${
                          positive ? 'bg-[#E3F5E8] text-success-ink' : 'bg-[#FCE8EC] text-danger'
                        }`}
                      >
                        {positive ? `+${row.value}` : `−${Math.abs(row.value)}`}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
  }
}

function TableOfContents({ doc, active }: { doc: LegalDoc; active: string }) {
  return (
    <ol className="space-y-0.5">
      {doc.sections.map((s, i) => {
        const current = s.id === active;
        return (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              aria-current={current ? 'location' : undefined}
              className={`flex gap-3 rounded-xl px-3 py-2 text-[15px] leading-snug transition-colors ${
                current ? 'bg-lavender-2 font-bold text-indigo' : 'text-ink-mute hover:bg-lavender hover:text-ink'
              }`}
            >
              <span className="tabular w-5 shrink-0 text-right font-bold">{i + 1}.</span>
              <span>{s.title}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}

export function LegalPage({ docId }: { docId: LegalDoc['id'] }) {
  const doc = LEGAL_DOCS[docId];
  const other = DOC_LINKS.find((d) => d.id !== docId)!;
  const [sectionIds] = useState(() => doc.sections.map((s) => s.id));
  const active = useActiveSection(sectionIds);
  const updated = formatDate(doc.updatedAt);

  return (
    <>
      <a
        href="#conteudo"
        className="fixed top-3 left-3 z-[60] -translate-y-20 rounded-xl bg-yellow px-4 py-2 font-bold text-navy focus:translate-y-0"
      >
        Pular para o conteúdo
      </a>

      <header className="relative z-10 bg-indigo print:hidden">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <a href="/ludus/" className="shrink-0" aria-label="Ludus, voltar ao site">
            <img src={logo} alt="Ludus" width={900} height={308} className="h-10 w-auto sm:h-12" />
          </a>
          <nav aria-label="Documentos" className="flex items-center gap-1 rounded-2xl bg-white/10 p-1">
            {DOC_LINKS.map((d) => (
              <a
                key={d.id}
                href={d.href}
                aria-current={d.id === docId ? 'page' : undefined}
                className={`rounded-xl px-3 py-2 text-sm font-bold whitespace-nowrap transition-colors sm:px-4 sm:text-[15px] ${
                  d.id === docId ? 'bg-yellow text-navy' : 'text-white/85 hover:text-white'
                }`}
              >
                <span className="sm:hidden">{d.short}</span>
                <span className="hidden sm:inline">{d.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden bg-indigo pt-10 pb-20 sm:pt-14 sm:pb-24 print:bg-white print:pt-0 print:pb-6">
        <div className="print:hidden">
          <SplashDecor variant="cta" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <a
            href="/ludus/"
            className="flex w-fit items-center gap-2 text-[15px] font-semibold text-white/80 transition-colors hover:text-white print:hidden"
          >
            <ArrowLeft size={18} strokeWidth={2.5} />
            Voltar ao site do Ludus
          </a>
          <p className="mt-8 flex w-fit rounded-full bg-white/12 px-3.5 py-1.5 text-sm font-bold text-yellow print:bg-transparent print:px-0 print:text-indigo">
            {doc.eyebrow}
          </p>
          <h1 className="mt-4 text-[2.5rem] leading-[1] font-black tracking-[-0.02em] text-white sm:text-6xl print:text-4xl print:text-ink">
            {doc.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85 print:text-ink-soft">{doc.summary}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[15px] text-white/80 print:text-ink-mute">
            <span>
              App Ludus · <strong className="font-bold text-white print:text-ink">IFMA Campus Timon</strong>
            </span>
            <span>
              Versão <strong className="font-bold text-white print:text-ink">{doc.version}</strong>
            </span>
            <span>
              Atualizado em{' '}
              <time dateTime={doc.updatedAt} className="font-bold text-white print:text-ink">
                {updated}
              </time>
            </span>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3.5 py-2 font-bold text-white transition-colors hover:bg-white/20 print:hidden"
            >
              <Printer size={17} strokeWidth={2.25} />
              Imprimir ou salvar PDF
            </button>
          </div>
        </div>
      </section>

      <main id="conteudo" className="relative -mt-10 rounded-t-sheet bg-white print:mt-0">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-10 pb-20 sm:px-6 sm:pt-14 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:pb-28">
          <aside className="lg:col-span-4 xl:col-span-3 print:hidden">
            <details className="group rounded-2xl border border-line lg:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-bold text-indigo">
                Nesta página
                <ArrowRight size={18} className="transition-transform group-open:rotate-90" />
              </summary>
              <div className="border-t border-line p-2">
                <TableOfContents doc={doc} active={active} />
              </div>
            </details>

            <nav aria-label="Nesta página" className="sticky top-8 hidden lg:block">
              <p className="mb-3 px-3 text-sm font-extrabold tracking-wider text-ink-mute uppercase">Nesta página</p>
              <TableOfContents doc={doc} active={active} />
            </nav>
          </aside>

          <article className="min-w-0 lg:col-span-8 xl:col-span-7 xl:col-start-5">
            {doc.sections.map((section, i) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-8 border-b border-line py-10 first:pt-0 last:border-b-0 print:break-inside-avoid print:py-5"
              >
                <h2 className="flex items-baseline gap-3 text-2xl font-extrabold tracking-[-0.01em] text-ink sm:text-[1.75rem]">
                  <span className="tabular font-black text-indigo/45">{String(i + 1).padStart(2, '0')}</span>
                  {section.title}
                </h2>
                <div className="mt-5 space-y-5">
                  {section.blocks.map((block, j) => (
                    <Block key={j} block={block} />
                  ))}
                </div>
              </section>
            ))}

            <aside className="mt-6 rounded-3xl bg-lavender p-6 sm:p-8 print:hidden">
              <h2 className="text-xl font-extrabold text-ink">Ficou alguma dúvida?</h2>
              <p className="mt-2 text-[16px] leading-relaxed text-ink-soft">
                Fale com a equipe do Ludus ou procure a biblioteca do IFMA Campus Timon.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo px-5 py-3.5 font-extrabold text-white transition-colors hover:bg-indigo-600"
                >
                  <Mail size={18} strokeWidth={2.25} />
                  {CONTACT_EMAIL}
                </a>
                <a
                  href={other.href}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-indigo/20 bg-white px-5 py-3.5 font-extrabold text-indigo transition-colors hover:border-indigo/40"
                >
                  Ler {other.id === 'termos' ? 'os Termos de Uso' : 'a Política de Privacidade'}
                  <ArrowRight size={18} strokeWidth={2.5} />
                </a>
              </div>
            </aside>
          </article>
        </div>
      </main>

      <div className="print:hidden">
        <Footer base="/ludus/" />
      </div>
    </>
  );
}
