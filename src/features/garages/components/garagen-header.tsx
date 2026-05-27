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
		<div className="rounded-md border border-muted-border bg-white p-4 md:p-5">
			<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
				<label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
					<Switch
						checked={showOnlyActive}
						onCheckedChange={onShowOnlyActiveChange}
						aria-label="Mostrar apenas ativas"
					/>
					<span>Apenas ativas</span>
				</label>
				<p className="text-sm text-muted-foreground">
					Total de registros: <span className="font-medium text-foreground">{total}</span>
				</p>
				<GaragenSearch value={searchValue} onChange={onSearchChange} />
			</div>
		</div>
	)
}
