# Agent Prompt Contract — Executive Functions Visual Pack V2

## METADATA
- ID: RC-EF-VISUAL-PACK-002
- VERSION: 2.0.0
- AREA: Design System / Editorial Visual / Neurociência aplicada
- WORKFLOW: Evidence → Taxonomy → Design Handoff → React → Route → Validation
- OWNER: A DEFINIR
- STATUS: READY
- AUTOMATION_LEVEL: A4 alvo

## OBJECTIVE
Implementar no repositório executar-23/Risco-cognitivo-blog um módulo visual reutilizável para produzir, visualizar e posteriormente exportar o lote de funções executivas do projeto Risco Cognitivo. O módulo deve gerar uma hero interativa, três capas macroatômicas 16:9 e nove cards RC-01 → RC-09, preservando a referência visual fornecida e separando corretamente ciência, pedagogia e intervenção operacional.

## OBSERVED REPOSITORY STATE
- Repositório: executar-23/Risco-cognitivo-blog
- Stack observado: Astro 5 + React 19 + TypeScript.
- Integração: @astrojs/react.
- O projeto atual possui Tailwind/shadcn e um design system legado; este módulo NÃO deve depender deles.
- src/styles/global.css contém tokens globais existentes. Não substituir nem renomear esses tokens.
- Existe regra de governança de rotas: toda página em src/pages deve ser registrada em src/data/routes.ts.
- Implementação deve ser portátil para futura migração a React Router: lógica visual e dados não podem depender de APIs específicas do Astro, exceto o arquivo host .astro.

## INPUT — REFERENCE VISUAL
- fundo branco;
- preto forte para títulos;
- cinza neutro para texto secundário;
- laranja para marca, hotspots, bordas de foco e CTA;
- cérebro pontilhado com aparência científica/editorial;
- labels em pill;
- painel lateral com borda laranja fina;
- divisórias delicadas;
- whitespace amplo;
- blocos inferiores Entenda → Estruture → Execute.

## DESIGN TOKENS DO MÓDULO
Criar tokens locais com prefixo --rcx- e classes rcx-*:
- background #FFFFFF
- surface #FFFFFF
- surface-soft #F8F7F5
- text #111113
- text-secondary #6F7178
- text-muted #96999F
- line #E9E6E2
- line-strong #D9D5D0
- orange #FF5A1F
- orange-dark #E64B12
- orange-soft #FFF0E9
- orange-dot #EE8B5E
- radius sm 12, md 18, lg 24
- font: Inter → DM Sans → system sans
- max-width 1240px

## SCIENTIFIC TAXONOMY
Core:
- MA-01 Inibição
- MA-02 Memória de Trabalho
- MA-03 Flexibilidade Cognitiva

Operational:
- FE-01 Autoconhecimento
- FE-02 Inibição
- FE-03 Memória de trabalho não verbal
- FE-04 Memória de trabalho verbal
- FE-05 Regulação das emoções
- FE-06 Automotivação
- FE-07 Planejamento / resolução de problemas

## RC MAPPING
- RC-01 Sobrecarga e bloqueio → MA-01 → FE-05
- RC-02 Excesso de lembretes → MA-02 → FE-04
- RC-03 Multitarefa e fragmentação → MA-03 → FE-07
- RC-04 Acúmulo de trabalho → MA-01 → FE-06
- RC-05 Pressão do tempo → MA-02 → FE-03
- RC-06 Foco em uma tarefa → MA-01 → FE-02
- RC-07 Encontrar a próxima peça → MA-03 → FE-07
- RC-08 Planejamento visual → MA-02 → FE-03
- RC-09 Externalização e organização → MA-02 → FE-04

## BRAIN MAPPING
Representar como hotspot didático em rede, nunca como localização exclusiva:
- working-memory: DLPFC + córtex parietal posterior;
- inhibition: giro frontal inferior direito + pré-SMA, com participação de redes cingulo/frontoparietais;
- flexibility: rede distribuída envolvendo regiões pré-frontais, cíngulo anterior e parietal posterior;
- planning: componentes dorsolaterais e rostrais/frontopolares dentro de redes de planejamento/controle.

