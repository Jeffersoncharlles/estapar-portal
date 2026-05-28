import { SquarePen } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table } from "@/components/ui/table"
import type { GaragePlan } from "@/core/mocks/garage-plans"
import { PortalModal } from "../modal/portal-plan"

interface SheetPlansTableProps {
	plans: GaragePlan[]
	formatCurrency: (value: number) => string
	garageId: string
}

export const SheetPlansTable = ({
	plans,
	formatCurrency,
	garageId,
}: SheetPlansTableProps) => {
	const [isNewPlanModalOpen, setIsNewPlanModalOpen] = useState(false)
	const [selectedPlan, setSelectedPlan] = useState<GaragePlan | undefined>()

	const handleOpenNewPlanModal = () => {
		setSelectedPlan(undefined)
		setIsNewPlanModalOpen(true)
	}

	const handleOpenEditPlanModal = (plan: GaragePlan) => {
		setSelectedPlan(plan)
		setIsNewPlanModalOpen(true)
	}

	return (
		<>
			<div className="min-h-0 bg-card p-2 md:p-3">
				<div className="mb-2 flex items-center justify-between md:mb-3">
					<h3 className="text-sm font-semibold text-muted">
						Planos Disponiveis
					</h3>
					<Button
						type="button"
						variant="secondary"
						size="sm"
						onClick={handleOpenNewPlanModal}
					>
						+ Novo Plano
					</Button>
				</div>

				<div className="max-h-[calc(100%-2.5rem)] overflow-auto rounded border border-sheet-table-border bg-card">
					<Table.Root className="text-xs text-sheet-table-text">
						<Table.Head className="sticky top-0 bg-card text-sheet-table-head-text">
							<Table.Row>
								<Table.HeadCell className="px-3 py-2">Descricao</Table.HeadCell>
								<Table.HeadCell className="px-3 py-2">Valor</Table.HeadCell>
								<Table.HeadCell className="px-3 py-2">Vagas</Table.HeadCell>
								<Table.HeadCell className="px-3 py-2">Ocupadas</Table.HeadCell>
								<Table.HeadCell className="px-3 py-2">Disponiveis</Table.HeadCell>
								<Table.HeadCell className="px-3 py-2">Status</Table.HeadCell>
								<Table.HeadCell className="px-3 py-2">Acoes</Table.HeadCell>
							</Table.Row>
						</Table.Head>
						<Table.Body>
							{plans.length > 0 ? (
								plans.map((plan) => {
									const totalByType = plan.totalSpotsByVehicleType ?? 0
									return (
										<Table.Row
											key={`${plan.garageId}-${plan.description}-${plan.vehicleType}-${plan.validityStart}-${plan.validityEnd}`}
											className="border-t border-sheet-table-row-border transition-colors hover:bg-background-secondary"
										>
											<Table.BodyCell className="px-3 py-2">
												{plan.description || "Nao disponivel"}
											</Table.BodyCell>
											<Table.BodyCell className="px-3 py-2">
												{plan.price
													? formatCurrency(plan.price)
													: "Nao disponivel"}
											</Table.BodyCell>
											<Table.BodyCell className="px-3 py-2">{totalByType}</Table.BodyCell>
											<Table.BodyCell className="px-3 py-2">0</Table.BodyCell>
											<Table.BodyCell className="px-3 py-2">{totalByType}</Table.BodyCell>
											<Table.BodyCell className="px-3 py-2">
												<span className="inline-flex rounded-full bg-sheet-table-status-bg px-2 py-0.5 text-[10px]">
													Nao disponivel
												</span>
											</Table.BodyCell>
											<Table.BodyCell className="px-3 py-2">
											<Button
												type="button"
												variant="icon"
												size="icon"
												onClick={() => handleOpenEditPlanModal(plan)}
												className="h-6 w-6 text-sheet-table-action hover:text-sheet-table-action-hover"
											>
												<SquarePen size={14} />
											</Button>
											</Table.BodyCell>
										</Table.Row>
									)
								})
							) : (
								<Table.Row className="border-t border-sheet-table-row-border transition-colors hover:bg-background-secondary">
									<Table.BodyCell className="px-3 py-2">Nao disponivel</Table.BodyCell>
									<Table.BodyCell className="px-3 py-2">Nao disponivel</Table.BodyCell>
									<Table.BodyCell className="px-3 py-2">0</Table.BodyCell>
									<Table.BodyCell className="px-3 py-2">0</Table.BodyCell>
									<Table.BodyCell className="px-3 py-2">0</Table.BodyCell>
									<Table.BodyCell className="px-3 py-2">
										<span className="inline-flex rounded-full bg-sheet-table-status-bg px-2 py-0.5 text-[10px]">
											Nao disponivel
										</span>
									</Table.BodyCell>
									<Table.BodyCell className="px-3 py-2">
									<Button
										type="button"
										variant="icon"
										size="icon"
										disabled
										className="h-6 w-6 text-sheet-table-action hover:text-sheet-table-action-hover"
									>
											<SquarePen size={14} />
									</Button>
									</Table.BodyCell>
								</Table.Row>
							)}
						</Table.Body>
					</Table.Root>
				</div>
			</div>

			<PortalModal
				open={isNewPlanModalOpen}
				onOpenChange={setIsNewPlanModalOpen}
				plan={selectedPlan}
				garageId={garageId}
			/>
		</>
	)
}
