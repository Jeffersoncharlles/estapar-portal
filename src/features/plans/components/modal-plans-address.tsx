import { Building2, MapPin } from "lucide-react"

interface ModalPlansAddressProps {
	address: string
	filial: string
	regional: string
}

export const ModalPlansAddress = ({
	address,
	filial,
	regional,
}: ModalPlansAddressProps) => {
	return (
		<div className="space-y-2 text-base text-sheet-address-text">
			<p className="flex items-center gap-1.5">
				<MapPin size={16} />
				{address}
			</p>
			<p className="flex items-center gap-1.5">
				<Building2 size={16} />
				Filial: {filial} - Regional: {regional}
			</p>
		</div>
	)
}
