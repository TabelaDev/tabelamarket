<script lang="ts">
	import './layout.css';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '@tabeladev/tabelawebui';

	let { children } = $props();
</script>

<ModeWatcher lightClassNames={['light']} darkClassNames={['dark']} />
<Toaster />
{@render children()}
