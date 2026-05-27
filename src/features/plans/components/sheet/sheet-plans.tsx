import * as Separator from "@radix-ui/react-separator"
import { useState } from "react"
import { redirect, useParams } from "react-router"
import { SheetContent } from "@/components/ui/sheet"
import { garageDetails } from "@/core/mocks/garage-details"
import type { GaragePlan } from "@/core/mocks/garage-plans"
import garagePlansMock from "@/core/mocks/garage-plans.json"
import { garages } from "@/core/mocks/garages"
import { SheetPlansAddress } from "@/features/plans/components/sheet/sheet-plans-address"
import { SheetPlansHeader } from "@/features/plans/components/sheet/sheet-plans-header"
import { SheetPlansMainTab } from "@/features/plans/components/sheet/sheet-plans-main-tab"
import {
	type SheetPlansMenu,
	SheetPlansSidebar,
} from "@/features/plans/components/sheet/sheet-plans-sidebar"
import { SheetPlansStats } from "@/features/plans/components/sheet/sheet-plans-stats"
import { SheetPlansTable } from "@/features/plans/components/sheet/sheet-plans-table"

interface SheetPlansProps {
	mode?: "page" | "sheet"
	garageId?: string
}

const formatCurrency = (value: number) => {
	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(value)
}

const SheetPlansBody = ({
	garageId,
	isSheet,
}: {
	garageId?: string
	isSheet: boolean
}) => {
	const [selectedMenu, setSelectedMenu] = useState<SheetPlansMenu>("planos")

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
			<SheetPlansHeader
				garageName={garageName}
				garageCode={garageCode}
				isSheet={isSheet}
			/>

			<section className="flex h-full min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 pb-4 md:gap-5 md:px-6 md:pb-6">
				<div className="space-y-4">
					<SheetPlansAddress
						address={address}
						filial={filial}
						regional={regional}
					/>
					<SheetPlansMainTab />
				</div>

				<SheetPlansStats
					totalSpots={totalSpots}
					occupiedSpots={occupiedSpots}
					availableSpots={availableSpots}
				/>

				<div className="relative mt-auto shrink-0 bg-card pt-[1.5px] md:grid md:h-[40%] md:min-h-[220px] md:grid-cols-[120px_1fr] md:gap-3">
					<Separator.Root
						orientation="horizontal"
						className="pointer-events-none absolute left-0 top-0 h-[1.5px] w-full bg-sidebar-border"
						decorative
					/>
					<SheetPlansSidebar
						selectedMenu={selectedMenu}
						onSelectMenu={setSelectedMenu}
					/>
					<SheetPlansTable plans={plans} formatCurrency={formatCurrency} />
				</div>
			</section>
		</section>
	)
}

export const SheetPlans = ({ mode = "page", garageId }: SheetPlansProps) => {
	const { planId } = useParams()
	const selectedGarageId = garageId ?? planId

	if (mode === "sheet") {
		return (
			<SheetContent
				side="right"
				showCloseButton={false}
				className="h-full w-full max-w-none border-l-0 bg-card p-0 data-[side=right]:w-full data-[side=right]:sm:w-[92vw] data-[side=right]:lg:w-[85vw] data-[side=right]:sm:max-w-none"
			>
				<SheetPlansBody garageId={selectedGarageId} isSheet />
			</SheetContent>
		)
	}

	return (
		<section className="flex min-h-[calc(100vh-8rem)] flex-col rounded-md bg-card p-3">
			<SheetPlansBody garageId={selectedGarageId} isSheet={false} />
		</section>
	)
}
