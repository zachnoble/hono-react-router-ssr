import { defineConfig } from 'drizzle-kit'

const url = process.env.DB_URL
if (!url) throw new Error('Missing DB_URL in env')

export default defineConfig({
	out: './src/db/migrations',
	schema: './src/db/schemas',
	dialect: 'postgresql',
	dbCredentials: { url },
})
