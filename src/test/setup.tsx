import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { type RenderOptions, render as rtlRender } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import type React from "react"

const createTestQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: { retry: false, gcTime: 0 },
			mutations: { retry: false },
		},
	})

function customRender(
	ui: React.ReactElement,
	options?: Omit<RenderOptions, "wrapper">,
) {
	const testQueryClient = createTestQueryClient()

	const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
		return (
			<QueryClientProvider client={testQueryClient}>
				{children}
			</QueryClientProvider>
		)
	}

	return {
		user: userEvent.setup(),
		...rtlRender(ui, { wrapper: Wrapper, ...options }),
	}
}

export * from "@testing-library/react"

export { customRender as render }
