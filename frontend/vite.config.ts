import { reactRouter } from '@react-router/dev/vite'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { reactCompilerPreset } from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig(() => {
	const port = process.env.PORT

	return {
		plugins: [
			reactRouter(),
			tailwindcss(),
			babel({
				presets: [reactCompilerPreset()],
			}),
		],
		resolve: {
			tsconfigPaths: true,
		},
		server: {
			host: '0.0.0.0',
			port: port ? Number(port) : 5173,
		},
	}
})
