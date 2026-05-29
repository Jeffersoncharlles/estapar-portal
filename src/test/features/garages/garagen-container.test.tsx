import { Suspense } from "react"
import { MemoryRouter } from "react-router"
import { GaragenContainer } from "@/features/garages/components/garagen-container"
import type { GaragensResponse } from "@/features/garages/types/garagen-api"
import { render, screen, waitFor } from "@/test/setup"

vi.mock("react", async () => {
	const actual = await vi.importActual<typeof import("react")>("react")

	return {
		...actual,
		use: vi.fn((value: unknown) => value),
	}
})

const garagesFixture: GaragensResponse = [
	{
		id: "g-1",
		name: "Alpha Park",
		address: "Rua 1",
		city: "Goiania",
		regional: "CO",
	},
	{
		id: "g-2",
		name: "Beta Mall",
		address: "Rua 2",
		city: "Goiania",
		regional: "CO",
	},
	{
		id: "g-3",
		name: "Gamma Center",
		address: "Rua 3",
		city: "Brasilia",
		regional: "CO",
	},
	{
		id: "g-4",
		name: "Delta Spot",
		address: "Rua 4",
		city: "Sao Paulo",
		regional: "SE",
	},
]

const renderContainer = () =>
	render(
		<MemoryRouter>
			<Suspense fallback={<span>Carregando garagens...</span>}>
				<GaragenContainer
					garagens={garagesFixture as unknown as Promise<GaragensResponse>}
				/>
			</Suspense>
		</MemoryRouter>,
	)

describe("GaragenContainer", () => {
	it("should be renders actual header and table with correct initial total.", () => {
		renderContainer()

		expect(screen.queryByText("Carregando garagens...")).not.toBeInTheDocument()
		expect(screen.getByText("4 registros")).toBeInTheDocument()
		expect(screen.getByText("Alpha Park")).toBeInTheDocument()
		expect(screen.getByText("Beta Mall")).toBeInTheDocument()
		expect(screen.getByText("Gamma Center")).toBeInTheDocument()
		expect(screen.getByText("Delta Spot")).toBeInTheDocument()
	})

	it("should apply search only after debounce of 350ms", async () => {
		const { user } = renderContainer()

		const input = screen.getByPlaceholderText(/buscar garagem/i)
		await user.type(input, "Gamma")

		expect(screen.getByText("4 registros")).toBeInTheDocument()

		await waitFor(
			() => {
				expect(screen.getByText("1 registros")).toBeInTheDocument()
			},
			{ timeout: 1200 },
		)

		expect(screen.getByText("Gamma Center")).toBeInTheDocument()
		expect(screen.queryByText("Alpha Park")).not.toBeInTheDocument()
	})

	it("should combine active filter with search", async () => {
		const { user } = renderContainer()

		await user.click(screen.getByLabelText(/mostrar apenas ativas/i))

		await waitFor(() => {
			expect(screen.getByText("2 registros")).toBeInTheDocument()
		})

		expect(screen.getByText("Alpha Park")).toBeInTheDocument()
		expect(screen.getByText("Gamma Center")).toBeInTheDocument()
		expect(screen.queryByText("Beta Mall")).not.toBeInTheDocument()

		const input = screen.getByPlaceholderText(/buscar garagem/i)
		await user.type(input, "Beta")

		await waitFor(
			() => {
				expect(screen.getByText("0 registros")).toBeInTheDocument()
			},
			{ timeout: 1200 },
		)

		expect(screen.queryByText("Beta Mall")).not.toBeInTheDocument()
	})
})
