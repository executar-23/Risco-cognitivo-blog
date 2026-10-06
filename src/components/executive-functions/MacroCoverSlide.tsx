import { getExecutiveFunction, type ExecutiveMacro } from "../../data/executiveFunctions.data";
import { BrainNetworkMap } from "./BrainNetworkMap";

export function MacroCoverSlide({ macro }: { macro: ExecutiveMacro }) {
  return (
    <article className="rcx-slide rcx-macro-slide" data-id={macro.id} data-export="16:9">
      <div className="rcx-slide__copy">
        <div className="rcx-eyebrow rcx-eyebrow--left"><span />FUNÇÃO EXECUTIVA NUCLEAR</div>
        <span className="rcx-slide__id">{macro.id}</span>
        <h2>{macro.title}</h2>
        <p className="rcx-slide__lead">{macro.shortDefinition}</p>
        <div className="rcx-slide__functions">
          <span>Funções operacionais relacionadas</span>
          {macro.relatedFunctions.map((id) => {
            const item = getExecutiveFunction(id);
            return item ? <div className="rcx-function-chip" key={id}><strong>{id}</strong><span>{item.title}</span></div> : null;
          })}
        </div>
        <div className="rcx-science-strip"><strong>Referência neural didática</strong><span>{macro.scientificNetwork}</span></div>
      </div>
      <div className="rcx-slide__visual">
        <BrainNetworkMap activeId={macro.brainHotspotId} compact interactive={false} />
        <p>As funções executivas dependem de redes distribuídas; o hotspot indica ênfase didática, não localização exclusiva.</p>
      </div>
    </article>
  );
}
