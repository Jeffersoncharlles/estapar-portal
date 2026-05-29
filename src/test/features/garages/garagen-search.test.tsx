import { GaragenSearch } from "@/features/garages/components/garagen-search"
import { render, screen } from "@/test/setup"

describe("GaragenSearch Component", () => {
	const mockOnChange = vi.fn()

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it("should render correctly with the initial value and placeholder", async () => {
		render(<GaragenSearch value="Goiânia" onChange={mockOnChange} />)

		const searchInput = screen.getByPlaceholderText(/buscar garagem/i)

		expect(searchInput).toBeInTheDocument()
		expect(searchInput).toHaveValue("Goiânia")
	})
	it("should trigger the onChange callback with the correct string when the user types", async () => {
		const { user } = render(<GaragenSearch value="" onChange={mockOnChange} />)
		const searchInput = screen.getByPlaceholderText(/buscar garagem/i)

		await user.type(searchInput, "Estapar")

		expect(mockOnChange).toHaveBeenCalledTimes(7)

		// Valida se a primeira letra disparou corretamente
		expect(mockOnChange).toHaveBeenNthCalledWith(1, "E")

		// Valida se a última letra disparou corretamente
		expect(mockOnChange).toHaveBeenLastCalledWith("r")
	})
})
