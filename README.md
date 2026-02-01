# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Deploying to a subpath (GitHub Pages project site)

If you want this site to be served at `https://<user>.github.io/website/` (i.e. under `/website`), the built files must reference that subpath. This project already sets the required options; the general steps are:

- **Set the base path**: ensure Vite's `base` and SvelteKit's `kit.paths.base` point to the subpath you will serve from (e.g. `/website`). In this repo those are in [vite.config.ts](vite.config.ts) and [svelte.config.js](svelte.config.js).
- **Build** the site:

```bash
npm run build
```

- **Deploy** the `build/` output to GitHub Pages (for example by publishing the `build/` folder to the `gh-pages` branch or configuring Pages to serve from `/docs` or a GitHub Action).

## How to host multiple projects under one Pages site

You can host multiple projects in subpaths (for example `/website`, `/project1`) from a single repo by building each project with its base set to the subpath and copying their outputs into a single `site/` deploy folder:

1. For each project, set its Vite/SvelteKit base to the subpath it will be served from (e.g. `/project1`).
2. Build each project and copy its `build/` output into `site/project1`, `site/website`, etc.
3. Publish `site/` to GitHub Pages (push to `gh-pages` branch or use an action).

Example CI sketch (GitHub Actions): build each project, copy outputs into `site/`, then deploy `site/` with a Pages action.

## How to make another repo run as a web interface in `/repo-name`

For other repositories you want to serve at `https://<user>.github.io/<repo-name>/`:

1. In that repo set `vite.config.ts` to include `base: '/<repo-name>/'`.
2. In SvelteKit projects set `kit.paths.base = '/<repo-name>'` in `svelte.config.js`.
3. `npm run build` and deploy the `build/` folder to the combined Pages site under `/<repo-name>` (or publish that repo directly as its own Pages site).

Tip: you can parameterize the base with an environment variable in CI so builds are automated per-project.
