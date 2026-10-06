import { useMemo, useState } from "react";
import { brainHotspots, type BrainHotspotId } from "../../data/executiveFunctions.data";
import { BrainNetworkMap } from "./BrainNetworkMap";

const featureColumns = [
  { id: "01", title: "Entenda", text: "Conheça as funções executivas e como elas influenciam sua execução no dia a dia.", icon: "book" },
  { id: "02", title: "Estruture", text: "Relacione demandas, vulnerabilidades e estratégias de apoio com base em evidências.", icon: "nodes" },
  { id: "03", title: "Execute", text: "Aplique sistemas simples para reduzir o custo cognitivo e aumentar consistência.", icon: "bars" },
] as const;

function BrainLogo() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M22 9c-4-5-12-2-11 4-6 0-8 8-3 11-4 5 0 12 6 11 1 5 7 6 10 2V11c0-1-1-2-2-2Zm4 0c4-5 12-2 11 4 6 0 8 8 3 11 4 5 0 12-6 11-1 5-7 6-10 2V11c0-1 1-2 2-2Z" />
      <path d="M15 18h6M12 27h9M33 18h-6M36 27h-9M18 14v7M30 14v7M18 30v7M30 30v7" />
    </svg>
  );
}

function FeatureIcon({ type }: { type: (typeof featureColumns)[number]["icon"] }) {
  if (type === "book") return <span aria-hidden="true">⌂</span>;
  if (type === "nodes") return <span aria-hidden="true">▦</span>;
  return <span aria-hidden="true">▥</span>;
}

export function ExecutiveHero() {
  const [activeId, setActiveId] = useState<BrainHotspotId>("working-memory");
  const active = useMemo(
    () => brainHotspots.find((item) => item.id === activeId) ?? brainHotspots[1],
    [activeId],
  );

  return (
    <section className="rcx-hero" aria-labelledby="rcx-hero-title">
      <header className="rcx-header">
        <a className="rcx-brand" href="/" aria-label="Risco Cognitivo — início">
          <span className="rcx-brand__mark"><BrainLogo /></span>
          <span>Risco<br />Cognitivo</span>
        </a>
        <nav className="rcx-nav" aria-label="Navegação principal">
          <a href="/blog/">Artigos</a><a href="/guias/">Guias</a><a href="/mapas/">Mapas</a>
          <a href="/ferramentas/">Ferramentas</a><a href="/about/">Sobre</a>
        </nav>
        <a className="rcx-cta" href="#rcx-lote">Começar agora</a>
      </header>

      <div className="rcx-hero__intro">
        <div className="rcx-eyebrow"><span />MAPA INTERATIVO<span /></div>
        <h1 id="rcx-hero-title">Entenda sua execução.</h1>
        <p>Explore as relações entre funções executivas, demandas e estratégias.</p>
      </div>

      <div className="rcx-hero__stage">
        <BrainNetworkMap activeId={activeId} onSelect={setActiveId} />
        <aside className="rcx-info-panel" aria-live="polite">
          <div className="rcx-info-panel__title">
            <span className="rcx-info-panel__glyph" aria-hidden="true">▦</span>
            <h2>{active.label}</h2>
          </div>
          <p>{active.shortDefinition}</p>
          <div className="rcx-info-row"><strong>Demanda</strong><span>Manter o objetivo ativo enquanto o contexto muda.</span></div>
          <div className="rcx-info-row"><strong>Dificuldade possível</strong><span>Perder o fio, reagir ao estímulo mais saliente ou abandonar a sequência.</span></div>
          <div className="rcx-info-row"><strong>Estratégia de apoio</strong><span>Externalizar estrutura, reduzir escolhas concorrentes e tornar a próxima ação visível.</span></div>
          <div className="rcx-evidence-note"><strong>Referência cerebral</strong><span>{active.scientificNetwork}</span></div>
        </aside>
      </div>

      <div className="rcx-stage-meta">
        <span>Selecione os marcadores para explorar as redes</span>
        <div className="rcx-pagination" aria-label="Indicador visual do lote"><i className="is-active" /><i /><i /><i /></div>
        <span>Mapa pedagógico · não diagnóstico</span>
      </div>

      <div className="rcx-feature-grid">
        {featureColumns.map((item) => (
          <article className="rcx-feature" key={item.id}>
            <div className="rcx-feature__icon"><FeatureIcon type={item.icon} /></div>
            <span className="rcx-feature__id">{item.id}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <a href="#rcx-lote" aria-label={`Ver ${item.title}`}>→</a>
          </article>
        ))}
      </div>
    </section>
  );
}
