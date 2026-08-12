import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';

function devPort() {
	try {
		const cwd = process.cwd();
		const line = readFileSync(`${process.env.HOME}/.config/dev-ports.yaml`, 'utf8')
			.split('\n')
			.find((l) => l.startsWith(`${cwd}: `));
		if (line) return Number(line.slice(cwd.length + 2));
	} catch {
		/* dev-ports.yaml may not exist yet */
	}
	return parseInt(process.env.DEV_PORT || '5173', 10);
}

export default defineConfig({
	server: {
		port: devPort()
	},
	plugins: [tailwindcss(), sveltekit()]
});
