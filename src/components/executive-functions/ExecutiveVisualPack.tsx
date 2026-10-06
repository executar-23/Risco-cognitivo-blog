import { executiveMacros, riskCards } from "../../data/executiveFunctions.data";
import { ExecutiveHero } from "./ExecutiveHero";
import { MacroCoverSlide } from "./MacroCoverSlide";
import { RiskCardSlide } from "./RiskCardSlide";
import "./executive-functions.css";

export function ExecutiveVisualPack() {
  return (
    <main className="rcx-root">
      <ExecutiveHero />
      <section className="rcx-batch" id="rcx-lote" aria-labelledby="rcx-macro-title">
        <div className="rcx-section-heading">
          <span>LOTE 01</span>
          <h2 id="rcx-macro-title">3 capas macroatômicas</h2>
          <p>Inibição, memória de trabalho e flexibilidade cognitiva.</p>
        </div>
        <div className="rcx-slide-list">
          {executiveMacros.map((macro) => <MacroCoverSlide key={macro.id} macro={macro} />)}
        </div>
      </section>
      <section className="rcx-batch" aria-labelledby="rcx-risk-title">
        <div className="rcx-section-heading">
          <span>LOTE 02</span>
          <h2 id="rcx-risk-title">RC-01 → RC-09</h2>
          <p>Nove traduções operacionais de demanda, dificuldade e estratégia de apoio.</p>
        </div>
        <div className="rcx-slide-list">
          {riskCards.map((card) => <RiskCardSlide key={card.id} card={card} />)}
        </div>
      </section>
    </main>
  );
}
