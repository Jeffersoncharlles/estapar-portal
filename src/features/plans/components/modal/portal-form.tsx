import * as Select from "@radix-ui/react-select"
import { CalendarDays, Check, ChevronDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/style.css"
import { Switch } from "@/components/ui/switch"

export const PortalForm = () => {
	const [isActive, setIsActive] = useState(true)
	const [totalSpots, setTotalSpots] = useState("120")
	const [monthlyValue, setMonthlyValue] = useState("R$ 420,00")
	const [cancelValue, setCancelValue] = useState("R$ 120,00")
	const [validityStartDate, setValidityStartDate] = useState<Date | undefined>(
		new Date(),
	)
	const [validityEndDate, setValidityEndDate] = useState<Date | undefined>()
	const [isStartCalendarOpen, setIsStartCalendarOpen] = useState(false)
	const [isEndCalendarOpen, setIsEndCalendarOpen] = useState(false)
	const startCalendarContainerRef = useRef<HTMLDivElement>(null)
	const endCalendarContainerRef = useRef<HTMLDivElement>(null)

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

	const formatDateBR = (date?: Date) => {
		if (!date) return ""
		return new Intl.DateTimeFormat("pt-BR").format(date)
	}

	useEffect(() => {
		const handlePointerDownOutside = (event: MouseEvent) => {
			const target = event.target as Node

			if (
				isStartCalendarOpen &&
				startCalendarContainerRef.current &&
				!startCalendarContainerRef.current.contains(target)
			) {
				setIsStartCalendarOpen(false)
			}

			if (
				isEndCalendarOpen &&
				endCalendarContainerRef.current &&
				!endCalendarContainerRef.current.contains(target)
			) {
				setIsEndCalendarOpen(false)
			}
		}

		document.addEventListener("mousedown", handlePointerDownOutside)
		return () => {
			document.removeEventListener("mousedown", handlePointerDownOutside)
		}
	}, [isStartCalendarOpen, isEndCalendarOpen])

	return (
		<div className="grid gap-4 px-5 py-5 md:grid-cols-2 md:gap-5 md:px-6 md:py-6">
			<div className="space-y-2">
				<label
					htmlFor="plan-description"
					className="text-base  font-medium  tracking-wide text-sheet-table-head-text"
				>
					Descriçāo
				</label>
				<input
					id="plan-description"
					defaultValue="Mensal Executivo"
					className="h-10 w-full rounded-md border border-muted-border bg-card px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
				/>
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
				{/* biome-ignore lint/a11y/noLabelWithoutControl: visual label for Radix trigger */}
				<label className="text-xs font-medium uppercase tracking-wide text-sheet-table-head-text">
					Tipo de veiculo
				</label>
				<Select.Root defaultValue="carro">
					<Select.Trigger className="inline-flex h-10 w-full items-center justify-between rounded-md border border-muted-border bg-card px-3 text-sm text-sheet-table-text outline-none transition-colors focus:ring-2 focus:ring-ring">
						<Select.Value placeholder="Selecione" />
						<Select.Icon className="text-sheet-table-action">
							<ChevronDown size={16} />
						</Select.Icon>
					</Select.Trigger>
					<Select.Portal>
						<Select.Content
							position="popper"
							sideOffset={6}
							className="z-[60] overflow-hidden rounded-md border border-muted-border bg-card shadow-lg"
						>
							<Select.Viewport className="p-1">
								{[
									["carro", "Carro"],
									["moto", "Moto"],
									["suv", "SUV"],
									["utilitario", "Utilitario"],
								].map(([value, label]) => (
									<Select.Item
										key={value}
										value={value}
										className="relative flex h-9 cursor-pointer items-center rounded px-8 text-sm text-sheet-table-text outline-none data-[highlighted]:bg-background-secondary"
									>
										<Select.ItemIndicator className="absolute left-2 inline-flex items-center text-sheet-table-action">
											<Check size={14} />
										</Select.ItemIndicator>
										<Select.ItemText>{label}</Select.ItemText>
									</Select.Item>
								))}
							</Select.Viewport>
						</Select.Content>
					</Select.Portal>
				</Select.Root>
			</div>

			<div className="space-y-1.5">
				<label
					htmlFor="total-spots"
					className="text-xs font-medium uppercase tracking-wide text-sheet-table-head-text"
				>
					Total de vagas
				</label>
				<input
					id="total-spots"
					type="text"
					inputMode="numeric"
					pattern="[0-9]*"
					value={totalSpots}
					onChange={(event) => handleTotalSpotsChange(event.target.value)}
					className="h-10 w-full rounded-md border border-muted-border bg-card px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
				/>
			</div>

			<div title="valor" className="space-y-1.5">
				<label
					htmlFor="monthly-value"
					className="text-xs font-medium uppercase tracking-wide text-sheet-table-head-text"
				>
					Valor (R$)
				</label>
				<input
					id="monthly-value"
					type="text"
					inputMode="numeric"
					value={monthlyValue}
					onChange={(event) => handleMonthlyValueChange(event.target.value)}
					className="h-10 w-full rounded-md border border-muted-border bg-card px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
				/>

				<div
					ref={startCalendarContainerRef}
					className="relative mt-3 space-y-1.5"
				>
					<label
						htmlFor="validity-start"
						className="text-xs font-medium uppercase tracking-wide text-sheet-table-head-text"
					>
						Inicio da validade
					</label>
					<div className="relative">
						<input
							id="validity-start"
							type="text"
							readOnly
							value={formatDateBR(validityStartDate)}
							onClick={() => setIsStartCalendarOpen((prev) => !prev)}
							placeholder="Selecione uma data"
							className="h-10 w-full cursor-pointer rounded-md border border-muted-border bg-card px-3 pr-10 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
						/>
						<button
							type="button"
							onClick={() => setIsStartCalendarOpen((prev) => !prev)}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-sheet-table-action"
							aria-label="Abrir calendario de inicio"
						>
							<CalendarDays size={16} />
						</button>
						{isStartCalendarOpen ? (
							<div className="absolute bottom-[calc(100%+0.5rem)] left-0 z-[100] rounded-md border border-muted-border bg-card p-2 shadow-lg">
								<DayPicker
									mode="single"
									selected={validityStartDate}
									onSelect={(date) => {
										setValidityStartDate(date)
										setIsStartCalendarOpen(false)
									}}
								/>
							</div>
						) : null}
					</div>
				</div>
			</div>

			<div title="valor-cancel" className="space-y-1.5">
				<label
					htmlFor="cancel-value"
					className="text-xs font-medium uppercase tracking-wide text-sheet-table-head-text"
				>
					Valor de Cancelamento (R$)
				</label>
				<input
					id="cancel-value"
					type="text"
					inputMode="numeric"
					value={cancelValue}
					onChange={(event) => handleCancelValueChange(event.target.value)}
					className="h-10 w-full rounded-md border border-muted-border bg-card px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
				/>

				<div
					ref={endCalendarContainerRef}
					className="relative mt-3 space-y-1.5"
				>
					<label
						htmlFor="validity-end"
						className="text-xs font-medium uppercase tracking-wide text-sheet-table-head-text"
					>
						Fim da validade
					</label>
					<div className="relative">
						<input
							id="validity-end"
							type="text"
							readOnly
							value={formatDateBR(validityEndDate)}
							onClick={() => setIsEndCalendarOpen((prev) => !prev)}
							placeholder="Selecione uma data"
							className="h-10 w-full cursor-pointer rounded-md border border-muted-border bg-card px-3 pr-10 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
						/>
						<button
							type="button"
							onClick={() => setIsEndCalendarOpen((prev) => !prev)}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-sheet-table-action"
							aria-label="Abrir calendario de fim"
						>
							<CalendarDays size={16} />
						</button>
						{isEndCalendarOpen ? (
							<div className="absolute bottom-[calc(100%+0.5rem)] left-0 z-[100] rounded-md border border-muted-border bg-card p-2 shadow-lg">
								<DayPicker
									mode="single"
									selected={validityEndDate}
									onSelect={(date) => {
										setValidityEndDate(date)
										setIsEndCalendarOpen(false)
									}}
								/>
							</div>
						) : null}
					</div>
				</div>
			</div>
		</div>
	)
}