## CONSTRAINTS
1. React + TypeScript.
2. CSS isolado; sem Tailwind e sem shadcn no novo módulo.
3. Não alterar o design system global.
4. Não introduzir dependência externa para desenhar o cérebro.
5. Cérebro deve ser SVG determinístico para SSR e captura visual estável.
6. Todas as strings visíveis em pt-BR.
7. Mobile-first e responsivo.
8. ARIA, foco visível e teclado.
9. Respeitar prefers-reduced-motion.
10. Não usar linguagem diagnóstica.
11. Em ciência, usar “rede”, “associado”, “participação” e “ênfase didática”; evitar “fica nesta região”.
12. Todos os IDs devem ser estáveis.
13. Rota nova só é válida se registrada em src/data/routes.ts.

## FILE CONTRACT
src/
├── components/
│   └── executive-functions/
│       ├── BrainNetworkMap.tsx
│       ├── ExecutiveHero.tsx
│       ├── ExecutiveVisualPack.tsx
│       ├── MacroCoverSlide.tsx
│       ├── RiskCardSlide.tsx
│       ├── executive-functions.css
│       └── index.ts
├── data/
│   └── executiveFunctions.data.ts
└── pages/
    └── lab/
        └── funcoes-executivas.astro

docs/
└── executive-functions/
    ├── README.md
    ├── 01-agent-prompt-short.md
    ├── 02-agent-prompt-v2.md
    ├── 03-design-handoff.md
    ├── 04-scientific-mapping.md
    └── manifest.yaml

## COMPONENT CONTRACTS
BrainNetworkMap.tsx:
- activeId?: BrainHotspotId
- onSelect?: (id) => void
- compact?: boolean
- interactive?: boolean
Responsibilities: point-cloud brain SVG, decorative orbital lines, four hotspots, active state, accessible labels, deterministic SSR output.

ExecutiveHero.tsx:
- header/brand/navigation/CTA
- eyebrow MAPA INTERATIVO
- title Entenda sua execução.
- subtitle
- brain map
- contextual side panel
- usage metadata
- Entenda/Estruture/Execute columns

MacroCoverSlide.tsx:
- input ExecutiveMacro
- output 16:9 slide with ID, title, definition, related functions, network note and compact brain map

RiskCardSlide.tsx:
- input RiskCard
- output 16:9 slide with RC ID, macro, primary function, demand, possible difficulty, support strategy, brain-network illustration and pedagogy disclaimer

ExecutiveVisualPack.tsx:
1. hero
2. 3 macros
3. 9 RC cards

## DATA CONTRACT
executiveFunctions.data.ts is the only source of truth for types, 7 functions, 3 macros, 4 brain hotspots, RC-01 → RC-09 and getters. Components must not duplicate taxonomy strings.

## ROUTE
Create /lab/funcoes-executivas/ as a non-production laboratory route. Host with Astro and load ExecutiveVisualPack using client:load. Add corresponding entry to src/data/routes.ts:
- group: Estados de teste
- exposure: test
- addedAt: 2026-10-06

## VALIDATION
Before declaring DONE:
- confirm 3 macros;
- confirm 7 FE definitions;
- confirm RC-01 → RC-09 without gaps or duplicates;
- confirm every RC references a valid macro and FE;
- confirm every brain hotspot has label and network note;
- confirm no imports from Tailwind/shadcn in the new module;
- confirm CSS selectors are namespaced rcx-;
- confirm responsive breakpoints exist;
- confirm reduced-motion CSS exists;
- confirm route host imports BaseHead and module;
- confirm route registry is updated;
- if CI/build is available, run it and record result; otherwise mark build verification as pending.

## ACCEPTANCE CRITERIA
DONE only when the implementation exists in the repository branch, the complete portable ZIP has been generated, the route governance has been updated, and evidence of commit/branch plus local structural validation is recorded.
