<div align="center">

# TabelaMarket

**The hub of TabelaDev - landing, news and an auto-aggregated changelog for the
products (web apps, TUIs and shared libraries).**

**English** · [Português](README.pt-BR.md)

[![SvelteKit](https://img.shields.io/badge/SvelteKit-Svelte-ff3e00?style=flat-square&logo=svelte&logoColor=white)](https://kit.svelte.dev)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-orange?style=flat-square&logo=cloudflare&logoColor=white)](https://workers.cloudflare.com)
[![License: AGPL-3.0](https://img.shields.io/badge/license-AGPL--3.0-blue?style=flat-square)](LICENSE)
[![Built with tabelawebui](https://img.shields.io/badge/theme-tabelawebui-d6b4f7?style=flat-square)](https://github.com/TabelaDev/tabelawebui)

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/ianptkcs)

</div>

---

## What it is

The single entry point for TabelaDev: a landing page that ties the products
together, a news feed (`content/news/`, Markdown) with notes on what is being
built and why, and a changelog that aggregates the releases of every public repo

- kept up to date from each repo's `CHANGELOG.md` and GitHub Releases, with no
  manual registration.

The whole site is built on [`tabelawebui`](https://github.com/TabelaDev/tabelawebui),
the shared theme and chrome library - same look and tokens as the apps it
advertises.

## Stack

SvelteKit 2 + Svelte 5 (runes), Tailwind v4, `@sveltejs/adapter-cloudflare`
(Cloudflare Workers), Bun. Content is bundled at build time (`import.meta.glob`)
so the Worker needs no filesystem.

## Data

`scripts/aggregate.mjs` (depends on the `gh` CLI) writes the two committed
data files the site renders:

- `src/lib/projects.json` - public repos of the org, with a curated overlay.
- `src/lib/changelog.json` - release + changelog entries across repos.

The build does not fetch anything: `bun run aggregate` runs before deploy.

## Development

```bash
bun install
bun run dev
```

`bun run check && bun run lint && bun run build` before opening a PR. See
`CONTRIBUTING.md` for the org language convention.
