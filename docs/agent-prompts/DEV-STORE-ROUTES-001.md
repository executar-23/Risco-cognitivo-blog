# DEV-STORE-ROUTES-001 — Agent Prompt Contract

- **Versão:** 1.0.0
- **ADR:** [`docs/adr/ADR-STORE-ROUTES-UI-001.md`](../adr/ADR-STORE-ROUTES-UI-001.md)
- **Handoff:** [`docs/handoff/STORE-ROUTES-HANDOFF.md`](../handoff/STORE-ROUTES-HANDOFF.md)

Este arquivo é a **fonte da verdade operacional** do workflow: o agente o lê antes de alterar
qualquer código. Não é um script executável. O bloco abaixo é o contrato original, sem edições
de conteúdo (apenas a restauração das chaves `{ }` do schema de mock, perdidas na conversão de
formato). Mudanças futuras criam nova versão (`1.1.0`, `2.0.0`) e são registradas em
[Histórico de versões](#histórico-de-versões).

## Entry point (comando curto)

```text
Execute o workflow DEV-STORE-ROUTES-001.

Source of Truth: docs/agent-prompts/DEV-STORE-ROUTES-001.md
ADR: docs/adr/ADR-STORE-ROUTES-UI-001.md

Comece inspecionando router, Design System, tokens, componentes e navegação.
Primeira rota alvo: /loja. Depois: /loja/skills, /loja/ebooks, /loja/:type/:slug.
Siga WIP=1. Não substitua componentes existentes. Use mock data.
Verifique os critérios de aceite antes de declarar DONE.
```

## Contrato

```text
<AGENT_PROMPT_CONTRACT>

<METADATA>

ID: DEV-STORE-ROUTES-001
VERSION: 1.0.0
ADR_ID: ADR-STORE-ROUTES-UI-001

AREA:
Frontend / Store / Skills / Editorial / Assets

WORKFLOW:
Inspect Existing UI
→ Map Components
→ Define Routes
→ Build Wireframes
→ Implement
→ Populate Mock Data
→ Verify
→ Document

OWNER:
Leonardo

STATUS:
READY_FOR_EXECUTION

AUTOMATION_LEVEL:
A4

LANGUAGE:
pt-BR

WIP:
1

</METADATA>

<ROLE>

Atue como:

- Product Designer;
- UX Architect;
- Design Systems Engineer;
- Frontend Engineer;
- Information Architect;
- React Engineer;
- Technical Product Designer.

Você receberá um projeto que JÁ POSSUI:

- UI;
- Design System;
- componentes;
- estilos;
- tokens;
- rotas;
- infraestrutura frontend.

Sua função não é reconstruir o produto.

Sua função é integrar novas rotas e experiências
dentro da arquitetura visual e técnica existente.

</ROLE>

<PRIMARY_OBJECTIVE>

Implementar uma primeira versão funcional da área:

LOJA / FERRAMENTAS / SKILLS / ASSETS

utilizando os componentes existentes no projeto.

Nesta primeira implementação:

USE MOCK DATA.

Não aguardar schemas finais.

O objetivo é validar:

- arquitetura;
- rotas;
- composição;
- hierarquia;
- componentes;
- responsive behavior;
- navigation;
- discovery;
- detail view;
- experiência da Store.

O backend definitivo e os schemas finais serão conectados posteriormente.

</PRIMARY_OBJECTIVE>

<NO_EXTERNAL_DEPENDENCY_RULE>

Este prompt é autocontido.

Não dependa de outro ADR para compreender a arquitetura.

Se documentos adicionais existirem no projeto:

USE-OS PARA VALIDAR.

Mas não interrompa a implementação somente porque um documento
adicional está ausente.

A fonte técnica prioritária é:

1. código existente;
2. Design System existente;
3. componentes existentes;
4. este contrato;
5. referências visuais fornecidas.

</NO_EXTERNAL_DEPENDENCY_RULE>

<CORE_DECISION>

REUTILIZAR.

NÃO RECONSTRUIR.

Antes de criar qualquer componente:

1. localizar componentes existentes;
2. verificar se atendem ao requisito;
3. verificar variantes existentes;
4. reutilizar;
5. criar novo componente apenas quando não houver equivalente.

Nunca duplicar:

Card
Button
Badge
Tabs
Input
Search
ScrollArea
Separator
Accordion
Collapsible
Skeleton
Spinner
Progress
Alert
AspectRatio
Dialog
Sheet
Drawer

quando o projeto já possuir equivalente.

</CORE_DECISION>

<REFERENCE_PATTERNS>

As referências visuais fornecidas representam PADRÕES DE UX,
não identidade visual a ser copiada.

--------------------------------------------------

PATTERN 01 — BROWSE

Inspirado na referência de navegação Browse.

Usar para:

- navegação;
- busca;
- categorias;
- filtros;
- organização por domínio.

Características:

- título claro;
- search dominante;
- categorias acessíveis;
- agrupamentos;
- navegação simples;
- alta legibilidade.

--------------------------------------------------

PATTERN 02 — PLUGIN LIST

Inspirado na referência de Plugins.

Aplicar prioritariamente a:

- Skills;
- Agents;
- Prompts;
- Automations.

Formato:

ícone
+
nome
+
descrição curta
+
tags
+
ação.

Pode ser:

row/list

ou:

compact card.

--------------------------------------------------

PATTERN 03 — CONNECTOR CARD

Inspirado na referência de Connectors.

Aplicar prioritariamente a:

- E-books;
- PDFs;
- HTML Tools;
- Workbooks;
- Templates;
- Visual Assets.

Formato:

imagem/capa/ícone
+
nome
+
descrição
+
tags
+
ação.

--------------------------------------------------

PATTERN 04 — REPORT DETAIL

Inspirado estruturalmente no Privacy Report.

Aplicar ao DETAIL VIEW.

LEFT:

- símbolo;
- identidade;
- descrição;
- contexto;
- flowchart de uso.

RIGHT:

- Problema;
- Processo;
- Progresso.

--------------------------------------------------

PATTERN 05 — COMPONENT GALLERY

A referência do Design System demonstra:

- Card;
- Badge;
- Progress;
- Alert;
- Item;
- Table;
- Empty;
- ScrollArea;
- Separator;
- Carousel;
- Collapsible;
- Accordion.

Utilizar os equivalentes já presentes no projeto.

</REFERENCE_PATTERNS>

<AREA_COLOR_ARCHITECTURE>

A cor representa ÁREA.

Não transformar a aplicação inteira em uma interface colorida.

BASE:

background:
neutral / white

surface:
neutral

text:
dark

border:
neutral

ACCENT:
determinado pela área.

--------------------------------------------------

AREA 01

INSTITUCIONAL

COLOR ROLE:
BLUE

Uso:

- marker;
- selected indicator;
- icon container;
- small border;
- category accent;
- active navigation.

--------------------------------------------------

AREA 02

ARTIGOS / EDITORIAL

COLOR ROLE:
YELLOW

Uso:

- marker;
- section indicator;
- category icon;
- editorial badge;
- small accent.

IMPORTANTE:

texto sobre amarelo:
dark.

--------------------------------------------------

AREA 03

SKILLS

COLOR ROLE:
GREEN

Uso:

- skill marker;
- icon container;
- selected state;
- category badge;
- section accent.

--------------------------------------------------

ADDITIONAL AREAS

O agente pode selecionar outras cores.

REGRAS:

1. uma área = uma cor estável;
2. não trocar cor entre páginas;
3. manter contraste;
4. registrar a decisão em tokens;
5. não reutilizar a mesma cor para duas áreas principais quando isso gerar ambiguidade;
6. não utilizar cor como única forma de identificação.

</AREA_COLOR_ARCHITECTURE>

<RECOMMENDED_AREA_TOKEN_MODEL>

Criar ou integrar semanticamente:

--area-institutional
--area-editorial
--area-skills
--area-store
--area-data
--area-operations
--area-research
--area-tools

Somente definir valores novos se o Design System
não possuir tokens equivalentes.

Não duplicar tokens existentes.

</RECOMMENDED_AREA_TOKEN_MODEL>

<COLOR_APPLICATION>

PREFER:

┌──────────────────────────────┐
│ ▌ CARD TITLE                 │
│                              │
│ conteúdo neutro              │
│                              │
│ [AREA TAG]                   │
└──────────────────────────────┘

ou:

[GREEN ICON] Skill

ou:

● Skills

NÃO:

┌──────────────────────────────┐
│                              │
│ CARD INTEIRO VERDE           │
│                              │
└──────────────────────────────┘

A interface deve permanecer predominantemente neutra.

</COLOR_APPLICATION>

<ROUTE_ARCHITECTURE>

Primeiro inspecione as rotas existentes.

Se existir rota equivalente:

EXTEND.

Não criar duplicata.

Arquitetura funcional desejada:

/
└── Institutional

/artigos
└── Editorial / Articles

/skills
└── Skills discovery

/loja
└── Store Hub

/loja/skills

/loja/agentes

/loja/prompts

/loja/ebooks

/loja/pdfs

/loja/html

/loja/workbooks

/loja/assets

/loja/:type/:slug
└── Product / Tool Detail

Se o projeto já utilizar outro padrão de rotas:

preservar o padrão existente.

Não renomear rotas existentes sem necessidade.

</ROUTE_ARCHITECTURE>

<ROUTE_RELATIONSHIP>

A estrutura lógica é:

                    STORE
                      │
     ┌────────────────┼─────────────────────┐
     │                │                     │
     ▼                ▼                     ▼
   SKILLS          E-BOOKS               ASSETS
     │                │                     │
     ▼                ▼                     ▼
  catalog          catalog                catalog
     │                │                     │
     └────────────────┼─────────────────────┘
                      ▼
                  ITEM DETAIL
                      │
                      ▼
                      CTA

</ROUTE_RELATIONSHIP>

<STORE_HOME_WIREFRAME>

DESKTOP:

┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│ LOJA / FERRAMENTAS                                              │
│ Descubra recursos para apoiar sua execução.                     │
│                                                                 │
│ [ Buscar ferramentas................................ ] [Filter] │
│                                                                 │
│ [Todos] [Skills] [Prompts] [E-books] [Workbooks] [Assets]      │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ CATEGORIAS                                                      │
│                                                                 │
│ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐        │
│ │ ● Skills       │ │ ● E-books      │ │ ● Prompts      │        │
│ │ ferramentas    │ │ conhecimento   │ │ IA             │        │
│ └────────────────┘ └────────────────┘ └────────────────┘        │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ DESTAQUE                                                        │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │                                                             │ │
│ │ [ICON]  Cognitive Framework Router                          │ │
│ │                                                             │ │
│ │ Descrição genérica temporária para teste de layout.         │ │
│ │                                                             │ │
│ │ [Skill] [Gestão]                              [Abrir →]      │ │
│ │                                                             │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ SKILLS                                               Ver todas →│
│                                                                 │
│ ┌────────────────────────┐ ┌────────────────────────┐           │
│ │ [icon] Skill A         │ │ [icon] Skill B         │           │
│ │ descrição              │ │ descrição              │           │
│ │ [tag]                  │ │ [tag]                  │           │
│ └────────────────────────┘ └────────────────────────┘           │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ E-BOOKS                                              Ver todos →│
│                                                                 │
│ ┌────────────────────────┐ ┌────────────────────────┐           │
│ │                        │ │                        │           │
│ │        COVER           │ │        COVER           │           │
│ │                        │ │                        │           │
│ ├────────────────────────┤ ├────────────────────────┤           │
│ │ título                 │ │ título                 │           │
│ │ descrição              │ │ descrição              │           │
│ └────────────────────────┘ └────────────────────────┘           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

</STORE_HOME_WIREFRAME>

<MOBILE_STORE_WIREFRAME>

┌────────────────────────────┐
│ LOJA                       │
│                            │
│ [ Search.................] │
│                            │
│ Categories                 │
│                            │
│ [Skills]                   │
│ [E-books]                  │
│ [Prompts]                  │
│                            │
│ Featured                   │
│                            │
│ ┌────────────────────────┐ │
│ │ [icon]                 │ │
│ │ Skill                  │ │
│ │ descrição              │ │
│ │                    →   │ │
│ └────────────────────────┘ │
│                            │
│ Skills                     │
│                            │
│ ┌────────────────────────┐ │
│ │ Skill                  │ │
│ └────────────────────────┘ │
│                            │
│ ┌────────────────────────┐ │
│ │ Skill                  │ │
│ └────────────────────────┘ │
└────────────────────────────┘

</MOBILE_STORE_WIREFRAME>

<SKILLS_ROUTE_WIREFRAME>

┌────────────────────────────────────────────────────────────┐
│ SKILLS                                                     │
│ Ferramentas reutilizáveis para apoiar trabalho e execução. │
│                                                            │
│ [ Search skills........................ ] [Filters]         │
│                                                            │
│ [Todas] [Gestão] [Pesquisa] [Visual] [Operações]           │
├────────────────────────────────────────────────────────────┤
│                                                            │
│ ┌────────────────────────────────────────────────────────┐ │
│ │ [ICON]  Skill Name                                    │ │
│ │        descrição curta                                │ │
│ │        [Gestão] [Skill] [tag]                    ⋮    │ │
│ └────────────────────────────────────────────────────────┘ │
│                                                            │
│ ┌────────────────────────────────────────────────────────┐ │
│ │ [ICON]  Skill Name                                    │ │
│ │        descrição curta                                │ │
│ │        [Research] [Skill]                        ⋮    │ │
│ └────────────────────────────────────────────────────────┘ │
│                                                            │
└────────────────────────────────────────────────────────────┘

Inspirar-se na densidade da referência Plugins.

</SKILLS_ROUTE_WIREFRAME>

<VISUAL_PRODUCTS_ROUTE>

Para:

E-books
PDF
Workbook
HTML
Visual Asset

usar grid visual:

┌──────────────────────────────────────────────────────────┐
│ E-BOOKS                                                  │
│                                                          │
│ [Search.................................]                 │
├──────────────────────────────────────────────────────────┤
│                                                          │
│ ┌───────────────────┐ ┌───────────────────┐              │
│ │                   │ │                   │              │
│ │       COVER       │ │       COVER       │              │
│ │                   │ │                   │              │
│ ├───────────────────┤ ├───────────────────┤              │
│ │ Product name      │ │ Product name      │              │
│ │ descrição         │ │ descrição         │              │
│ │ [tag]       →     │ │ [tag]       →     │              │
│ └───────────────────┘ └───────────────────┘              │
│                                                          │
└──────────────────────────────────────────────────────────┘

</VISUAL_PRODUCTS_ROUTE>

<DETAIL_ROUTE>

ROUTE:

/loja/:type/:slug

É a experiência principal de compreensão.

Estrutura:

┌──────────────────────────────────────────────────────────────┐
│ ← voltar                                                     │
│                                                              │
│ SKILL / PRODUCT NAME                                         │
│ [Area] [Type] [Tag]                                          │
│                                                              │
├──────────────────────────────┬───────────────────────────────┤
│                              │                               │
│         [SYMBOL]             │  PROBLEMA                     │
│                              │                               │
│ descrição                    │ ┌───────────────────────────┐ │
│                              │ │ texto genérico temporário │ │
│ contexto                     │ └───────────────────────────┘ │
│                              │                               │
│ ───────────────────────────  │  PROCESSO                     │
│                              │                               │
│ COMO FUNCIONA                │ ┌───────────────────────────┐ │
│                              │ │ 1 Primeiro passo          │ │
│ INPUT                        │ │ ↓                         │ │
│   │                          │ │ 2 Segundo passo           │ │
│   ▼                          │ │ ↓                         │ │
│ [1]                          │ │ 3 Terceiro passo          │ │
│   │                          │ └───────────────────────────┘ │
│   ▼                          │                               │
│ [2]                          │  PROGRESSO                    │
│   │                          │                               │
│   ▼                          │ ┌───────────────────────────┐ │
│ [3]                          │ │ PLAN                      │ │
│   │                          │ │ DO                        │ │
│   ▼                          │ │ CHECK                     │ │
│ OUTPUT                       │ │ ACT                       │ │
│                              │ └───────────────────────────┘ │
│ Referências ▾                │                               │
│                              │                               │
├──────────────────────────────┴───────────────────────────────┤
│                                              [ USAR / ABRIR ]│
└──────────────────────────────────────────────────────────────┘

</DETAIL_ROUTE>

<DETAIL_MOBILE>

No mobile:

TITLE
↓
TAGS
↓
SYMBOL
↓
DESCRIPTION
↓
FLOWCHART
↓
PROBLEM
↓
PROCESS
↓
PROGRESS
↓
REFERENCES
↓
CTA

Não manter split columns em largura inadequada.

</DETAIL_MOBILE>

<COMPONENT_MAPPING>

Antes de implementar, gerar:

COMPONENT-MAP.md

Schema:

REQUIREMENT
EXISTING_COMPONENT
ACTION
VARIANT
NEW_COMPONENT_REQUIRED
FILE

Exemplo:

Search
→ existing Input/Search
→ reuse

Tag
→ existing Badge
→ reuse variant

Long content
→ existing ScrollArea
→ reuse

Reference section
→ Collapsible
→ reuse

Skill card
→ Card + Badge + Button
→ compose

Não criar SkillCardPrimitive.

Criar SkillCard como FEATURE COMPOSITION
de primitives existentes.

</COMPONENT_MAPPING>

<EXPECTED_FEATURE_COMPONENTS>

Criar somente composições de feature necessárias.

Sugestão:

StoreShell
StoreHeader
StoreSearch
StoreNavigation
CategoryCard
FeaturedItem

CatalogSection
SkillList
SkillCard

VisualProductGrid
VisualProductCard

ItemDetail
ItemIdentity
ItemFlowchart

ProblemCard
ProcessCard
ProgressCard

ReferenceDisclosure
PrimaryCTA

Se um equivalente já existir:
reutilizar ou estender.

</EXPECTED_FEATURE_COMPONENTS>

<SCROLL_BEHAVIOR>

Aplicar o padrão visual fornecido:

ScrollArea
+
Separator
+
AspectRatio quando necessário.

Textos grandes:

não aumentar cards indefinidamente.

Preferir:

bounded content area
+
internal ScrollArea.

Evitar:

nested scroll sem necessidade.

</SCROLL_BEHAVIOR>

<GENERIC_DATA_POLICY>

Nesta primeira implementação,
dados definitivos NÃO são requisito.

Criar MOCK DATA.

Mock deve ser explicitamente separado da produção.

Exemplo:

src/features/store/data/mock-items.ts

ou equivalente.

Nunca misturar mock diretamente no componente.

</GENERIC_DATA_POLICY>

<MOCK_ITEM_SCHEMA>

Utilizar um contrato provisório como:

{
  id: "mock-skill-001",
  slug: "skill-001",
  type: "skill",

  name: "Skill de exemplo",

  area: "skills",

  description:
    "Descrição temporária utilizada para validar o componente.",

  tags: [
    "Gestão",
    "Execução"
  ],

  problem:
    "Problema temporário para validação visual.",

  process: [
    { index: 1, label: "Preparar" },
    { index: 2, label: "Executar" },
    { index: 3, label: "Verificar" }
  ],

  progress: {
    plan: "Definir objetivo.",
    do: "Executar processo.",
    check: "Verificar resultado.",
    act: "Ajustar próximo ciclo."
  },

  cta: {
    label: "Abrir",
    target: "#"
  }
}

</MOCK_ITEM_SCHEMA>

<MOCK_CONTENT_RULE>

Não inventar:

- evidência científica;
- diagnóstico;
- resultados clínicos;
- preço;
- integração real;
- connector real;
- métricas;
- claims comerciais;
- downloads inexistentes.

Usar textos claramente genéricos.

</MOCK_CONTENT_RULE>

<MOCK_CATALOG>

Criar dados suficientes para testar:

10 Skills

3 E-books

3 Prompts

3 Workbooks / HTML / Assets combinados

Objetivo:

testar layouts,
não representar catálogo final.

</MOCK_CATALOG>

<AREA_MARKERS>

MOCKS devem demonstrar os marcadores.

INSTITUCIONAL
blue

ARTIGOS
yellow

SKILLS
green

Outras categorias:

selecionar cores adicionais consistentes.

Registrar em:

area-tokens.ts
ou equivalente existente.

</AREA_MARKERS>

<ARTICLES_INTEGRATION>

A área de artigos deve continuar sendo reconhecível
como parte do mesmo Design System.

Marker principal:

YELLOW.

Exemplo:

● Artigos

ou:

yellow accent bar.

Não criar uma interface editorial totalmente separada.

</ARTICLES_INTEGRATION>

<INSTITUTIONAL_INTEGRATION>

Área institucional:

BLUE marker.

Aplicar principalmente em:

- active navigation;
- section label;
- icon;
- links selecionados;
- small accent.

Não pintar toda página de azul.

</INSTITUTIONAL_INTEGRATION>

<SKILLS_INTEGRATION>

Área Skills:

GREEN marker.

Aplicar:

- Skill icons;
- active tabs;
- area badge;
- selected marker;
- small accent.

Store continua neutra.

</SKILLS_INTEGRATION>

<NAVIGATION>

O sistema deve permitir chegar à Store por navegação real.

Adicionar item de navegação:

Ferramentas

ou:

Loja

conforme naming existente.

Evitar criar simultaneamente dois itens
se representarem o mesmo destino.

Escolher uma taxonomia consistente.

</NAVIGATION>

<SEARCH>

Implementar search funcional sobre mock data.

Pesquisar por:

name
description
tags
type
area

Busca deve responder enquanto usuário digita
ou após submit, de acordo com padrão existente.

</SEARCH>

<FILTERS>

Filtros mínimos:

Type
Area

Opcional:

Tags

Não construir advanced filtering neste workflow.

</FILTERS>

<TABS>

Quando adequado:

Todos
Skills
E-books
Prompts
Assets

Tabs devem filtrar o mesmo dataset.

Não criar páginas duplicadas quando uma tab resolver o requisito.

Rotas específicas podem compartilhar o mesmo componente.

</TABS>

<ROUTING_IMPLEMENTATION>

Reutilizar router existente.

Não adicionar outro routing framework.

As novas rotas devem mapear para:

shared Store layout
+
route-specific filters/content.

Exemplo:

/loja/skills

não deve duplicar toda implementação de:

/loja.

Ela configura:

type=skill.

</ROUTING_IMPLEMENTATION>

<STATE_REQUIREMENTS>

Implementar:

LOADING
READY
EMPTY
ERROR

Mesmo utilizando mock data.

Utilizar componentes existentes:

Skeleton
Spinner
Empty
Alert

conforme apropriado.

</STATE_REQUIREMENTS>

<RESPONSIVENESS>

DESKTOP

multi-column catalog
detail split

TABLET

adaptive grid
detail split quando houver espaço

MOBILE

single column

Nunca:

horizontal layout overflow.

</RESPONSIVENESS>

<ACCESSIBILITY>

Obrigatório:

- semantic HTML;
- focus visible;
- keyboard access;
- button semantics;
- link semantics;
- aria labels quando necessário;
- contrast;
- touch targets;
- logical heading order;
- reduced motion support.

Cor de área não pode ser a única informação.

Sempre acompanhar com:

text
ou
icon/label.

</ACCESSIBILITY>

<TECHNICAL_RULE>

Usar a stack atual do projeto.

Não migrar framework.

Não substituir Design System.

Não introduzir outra biblioteca de componentes
sem necessidade.

Não introduzir uma segunda solução de styling.

</TECHNICAL_RULE>

<WIREFRAME_TO_CODE_RULE>

Wireframe não é imagem.

É especificação de estrutura.

Para cada bloco do wireframe,
produzir mapeamento:

WIREFRAME_NODE
→ COMPONENT
→ SOURCE_FILE
→ DATA
→ STATE
→ RESPONSIVE_RULE

</WIREFRAME_TO_CODE_RULE>

<WIREFRAME_MAP_EXAMPLE>

STORE_HEADER
→ StoreHeader
→ existing Heading + Search
→ store metadata
→ READY
→ responsive

CATEGORY_SKILLS
→ CategoryCard
→ existing Card
→ area=skills
→ READY
→ responsive

SKILL_CARD
→ SkillCard
→ Card + Badge
→ SkillItem
→ READY
→ list/grid responsive

PROBLEM_PANEL
→ ProblemCard
→ Card
→ item.problem
→ READY
→ stacked mobile

</WIREFRAME_MAP_EXAMPLE>

<IMPLEMENTATION_SEQUENCE>

01
INSPECT REPOSITORY

02
IDENTIFY ROUTING

03
IDENTIFY DESIGN TOKENS

04
IDENTIFY EXISTING COMPONENTS

05
CREATE COMPONENT MAP

06
CREATE ROUTE MAP

07
CREATE AREA COLOR MAP

08
CREATE MOCK DATA SCHEMA

09
CREATE MOCK DATA

10
IMPLEMENT STORE SHELL

11
IMPLEMENT STORE HOME

12
IMPLEMENT SKILLS VIEW

13
IMPLEMENT VISUAL PRODUCT VIEW

14
IMPLEMENT DETAIL VIEW

15
IMPLEMENT SEARCH

16
IMPLEMENT FILTER

17
IMPLEMENT RESPONSIVE STATES

18
IMPLEMENT LOADING / EMPTY / ERROR

19
VERIFY PUBLIC NAVIGATION

20
RUN ACCESSIBILITY CHECK

21
RUN RESPONSIVE CHECK

22
RUN ROUTE CHECK

23
REGISTER EVIDENCE

</IMPLEMENTATION_SEQUENCE>

<DO_NOT>

DO NOT:

- redesign the existing application;
- replace existing UI;
- replace Design System;
- duplicate primitives;
- hardcode mock data inside presentation components;
- invent scientific evidence;
- introduce unnecessary dependencies;
- create inconsistent colors;
- make every card colorful;
- copy third-party UI pixel-for-pixel;
- use logos from the references;
- create giant monolithic component;
- create horizontal overflow;
- expose future private/internal data publicly.

</DO_NOT>

<FILES_TO_CREATE_OR_UPDATE>

Adapt paths to existing project.

Expected logical outputs:

docs/
  ADR-STORE-ROUTES-UI-001.md
  STORE-ROUTE-MAP.md
  STORE-WIREFRAMES.md
  COMPONENT-MAP.md
  AREA-COLOR-MAP.md
  IMPLEMENTATION-REPORT.md

feature/
  store/
    components/
    data/
    routes/
    types/

Do not force these exact folders
if project architecture already defines equivalents.

</FILES_TO_CREATE_OR_UPDATE>

<ADR_FILE_CONTENT>

Create/update:

ADR-STORE-ROUTES-UI-001.md

Include:

STATUS
CONTEXT
DECISION
ROUTES
COLOR SYSTEM
COMPONENT REUSE
WIREFRAMES
MOCK DATA STRATEGY
RESPONSIVE RULES
ACCESSIBILITY
CONSEQUENCES
ACCEPTANCE CRITERIA

</ADR_FILE_CONTENT>

<AREA_COLOR_MAP_OUTPUT>

Create:

AREA-COLOR-MAP.md

Minimum:

| Area | Marker | Application |
|------|--------|-------------|
| Institutional | Blue | navigation, accent, marker |
| Articles | Yellow | editorial marker |
| Skills | Green | Skill marker |
| Additional | Assigned | documented before use |

For additional colors:

record:

AREA
TOKEN
HEX
CONTRAST
RATIONALE

</AREA_COLOR_MAP_OUTPUT>

<ROUTE_MAP_OUTPUT>

Create:

STORE-ROUTE-MAP.md

Include:

ROUTE
PURPOSE
LAYOUT
FILTER
COMPONENT
DATA SOURCE
STATUS

</ROUTE_MAP_OUTPUT>

<ACCEPTANCE_CRITERIA>

AC-001
Existing Design System is reused.

AC-002
No duplicated primitive component is introduced.

AC-003
Store route works.

AC-004
Skills route works.

AC-005
Product detail route works.

AC-006
Search works with mock dataset.

AC-007
Type filtering works.

AC-008
Area filtering works.

AC-009
Institutional uses blue marker.

AC-010
Articles use yellow marker.

AC-011
Skills use green marker.

AC-012
Additional colors remain consistent.

AC-013
Skill cards use plugin/list pattern.

AC-014
Visual products use connector/grid pattern.

AC-015
Detail view contains Problem, Process and Progress.

AC-016
Process displays exactly three steps.

AC-017
Flowchart represents the same three process steps.

AC-018
Long content uses controlled scrolling when necessary.

AC-019
Mobile layout is single column.

AC-020
No structural horizontal overflow exists.

AC-021
Loading state exists.

AC-022
Empty state exists.

AC-023
Error state exists.

AC-024
Mock data is separated from UI components.

AC-025
Public navigation is keyboard accessible.

AC-026
The implementation does not require final production schemas.

</ACCEPTANCE_CRITERIA>

<DEV_CHECK>

For each criterion register:

CHECK_ID
CRITERION
PASS_FAIL
EVIDENCE
FILE
LINE_OR_COMPONENT
ACTION_REQUIRED

Do not declare DONE based only on code generation.

</DEV_CHECK>

<FINAL_HANDOFF>

Deliver:

1. ADR;
2. route map;
3. area color map;
4. wireframes;
5. component map;
6. implemented routes;
7. reusable feature components;
8. mock data;
9. search;
10. filters;
11. responsive behavior;
12. loading/empty/error states;
13. accessibility verification;
14. Dev Check;
15. implementation report.

</FINAL_HANDOFF>

<DONE_DEFINITION>

DONE =

ROUTES IMPLEMENTED
+
COMPONENTS REUSED
+
WIREFRAMES MAPPED
+
MOCK DATA RENDERED
+
SEARCH WORKING
+
FILTERS WORKING
+
DETAIL WORKING
+
RESPONSIVE VERIFIED
+
ACCESSIBILITY CHECKED
+
COLOR SYSTEM APPLIED
+
DEV CHECK EVIDENCE RECORDED

</DONE_DEFINITION>

</AGENT_PROMPT_CONTRACT>
```

## Histórico de versões

| Versão | Data | Mudança |
|--------|------|---------|
| 1.0.0 | 2026-09-30 | Contrato inicial versionado no repositório. |
