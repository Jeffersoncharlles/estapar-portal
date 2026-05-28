import { ButtonSheet } from "@/components/ui/button-sheat"
import type { Garage } from "@/core/mocks/garages"

import { SheetPlans } from "@/features/plans/components/sheet/sheet-plans"

interface GaragenTableProps {
	items: Garage[]
}

export const GaragenTable = ({ items }: GaragenTableProps) => {
	return (
		<div className="overflow-hidden rounded-md border border-muted-border bg-white">
			<div className="overflow-x-auto">
				<table className="min-w-full text-left text-sm">
					<thead className="text-muted-foreground">
						<tr>
							<th className="px-4 py-3 font-medium">ID</th>
							<th className="px-4 py-3 font-medium">Nome</th>
							<th className="px-4 py-3 font-medium">Endereco</th>
							<th className="px-4 py-3 font-medium">Cidade</th>
							<th className="px-4 py-3 font-medium">Regional</th>
							<th className="px-4 py-3 text-right font-medium">Acoes</th>
						</tr>
					</thead>
					<tbody>
						{items.map((garage) => (
							<tr key={garage.id} className="border-t border-muted-border">
								<td className="px-4 py-3 text-muted-foreground">{garage.id}</td>
								<td className="px-4 py-3 font-medium text-foreground">
									{garage.name}
								</td>
								<td className="px-4 py-3 text-muted-foreground">
									{garage.address}
								</td>
								<td className="px-4 py-3 text-muted-foreground">
									{garage.city}
								</td>
								<td className="px-4 py-3 text-muted-foreground">
									{garage.regional}
								</td>
								<td className="px-4 py-3 text-right">
									<ButtonSheet>
										<SheetPlans mode="sheet" garageId={garage.id} />
									</ButtonSheet>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
