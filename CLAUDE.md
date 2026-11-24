# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

**Humanity Deck** is an online, multiplayer party card game in the style of "Cards Against Humanity". It is an early prototype: the UI is largely mocked up and the API serves hard-coded mock data. There is no database or persistence yet.

The card text (in `cah-cards.json` and the mock data in `api/src/card/card.service.ts`) is deliberately crude adult humour. Leave it as it is; do not rewrite, censor, or "tidy" card content unless asked.

## Layout

The repository is a two-app [pnpm workspace](https://pnpm.io/workspaces). The root `package.json` pins pnpm (`packageManager`), sets `"type": "module"` for the shared types, and holds no dependencies. `pnpm-workspace.yaml` lists `api/` and `website/`, and each app still keeps its own `pnpm-lock.yaml` and `node_modules` (`sharedWorkspaceLockfile: false`), a leftover from the Nuxt 2 website whose webpack 4 tooling clashed with the API's. Moving to one shared lockfile is the next planned step. Run app commands from inside `api/` or `website/`, or from the root with `pnpm --filter <name>` (the website's package name is `cards`).

| Path | What it is |
| --- | --- |
| `api/` | NestJS 12 back end (TypeScript 6.0, native ES modules). REST controllers plus Socket.IO gateways. |
| `website/` | Nuxt 4 front end (Vue 3, Nuxt UI 4 with Tailwind CSS 4, TypeScript 6.0). |
| `interfaces/` | Shared TypeScript interfaces (`GameInterface`, `CardInterface`, and so on) used by both apps. |
| `constants/` | Shared enums and lookup maps (`GameStatus`, `GameTypes`, `CardType`, `GameChatType`). |
| `cah-cards.json` | Full card database (about 3 MB). Not yet wired in. Do not read it whole; use `grep` or `jq` on it. |
| `designs/` | Wireframes (PNG exports and a Balsamiq `.bmpr` source). Useful reference for UI work. |

### Shared types

`interfaces/` and `constants/` live at the repo root and are shared by both apps. The API imports them with relative paths, for example `import { GameInterface } from '../../../interfaces/GameInterface.js'`. The website imports them through the `#interfaces` and `#constants` aliases set in `website/nuxt.config.ts`, for example `import type { GameInterface } from '#interfaces/GameInterface'`. Interfaces import each other with `import type`, because the website's TypeScript settings (`verbatimModuleSyntax`) require it. The root `package.json` sets `"type": "module"` so these files compile as ES modules alongside the API, and relative imports inside them carry a `.js` extension (TypeScript resolves it to the `.ts` file). When you change a shared type, check both `api/` and `website/` for breakages.

Because the API imports from outside `api/`, the TypeScript root becomes the repo root and `nest build` emits to `api/dist/api/src/main.js` (with `dist/interfaces` and `dist/constants` alongside). `nest-cli.json` sets `entryFile` to match, and `tsconfig.json` sets `rootDir` to `..`. Keep that in mind before moving files or changing `tsconfig`.

The API is an ES module package (`"type": "module"`, `module: nodenext`), as NestJS 12 itself is ESM-only. Every relative import in `api/` needs an explicit `.js` extension, and `main.ts` uses top-level `await`.

### API (`api/src`)

Standard Nest module-per-feature layout, generated with the Nest CLI (`nest g resource`):

- `card/`: REST controller (`GET /card/:id`, `GET /card/player/:player/game/:game`, plus stub POST/PATCH/DELETE).
- `game/`: Socket.IO gateway on the `/game` namespace (`findAllGame`, `findOneGame`, `createGame`, `updateGame`, `removeGame`).
- `gamechat/`: Socket.IO gateway on the `/gamechat` namespace (`findAllGamechat`, `createGamechat`).
- Each feature has `*.module.ts`, `*.service.ts`, a controller or gateway, `dto/`, `entities/`, and `*.spec.ts` files.

Config comes from `@nestjs/config`, loading `api/.development.env` (`PORT=3001`). CORS is enabled globally and on each gateway.

### Website (`website/`)

Nuxt 4 layout, with the app source under `website/app/`:

- `pages/`: file-based routes (`index.vue`, `about.vue`, `host.vue`, `game/[id].vue`).
- `components/`: auto-imported; folder names prefix the component name unless the file already starts with it (`homepage/GamesList.vue` is `HomepageGamesList`, `game/Card.vue` is `GameCard`, `game/GameChat.vue` is `GameChat`).
- `composables/`: `useSocket(namespace, onConnect)` opens a `socket.io-client` connection to an API namespace (`/game`, `/gamechat`) while a component is mounted; `useUsername()` keeps the player's name in `localStorage`.
- `layouts/default.vue`, `app.vue`, `error.vue`, and `app.config.ts` (Nuxt UI colours).
- REST calls use Nuxt's `$fetch` with `baseURL` set to `runtimeConfig.public.apiBase`. The API and site URLs default to `http://localhost:3001` and `http://localhost:3000`; override them with `NUXT_PUBLIC_API_BASE` and `NUXT_PUBLIC_SITE_URL`.
- Components use `<script setup lang="ts">` and the Composition API, styled with Nuxt UI components (`UButton`, `UCard`, `UTable`, and so on) and Tailwind utility classes.
- Dark mode is Nuxt UI's colour mode (`UColorModeButton`), stored by `@nuxtjs/color-mode`. The site defaults to dark (`colorMode.preference` in `nuxt.config.ts`); a visitor's toggle is remembered.
- Icons are Lucide icons through Nuxt UI's icon support, written as `i-lucide-<name>` (for example `icon="i-lucide-lock"`). They are bundled from `@iconify-json/lucide`, so no registration is needed.
- Data that only arrives over the socket in the browser (the games table) renders inside `<ClientOnly>` to avoid hydration mismatches.

## Commands

Install dependencies for both apps with `pnpm install` at the repo root (lockfiles are committed; use pnpm, not npm or Yarn). Enable the pinned version with `corepack enable`. Workspace settings live in `pnpm-workspace.yaml`:

- `shamefullyHoist: true` gives each app a flat `node_modules`. The Nuxt 2 website needed it; it is due to be removed with the move to one lockfile.
- `ignoredBuiltDependencies` lists packages whose install scripts are skipped (a funding notice, esbuild's binary check, and vue-demi's Vue 2 switch).
- Installing runs the website's `postinstall` (`nuxt prepare`), which generates `website/.nuxt/` (types and the ESLint config) needed before lint and type check. If you add a dependency that genuinely needs its install script, add it to `onlyBuiltDependencies` instead.

### API (run in `api/`)

| Task | Command |
| --- | --- |
| Dev server with watch (port 3001) | `pnpm start:dev` |
| Build | `pnpm build` |
| Unit tests | `pnpm test` (Vitest, `src/**/*.spec.ts`) |
| Single test file | `pnpm test src/game/game.service.spec.ts` |
| End-to-end tests | `pnpm test:e2e` (Vitest, `test/**/*.e2e-spec.ts`; boots the app and talks to it over HTTP and Socket.IO) |
| Lint | `pnpm lint` (note: **runs `eslint --fix` and rewrites files**) |
| Lint without changing files | `pnpm exec eslint "{src,test}/**/*.ts"` |
| Type check | `pnpm exec tsc --noEmit -p tsconfig.json` |
| Format | `pnpm format` |

### Website (run in `website/`)

| Task | Command |
| --- | --- |
| Dev server with hot reload (port 3000) | `pnpm dev` |
| Production build | `pnpm build` then `pnpm preview` (or `node .output/server/index.mjs`) |
| Type check | `pnpm typecheck` (`nuxt typecheck`, using `vue-tsc`) |
| Lint | `pnpm lint` (ESLint via `@nuxt/eslint`, no auto-fix) |
| Format | `pnpm format` (Prettier; CI runs `prettier --check .`) |
| Tests | None yet; Vitest with `@nuxt/test-utils` is the next planned step |

To run the full app locally, start the API (`api/`, `pnpm start:dev`) and the website (`website/`, `pnpm dev`) in two terminals, then open `http://localhost:3000`.

## Node version

CI runs on **Node 26 LTS**, read from `.nvmrc` at the repo root, and both apps declare `engines.node >= 26`. No `NODE_OPTIONS` workaround is needed any more.

## Code style

- **API**: Prettier with single quotes and trailing commas (`api/.prettierrc`), semicolons on. ESLint 10 flat config (`api/eslint.config.mjs`) uses `typescript-eslint` recommended plus Prettier 3; unused variables are warnings while the services are still stubs. TypeScript is loose (`strictNullChecks` and `noImplicitAny` off).
- **Website**: Prettier with single quotes and **no semicolons** (`website/.prettierrc`). ESLint 10 flat config (`website/eslint.config.mjs`) extends the config `@nuxt/eslint` generates, with `eslint-config-prettier` on top. TypeScript `strict` is on (Nuxt's defaults). Two-space indent, LF line endings (`.editorconfig`).
- Root `interfaces/` and `constants/` files are inconsistently formatted (some use double quotes and four-space indent). Match the style of the file you are editing; do not reformat them wholesale.
- Name enums and interfaces as the existing files do: `XxxInterface`, singular or plural enum names as already established (`GameTypes`, `GameStatus`, `CardType`).
- New API features should follow the Nest CLI resource layout (module, service, controller or gateway, `dto/`, `entities/`, spec files).

## Known issues

Worth knowing before trusting a red or green signal:

- `.github/workflows/ci.yml` builds, type checks, and lints both apps, runs the API's unit and e2e tests, and checks website formatting. Every step is blocking. Website tests are not run because there are none yet.
- `website/` lint is clean. `api/` lint has no errors and 9 unused-variable warnings in the stub services.
- The website's game page, host page, and chat still use mock data and stubs from the prototype (a hard-coded player id, a fake "start game" delay, a hard-coded pack list, and a chat box that does not send). They are marked with `TODO` comments.
- The API's unit spec files are still the Nest CLI starter tests (each only checks that the provider is defined). The e2e suite checks `GET /` and a `findAllGame` round trip on the `/game` gateway. Passing tests say little about behaviour yet.

## Working agreements

- UK English in prose, comments, commit messages, and PR descriptions.
- Run the relevant app's lint and tests for any app you change. Do not introduce new lint errors, even though some exist already.
- Keep changes scoped to the app you are working on; if a shared type changes, update both apps in the same change.
