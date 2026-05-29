import { formatBRLFromCents } from "@/core/shared/format-current-coins"
import type { PortalFormInitialData } from "@/features/plans/api/types"
import { PortalForm } from "@/features/plans/components/modal/portal-form"
import { fireEvent, render, screen, waitFor } from "@/test/setup"

class ResizeObserverMock {
	observe() {}
	unobserve() {}
	disconnect() {}
}

beforeAll(() => {
	vi.stubGlobal("ResizeObserver", ResizeObserverMock)
})

afterAll(() => {
	vi.unstubAllGlobals()
})

describe("PortalForm", () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it("should render default values when no initial data is provided", () => {
		render(<PortalForm onSubmit={vi.fn()} />)

		expect(screen.getByLabelText("Descriçāo")).toHaveValue("Mensal Executivo")
		expect(screen.getByText("Ativo")).toBeInTheDocument()
		expect(screen.getByLabelText("Total de vagas")).toHaveValue("0")
		expect(screen.getByLabelText("Valor (R$)")).toHaveValue(
			formatBRLFromCents(0),
		)
		expect(screen.getByLabelText("Valor de Cancelamento (R$)")).toHaveValue(
			formatBRLFromCents(0),
		)
	})

	it("should hydrate form fields from initialData", () => {
		const startDate = new Date(2026, 0, 1)
		const endDate = new Date(2026, 11, 31)

		const initialData: PortalFormInitialData = {
			description: "Plano Corporativo",
			isActive: false,
			vehicleType: "moto",
			totalSpots: 12,
			monthlyValue: 35000,
			cancelValue: 1500,
			validityStartDate: startDate,
			validityEndDate: endDate,
		}

		render(<PortalForm initialData={initialData} onSubmit={vi.fn()} />)

		expect(screen.getByLabelText("Descriçāo")).toHaveValue("Plano Corporativo")
		expect(screen.getByText("Desativado")).toBeInTheDocument()
		expect(screen.getByLabelText("Total de vagas")).toHaveValue("12")
		expect(screen.getByLabelText("Valor (R$)")).toHaveValue(
			formatBRLFromCents(35000),
		)
		expect(screen.getByLabelText("Valor de Cancelamento (R$)")).toHaveValue(
			formatBRLFromCents(1500),
		)
		expect(screen.getByLabelText("Inicio da validade")).toHaveValue(
			new Intl.DateTimeFormat("pt-BR").format(startDate),
		)
		expect(screen.getByLabelText("Fim da validade")).toHaveValue(
			new Intl.DateTimeFormat("pt-BR").format(endDate),
		)
	})

	it("should sanitize numeric inputs and submit transformed payload", async () => {
		const onSubmit = vi.fn()
		const initialData: PortalFormInitialData = {
			validityStartDate: new Date("2026-02-01T00:00:00.000Z"),
			validityEndDate: new Date("2026-03-01T00:00:00.000Z"),
		}

		render(<PortalForm initialData={initialData} onSubmit={onSubmit} />)

		fireEvent.change(screen.getByLabelText("Descriçāo"), {
			target: { value: "Plano Gold" },
		})
		fireEvent.click(screen.getByRole("switch", { name: "Status do plano" }))
		fireEvent.change(screen.getByLabelText("Total de vagas"), {
			target: { value: "abc123xyz" },
		})
		fireEvent.change(screen.getByLabelText("Valor (R$)"), {
			target: { value: "R$ 999,90" },
		})
		fireEvent.change(screen.getByLabelText("Valor de Cancelamento (R$)"), {
			target: { value: "R$ 15,50" },
		})

		const form = document.getElementById("portal-plan-form")
		expect(form).not.toBeNull()
		if (form) {
			fireEvent.submit(form)
		}

		await waitFor(() => {
			expect(onSubmit).toHaveBeenCalledTimes(1)
			expect(onSubmit).toHaveBeenCalledWith({
				description: "Plano Gold",
				isActive: false,
				vehicleType: "carro",
				totalSpots: 123,
				monthlyValue: 99990,
				cancelValue: 1550,
				validityStartDate: new Date("2026-02-01T00:00:00.000Z").getTime(),
				validityEndDate: new Date("2026-03-01T00:00:00.000Z").getTime(),
			})
		})
	})
})
