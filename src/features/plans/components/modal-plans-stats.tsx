import { Car, CircleDollarSign, QrCode, Users } from "lucide-react"
import { Card } from "@/components/ui/card"

interface ModalPlansStatsProps {
	totalSpots: number
	occupiedSpots: number
	availableSpots: number
}

export const ModalPlansStats = ({
	totalSpots,
	occupiedSpots,
	availableSpots,
}: ModalPlansStatsProps) => {
	return (
		<section className="my-auto grid shrink-0 grid-cols-[1fr_1fr_1fr_110px] gap-3">
			<Card.Root className="rounded border border-sheet-sidebar-border shadow bg-sheet-panel-bg px-4 py-6">
				<p className="text-base text-sheet-stats-label">Total de Vagas</p>
				<p className="mt-2 flex items-center gap-1.5 text-2xl font-semibold">
					<Car size={14} className="text-sheet-stats-icon" />
					{totalSpots}
				</p>
			</Card.Root>
			<Card.Root className="rounded border border-sheet-sidebar-border shadow bg-sheet-panel-bg px-4 py-6">
				<p className="text-base text-sheet-stats-label">Ocupadas</p>
				<p className="mt-2 flex items-center gap-1.5 text-2xl font-semibold">
					<Users size={14} className="text-sheet-stats-icon" />
					{occupiedSpots}
				</p>
			</Card.Root>
			<Card.Root className="rounded border border-sheet-sidebar-border shadow bg-sheet-panel-bg px-4 py-6">
				<p className="text-base text-sheet-stats-label">Disponiveis</p>
				<p className="mt-2 flex items-center gap-1.5 text-2xl font-semibold text-sheet-stats-available-text">
					<CircleDollarSign size={14} className="text-sheet-stats-available-icon" />
					{availableSpots}
				</p>
			</Card.Root>
			<div className="flex items-center justify-center">
				<QrCode size={84} className="text-sheet-qr" />
			</div>
		</section>
	)
}
