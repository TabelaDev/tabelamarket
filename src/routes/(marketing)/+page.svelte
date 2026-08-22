<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import CodeXmlIcon from '@lucide/svelte/icons/code-xml';
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
	import GitForkIcon from '@lucide/svelte/icons/git-fork';
	import NewspaperIcon from '@lucide/svelte/icons/newspaper';
	import type { PageData } from './$types';
	import { projects, type Project } from '$lib/hub-data';
	import { Badge, Button, Card, Landing, Wordmark } from '@tabeladev/tabelawebui';

	let { data } = $props<{ data: PageData }>();

	const TITLE = 'TabelaMarket';
	const DESCRIPTION =
		'Landing, news e changelog agregado dos produtos da TabelaDev: apps web, TUIs e libs com a filosofia "auto custo".';
	const REPO_URL = 'https://github.com/TabelaDev/tabelamarket';

	const canonical = $derived(`${page.url.origin}${page.url.pathname}`);

	const kindLabel: Record<Project['kind'], string> = {
		web: 'web',
		tui: 'tui',
		os: 'os',
		lib: 'lib'
	};

	const HERO_LEAD =
		'Apps web, TUIs e libs construídos sobre uma crença simples: software pessoal deveria custar quase nada pra rodar ("auto custo") e ser um prazer de usar. Esta página é o ponto de entrada — landing, news e o changelog que se mantém sozinho.';
	const HERO_NOTE = 'Landing, changelog e as decisões por trás de cada projeto: tudo num só lugar.';
	const PHILOSOPHY_LEAD = 'Mais detalhes no post "Por que auto custo".';

	const featured: Project[] = projects.filter((p) => p.featured);
	const rest: Project[] = projects.filter((p) => !p.featured);

	const steps = [
		{
			number: '01',
			color: 'var(--ctp-mauve)',
			title: 'Auto custo',
			body: 'Nada de assinatura: a infra é a sua conta grátis, e IA entra com a sua chave (BYOK).'
		},
		{
			number: '02',
			color: 'var(--ctp-sapphire)',
			title: 'Seus dados, seu banco',
			body: 'Credenciais criptografadas no seu banco. O app não vê, não guarda, não revende.'
		},
		{
			number: '03',
			color: 'var(--ctp-green)',
			title: 'Uma estética só',
			body: 'Catppuccin, mono carregando a estrutura e bordas afiadas — web e TUI, mesma família.'
		}
	];
</script>

{#snippet heroTitle()}
	<Wordmark prefix="Tabela" suffix="Market" />
{/snippet}

<svelte:head>
	<title>{TITLE}</title>
	<meta name="description" content={DESCRIPTION} />
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="TabelaMarket" />
	<meta property="og:locale" content="pt_BR" />
	<meta property="og:title" content={TITLE} />
	<meta property="og:description" content={DESCRIPTION} />
	<meta property="og:url" content={canonical} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={TITLE} />
	<meta name="twitter:description" content={DESCRIPTION} />
</svelte:head>

<Landing>
	<Landing.Hero eyebrow="O hub da TabelaDev" title={heroTitle} lead={HERO_LEAD} note={HERO_NOTE}>
		{#snippet actions()}
			<Button href="/#projetos" variant="primary" size="lg">Ver os projetos</Button>
			<Button href="/news" variant="outline" size="lg">
				<NewspaperIcon class="size-4" />
				Ler as news
			</Button>
		{/snippet}
	</Landing.Hero>

	<Landing.Section id="projetos" class="scroll-mt-20">
		<Landing.Section.Heading
			eyebrow="Produtos"
			title="Cada repo, um pedaço da casa."
			lead="Da agenda com IA ao instalador do Arch Linux: tudo partilha a mesma estética e a mesma regra de custo."
		/>
		<div class="grid gap-4 md:grid-cols-2">
			{#each [...featured, ...rest] as project (project.name)}
				<Card class="flex flex-col">
					<Card.Header>
						<div class="flex items-center gap-2">
							<span class="size-2 rounded-full" style="background: {project.accent}"></span>
							<Card.Title class="font-mono text-base">{project.name}</Card.Title>
						</div>
						<Card.Description>{project.tagline}</Card.Description>
					</Card.Header>
					<Card.Footer class="mt-auto flex items-center justify-between gap-3">
						<div class="flex flex-wrap gap-2">
							<Badge>{kindLabel[project.kind]}</Badge>
							{#if project.language}
								<Badge>{project.language}</Badge>
							{/if}
							{#if project.links.npm}
								<Badge>npm</Badge>
							{/if}
						</div>
						<div class="flex items-center gap-1">
							{#if project.links.npm}
								<a
									href={project.links.npm}
									target="_blank"
									rel="external noreferrer"
									class="text-ink-faint hover:text-accent-ink"
									aria-label="{project.name} no npm"
								>
									<ExternalLinkIcon class="size-4" />
								</a>
							{/if}
							<a
								href={project.html_url}
								target="_blank"
								rel="external noreferrer"
								class="text-ink-faint hover:text-accent-ink"
								aria-label="{project.name} no GitHub"
							>
								<GitForkIcon class="size-4" />
							</a>
						</div>
					</Card.Footer>
				</Card>
			{/each}
		</div>
	</Landing.Section>

	<Landing.Section>
		<Landing.Section.Heading
			eyebrow="A filosofia"
			title="Três regras que todo app segue."
			lead={PHILOSOPHY_LEAD}
		/>
		<Landing.Steps {steps} />
	</Landing.Section>

	<Landing.Section>
		<Landing.Section.Heading
			eyebrow="News"
			title="O que estou fazendo e pensando."
			lead="Notas curtas sobre decisões de design, o que está por vir e o porquê das coisas."
		/>
		<div class="flex flex-col divide-y divide-rule">
			{#each data.newsHead as post (post.slug)}
				<a
					href={resolve(`/news/${post.slug}`)}
					class="group flex flex-col gap-1 py-4 md:flex-row md:items-baseline md:gap-6"
				>
					<span class="w-28 shrink-0 font-mono text-xs text-ink-faint">{post.date}</span>
					<span class="flex-1">
						<span class="font-mono text-sm group-hover:text-accent-ink">{post.title}</span>
						<span class="mt-1 block font-serif text-sm text-ink-soft">{post.summary}</span>
					</span>
				</a>
			{/each}
		</div>
		<div>
			<Button href="/news" variant="ghost" size="sm">
				<CodeXmlIcon class="size-4" />
				Todas as news
			</Button>
		</div>
	</Landing.Section>
</Landing>
