import { toast } from "sonner"
import { SignInForm } from "@/features/auth/components/sigin-form"
import { render, screen, waitFor } from "@/test/setup"

const mockSubmit = vi.fn()
let mockActionData: { error?: string } | undefined

vi.mock("react-router", () => ({
	useSubmit: () => mockSubmit,
	useNavigation: () => ({ state: "idle" }),
	useActionData: () => mockActionData,
}))

vi.mock("sonner", () => ({
	toast: { error: vi.fn() },
}))

describe("SignInForm Component Integration", () => {
	beforeEach(() => {
		vi.clearAllMocks()
		mockActionData = undefined
	})

	it("should display an error message toast when the user provides invalid credentials", async () => {
		const { user, rerender } = render(<SignInForm />)

		const usernameInput = screen.getByPlaceholderText(/digite seu usuário/i)
		const passwordInput = screen.getByPlaceholderText(/digite sua senha/i)
		const submitButton = screen.getByRole("button", { name: /entrar/i })

		await user.type(usernameInput, "usuario.estapar.errado")
		await user.type(passwordInput, "senhaInvalida123")
		await user.click(submitButton)

		expect(mockSubmit).toHaveBeenCalledWith(
			{ userName: "usuario.estapar.errado", password: "senhaInvalida123" },
			{ method: "post" },
		)

		mockActionData = { error: "Usuário ou senha incorretos." }
		rerender(<SignInForm />)

		await waitFor(() => {
			expect(toast.error).toHaveBeenCalledWith("Usuário ou senha incorretos.", {
				id: "sign-in-error",
			})
		})
	})
	it("should submit form data successfully when valid credentials are provided", async () => {
		const { user } = render(<SignInForm />)

		const usernameInput = screen.getByPlaceholderText(/digite seu usuário/i)
		const passwordInput = screen.getByPlaceholderText(/digite sua senha/i)
		const submitButton = screen.getByRole("button", { name: /entrar/i })

		await user.type(usernameInput, "estapar")
		await user.type(passwordInput, "012345678")

		await user.click(submitButton)

		expect(mockSubmit).toHaveBeenCalledWith(
			{ userName: "estapar", password: "012345678" },
			{ method: "post" },
		)

		expect(toast.error).not.toHaveBeenCalled()
	})
})
