import { Building2 } from "lucide-react"
import { Suspense } from "react"
import { useLoaderData, useNavigate, useParams } from "react-router"
import { PageHeader } from "@/components/page-header"
import { Sheet } from "@/components/ui/sheet"
import { GaragenContainer } from "@/features/garages/components/garagen-container"
import { GaragenContainerSkeleton } from "@/features/garages/components/garagen-container-skeleton"
import type { GaragensResponse } from "@/features/garages/types/garagen-api"
import { SheetPlans } from "@/features/plans/components/sheet/sheet-plans"

export const GaragePage = () => {
	const { data } = useLoaderData() as { data: Promise<GaragensResponse> }
	const navigate = useNavigate()
	const { garageId } = useParams()
	const isSheetOpen = Boolean(garageId)

	return (
		<Sheet
			open={isSheetOpen}
			onOpenChange={(open) => {
				if (!open) {
					navigate("/garagens")
				}
			}}
		>
			<div className="space-y-6">
				<PageHeader
					title="Garagens"
					description="Gerencie as garagens e acompanhe os dados principais em uma unica visao."
					icon={<Building2 size={42} className="text-primary" />}
				/>
				<Suspense fallback={<GaragenContainerSkeleton />}>
					<GaragenContainer garagens={data} />
				</Suspense>
			</div>

			{garageId ? <SheetPlans garageId={garageId} /> : null}
		</Sheet>
	)
}
