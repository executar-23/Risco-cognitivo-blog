import { getExecutiveFunction, getMacro, type RiskCard } from "../../data/executiveFunctions.data";
import { BrainNetworkMap } from "./BrainNetworkMap";

export function RiskCardSlide({ card }: { card: RiskCard }) {
  const macro = getMacro(card.macroId);
  const executiveFunction = getExecutiveFunction(card.executiveFunctionId);

  return (
    <article className="rcx-slide rcx-risk-slide" data-id={card.id} data-export="16:9">
      <div className="rcx-risk-slide__header">
        <div>
          <span className="rcx-slide__id">{card.id}</span>
          <span className="rcx-risk-slide__macro">{macro?.id} · {macro?.title}</span>
        </div>
        <span className="rcx-risk-slide__fe">{card.executiveFunctionId} · {executiveFunction?.title}</span>
      </div>
      <div className="rcx-risk-slide__body">
        <div className="rcx-risk-slide__copy">
          <h2>{card.title}</h2>
          <div className="rcx-chain">
            <section><span>01 · Demanda</span><p>{card.demand}</p></section>
            <section><span>02 · Dificuldade possível</span><p>{card.difficulty}</p></section>
            <section><span>03 · Estratégia de apoio</span><p>{card.strategy}</p></section>
          </div>
        </div>
        <div className="rcx-risk-slide__brain">
          <BrainNetworkMap activeId={card.brainHotspotId} compact interactive={false} />
          <div className="rcx-brain-caption"><strong>Foco cerebral didático</strong><span>{card.brainFocus}</span></div>
        </div>
      </div>
      <footer className="rcx-risk-slide__footer">
        <span>Risco Cognitivo · Entenda → Estruture → Execute</span>
        <span>Mapa pedagógico · não diagnóstico</span>
      </footer>
    </article>
  );
}
