<script lang="ts">
	import { page } from '$app/state';
	import { Button, Landing, SectionHeading } from '@tabeladev/tabelawebui';
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import UserRoundIcon from '@lucide/svelte/icons/user-round';
	import HeartHandshakeIcon from '@lucide/svelte/icons/heart-handshake';

	const TITLE = 'Sobre — TabelaHub';
	const DESCRIPTION =
		'Sobre a TabelaDev e o Ian, o desenvolvedor por trás: filosofia "auto custo", stack e onde encontrar o portfolio.';
	const canonical = $derived(`${page.url.origin}${page.url.pathname}`);
</script>

<svelte:head>
	<title>{TITLE}</title>
	<meta name="description" content={DESCRIPTION} />
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="TabelaHub" />
	<meta property="og:locale" content="pt_BR" />
	<meta property="og:title" content={TITLE} />
	<meta property="og:description" content={DESCRIPTION} />
	<meta property="og:url" content={canonical} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={TITLE} />
	<meta name="twitter:description" content={DESCRIPTION} />
</svelte:head>

<div class="mx-auto flex w-full max-w-3xl flex-col gap-12 px-6 pt-14 pb-8">
	<Button href="/" variant="ghost" size="sm" class="-ml-2">
		<ArrowLeftIcon class="size-4" />
		Início
	</Button>

	<SectionHeading
		eyebrow="Sobre"
		title="Quem está por trás da TabelaDev."
		lead="Um dev, alguns TUIs, alguns apps web — e a mesma regra em todo lugar."
	/>

	<div
		class="prose prose-tabela dark:prose-invert max-w-none font-serif text-[1.05rem] leading-relaxed"
	>
		<p>
			A TabelaDev é a marca sob a qual o <strong>Ian Patrick</strong> publica os projetos pessoais. O
			nome vem da obsessão com tabelas: dados organizados, diretos, sem mistério — a mesma estética que
			você vê no tema de todos os apps.
		</p>
		<p>
			Cada projeto nasce de uma necessidade real, e todos seguem o princípio de
			<em>"auto custo"</em>: rodar barato, sem assinatura, com suas chaves e seus dados no seu
			controle. Web em SvelteKit + Cloudflare Workers, terminal em Go + Bubble Tea, tema e chrome
			centralizados em libs compartilhadas.
		</p>
		<p>
			O changelog aqui é o "registro que se escreve sozinho": cada release nos repos atualiza esta
			página na próxima build, sem digitação manual. As news são o outro lado — as notas de quem
			está construindo, sobre o <em>porquê</em> das decisões.
		</p>
	</div>

	<div class="flex flex-col gap-3 border-y border-rule py-6">
		<div class="flex items-center gap-3">
			<UserRoundIcon class="size-4 text-accent-ink" />
			<span class="font-mono text-sm"
				>O dev por trás: <span class="text-accent-ink">ianptkcs</span></span
			>
		</div>
		<div class="flex items-center gap-3">
			<HeartHandshakeIcon class="size-4 text-accent-ink" />
			<span class="font-mono text-sm">Gosta do projeto? Ko-fi:</span>
			<a
				href="https://ko-fi.com/ianptkcs"
				target="_blank"
				rel="noreferrer"
				class="font-mono text-sm text-accent-ink underline decoration-accent underline-offset-4"
				>ko-fi.com/ianptkcs</a
			>
		</div>
	</div>

	<div class="flex flex-col gap-4">
		<SectionHeading eyebrow="Portfolio" title="A pessoa, além da TabelaDev." />
		<div class="flex flex-col gap-3">
			<p class="font-serif text-[1.05rem] text-ink-soft">
				O <span class="font-mono text-sm">tabelaport</span> é o portfolio/CV do Ian — currículo, trajetória
				e o que ele faz fora da TabelaDev.
			</p>
			<div>
				<Button
					href="https://github.com/TabelaDev/tabelaport"
					target="_blank"
					rel="noreferrer"
					variant="outline"
				>
					Abrir o portfolio
				</Button>
			</div>
		</div>
	</div>

	<Landing.Footer
		name="tabelahub"
		tagline="o hub da TabelaDev"
		license="AGPL-3.0 · SvelteKit + Cloudflare Workers"
		repoUrl="https://github.com/TabelaDev/tabelahub"
	/>
</div>
