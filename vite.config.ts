import { defineConfig } from 'vitest/config'

const isCi = process.env.CI !== undefined

export default defineConfig({
	test: {
		mockReset: true,
		environment: 'node',
		include: ['src/**/*.test.{ts,tsx}'],
		globals: true,
		coverage: {
			provider: 'v8',
			reporter: ['json', isCi ? 'text' : 'text-summary'],
			all: true,
			include: ['src/**/*.ts'],
			reportsDirectory: './coverage',
			reportOnFailure: true,
		},
		reporters: ['default', 'junit'],
		outputFile: './test-report.junit.xml',
		snapshotFormat: {
			escapeString: false,
			printBasicPrototype: false,
		},
	},
})
