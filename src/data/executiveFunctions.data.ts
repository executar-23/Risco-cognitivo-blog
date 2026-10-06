export type MacroId = "MA-01" | "MA-02" | "MA-03";
export type ExecutiveFunctionId =
  | "FE-01"
  | "FE-02"
  | "FE-03"
  | "FE-04"
  | "FE-05"
  | "FE-06"
  | "FE-07";
export type RiskCardId =
  | "RC-01"
  | "RC-02"
  | "RC-03"
  | "RC-04"
  | "RC-05"
  | "RC-06"
  | "RC-07"
  | "RC-08"
  | "RC-09";

export type BrainHotspotId =
  | "planning"
  | "inhibition"
  | "working-memory"
  | "flexibility";

export interface ExecutiveFunctionDefinition {
  id: ExecutiveFunctionId;
  title: string;
  description: string;
}

export interface ExecutiveMacro {
  id: MacroId;
  title: string;
  shortDefinition: string;
  scientificNetwork: string;
  brainHotspotId: BrainHotspotId;
  relatedFunctions: ExecutiveFunctionId[];
}

export interface RiskCard {
  id: RiskCardId;
  title: string;
  macroId: MacroId;
  executiveFunctionId: ExecutiveFunctionId;
  demand: string;
  difficulty: string;
  strategy: string;
  brainFocus: string;
  brainHotspotId: BrainHotspotId;
}

export interface BrainHotspot {
  id: BrainHotspotId;
  label: string;
  shortDefinition: string;
  scientificNetwork: string;
  x: number;
  y: number;
}

export const executiveFunctions: ExecutiveFunctionDefinition[] = [
  { id: "FE-01", title: "Autoconhecimento", description: "Observar o próprio comportamento, estado e desempenho para ajustar a ação." },
  { id: "FE-02", title: "Inibição", description: "Frear ou adiar respostas automáticas para permitir uma escolha orientada ao objetivo." },
  { id: "FE-03", title: "Memória de trabalho não verbal", description: "Manter representações visuais, espaciais, temporais e prospectivas durante a execução." },
  { id: "FE-04", title: "Memória de trabalho verbal", description: "Usar linguagem interna e informação verbal ativa para orientar e organizar a ação." },
  { id: "FE-05", title: "Regulação das emoções", description: "Modular emoção e motivação para preservar o comportamento dirigido a metas." },
  { id: "FE-06", title: "Automotivação", description: "Gerar e sustentar ativação interna suficiente para iniciar e continuar a ação." },
  { id: "FE-07", title: "Planejamento / resolução de problemas", description: "Construir sequências, testar alternativas e reorganizar a execução diante de obstáculos." },
];

export const executiveMacros: ExecutiveMacro[] = [
  {
    id: "MA-01",
    title: "Inibição",
    shortDefinition: "Freia impulsos, distrações e respostas automáticas para proteger o objetivo.",
    scientificNetwork: "Rede de inibição: giro frontal inferior direito, pré-SMA e regiões cinguladas/frontoparietais.",
    brainHotspotId: "inhibition",
    relatedFunctions: ["FE-02", "FE-05", "FE-06"],
  },
  {
    id: "MA-02",
    title: "Memória de trabalho",
    shortDefinition: "Mantém e manipula informações ativas enquanto a tarefa está sendo executada.",
    scientificNetwork: "Rede frontoparietal: córtex pré-frontal dorsolateral e córtex parietal posterior.",
    brainHotspotId: "working-memory",
    relatedFunctions: ["FE-03", "FE-04"],
  },
  {
    id: "MA-03",
    title: "Flexibilidade cognitiva",
    shortDefinition: "Permite mudar estratégia, perspectiva, regra ou sequência quando o contexto muda.",
    scientificNetwork: "Rede distribuída com participação pré-frontal, cíngulo anterior e córtex parietal posterior.",
    brainHotspotId: "flexibility",
    relatedFunctions: ["FE-07"],
  },
];

export const brainHotspots: BrainHotspot[] = [
  {
    id: "planning",
    label: "Planejamento",
    shortDefinition: "Organiza subobjetivos, sequência e alternativas antes e durante a execução.",
    scientificNetwork: "Planejamento recruta redes distribuídas, com participação importante de PFC dorsolateral e regiões rostrais/frontopolares.",
    x: 42,
    y: 22,
  },
  {
    id: "working-memory",
    label: "Memória de trabalho",
    shortDefinition: "Mantém e manipula informação relevante enquanto você executa uma tarefa.",
    scientificNetwork: "Rede frontoparietal, com destaque para córtex pré-frontal dorsolateral e parietal posterior.",
    x: 23,
    y: 55,
  },
  {
    id: "inhibition",
    label: "Controle inibitório",
    shortDefinition: "Interrompe ou posterga respostas automáticas para proteger o objetivo atual.",
    scientificNetwork: "Rede de controle com destaque para giro frontal inferior direito e pré-SMA; não é uma função localizada em um ponto único.",
    x: 67,
    y: 36,
  },
  {
    id: "flexibility",
    label: "Flexibilidade",
    shortDefinition: "Permite mudar regra, estratégia ou perspectiva diante de novas condições.",
    scientificNetwork: "Rede distribuída envolvendo regiões pré-frontais, cíngulo anterior e parietais posteriores.",
    x: 70,
    y: 70,
  },
];

