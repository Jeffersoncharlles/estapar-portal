import * as Separator from "@radix-ui/react-separator"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { redirect } from "react-router"
import { fetchGarageDetails } from "@/core/services/api"
import { formatCurrencyCoins } from "@/core/shared/format-current-coins"
import { useGaragePlansQuery } from "@/features/plans/api/use-garage-plans-query"
import { SheetPlansAddress } from "@/features/plans/components/sheet/sheet-plans-address"
import { SheetPlansHeader } from "@/features/plans/components/sheet/sheet-plans-header"
import { SheetPlansMainTab } from "@/features/plans/components/sheet/sheet-plans-main-tab"
import {
	type SheetPlansMenu,
	SheetPlansSidebar,
} from "@/features/plans/components/sheet/sheet-plans-sidebar"
import { SheetPlansStats } from "@/features/plans/components/sheet/sheet-plans-stats"
import { SheetPlansTable } from "@/features/plans/components/sheet/sheet-plans-table"

interface SheetPlansContentProps {
	garageId?: string
	isSheet: boolean
}

export const SheetPlansContent = ({
	garageId,
	isSheet,
}: SheetPlansContentProps) => {
	const [selectedMenu, setSelectedMenu] = useState<SheetPlansMenu>("planos")

	if (!garageId) {
		redirect("/garagens")
	}

	const {
		data: details,
		isLoading: isLoadingDetails,
		isError: isDetailsError,
	} = useQuery({
		queryKey: ["garages", "details", garageId],
		queryFn: () => fetchGarageDetails(garageId as string),
		enabled: !!garageId,
	})

	const {
		data: plans = [],
		isLoading: isLoadingPlans,
		isError: isPlansError,
	} = useGaragePlansQuery(garageId)

	const isLoading = isLoadingDetails || isLoadingPlans
	const hasError = isDetailsError || isPlansError

	const totalSpots = details?.totalSpots ?? 0
	const occupiedSpots = details?.occupiedSpots ?? 0
	const availableSpots = details?.availableSpots ?? 0

	const garageName = details?.name
		? `${details.name.toUpperCase()} (GMC PARK)`
		: "NAO DISPONIVEL"
	const garageCode = details?.id ?? "NAO DISPONIVEL"
	const address = details?.address ?? "Nao disponivel"
	const regional = details?.regional ?? "Nao disponivel"
	const filial = details?.filial ?? "Nao disponivel"

	return (
		<section className="flex h-full w-full flex-col rounded-md bg-card text-muted">
			{hasError ? (
				<p className="px-4 pt-3 text-sm text-destructive md:px-6">
					Nao foi possivel carregar os detalhes da garagem.
				</p>
			) : null}

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
					totalSpots={isLoading ? 0 : totalSpots}
					occupiedSpots={isLoading ? 0 : occupiedSpots}
					availableSpots={isLoading ? 0 : availableSpots}
				/>

				<div className="relative mt-auto shrink-0 bg-card pt-[1.5px] md:grid md:h-[40%] md:min-h-55 md:grid-cols-[140px_1fr] md:gap-3">
					<Separator.Root
						orientation="horizontal"
						className="pointer-events-none absolute left-0 top-0 h-[1.5px] w-full bg-sidebar-border"
						decorative
					/>
					<SheetPlansSidebar
						selectedMenu={selectedMenu}
						onSelectMenu={setSelectedMenu}
					/>
					<SheetPlansTable
						plans={plans}
						formatCurrency={formatCurrencyCoins}
						garageId={garageId as string}
					/>
				</div>
			</section>
		</section>
	)
}
