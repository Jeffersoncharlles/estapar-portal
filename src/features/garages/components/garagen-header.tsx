import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { GaragenSearch } from "./garagen-search"

interface GaragenHeaderProps {
	searchValue: string
	onSearchChange: (value: string) => void
	showOnlyActive: boolean
	onShowOnlyActiveChange: (value: boolean) => void
	total: number
}

export const GaragenHeader = ({
	searchValue,
	onSearchChange,
	showOnlyActive,
	onShowOnlyActiveChange,
	total,
}: GaragenHeaderProps) => {
	return (
		<Card.Root className="rounded-md p-4 md:p-5 hover:bg-white">
			<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
				<div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
					<Switch
						id="show-only-active"
						checked={showOnlyActive}
						onCheckedChange={onShowOnlyActiveChange}
						aria-label="Mostrar apenas ativas"
					/>
					<label htmlFor="show-only-active">Mensalista Digital</label>
				</div>
				<p className="text-sm text-muted-foreground">
					<span className="font-medium text-foreground">{total} registros</span>
				</p>
				<GaragenSearch value={searchValue} onChange={onSearchChange} />
			</div>
		</Card.Root>
	)
}
