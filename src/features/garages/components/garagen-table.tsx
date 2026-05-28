import { ButtonSheet } from "@/components/ui/button-sheat"
import { Table } from "@/components/ui/table"

import { SheetPlans } from "@/features/plans/components/sheet/sheet-plans"
import type { GaragensResponse } from "../types/garagen-api"

interface GaragenTableProps {
	items: GaragensResponse
}

export const GaragenTable = ({ items }: GaragenTableProps) => {
	return (
		<div className="overflow-hidden rounded-md border border-muted-border bg-white">
			<div className="overflow-x-auto">
				<Table.Root>
					<Table.Head>
						<Table.Row>
							<Table.HeadCell>ID</Table.HeadCell>
							<Table.HeadCell>Nome</Table.HeadCell>
							<Table.HeadCell>Endereco</Table.HeadCell>
							<Table.HeadCell>Cidade</Table.HeadCell>
							<Table.HeadCell>Regional</Table.HeadCell>
							<Table.HeadCell className="text-right">Acoes</Table.HeadCell>
						</Table.Row>
					</Table.Head>
					<Table.Body>
						{items.map((garage) => (
							<Table.Row
								key={garage.id}
								className="border-t border-muted-border"
							>
								<Table.BodyCell className="px-4 py-3 text-muted-foreground">
									{garage.id}
								</Table.BodyCell>
								<Table.BodyCell className="px-4 py-3 font-medium text-foreground">
									{garage.name}
								</Table.BodyCell>
								<Table.BodyCell className="px-4 py-3 text-muted-foreground">
									{garage.address}
								</Table.BodyCell>
								<Table.BodyCell className="px-4 py-3 text-muted-foreground">
									{garage.city}
								</Table.BodyCell>
								<Table.BodyCell className="px-4 py-3 text-muted-foreground">
									{garage.regional}
								</Table.BodyCell>
								<Table.BodyCell className="px-4 py-3 text-right">
									<ButtonSheet>
										<SheetPlans mode="sheet" garageId={garage.id} />
									</ButtonSheet>
								</Table.BodyCell>
							</Table.Row>
						))}
					</Table.Body>
				</Table.Root>
			</div>
		</div>
	)
}
