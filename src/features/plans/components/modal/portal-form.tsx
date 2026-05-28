import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { DatePicker } from "@/components/ui/date-picker"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

const portalFormSchema = z.object({
	description: z.string().min(1, "A descrição é obrigatória"),
	isActive: z.boolean(),
	vehicleType: z.enum(["carro", "moto", "suv", "utilitario"]),
	totalSpots: z.number().int().nonnegative(),
	monthlyValue: z.number().int().nonnegative(),
	cancelValue: z.number().int().nonnegative(),
	validityStartDate: z
		.date()
		.optional()
		.transform((value) => (value ? value.getTime() : undefined)),
	validityEndDate: z
		.date()
		.optional()
		.transform((value) => (value ? value.getTime() : undefined)),
})

type PortalFormInput = z.input<typeof portalFormSchema>
type PortalFormOutput = z.output<typeof portalFormSchema>

type PortalFormDateValue = Date | number | string | undefined

interface PortalFormInitialData {
	description?: string
	isActive?: boolean
	vehicleType?: PortalFormInput["vehicleType"]
	totalSpots?: number
	monthlyValue?: number
	cancelValue?: number
	validityStartDate?: PortalFormDateValue
	validityEndDate?: PortalFormDateValue
}

interface PortalFormProps {
	initialData?: PortalFormInitialData
}

const toDateValue = (value: PortalFormDateValue) => {
	if (value === undefined || value === null || value === "") return undefined

	if (value instanceof Date) {
		return Number.isNaN(value.getTime()) ? undefined : value
	}

	if (typeof value === "number") {
		const parsed = new Date(value)
		return Number.isNaN(parsed.getTime()) ? undefined : parsed
	}

	const parsed = new Date(value)
	return Number.isNaN(parsed.getTime()) ? undefined : parsed
}

export const PortalForm = ({ initialData }: PortalFormProps) => {
	const { register, handleSubmit, control } = useForm<
		PortalFormInput,
		unknown,
		PortalFormOutput
	>({
		resolver: zodResolver(portalFormSchema),
		defaultValues: {
			description: initialData?.description ?? "Mensal Executivo",
			isActive: initialData?.isActive ?? true,
			vehicleType: initialData?.vehicleType ?? "carro",
			totalSpots: initialData?.totalSpots ?? 0,
			monthlyValue: initialData?.monthlyValue ?? 0,
			cancelValue: initialData?.cancelValue ?? 0,
			validityStartDate: toDateValue(initialData?.validityStartDate) ?? new Date(),
			validityEndDate: toDateValue(initialData?.validityEndDate),
		},
	})

	const formatBRLFromCents = (valueInCents: number) => {
		return new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(valueInCents / 100)
	}

	const extractDigits = (value: string) => value.replace(/\D/g, "")

	const handleOnSubmit = (data: PortalFormOutput) => {
		console.log("Form data:", data)
	}

	return (
		<form
			id="portal-plan-form"
			onSubmit={handleSubmit(handleOnSubmit)}
			className="grid gap-4 px-5 py-5 md:grid-cols-2 md:gap-5 md:px-6 md:py-6"
		>
			<div className="space-y-2">
				<label
					htmlFor="plan-description"
					className="text-base  font-medium  tracking-wide text-sheet-table-head-text"
				>
					Descriçāo
				</label>
				<Input.Root>
					<Input.Content id="plan-description" {...register("description")} />
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
						<Controller
							control={control}
							name="isActive"
							render={({ field }) => (
								<>
									<Switch
										id="plan-status"
										checked={field.value}
										onCheckedChange={field.onChange}
										aria-label="Status do plano"
									/>
									<span
										className={`text-sm font-medium ${
											field.value
												? "text-sheet-stats-available-text"
												: "text-sheet-table-text"
										}`}
									>
										{field.value ? "Ativo" : "Desativado"}
									</span>
								</>
							)}
						/>
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
				<Controller
					control={control}
					name="vehicleType"
					render={({ field }) => (
						<Select.Root value={field.value} onValueChange={field.onChange}>
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
					)}
				/>
			</div>

			<div className="space-y-1.5">
				<label
					htmlFor="total-spots"
					className="text-xs font-medium uppercase tracking-wide text-sheet-table-head-text"
				>
					Total de vagas
				</label>
				<Controller
					control={control}
					name="totalSpots"
					render={({ field }) => (
						<Input.Root>
							<Input.Content
								id="total-spots"
								type="text"
								inputMode="numeric"
								pattern="[0-9]*"
								value={String(field.value ?? "")}
								onChange={(event) => {
									const digits = extractDigits(event.target.value)
									field.onChange(Number(digits || 0))
								}}
							/>
						</Input.Root>
					)}
				/>
			</div>

			<div title="valor" className="space-y-1.5">
				<label
					htmlFor="monthly-value"
					className="text-xs font-medium uppercase tracking-wide text-sheet-table-head-text"
				>
					Valor (R$)
				</label>
				<Controller
					control={control}
					name="monthlyValue"
					render={({ field }) => (
						<Input.Root>
							<Input.Content
								id="monthly-value"
								type="text"
								inputMode="numeric"
								value={formatBRLFromCents(field.value ?? 0)}
								onChange={(event) => {
									const digits = extractDigits(event.target.value)
									field.onChange(Number(digits || 0))
								}}
							/>
						</Input.Root>
					)}
				/>

				<div className="relative mt-3 space-y-1.5">
					<label
						htmlFor="validity-start"
						className="text-xs font-medium uppercase tracking-wide text-sheet-table-head-text"
					>
						Inicio da validade
					</label>
					<Controller
						control={control}
						name="validityStartDate"
						render={({ field }) => (
							<DatePicker
								id="validity-start"
								value={field.value}
								onChange={field.onChange}
								ariaLabel="Abrir calendario de inicio"
							/>
						)}
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
				<Controller
					control={control}
					name="cancelValue"
					render={({ field }) => (
						<Input.Root>
							<Input.Content
								id="cancel-value"
								type="text"
								inputMode="numeric"
								value={formatBRLFromCents(field.value ?? 0)}
								onChange={(event) => {
									const digits = extractDigits(event.target.value)
									field.onChange(Number(digits || 0))
								}}
							/>
						</Input.Root>
					)}
				/>

				<div className="relative mt-3 space-y-1.5">
					<label
						htmlFor="validity-end"
						className="text-xs font-medium uppercase tracking-wide text-sheet-table-head-text"
					>
						Fim da validade
					</label>
					<Controller
						control={control}
						name="validityEndDate"
						render={({ field }) => (
							<DatePicker
								id="validity-end"
								value={field.value}
								onChange={field.onChange}
								ariaLabel="Abrir calendario de fim"
							/>
						)}
					/>
				</div>
			</div>
		</form>
	)
}
