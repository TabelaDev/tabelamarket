# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `Page` compound component (`Page.Shell`, `Page.Header`, `Page.Seo`):
  replaces manual page wrappers, SEO `<svelte:head>` blocks, and back-button
  snippets across all pages.
- `Page.Header` `back` prop: standardises the back navigation button.
- `Page.Seo`: deduplicates meta tags (title, description, canonical, Open Graph,
  Twitter) into a single component; reads `page.url` internally.
- `NewsItem` component: shared news post list item used on home, `/news`, and
  `/news/tag/[tag]`.
- `content/about.md`: about page prose extracted to markdown, imported
  directly as a Svelte component via mdsvex.
- mdsvex: `.md` files compile to Svelte components (news posts render as
  components instead of `{@html}` strings); `marked` dependency removed.
- `Card.Header` snippets (`title`/`description`): project cards use stacked
  title+description via twui snippets instead of wrapper divs.
- Fourth philosophy step: "Código aberto" (AGPL-3.0).
- `overrides.svelte` in `package.json`: prevents dual Svelte instances during
  development with `file:` linked lib.

### Changed

- Migrated all pages from `PageHeader`/`PageShell` standalone exports to
  `Page.Header`/`Page.Shell` compound component.
- Project card footer links use `<Button variant="outline" size="sm">` with
  text labels ("npm", "GitHub") instead of icon-only links.
- Dates now display in pt-BR long format via `<Badge variant="secondary">`.
- Button outline hover now changes `border-color` to accent (via twui fix).

### Fixed

- Pre-existing `heroTitle` snippet type error resolved by pinning lib's svelte
  version to match the app's (dual-instance deduplication).
