import { fetchGarageDetails } from "@/core/services/api"
import { useGaragePlansQuery } from "@/features/plans/api/use-garage-plans-query"
import { SheetPlansContent } from "@/features/plans/components/sheet/sheet-plans-content"

import { render, screen, waitFor } from "@/test/setup"

vi.mock("@/core/services/api", () => ({
	fetchGarageDetails: vi.fn(),
}))

vi.mock("@/features/plans/api/use-garage-plans-query", () => ({
	useGaragePlansQuery: vi.fn(),
}))

const mockGarageDetails = {
	id: "gmc-123",
	garageId: "GMC-123-REGIONAL",
	name: "Estapar Flamboyant",
	address: "Av. Jamel Cecílio, 3300",
	city: "Goiânia",
	regional: "Centro-Oeste",
	filial: "Goiânia",
	qrCode: "gmc-flamboyant-qrcode-string",
	totalSpots: 500,
	occupiedSpots: 350,
	availableSpots: 150,
}

const mockPlans = [
	{ id: "plano-mensal", name: "Mensal de Carro", price: 30000 },
]

const mockPlansQuery = (overrides?: {
	data?: typeof mockPlans
	isLoading?: boolean
	isError?: boolean
}) => {
	vi.mocked(useGaragePlansQuery).mockReturnValue({
		data: overrides?.data ?? [],
		isLoading: overrides?.isLoading ?? false,
		isError: overrides?.isError ?? false,
	} as any)
}

describe("SheetPlansContent Integration with QueryClient", () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it("should render initial loading states correctly using real provider", () => {
		vi.mocked(fetchGarageDetails).mockReturnValue(new Promise(() => {}))
		mockPlansQuery({ isLoading: true })

		render(<SheetPlansContent garageId="gmc-123" isSheet={false} />)

		expect(screen.getByText("NAO DISPONIVEL")).toBeInTheDocument()
	})

	it("should render data successfully when the QueryClient resolves the responses", async () => {
		vi.mocked(fetchGarageDetails).mockResolvedValue(mockGarageDetails)
		mockPlansQuery({ data: mockPlans })

		render(<SheetPlansContent garageId="gmc-123" isSheet={false} />)

		await waitFor(() => {
			expect(
				screen.getByText("ESTAPAR FLAMBOYANT (GMC PARK)"),
			).toBeInTheDocument()
			expect(screen.getByText(/Codigo:\s*gmc-123/i)).toBeInTheDocument()
			expect(screen.getByText("Av. Jamel Cecílio, 3300")).toBeInTheDocument()
		})
	})

	it("should display error messaging when the provider catches a query failure", async () => {
		vi.mocked(fetchGarageDetails).mockRejectedValue(
			new Error("Erro de conexão"),
		)
		mockPlansQuery({ isError: true })

		render(<SheetPlansContent garageId="gmc-123" isSheet={false} />)

		await waitFor(() => {
			const errorMessage = screen.getByText(
				"Nao foi possivel carregar os detalhes da garagem.",
			)
			expect(errorMessage).toBeInTheDocument()
			expect(errorMessage).toHaveClass("text-destructive")
		})
	})
})
