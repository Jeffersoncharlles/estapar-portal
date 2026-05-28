import { use, useMemo, useState } from "react"
import { useDebounceFn } from "@/core/hooks/use-debounce"
import type { GaragensResponse } from "../types/garagen-api"
import { GaragenHeader } from "./garagen-header"
import { GaragenTable } from "./garagen-table"

interface GarageListContainerProps {
	garagens: Promise<GaragensResponse>
}

export const GaragenContainer = ({ garagens }: GarageListContainerProps) => {
	const apiGarages = use(garagens)

	console.log("=== DADOS CHEGARAM DO MSW NO CONTAINER ===", apiGarages)

	const [inputValue, setInputValue] = useState("")

	// 2. Estado real do filtro que a tabela vai escutar
	const [debouncedSearch, setDebouncedSearch] = useState("")
	const [showOnlyActive, setShowOnlyActive] = useState(false)

	const handleDebounceSearch = useDebounceFn((value: string) => {
		setInputValue(value)
		setDebouncedSearch(value)
	}, 350)

	const filteredGarages = useMemo(() => {
		const normalizedSearch = debouncedSearch.trim().toLowerCase()
		return apiGarages.filter((garage, index) => {
			const matchesSearch =
				normalizedSearch.length === 0 ||
				garage.name.toLowerCase().includes(normalizedSearch) ||
				garage.city.toLowerCase().includes(normalizedSearch) ||
				garage.id.includes(normalizedSearch)

			if (!matchesSearch) return false
			if (!showOnlyActive) return true
			return index % 2 === 0
		})
	}, [apiGarages, debouncedSearch, showOnlyActive])

	return (
		<>
			<GaragenHeader
				searchValue={inputValue}
				onSearchChange={handleDebounceSearch}
				showOnlyActive={showOnlyActive}
				onShowOnlyActiveChange={setShowOnlyActive}
				total={filteredGarages.length}
			/>
			<GaragenTable items={filteredGarages} />
		</>
	)
}
