import { use, useState } from "react"
import { useDebounce } from "@/core/hooks/use-debounce"
import { useFilteredList } from "@/core/hooks/use-filter-list"
import type { GaragensResponse } from "../types/garagen-api"
import { GaragenHeader } from "./garagen-header"
import { GaragenTable } from "./garagen-table"

interface GarageListContainerProps {
	garagens: Promise<GaragensResponse>
}

export const GaragenContainer = ({ garagens }: GarageListContainerProps) => {
	const apiGarages = use(garagens)

	const [inputValue, setInputValue] = useState("")
	const [showOnlyActive, setShowOnlyActive] = useState(false)

	const debouncedSearch = useDebounce(inputValue, 350)

	const filteredGarages = useFilteredList({
		list: apiGarages,
		search: debouncedSearch,
		searchKeys: ["name", "city", "id"],
		extraFilter: (_, index) => {
			if (!showOnlyActive) return true
			return index % 2 === 0
		},
	})

	return (
		<>
			<GaragenHeader
				searchValue={inputValue}
				onSearchChange={setInputValue}
				showOnlyActive={showOnlyActive}
				onShowOnlyActiveChange={setShowOnlyActive}
				total={filteredGarages.length}
			/>
			<GaragenTable items={filteredGarages} />
		</>
	)
}
