import { Check, FilePenLine } from "lucide-react"
import type { GaragePlan } from "@/core/mocks/garage-plans"

interface ModalPlansTableProps {
	plans: GaragePlan[]
	formatCurrency: (value: number) => string
}

export const ModalPlansTable = ({
	plans,
	formatCurrency,
}: ModalPlansTableProps) => {
	return (
		<div className="min-h-0 p-3 bg-card">
			<div className="mb-3 flex items-center justify-between">
				<h3 className="text-sm font-semibold text-muted">Planos Disponiveis</h3>
				<button
					type="button"
					className="rounded border border-sheet-cta-border bg-sheet-cta-bg px-3 py-1 text-xs font-medium text-sheet-cta-text"
				>
					+ Novo Plano
				</button>
			</div>

			<div className="max-h-[calc(100%-2.5rem)] overflow-auto rounded border border-sheet-table-border bg-card">
				<table className="w-full text-left text-xs text-sheet-table-text">
					<thead className="sticky top-0 bg-card text-sheet-table-head-text">
						<tr>
							<th className="px-3 py-2 font-medium">Descricao</th>
							<th className="px-3 py-2 font-medium">Valor</th>
							<th className="px-3 py-2 font-medium">Vagas</th>
							<th className="px-3 py-2 font-medium">Ocupadas</th>
							<th className="px-3 py-2 font-medium">Disponiveis</th>
							<th className="px-3 py-2 font-medium">Status</th>
							<th className="px-3 py-2 font-medium">Acoes</th>
						</tr>
					</thead>
					<tbody>
						{plans.length > 0 ? (
							plans.map((plan) => {
								const totalByType = plan.totalSpotsByVehicleType ?? 0
								return (
									<tr
										key={`${plan.garageId}`}
										className="border-t border-sheet-table-row-border transition-colors hover:bg-background-secondary"
									>
										<td className="px-3 py-2">
											{plan.description || "Nao disponivel"}
										</td>
										<td className="px-3 py-2">
											{plan.price
												? formatCurrency(plan.price)
												: "Nao disponivel"}
										</td>
										<td className="px-3 py-2">{totalByType}</td>
										<td className="px-3 py-2">0</td>
										<td className="px-3 py-2">{totalByType}</td>
										<td className="px-3 py-2">
											<span className="inline-flex rounded-full bg-sheet-table-status-bg px-2 py-0.5 text-[10px]">
												Nao disponivel
											</span>
										</td>
										<td className="px-3 py-2">
											<button
												type="button"
												className="text-sheet-table-action hover:text-sheet-table-action-hover"
											>
												<Check size={14} />
											</button>
										</td>
									</tr>
								)
							})
						) : (
							<tr className="border-t border-sheet-table-row-border transition-colors hover:bg-background-secondary">
								<td className="px-3 py-2">Nao disponivel</td>
								<td className="px-3 py-2">Nao disponivel</td>
								<td className="px-3 py-2">0</td>
								<td className="px-3 py-2">0</td>
								<td className="px-3 py-2">0</td>
								<td className="px-3 py-2">
									<span className="inline-flex rounded-full bg-sheet-table-status-bg px-2 py-0.5 text-[10px]">
										Nao disponivel
									</span>
								</td>
								<td className="px-3 py-2">
									<button
										type="button"
										className="text-sheet-table-action hover:text-sheet-table-action-hover cursor-pointer"
									>
										<FilePenLine size={14} />
									</button>
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	)
}
