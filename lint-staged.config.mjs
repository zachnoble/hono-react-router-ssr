export default {
	'backend/**/*.{ts,js,json}': (files) =>
		files.length ? ['bun run fix:backend', 'bun run --cwd backend typecheck'] : [],
	'frontend/**/*.{ts,tsx,js,json}': (files) =>
		files.length ? ['bun run fix:frontend', 'bun run --cwd frontend typecheck'] : [],
	'*.{yml,yaml,yml,json,ts,js,mjs,cjs,css,html}': (files) =>
		files.length ? [`oxfmt ${files.join(' ')}`] : [],
}
