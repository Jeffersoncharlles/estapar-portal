import { GaragenTable } from "@/features/garages/components/garagen-table"
import type { GaragensResponse } from "@/features/garages/types/garagen-api"
import { render, screen } from "@/test/setup"

const mockNavigate = vi.fn()

vi.mock("react-router", () => ({
	useNavigate: () => mockNavigate,
}))

const mockGarages: GaragensResponse = [
	{
		id: "garagem-1",
		name: "Estapar Centro Goiânia",
		address: "Av. Anhanguera, 1234",
		city: "Goiânia",
		regional: "Centro-Oeste",
	},
	{
		id: "garagem-2",
		name: "Estapar Shopping Flamboyant",
		address: "Av. Dep. Jamel Cecílio, 3300",
		city: "Goiânia",
		regional: "Centro-Oeste",
	},
]

describe("GaragenTable Component", () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it("should render the table headers and list all provided garages correctly", async () => {
		render(<GaragenTable items={mockGarages} />)

		expect(screen.getByText("ID")).toBeInTheDocument()
		expect(screen.getByText("Nome")).toBeInTheDocument()
		expect(screen.getByText("Endereco")).toBeInTheDocument()
		expect(screen.getByText("Cidade")).toBeInTheDocument()
		expect(screen.getByText("Regional")).toBeInTheDocument()

		expect(screen.getByText("garagem-1")).toBeInTheDocument()
		expect(screen.getByText("Estapar Centro Goiânia")).toBeInTheDocument()
		expect(screen.getByText("Av. Anhanguera, 1234")).toBeInTheDocument()

		expect(screen.getByText("garagem-2")).toBeInTheDocument()
		expect(screen.getByText("Estapar Shopping Flamboyant")).toBeInTheDocument()
		expect(screen.getByText("Av. Dep. Jamel Cecílio, 3300")).toBeInTheDocument()
	})
	it("should navigate to the correct garage plans page when the action button is clicked", async () => {
		const { user } = render(<GaragenTable items={mockGarages} />)

		const actionButtons = screen.getAllByRole("button")

		expect(actionButtons).toHaveLength(mockGarages.length)
		await user.click(actionButtons[0])

		expect(mockNavigate).toHaveBeenCalledWith("/garagens/garagem-1/planos")

		await user.click(actionButtons[1])

		expect(mockNavigate).toHaveBeenCalledWith("/garagens/garagem-2/planos")
	})
})
