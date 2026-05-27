import { Building2, X } from "lucide-react"
import { SheetClose } from "@/components/ui/sheet"

interface ModalPlansHeaderProps {
	garageName: string
	garageCode: string
	isSheet: boolean
}

export const ModalPlansHeader = ({
	garageName,
	garageCode,
	isSheet,
}: ModalPlansHeaderProps) => {
	return (
		<header className="flex items-start justify-between px-6 py-10">
			<div className="space-y-2">
				<div className="flex items-center gap-2">
					<Building2 size={22} className="text-sheet-header-icon" />
					<h2 className="text-2xl font-semibold tracking-tight">
						{garageName}
					</h2>
				</div>
				<p className="text-sm text-sheet-header-code">Codigo: {garageCode}</p>
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
