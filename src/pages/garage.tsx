import { Building2 } from "lucide-react"
import { Suspense } from "react"
import { useLoaderData } from "react-router"
import { PageHeader } from "@/components/page-header"
import { GaragenContainerSkeleton } from "@/features/garages/components/garagen-container-skeleton"
import { GaragenContainer } from "@/features/garages/components/garagen-container"
import type { GaragensResponse } from "@/features/garages/types/garagen-api"

export const GaragePage = () => {
	const { data } = useLoaderData() as { data: Promise<GaragensResponse> }

	return (
		<div className="space-y-6">
			<PageHeader
				title="Garagens"
				description="Gerencie as garagens e acompanhe os dados principais em uma unica visao."
				icon={<Building2 size={42} className="text-primary" />}
			/>
			<Suspense
				fallback={<GaragenContainerSkeleton />}
			>
				<GaragenContainer garagens={data} />
			</Suspense>
		</div>
	)
}
