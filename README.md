# Estapar Portal

Portal web em React para visualizacao de dados de garagens, planos e dashboard interno.

## Visao geral

- Stack principal: React 19 + TypeScript + Vite + Tailwind CSS v4.
- Roteamento via `react-router`.
- UI baseada em componentes proprios e primitives Radix.
- Dados atualmente mockados em `src/core/mocks` (JSON e geradores TS).

## Arquitetura do projeto

Estrutura principal:

```text
src/
  components/         # Componentes compartilhados (UI, sidebar, header)
    ui/               # Componentes base (button, input, sheet, table, etc.)
  core/
    mocks/            # Dados mockados e geradores de dados
    shared/           # Utilitarios compartilhados
  features/           # Modulos por dominio (auth, garages, home, plans)
    plans/
      components/
        sheet/        # Componentes do sheet de planos
  layouts/            # Layouts de pagina (auth, dashboard)
  pages/              # Entradas de tela
  routes/             # Configuracao de rotas
```

### Padrao adotado

- Separacao por feature (`features/*`) para escalabilidade.
- Componentes base reutilizaveis em `components/ui`.
- Layouts desacoplados das pages.
- Tokens de tema e cores centralizados em `src/index.css`.

## Fluxos atuais importantes

- Garagens:
  - Tabela em `src/features/garages/components/garagen-table.tsx`.
  - Abertura de detalhes por sheet (`SheetPlans`).

- Plans (Sheet):
  - Componente principal: `src/features/plans/components/sheet/sheet-plans.tsx`.
  - Subcomponentes por secao:
    - `sheet-plans-header.tsx`
    - `sheet-plans-address.tsx`
    - `sheet-plans-main-tab.tsx`
    - `sheet-plans-stats.tsx`
    - `sheet-plans-sidebar.tsx`
    - `sheet-plans-table.tsx`

- Rotas:
  - Definidas em `src/routes/index.tsx`.

## Como rodar o projeto

Pre-requisitos:

- Node.js 20+
- npm (ou pnpm)

Instalacao:

```bash
npm install
```

Ambiente de desenvolvimento:

```bash
npm run dev
```

Build de producao:

```bash
npm run build
```

Preview do build:

```bash
npm run preview
```

Checagens:

```bash
npm run typecheck
npm run lint
npm run test
```

## Scripts disponiveis

- `dev`: sobe Vite em modo desenvolvimento.
- `build`: compila TypeScript e gera build via Vite.
- `preview`: serve o build localmente.
- `lint`: validacao de codigo com Biome.
- `format`: formata codigo com Biome.
- `typecheck`: validacao de tipos TypeScript.
- `test`: roda testes com Vitest.
- `test:watch`: roda testes em modo watch.

## Bibliotecas usadas

### Dependencias principais

- `react`, `react-dom`
- `react-router`
- `typescript`
- `vite`, `@vitejs/plugin-react`
- `tailwindcss`, `@tailwindcss/vite`, `tailwind-merge`
- `@radix-ui/react-*` (alert-dialog, dialog, select, separator, slot, switch)
- `radix-ui`
- `lucide-react`
- `react-hook-form`, `@hookform/resolvers`, `zod`
- `date-fns`
- `clsx`

### Desenvolvimento e testes

- `@biomejs/biome`
- `vitest`, `jsdom`
- `@testing-library/react`, `@testing-library/jest-dom`
- `msw`
- `@faker-js/faker`
- `lefthook`

## Observacoes

- O projeto usa aliases de import (`@/...`).
- O tema global (cores/tokens) esta em `src/index.css`.
- Parte dos dados e estados ainda esta baseada em mocks para acelerar iteracoes de UI.
