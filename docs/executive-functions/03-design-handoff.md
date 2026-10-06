# Design Handoff — Funções Executivas / Risco Cognitivo

ID: `RC-EF-DESIGN-HANDOFF-001`  
VERSION: `2.0.0`  
STATUS: READY_FOR_IMPLEMENTATION

## Layout
Desktop hero: 1240px max-width; grid principal aproximadamente 65/35 entre mapa cerebral e painel. Cabeçalho em três zonas (marca / navegação / CTA). Hero centralizado com grande título e subtítulo. Rodapé do palco em três zonas: instrução, paginação, nota pedagógica. Blocos “Entenda / Estruture / Execute” em três colunas separadas por linhas finas.

Slides de lote usam proporção 16:9. Em largura abaixo de 980px, passam a altura automática e empilham conteúdo. Em mobile, labels textuais de hotspots são escondidos, mantendo pontos clicáveis e descrições acessíveis.

## Tokens
| Token | Valor | Uso |
|---|---|---|
| `--rcx-bg` | `#FFFFFF` | canvas |
| `--rcx-surface` | `#FFFFFF` | cards/painel |
| `--rcx-surface-soft` | `#F8F7F5` | áreas de apoio |
| `--rcx-text` | `#111113` | títulos |
| `--rcx-text-secondary` | `#6F7178` | corpo secundário |
| `--rcx-line` | `#E9E6E2` | divisórias |
| `--rcx-orange` | `#FF5A1F` | marca, hotspots, foco, CTA |
| `--rcx-orange-soft` | `#FFF0E9` | evidência/apoio |
| `--rcx-radius-md` | `18px` | painel |
| `--rcx-radius-lg` | `24px` | slides |

Os valores são tokens normalizados a partir da referência visual fornecida; não representam medições de Figma.

## Components
| Componente | Estado | Observação |
|---|---|---|
| `BrainNetworkMap` | default / active / compact / static | hotspot ativo cresce e ganha ring laranja |
| `ExecutiveHero` | interactive | painel sincroniza com hotspot |
| `MacroCoverSlide` | static | 3 instâncias data-driven |
| `RiskCardSlide` | static | 9 instâncias data-driven |
| `ExecutiveVisualPack` | batch | host completo para preview/captura |

## Interaction
- Hotspot: botão real, `aria-pressed`, foco visível.
- Hero: clique/tap altera painel contextual.
- Reduced motion: transições reduzidas por media query.
- O mapa não exige gesto de arrastar para funcionar.

## Accessibility
- SVG recebe `role=img` e descrição.
- Hotspots são botões com nome acessível.
- Textos não dependem de cor para comunicar estado.
- Laranja é reservado a ação/ênfase; corpo usa preto/cinza.
- Mobile mantém alvo circular visível mesmo quando o label é ocultado.

## Edge cases
- Texto longo: slides usam grid e altura adaptativa abaixo de 980px.
- JS indisponível: rota ainda entrega markup SSR; interação não hidrata, mas conteúdo permanece visível.
- Falha de motion: nenhuma informação depende de animação.
- Ciência: toda anotação cerebral deve usar linguagem de rede distribuída.
