# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

**Humanity Deck** is an online, multiplayer party card game in the style of "Cards Against Humanity". It is an early prototype: the UI is largely mocked up and the API serves hard-coded mock data. There is no database or persistence yet.

The card text (in `cah-cards.json` and the mock data in `api/src/card/card.service.ts`) is deliberately crude adult humour. Leave it as it is; do not rewrite, censor, or "tidy" card content unless asked.

## Layout

The repository is a two-app [pnpm workspace](https://pnpm.io/workspaces). The root `package.json` pins pnpm (`packageManager`), sets `"type": "module"` for the shared types, and holds no dependencies. `pnpm-workspace.yaml` lists `api/` and `website/`, and each app keeps its own `pnpm-lock.yaml` and `node_modules` (`sharedWorkspaceLockfile: false`), because the API (webpack 5) and the Nuxt 2 website (webpack 4) need clashing versions of the same build tools. Run app commands from inside `api/` or `website/`, or from the root with `pnpm --filter <name>` (the website's package name is `cards`).

| Path | What it is |
| --- | --- |
| `api/` | NestJS 12 back end (TypeScript 6.0, native ES modules). REST controllers plus Socket.IO gateways. |
| `website/` | Nuxt 2 front end (Vue 2, Vuetify 2, TypeScript via `@nuxt/typescript-build`). |
| `interfaces/` | Shared TypeScript interfaces (`GameInterface`, `CardInterface`, and so on) used by both apps. |
| `constants/` | Shared enums and lookup maps (`GameStatus`, `GameTypes`, `CardType`, `GameChatType`). |
| `cah-cards.json` | Full card database (about 3 MB). Not yet wired in. Do not read it whole; use `grep` or `jq` on it. |
| `designs/` | Wireframes (PNG exports and a Balsamiq `.bmpr` source). Useful reference for UI work. |

### Shared types

`interfaces/` and `constants/` live at the repo root and are imported with relative paths from both apps, for example `import { GameInterface } from '../../../interfaces/GameInterface.js'`. There is no path alias or package for them. The root `package.json` sets `"type": "module"` so these files compile as ES modules alongside the API, and relative imports inside them carry a `.js` extension (TypeScript resolves it to the `.ts` file). When you change a shared type, check both `api/` and `website/` for breakages.

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

- `pages/`: Nuxt file-based routes (`index.vue`, `about.vue`, `host.vue`, `game/_id.vue`).
- `components/`: auto-imported (`components: true`). Feature folders `game/` and `homepage/`.
- Talks to the API on `http://localhost:3001` via `@nuxtjs/axios` (REST) and `nuxt-socket-io` (socket named `main`, namespace `/game`). Both URLs are hard-coded in `nuxt.config.js`.
- Components use `Vue.extend({...})` with `<script lang="ts">`, and the Options API.
- Username and dark-mode preference are stored in `localStorage`. The Vuex store is empty.
- Icons come from `@nuxtjs/fontawesome`; register any new icon in the `fontawesome.icons.solid` list in `nuxt.config.js` before using it.

## Commands

Install dependencies for both apps with `pnpm install` at the repo root (lockfiles are committed; use pnpm, not npm or Yarn). Enable the pinned version with `corepack enable`. Workspace settings live in `pnpm-workspace.yaml`:

- `shamefullyHoist: true` gives each app a flat `node_modules`, which Nuxt 2 needs because it imports packages it does not declare (such as `vue`).
- `ignoredBuiltDependencies` lists packages whose install scripts are skipped (funding notices and the unused `deasync` add-on). If you add a dependency that genuinely needs its install script, add it to `onlyBuiltDependencies` instead.

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
| Production build | `pnpm build` then `pnpm start` |
| Lint | `pnpm lint` (ESLint over `.js` and `.vue`, no auto-fix) |
| Tests | `pnpm test` (Jest, but there are no website tests yet, so it exits non-zero) |

To run the full app locally, start the API (`api/`, `pnpm start:dev`) and the website (`website/`, `pnpm dev`) in two terminals, then open `http://localhost:3000`.

## Node version

CI runs on **Node 24 LTS**, read from `.nvmrc` at the repo root, and the API declares `engines.node >= 24`. On Node 17 or newer, the Nuxt 2 (webpack 4) build fails with an OpenSSL error, so prefix website builds and dev runs with `NODE_OPTIONS=--openssl-legacy-provider`.

## Code style

- **API**: Prettier with single quotes and trailing commas (`api/.prettierrc`), semicolons on. ESLint 10 flat config (`api/eslint.config.mjs`) uses `typescript-eslint` recommended plus Prettier 3; unused variables are warnings while the services are still stubs. TypeScript is loose (`strictNullChecks` and `noImplicitAny` off).
- **Website**: Prettier with single quotes and **no semicolons** (`website/.prettierrc`). ESLint uses `@nuxtjs/eslint-config-typescript`, Nuxt, and Prettier. TypeScript `strict` is on. Two-space indent, LF line endings (`.editorconfig`).
- Root `interfaces/` and `constants/` files are inconsistently formatted (some use double quotes and four-space indent). Match the style of the file you are editing; do not reformat them wholesale.
- Name enums and interfaces as the existing files do: `XxxInterface`, singular or plural enum names as already established (`GameTypes`, `GameStatus`, `CardType`).
- New API features should follow the Nest CLI resource layout (module, service, controller or gateway, `dto/`, `entities/`, spec files).

## Known issues

Worth knowing before trusting a red or green signal:

- `.github/workflows/ci.yml` builds and tests the API, type checks it, and builds the website. API lint is blocking. Website lint runs with `continue-on-error` because of the existing errors below, so a green CI run does not mean website lint is clean. Website tests are not run because there are none.
- `website/` lint currently reports existing errors (Prettier formatting and `vue/valid-v-slot` on Vuetify `v-slot:item.xxx` slots). `api/` lint has no errors and 9 unused-variable warnings in the stub services.
- The API's unit spec files are still the Nest CLI starter tests (each only checks that the provider is defined). The e2e suite checks `GET /` and a `findAllGame` round trip on the `/game` gateway. Passing tests say little about behaviour yet.

## Working agreements

- UK English in prose, comments, commit messages, and PR descriptions.
- Run the relevant app's lint and tests for any app you change. Do not introduce new lint errors, even though some exist already.
- Keep changes scoped to the app you are working on; if a shared type changes, update both apps in the same change.
