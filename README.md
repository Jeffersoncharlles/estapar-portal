# Estapar Portal

Portal web em React para operacao interna, com foco em autenticacao, listagem de garagens e gestao de planos por garagem.

## Visao geral

- Stack principal: React 19 + TypeScript 6 + Vite 8 + Tailwind CSS v4.
- Roteamento com `react-router` (loaders/actions e middlewares de rota).
- Gerenciamento de dados servidor com `@tanstack/react-query`.
- Comunicacao HTTP via `axios` em `src/core/services/api.ts`.
- Feedback de interface com `sonner` (toasts).
- Mock da API com MSW em `src/core/mocks`.

## Arquitetura do projeto

```text
src/
  components/         # Componentes compartilhados (UI, sidebar, header)
    ui/               # Componentes base (button, input, sheet, table, etc.)
  core/
    hooks/            # Hooks reutilizaveis
    middlewares/      # Middlewares de autenticacao de rota
    services/         # Infraestrutura (API client, query client)
    mocks/            # Handlers e dados para MSW
    shared/           # Utilitarios compartilhados
  features/           # Modulos por dominio
    auth/
      api/            # Action de sign-in
      components/     # Formulario de login
      types/          # Tipagens de autenticacao
    garages/
      api/            # Loader/listagem de garagens
      components/     # Header, busca, tabela, containers
      types/          # Tipagens de garagens
    home/
      components/     # Dashboard inicial
    plans/
      api/            # Queries/mutations de planos
      components/
        modal/        # Modal/formulario de cadastro e edicao
        sheet/        # Painel lateral com detalhes/planos
      types/          # Tipagens de planos
  layouts/            # Layouts (auth e dashboard)
  pages/              # Entradas de tela
  routes/             # Definicao das rotas
  test/               # Setup global de testes e tests
```

### Padroes adotados

- Estrutura por feature (`features/*`) para organizar regras de dominio.
- Componentes base reutilizaveis em `components/ui`.
- Layouts desacoplados das paginas.
- Tokens visuais centralizados em `src/index.css`.
- Fluxo de dados combinado:
  - `loaders`/`actions` do React Router para entrada de dados por rota.
  - `useQuery`/`useMutation` do React Query para cache e mutacoes.

## Fluxos principais

- Autenticacao:
  - Tela em `src/pages/sign-in.tsx`.
  - Action de login em `src/features/auth/api/sign-in-events.ts`.
  - Controle de acesso em `src/core/middlewares/auth.ts`.

- Garagens:
  - Loader em `src/features/garages/api/garages-events.ts`.
  - Tabela principal em `src/features/garages/components/garagen-table.tsx`.
  - Abertura de detalhes por sheet via rota com `garageId`.

- Planos (sheet lateral):
  - Container principal em `src/features/plans/components/sheet/sheet-plans.tsx`.
  - Dados com React Query (`use-garage-plans-query.ts`, `use-save-garage-plan-mutation.ts`).
  - Cadastro/edicao via modal em `src/features/plans/components/modal`.

## Rotas

Definidas em `src/routes/index.tsx`:

- `/sign-in`
- `/`
- `/garagens`
- `/garagens/:garageId/planos`

## Variaveis de ambiente

Arquivo de referencia: `.env.sample`.

- `VITE_ENABLE_MOCKS=true` habilita o MSW no frontend.
- `VITE_API_BASE_URL=/api` define a base da API (fallback atual no codigo).

Exemplo:

```bash
VITE_ENABLE_MOCKS=true
VITE_API_BASE_URL=/api
```

### Credenciais padrao (somente com MSW)

Quando `VITE_ENABLE_MOCKS=true` estiver ativo (MSW habilitado), use as credenciais abaixo para login de teste:

- Usuario: `estapar`
- Senha: `012345678`

Esses dados vem de `src/core/mocks/user.json` e servem apenas para o ambiente mockado.

## Como executar

Pre-requisitos:

- Node.js 20+
- pnpm 9+ (recomendado)
- npm 10+ (alternativo)

Com pnpm:

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
```

Com npm:

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Scripts

- `dev`: inicia o Vite em desenvolvimento.
- `build`: roda `tsc -b` e gera build com Vite.
- `preview`: publica localmente o build gerado.
- `lint`: executa `biome check src` (escopo apenas em `src`, excluindo `src/core/mocks`).
- `format`: executa `biome format --write`.
- `typecheck`: executa `tsc --noEmit --skipLibCheck`.
- `test`: executa `vitest run`.
- `test:watch`: executa `vitest` em watch mode.

## Qualidade de codigo

- Lint/formatacao com Biome (`biome.json`).
- Testes com Vitest + Testing Library (`src/test/setup.ts`).
- Hooks Git com Lefthook (`lefthook.yml`):
  - `pre-commit`: `pnpm biome format --write` nos arquivos staged.
  - `pre-push`:
    - `pnpm typecheck`.
    - `pnpm biome lint {push_files}` para `*.ts` e `*.tsx`.
    - `pnpm vitest related --run {push_files} --passWithNoTests --reporter=dot`.

Para instalar hooks localmente:

```bash
pnpm lefthook install
```

## Estado atual dos testes

- A base de testes esta configurada.
- Suite de integracao ativa para autenticacao em `src/test/features/auth/sign-form.test.tsx`.

## Observacoes

- O projeto usa alias de importacao `@/...`.
- O worker do MSW fica em `public/mockServiceWorker.js`.
- Os handlers do MSW ficam em `src/core/mocks/handlers.ts`.
- Dados mockados de garagens/planos sao usados para acelerar iteracoes de UI.
