/// <reference types="vitest/config" />
import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	build: {
		chunkSizeWarningLimit: 1000,
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (!id.includes("node_modules")) {
						return
					}

					if (id.includes("react-dom")) {
						return "vendor-react-dom"
					}

					if (id.includes("/react/")) {
						return "vendor-react"
					}

					if (id.includes("react-router")) {
						return "vendor-router"
					}

					if (id.includes("@radix-ui") || id.includes("lucide-react")) {
						return "vendor-ui"
					}

					if (id.includes("@tanstack/react-query") || id.includes("axios")) {
						return "vendor-data"
					}

					if (id.includes("date-fns") || id.includes("react-day-picker")) {
						return "vendor-date"
					}

					if (id.includes("sonner") || id.includes("zod") || id.includes("react-hook-form")) {
						return "vendor-forms"
					}
				},
			},
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./src/test/setup.ts",
	},
})
