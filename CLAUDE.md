# CLAUDE.md

Guidance for Claude Code (and other AI agents) working in this repository.

## ADRs (Architecture / Process Decision Records)

### ADR-01: Trabalhar diretamente em `main` e abrir PR automaticamente (sem rascunho)

- **Status:** Aceita
- **Contexto:** Este é um projeto simples (site estático Astro), sem necessidade de um
  fluxo de branches elaborado.
- **Decisão:**
  - Todo o desenvolvimento deve ser feito diretamente a partir da branch `main`
    (criar a branch de trabalho a partir de `main`, nunca de outra branch de feature).
  - Ao concluir uma mudança, abrir o Pull Request automaticamente, **sem marcar
    como rascunho (draft)** — o PR deve ser criado já pronto para revisão/merge.
- **Consequências:**
  - Não usar branches de longa duração nem stacks de PRs dependentes.
  - PRs em draft não devem ser usados neste repositório, a menos que
    explicitamente solicitado pelo usuário para um caso pontual.
