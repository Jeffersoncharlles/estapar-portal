import * as Separator from "@radix-ui/react-separator"
import { useState } from "react"
import { redirect, useParams } from "react-router"
import { SheetContent } from "@/components/ui/sheet"
import { garageDetails } from "@/core/mocks/garage-details"
import type { GaragePlan } from "@/core/mocks/garage-plans"
import garagePlansMock from "@/core/mocks/garage-plans.json"
import { garages } from "@/core/mocks/garages"
import { ModalPlansAddress } from "@/features/plans/components/modal-plans-address"
import { ModalPlansHeader } from "@/features/plans/components/modal-plans-header"
import { ModalPlansMainTab } from "@/features/plans/components/modal-plans-main-tab"
import {
	type ModalPlansMenu,
	ModalPlansSidebar,
} from "@/features/plans/components/modal-plans-sidebar"
import { ModalPlansStats } from "@/features/plans/components/modal-plans-stats"
import { ModalPlansTable } from "@/features/plans/components/modal-plans-table"

interface ModalPlansProps {
	mode?: "page" | "sheet"
	garageId?: string
}

const formatCurrency = (value: number) => {
	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(value)
}

const ModalPlansBody = ({
	garageId,
	isSheet,
}: {
	garageId?: string
	isSheet: boolean
}) => {
	const [selectedMenu, setSelectedMenu] = useState<ModalPlansMenu>("planos")

	if (!garageId) {
		redirect("/garagens")
	}

	const garage = garageId
		? garages.find((item) => item.id === garageId)
		: undefined
	const details = garageId
		? garageDetails.find((item) => item.garageId === garageId)
		: undefined

	const plans = (garagePlansMock as GaragePlan[]).filter(
		(plan) => plan.garageId === garageId,
	)

	const fallbackTotalSpots = plans.reduce(
		(acc, plan) => acc + (plan.totalSpotsByVehicleType ?? 0),
		0,
	)

	const totalSpots = details?.totalSpots ?? fallbackTotalSpots ?? 0
	const occupiedSpots = details?.occupiedSpots ?? 0
	const availableSpots =
		details?.availableSpots ?? Math.max(totalSpots - occupiedSpots, 0)

	const garageName = garage?.name
		? `${garage.name.toUpperCase()} (GMC PARK)`
		: "NAO DISPONIVEL"
	const garageCode = garage?.id ?? "NAO DISPONIVEL"
	const address = details?.address ?? garage?.address ?? "Nao disponivel"
	const regional = garage?.regional ?? "Nao disponivel"
	const filial = details?.filial ?? "Nao disponivel"

	return (
		<section className="flex h-full w-full flex-col rounded-md bg-card text-muted">
			<ModalPlansHeader
				garageName={garageName}
				garageCode={garageCode}
				isSheet={isSheet}
			/>

			<section className="flex h-full flex-1 flex-col px-6 pb-6">
				<div className="space-y-4">
					<ModalPlansAddress
						address={address}
						filial={filial}
						regional={regional}
					/>
					<ModalPlansMainTab />
				</div>

				<ModalPlansStats
					totalSpots={totalSpots}
					occupiedSpots={occupiedSpots}
					availableSpots={availableSpots}
				/>

				<div className="relative mt-auto grid h-[40%] min-h-[220px] shrink-0 grid-cols-[120px_1fr] gap-3 bg-card pt-[1.5px]">
					<Separator.Root
						orientation="horizontal"
						className="pointer-events-none absolute left-0 top-0 h-[1.5px] w-full bg-sidebar-border"
						decorative
					/>
					<ModalPlansSidebar
						selectedMenu={selectedMenu}
						onSelectMenu={setSelectedMenu}
					/>
					<ModalPlansTable plans={plans} formatCurrency={formatCurrency} />
				</div>
			</section>
		</section>
	)
}

export const ModalPlans = ({ mode = "page", garageId }: ModalPlansProps) => {
	const { planId } = useParams()
	const selectedGarageId = garageId ?? planId

	if (mode === "sheet") {
		return (
			<SheetContent
				side="right"
				showCloseButton={false}
				className="h-full w-[85vw] max-w-none border-l-0 bg-card p-0 data-[side=right]:w-[85vw] data-[side=right]:sm:max-w-none"
			>
				<ModalPlansBody garageId={selectedGarageId} isSheet />
			</SheetContent>
		)
	}

	return (
		<section className="flex min-h-[calc(100vh-8rem)] flex-col rounded-md bg-card p-3">
			<ModalPlansBody garageId={selectedGarageId} isSheet={false} />
		</section>
	)
}
