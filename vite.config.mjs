import { resolve } from 'path'
import { defineConfig } from 'vite'
import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import electron from './vite-plugin-electron/src/index'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
	base: '/',
	clearScreen: false,
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
		},
	},
	build: {
		outDir: './build/web',
		sourcemap: true,
		target: 'chrome106',
	},
	plugins: [
		svelte({
			preprocess: vitePreprocess(),
		}),
		tailwindcss(),
		electron({
			entry: './src/electron/main.ts',
			// onstart({ startup }) {
			// 	if (process.electronApp) {
			// 		process.kill(process.electronApp.pid, 'SIGTERM')
			// 	} else {
			// 		startup()
			// 	}
			// },
			vite: {
				build: {
					outDir: './build/electron',
					emptyOutDir: true,
					rollupOptions: {
						external: [/^.*\.node$/],
					},
				},
			},
		}),
	],
})
