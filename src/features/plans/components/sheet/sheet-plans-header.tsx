import { Building2, X } from "lucide-react"
import { SheetClose } from "@/components/ui/sheet"

interface SheetPlansHeaderProps {
	garageName: string
	garageCode: string
	isSheet: boolean
}

export const SheetPlansHeader = ({
	garageName,
	garageCode,
	isSheet,
}: SheetPlansHeaderProps) => {
	return (
		<header className="flex items-start justify-between px-4 py-6 md:px-6 md:py-10">
			<div className="space-y-2">
				<div className="flex items-center gap-2">
					<Building2 size={22} className="text-sheet-header-icon" />
					<h2 className="text-lg font-semibold tracking-tight md:text-2xl">
						{garageName}
					</h2>
				</div>
				<p className="text-xs text-sheet-header-code md:text-sm">Codigo: {garageCode}</p>
			</div>
			{isSheet ? (
				<SheetClose asChild>
					<button
						type="button"
						className="rounded p-1 text-sheet-close-icon hover:bg-sheet-close-hover-bg"
					>
						<X size={16} />
					</button>
				</SheetClose>
			) : null}
		</header>
	)
}
