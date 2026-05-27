import { useMemo, useState } from "react"
import { Building2 } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { garages } from "@/core/mocks/garages"
import { GaragenHeader } from "@/features/garages/components/garagen-header"
import { GaragenTable } from "@/features/garages/components/garagen-table"

export const GaragePage = () => {
	const [search, setSearch] = useState("")
	const [showOnlyActive, setShowOnlyActive] = useState(false)

	const filteredGarages = useMemo(() => {
		const normalizedSearch = search.trim().toLowerCase()

		return garages.filter((garage, index) => {
			const matchesSearch =
				normalizedSearch.length === 0 ||
				garage.name.toLowerCase().includes(normalizedSearch) ||
				garage.city.toLowerCase().includes(normalizedSearch) ||
				garage.id.includes(normalizedSearch)

			if (!matchesSearch) {
				return false
			}

			if (!showOnlyActive) {
				return true
			}

			return index % 2 === 0
		})
	}, [search, showOnlyActive])

	return (
		<div className="space-y-6">
			<PageHeader
				title="Garagens"
				description="Gerencie as garagens e acompanhe os dados principais em uma unica visao."
				icon={<Building2 size={42} className="text-primary" />}
			/>
			<GaragenHeader
				searchValue={search}
				onSearchChange={setSearch}
				showOnlyActive={showOnlyActive}
				onShowOnlyActiveChange={setShowOnlyActive}
				total={filteredGarages.length}
			/>
			<GaragenTable items={filteredGarages} />
		</div>
	)
}
