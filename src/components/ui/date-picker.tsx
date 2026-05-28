import { CalendarDays } from "lucide-react"
import { useRef, useState } from "react"
import { DayPicker } from "react-day-picker"
import { useClickOutside } from "@/core/hooks/use-click-outside"

interface DatePickerProps {
	id: string
	value?: Date
	onChange: (date: Date | undefined) => void
	placeholder?: string
	ariaLabel: string
}

const formatDateBR = (date?: Date) => {
	if (!date) return ""
	return new Intl.DateTimeFormat("pt-BR").format(date)
}

export const DatePicker = ({
	id,
	value,
	onChange,
	placeholder = "Selecione uma data",
	ariaLabel,
}: DatePickerProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)

	useClickOutside({
		refs: [containerRef],
		onOutsideClick: () => setIsOpen(false),
		enabled: isOpen,
	})

	return (
		<div ref={containerRef} className="relative">
			<input
				id={id}
				type="text"
				readOnly
				value={formatDateBR(value)}
				onClick={() => setIsOpen((prev) => !prev)}
				placeholder={placeholder}
				className="h-10 w-full cursor-pointer rounded-md border border-muted-border bg-card px-3 pr-10 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
			/>
			<button
				type="button"
				onClick={() => setIsOpen((prev) => !prev)}
				className="absolute right-3 top-1/2 -translate-y-1/2 text-sheet-table-action"
				aria-label={ariaLabel}
			>
				<CalendarDays size={16} />
			</button>

			{isOpen ? (
				<div className="absolute bottom-[calc(100%+0.5rem)] left-0 z-100 rounded-md border border-muted-border bg-card p-2 shadow-lg">
					<DayPicker
						mode="single"
						selected={value}
						onSelect={(date) => {
							onChange(date)
							setIsOpen(false)
						}}
					/>
				</div>
			) : null}
		</div>
	)
}
