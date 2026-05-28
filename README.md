# Estapar Portal

Portal web em React para visualizacao de dados de garagens, planos e dashboard interno.

## Visao geral

- Stack principal: React 19 + TypeScript 6 + Vite 8 + Tailwind CSS v4.
- Roteamento via `react-router`.
- UI baseada em componentes proprios e primitives Radix.
- Comunicacao HTTP via `axios` (camada em `src/core/services/api.ts`).
- Dados atualmente mockados com MSW em `src/core/mocks`.

## Arquitetura do projeto

Estrutura principal:

```text
src/
  components/         # Componentes compartilhados (UI, sidebar, header)
    ui/               # Componentes base (button, input, sheet, table, etc.)
  core/
    hooks/            # Hooks reutilizaveis (debounce, click outside)
    services/         # Servicos de infraestrutura (API client)
    mocks/            # Dados mockados e geradores de dados
    shared/           # Utilitarios compartilhados
  features/           # Modulos por dominio (auth, garages, home, plans)
    auth/
      api/            # Actions/eventos de autenticacao
      components/     # Formularios e blocos visuais de login
    garages/
      api/            # Loaders/eventos de garagens
      components/     # Header, busca, tabela e estados de loading
      types/          # Tipagens de resposta e entidades de dominio
    home/
      components/     # Blocos do dashboard inicial
    plans/
      api/            # Eventos e carga de dados de planos
      components/
        modal/        # Modal e formulario de cadastro/edicao
        sheet/        # Componentes do sheet de planos
      types/          # Tipagens de planos
  layouts/            # Layouts de pagina (auth, dashboard)
  pages/              # Entradas de tela
  routes/             # Configuracao de rotas
  test/               # Setup de testes
```

### Padrao adotado

- Separacao por feature (`features/*`) para escalabilidade.
- Componentes base reutilizaveis em `components/ui`.
- Layouts desacoplados das pages.
- Tokens de tema e cores centralizados em `src/index.css`.
- Fluxo de dados de rota via `loaders` e `actions` do React Router:
  - `loaders` para pre-carregar dados antes da renderizacao de paginas (ex.: garagens).
  - `actions` para tratar submits/mutacoes de formulario (ex.: sign-in).

## Fluxos atuais importantes

- Garagens:
  - Tabela em `src/features/garages/components/garagen-table.tsx`.
  - Loader de rota em `src/features/garages/api/garages-events.ts`.
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
  - Principais caminhos:
    - `/sign-in`
    - `/`
    - `/garagens`
    - `/plans/:planId`

## Como rodar o projeto

Pre-requisitos:

- Node.js 20+
- pnpm 9+ (recomendado)
- npm 10+ (alternativo)

Instalacao com pnpm:

```bash
# Instala todas as dependencias do projeto via pnpm
pnpm install
pnpm dev #rodar em modo dev
pnpm build #build de produçāo
pnpm preview #build de preview

# Instala todas as dependencias do projeto via npm
npm install
npm run dev #rodar em modo dev
npm run build #build de produçāo
npm run preview #build de preview
```

Checagens:

```bash
pnpm typecheck
pnpm lint
pnpm test

# ou via npm
npm run typecheck
npm run lint
npm run test
```

## Qualidade de codigo

- Lint e formatacao com Biome (`biome.json`).
- Testes unitarios com Vitest + Testing Library (`jsdom`).
- Hooks de Git com Lefthook (`lefthook.yml`):
  - `pre-commit`: formatacao de arquivos staged.
  - `pre-push`: `typecheck` + `biome lint`.

Para instalar hooks localmente (quando necessario):

```bash
pnpm lefthook install
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
- O worker do MSW esta em `public/mockServiceWorker.js` e handlers em `src/core/mocks/handlers.ts`.
