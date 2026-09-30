# HANDOFF-KNOWLEDGE-WORK-SKILLS-001 — adaptação neste repositório

Versão enxuta do contrato `HANDOFF-KNOWLEDGE-WORK-SKILLS-001` (v2.0.0), aplicada só ao
necessário para este blog. Estado operacional vive em `/admin/handoff/`
(`src/pages/admin/handoff.mdx`), não neste arquivo — este arquivo é só o registro de
proveniência (Stage 01/03 do contrato original).

Etapas "Marketplace" (`claude plugin marketplace add`) e "Installation"
(`claude plugin install`) do contrato original são ações client-side fora do alcance
desta sessão de agente — puladas por decisão explícita do usuário. Os dois repositórios
upstream foram usados só como referência de leitura (`git clone`/`sparse-checkout`), não
instalados como plugins.

## Fontes upstream

| repositório | commit verificado nesta execução | licença | acesso |
|---|---|---|---|
| `anthropics/knowledge-work-plugins` | `da38ec1ee89d41e5380e652a97382695003396e7` | ver `LICENSE` do próprio repositório upstream | leitura (`git ls-remote` + `sparse-checkout`) |
| `anthropics/skills` | `8a1541c4a3ffa5a20a5a91de0dcf3f0bab1d1ef4` | ver `LICENSE` do próprio repositório upstream | leitura (`git ls-remote`) |

Os SHAs acima batem com os citados no texto do contrato — confirmados via `git ls-remote
<repo> HEAD` no momento desta execução (2026-09-30), não copiados do texto sem checagem.

## Componentes prioritários confirmados (existência verificada por `sparse-checkout`)

| `source_path` | plugin | papel neste projeto | status |
|---|---|---|---|
| `marketing/skills/campaign-plan/SKILL.md` | marketing | motor de planejamento da campanha de copy (Etapa C) | MAPPED |
| `small-business/skills/build-agent/SKILL.md` | small-business | referência de automação de rotina recorrente (não instanciado — nenhuma rotina recorrente concreta surgiu nesta execução) | REVIEWED |
| `small-business/skills/build-connector/SKILL.md` | small-business | só entra se `build-agent` precisar de sistema externo não conectado | REVIEWED |
| `productivity/skills/start/SKILL.md` | productivity | descoberta/varredura de contexto | MAPPED |
| `productivity/skills/update/SKILL.md` | productivity | sincronização de tarefas (`--comprehensive`) | MAPPED |
| `productivity/skills/task-management/SKILL.md` | productivity | gestão de tarefas | MAPPED |
| `sales/skills/log-activity/SKILL.md` | sales | **apenas** registro de atividade CRM — nunca engine geral de automação (regra explícita do usuário) | REVIEWED, fora de escopo desta campanha |

Nenhum arquivo upstream foi copiado literalmente para este repositório — a adaptação é
conceitual (papel/workflow), registrada em `/admin/handoff/` e em
`docs/copy-campaign/ROUTE_REMAPPING.md`.

## Regra de automação (seção 8 do contrato) aplicada

Antes de criar qualquer automação nova nesta execução, respondidas as 7 perguntas do
contrato: não havia tarefa repetitiva concreta a automatizar (a única candidata,
"aplicar copy por rota", é um trabalho de conteúdo único por rota, não uma rotina
recorrente) — `build-agent`/`build-connector` ficam **REVIEWED**, não **ADAPTED**.

## Próximo nó elegível

Ver `STOP CONDITION` em `/admin/handoff/`: bloqueado em `HKW-05-COPY` por falta de
`CAMPAIGN_BRIEFING` (STEP A de `PROMPT-CAMPAIGN-SITE-COPY-002`).
