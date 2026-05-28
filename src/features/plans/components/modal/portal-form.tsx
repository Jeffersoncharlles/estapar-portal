import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { DatePicker } from "@/components/ui/date-picker"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

const portalFormSchema = z.object({
	description: z.string().min(1, "A descrição é obrigatória"),
	isActive: z.boolean(),
	vehicleType: z.enum(["carro", "moto", "suv", "utilitario"]),
	totalSpots: z
		.string()
		.regex(/^\d+$/, "Total de vagas deve conter apenas números"),
	monthlyValue: z
		.string()
		.regex(/^\d+$/, "Valor mensal deve conter apenas números"),
	cancelValue: z
		.string()
		.regex(/^\d+$/, "Valor de cancelamento deve conter apenas números"),
	validityStartDate: z.date().optional(),
	validityEndDate: z.date().optional(),
})

type PortalFormData = z.infer<typeof portalFormSchema>

export const PortalForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<PortalFormData>({
		resolver: zodResolver(portalFormSchema),
		defaultValues: {
			// Defina os valores padrão aqui, se necessário
		},
	})
	const [isActive, setIsActive] = useState(true)
	const [totalSpots, setTotalSpots] = useState("120")
	const [monthlyValue, setMonthlyValue] = useState("R$ 420,00")
	const [cancelValue, setCancelValue] = useState("R$ 120,00")
	const [validityStartDate, setValidityStartDate] = useState<Date | undefined>(
		new Date(),
	)
	const [validityEndDate, setValidityEndDate] = useState<Date | undefined>()

	const formatBRLFromDigits = (digits: string) => {
		const valueInCents = Number(digits || "0")
		return new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(valueInCents / 100)
	}

	const handleTotalSpotsChange = (value: string) => {
		setTotalSpots(value.replace(/\D/g, ""))
	}

	const handleMonthlyValueChange = (value: string) => {
		const digits = value.replace(/\D/g, "")
		setMonthlyValue(formatBRLFromDigits(digits))
	}

	const handleCancelValueChange = (value: string) => {
		const digits = value.replace(/\D/g, "")
		setCancelValue(formatBRLFromDigits(digits))
	}

	return (
		<div className="grid gap-4 px-5 py-5 md:grid-cols-2 md:gap-5 md:px-6 md:py-6">
			<div className="space-y-2">
				<label
					htmlFor="plan-description"
					className="text-base  font-medium  tracking-wide text-sheet-table-head-text"
				>
					Descriçāo
				</label>
				<Input.Root>
					<Input.Content id="plan-description" defaultValue="Mensal Executivo" />
				</Input.Root>
			</div>

			<div className="space-y-1.5">
				<label
					htmlFor="plan-status"
					className="text-xs font-medium uppercase tracking-wide text-sheet-table-head-text"
				>
					Status
				</label>
				<div className="flex h-10 ">
					<div className="flex w-full items-center  gap-3">
						<Switch
							id="plan-status"
							checked={isActive}
							onCheckedChange={setIsActive}
							aria-label="Status do plano"
						/>
						<span
							className={`text-sm font-medium ${
								isActive
									? "text-sheet-stats-available-text"
									: "text-sheet-table-text"
							}`}
						>
							{isActive ? "Ativo" : "Desativado"}
						</span>
					</div>
				</div>
			</div>

			<div className="space-y-1.5 md:col-start-1">
				<label
					htmlFor="type-carros"
					className="text-xs font-medium uppercase tracking-wide text-sheet-table-head-text"
				>
					Tipo de veiculo
				</label>
				<Select.Root defaultValue="carro">
					<Select.Trigger
						id="type-carros"
						className="border-muted-border bg-card text-sheet-table-text"
					>
						<Select.Value placeholder="Selecione" />
					</Select.Trigger>
					<Select.Content className="border-muted-border bg-card">
						{[
							["carro", "Carro"],
							["moto", "Moto"],
							["suv", "SUV"],
							["utilitario", "Utilitario"],
						].map(([value, label]) => (
							<Select.Item
								key={value}
								value={value}
								className="text-sheet-table-text"
							>
								{label}
							</Select.Item>
						))}
					</Select.Content>
				</Select.Root>
			</div>

			<div className="space-y-1.5">
				<label
					htmlFor="total-spots"
					className="text-xs font-medium uppercase tracking-wide text-sheet-table-head-text"
				>
					Total de vagas
				</label>
				<Input.Root>
					<Input.Content
						id="total-spots"
						type="text"
						inputMode="numeric"
						pattern="[0-9]*"
						value={totalSpots}
						onChange={(event) => handleTotalSpotsChange(event.target.value)}
					/>
				</Input.Root>
			</div>

			<div title="valor" className="space-y-1.5">
				<label
					htmlFor="monthly-value"
					className="text-xs font-medium uppercase tracking-wide text-sheet-table-head-text"
				>
					Valor (R$)
				</label>
				<Input.Root>
					<Input.Content
						id="monthly-value"
						type="text"
						inputMode="numeric"
						value={monthlyValue}
						onChange={(event) => handleMonthlyValueChange(event.target.value)}
					/>
				</Input.Root>

				<div className="relative mt-3 space-y-1.5">
					<label
						htmlFor="validity-start"
						className="text-xs font-medium uppercase tracking-wide text-sheet-table-head-text"
					>
						Inicio da validade
					</label>
					<DatePicker
						id="validity-start"
						value={validityStartDate}
						onChange={setValidityStartDate}
						ariaLabel="Abrir calendario de inicio"
					/>
				</div>
			</div>

			<div title="valor-cancel" className="space-y-1.5">
				<label
					htmlFor="cancel-value"
					className="text-xs font-medium uppercase tracking-wide text-sheet-table-head-text"
				>
					Valor de Cancelamento (R$)
				</label>
				<Input.Root>
					<Input.Content
						id="cancel-value"
						type="text"
						inputMode="numeric"
						value={cancelValue}
						onChange={(event) => handleCancelValueChange(event.target.value)}
					/>
				</Input.Root>

				<div className="relative mt-3 space-y-1.5">
					<label
						htmlFor="validity-end"
						className="text-xs font-medium uppercase tracking-wide text-sheet-table-head-text"
					>
						Fim da validade
					</label>
					<DatePicker
						id="validity-end"
						value={validityEndDate}
						onChange={setValidityEndDate}
						ariaLabel="Abrir calendario de fim"
					/>
				</div>
			</div>
		</div>
	)
}
