import { CalendarDays } from "lucide-react"
import { useRef, useState } from "react"
import { DayPicker } from "react-day-picker"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
			<Input.Root className="pr-1">
				<Input.Content
					id={id}
					type="text"
					readOnly
					value={formatDateBR(value)}
					onClick={() => setIsOpen((prev) => !prev)}
					placeholder={placeholder}
					className="cursor-pointer"
				/>
				<Button
					type="button"
					variant="icon"
					size="icon"
					onClick={() => setIsOpen((prev) => !prev)}
					className="text-sheet-table-action"
					aria-label={ariaLabel}
				>
					<CalendarDays size={16} />
				</Button>
			</Input.Root>

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
