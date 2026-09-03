<div align="center">

# TAbelhaHub

**O hub da TAbelhaDev - landing, news e um changelog agregado automaticamente
pros produtos (apps web, TUIs e libs compartilhadas).**

[English](README.md) · **Português**

[![SvelteKit](https://img.shields.io/badge/SvelteKit-Svelte-ff3e00?style=flat-square&logo=svelte&logoColor=white)](https://kit.svelte.dev)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-orange?style=flat-square&logo=cloudflare&logoColor=white)](https://workers.cloudflare.com)
[![License: AGPL-3.0](https://img.shields.io/badge/license-AGPL--3.0-blue?style=flat-square)](LICENSE)
[![Built with tabelhawebui](https://img.shields.io/badge/theme-tabelhawebui-d6b4f7?style=flat-square)](https://github.com/TAbelhaDev/tabelhawebui)

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/ianptkcs)

</div>

---

## O que é

O ponto de entrada único da TAbelhaDev: uma landing que amarra os produtos, um
feed de news (`content/news/`, em Markdown) com notas sobre o que está sendo
feito e o porquê, e um changelog que agrega as releases de cada repo público -
atualizado a partir dos `CHANGELOG.md` e das GitHub Releases, sem registro
manual.

O site inteiro é construído em cima do
[`tabelhawebui`](https://github.com/TAbelhaDev/tabelhawebui), a lib de tema e chrome
compartilhada - mesma estética e tokens dos apps que ele apresenta.

## Stack

SvelteKit 2 + Svelte 5 (runes), Tailwind v4, `@sveltejs/adapter-cloudflare`
(Cloudflare Workers), Bun. O conteúdo entra no bundle no build
(`import.meta.glob`), então o Worker não precisa de filesystem.

## Dados

O `scripts/aggregate.mjs` (depende do CLI `gh`) escreve os dois arquivos de dados
commitados que o site renderiza:

- `src/lib/projects.json` - repos públicos do org, com overlay curado.
- `src/lib/changelog.json` - entradas de release + changelog entre repos.

O build não busca nada: `bun run aggregate` roda antes do deploy.

## Desenvolvimento

```bash
bun install
bun run dev
```

`bun run check && bun run lint && bun run build` antes de abrir PR. Veja o
`CONTRIBUTING.pt-BR.md` pra convenção de linguagem do org.