export const riskCards: RiskCard[] = [
  {
    id: "RC-01",
    title: "Sobrecarga e bloqueio",
    macroId: "MA-01",
    executiveFunctionId: "FE-05",
    demand: "Lidar com excesso de estímulos e exigências simultâneas sem travar.",
    difficulty: "A carga sobe, a reação emocional ocupa o sistema e a ação pode parar.",
    strategy: "Reduzir a carga visível, limitar opções e definir uma primeira ação pequena e segura.",
    brainFocus: "Regulação e controle inibitório em rede.",
    brainHotspotId: "inhibition",
  },
  {
    id: "RC-02",
    title: "Excesso de lembretes",
    macroId: "MA-02",
    executiveFunctionId: "FE-04",
    demand: "Manter compromissos e instruções disponíveis sem depender apenas da memória interna.",
    difficulty: "Alertas, recados e lembretes se acumulam e deixam de funcionar como sistema confiável.",
    strategy: "Consolidar lembretes em poucos sistemas externos claros: lista, agenda e checklist.",
    brainFocus: "Memória de trabalho verbal em rede frontoparietal.",
    brainHotspotId: "working-memory",
  },
  {
    id: "RC-03",
    title: "Multitarefa e fragmentação",
    macroId: "MA-03",
    executiveFunctionId: "FE-07",
    demand: "Alternar entre tarefas sem perder contexto, prioridade ou continuidade.",
    difficulty: "Muitas trocas consomem controle e tornam a execução fragmentada.",
    strategy: "Reduzir WIP, explicitar sequência e agrupar mudanças de contexto.",
    brainFocus: "Flexibilidade e controle frontoparietal.",
    brainHotspotId: "flexibility",
  },
  {
    id: "RC-04",
    title: "Acúmulo de trabalho",
    macroId: "MA-01",
    executiveFunctionId: "FE-06",
    demand: "Iniciar tarefas cedo o bastante para evitar acúmulo crítico.",
    difficulty: "A ativação demora, as pendências crescem e o custo de começar aumenta.",
    strategy: "Converter intenção em próxima ação concreta, curta, visível e imediatamente executável.",
    brainFocus: "Autorregulação motivacional e controle executivo distribuído.",
    brainHotspotId: "inhibition",
  },
  {
    id: "RC-05",
    title: "Pressão do tempo",
    macroId: "MA-02",
    executiveFunctionId: "FE-03",
    demand: "Representar prazo, horizonte e sequência antes da urgência dominar.",
    difficulty: "O futuro perde saliência e a tarefa parece real apenas quando o prazo está próximo.",
    strategy: "Externalizar tempo com timeline, marcos, blocos e sinais visuais de progresso.",
    brainFocus: "Memória de trabalho não verbal e controle frontoparietal.",
    brainHotspotId: "working-memory",
  },
  {
    id: "RC-06",
    title: "Foco em uma tarefa",
    macroId: "MA-01",
    executiveFunctionId: "FE-02",
    demand: "Sustentar a ação escolhida e resistir a estímulos concorrentes.",
    difficulty: "Cada interrupção ou impulso abre uma nova frente e desloca o objetivo atual.",
    strategy: "Usar WIP = 1, barreiras de distração e um ambiente que torne a tarefa-alvo dominante.",
    brainFocus: "Rede de controle inibitório.",
    brainHotspotId: "inhibition",
  },
  {
    id: "RC-07",
    title: "Encontrar a próxima peça",
    macroId: "MA-03",
    executiveFunctionId: "FE-07",
    demand: "Transformar um objetivo amplo em uma ação que possa começar agora.",
    difficulty: "O objetivo existe, mas a sequência ainda não foi resolvida em passos executáveis.",
    strategy: "Decompor até a menor próxima ação observável e verificável.",
    brainFocus: "Planejamento, resolução de problemas e flexibilidade.",
    brainHotspotId: "planning",
  },
  {
    id: "RC-08",
    title: "Planejamento visual",
    macroId: "MA-02",
    executiveFunctionId: "FE-03",
    demand: "Manter visíveis o todo, a sequência, dependências e posição atual.",
    difficulty: "Sem representação externa, o mapa da execução precisa ser reconstruído repetidamente.",
    strategy: "Usar quadro, mapa, fluxo ou timeline como memória externa persistente.",
    brainFocus: "Memória de trabalho visuoespacial e planejamento em rede.",
    brainHotspotId: "working-memory",
  },
  {
    id: "RC-09",
    title: "Externalização e organização",
    macroId: "MA-02",
    executiveFunctionId: "FE-04",
    demand: "Transferir informação da cabeça para um sistema externo confiável e recuperável.",
    difficulty: "A mente vira depósito, agenda, lista e sistema de priorização ao mesmo tempo.",
    strategy: "Capturar, categorizar e revisar em um sistema único com checkpoints definidos.",
    brainFocus: "Memória de trabalho verbal e controle frontoparietal.",
    brainHotspotId: "working-memory",
  },
];

export const getExecutiveFunction = (id: ExecutiveFunctionId) =>
  executiveFunctions.find((item) => item.id === id);

export const getMacro = (id: MacroId) =>
  executiveMacros.find((item) => item.id === id);
