# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

**Humanity Deck** is an online, multiplayer party card game in the style of "Cards Against Humanity". It is an early prototype: the UI is largely mocked up and the API serves hard-coded mock data. There is no database or persistence yet.

The card text (in `cah-cards.json` and the mock data in `api/src/card/card.service.ts`) is deliberately crude adult humour. Leave it as it is; do not rewrite, censor, or "tidy" card content unless asked.

## Layout

The repository is a [pnpm workspace](https://pnpm.io/workspaces) with two apps and one shared package, all locked by a single `pnpm-lock.yaml` at the root. The root `package.json` pins pnpm (`packageManager`), holds no dependencies, and has scripts that run across the workspace (`pnpm build`, `pnpm test`, `pnpm lint`, `pnpm typecheck`). Run app commands from inside `api/` or `website/`, or from the root with `pnpm --filter <name>` (package names are `api`, `cards` for the website, and `@humanity-deck/shared`).

| Path | What it is |
| --- | --- |
| `api/` | NestJS 12 back end (TypeScript 6.0, native ES modules). REST controllers plus Socket.IO gateways. |
| `website/` | Nuxt 4 front end (Vue 3, Nuxt UI 4 with Tailwind CSS 4, TypeScript 6.0). |
| `shared/` | The `@humanity-deck/shared` workspace package: interfaces (`GameInterface`, `CardInterface`, and so on) in `src/interfaces/`, and enums and lookup maps (`GameStatus`, `GameTypes`, `CardType`, `GameChatType`) in `src/constants/`. Used by both apps. |
| `cah-cards.json` | Full card database (about 3 MB). Not yet wired in. Do not read it whole; use `grep` or `jq` on it. |
| `designs/` | Wireframes (PNG exports and a Balsamiq `.bmpr` source). Useful reference for UI work. |

### Shared types (`shared/`)

Both apps depend on `@humanity-deck/shared` (`workspace:*`) and import from it by subpath, for example `import type { GameInterface } from '@humanity-deck/shared/interfaces/GameInterface'` or `import { GameStatus } from '@humanity-deck/shared/constants/GameStatus'`.

- The package is compiled with `tsc` to `shared/dist/` (ES modules plus `.d.ts` files), and its `exports` map points at `dist/`. Its `prepare` script builds it on every `pnpm install`, so a fresh clone works without an extra step.
- **After editing anything in `shared/src/`, rebuild it** (`pnpm --filter @humanity-deck/shared build`), or run `pnpm --filter @humanity-deck/shared dev` to rebuild on change. The apps only see `dist/`.
- Inside `shared/`, relative imports carry a `.js` extension, and interfaces import each other with `import type`.
- When you change a shared type, check both `api/` and `website/` for breakages.

The API is an ES module package (`"type": "module"`, `module: nodenext`), as NestJS 12 itself is ESM-only. Every relative import in `api/` needs an explicit `.js` extension, and `main.ts` uses top-level `await`. `nest build` uses `tsconfig.build.json` (`rootDir: ./src`) and emits to `api/dist/main.js`.

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

Install dependencies for the whole workspace with `pnpm install` at the repo root (the lockfile is committed; use pnpm, not npm or Yarn). Enable the pinned version with `corepack enable`. Workspace settings live in `pnpm-workspace.yaml`:

- `ignoredBuiltDependencies` lists packages whose install scripts are skipped (a funding notice, esbuild's binary check, and vue-demi's Vue 2 switch).
- Installing builds `shared/` (its `prepare` script) and runs the website's `postinstall` (`nuxt prepare`), which generates `website/.nuxt/` (types and the ESLint config) needed before lint and type check. If you add a dependency that genuinely needs its install script, add it to `onlyBuiltDependencies` instead.

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
| Tests | `pnpm test` (Vitest with `@nuxt/test-utils` in the `nuxt` environment and happy-dom, `test/nuxt/**/*.spec.ts`) |

To run the full app locally, start the API (`api/`, `pnpm start:dev`) and the website (`website/`, `pnpm dev`) in two terminals, then open `http://localhost:3000`. Add `pnpm --filter @humanity-deck/shared dev` in a third if you are changing shared types.

## Node version

CI runs on **Node 26 LTS**, read from `.nvmrc` at the repo root, and every package declares `engines.node >= 26`. No `NODE_OPTIONS` workaround is needed any more.

## Code style

- **API**: Prettier with single quotes and trailing commas (`api/.prettierrc`), semicolons on. ESLint 10 flat config (`api/eslint.config.mjs`) uses `typescript-eslint` recommended plus Prettier 3; unused variables are warnings while the services are still stubs. TypeScript is loose (`strictNullChecks` and `noImplicitAny` off).
- **Website**: Prettier with single quotes and **no semicolons** (`website/.prettierrc`). ESLint 10 flat config (`website/eslint.config.mjs`) extends the config `@nuxt/eslint` generates, with `eslint-config-prettier` on top. TypeScript `strict` is on (Nuxt's defaults). Two-space indent, LF line endings (`.editorconfig`).
- `shared/src/` files are inconsistently formatted (some use double quotes and four-space indent). Match the style of the file you are editing; do not reformat them wholesale.
- Name enums and interfaces as the existing files do: `XxxInterface`, singular or plural enum names as already established (`GameTypes`, `GameStatus`, `CardType`).
- New API features should follow the Nest CLI resource layout (module, service, controller or gateway, `dto/`, `entities/`, spec files).

## Known issues

Worth knowing before trusting a red or green signal:

- `.github/workflows/ci.yml` builds, type checks, lints, and tests both apps (API unit and e2e tests, website component tests), and checks website formatting. Every step is blocking.
- `website/` lint is clean. `api/` lint has no errors and 9 unused-variable warnings in the stub services.
- The website's game page, host page, and chat still use mock data and stubs from the prototype (a hard-coded player id, a fake "start game" delay, a hard-coded pack list, and a chat box that does not send). They are marked with `TODO` comments.
- The API serves mock data, so its tests pin down that mock behaviour (which cards, games, and chat lines come back, and that controllers and gateways delegate to their services). The e2e suite boots the app and checks the card endpoints and the `/game` and `/gamechat` socket messages. Expect to rewrite these tests when real game logic arrives.
- Website tests live in `test/nuxt/` so that `nuxt typecheck` covers them. They mock `socket.io-client` with `vi.mock` rather than talking to a running API.

## Working agreements

- UK English in prose, comments, commit messages, and PR descriptions.
- Run the relevant app's lint and tests for any app you change. Do not introduce new lint errors, even though some exist already.
- Keep changes scoped to the app you are working on; if a shared type changes, update both apps in the same change.
