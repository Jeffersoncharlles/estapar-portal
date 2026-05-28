import { useMemo } from "react"

interface UseFilteredListOptions<T> {
	list: T[]
	search: string
	searchKeys: Array<keyof T>
	extraFilter?: (item: T, index: number) => boolean
}

export function useFilteredList<T>({
	list,
	search,
	searchKeys,
	extraFilter,
}: UseFilteredListOptions<T>): T[] {
	return useMemo(() => {
		const normalizedSearch = (search || "").trim().toLowerCase()

		return list.filter((item, index) => {
			// 1. Verifica se bate com os critérios de busca por texto
			const matchesSearch =
				normalizedSearch.length === 0 ||
				searchKeys.some((key) => {
					const value = item[key]
					if (value === undefined || value === null) return false

					return String(value).toLowerCase().includes(normalizedSearch)
				})

			if (!matchesSearch) return false

			// 2. Se houver um filtro extra (como o botão de ativos), executa ele
			if (extraFilter) {
				return extraFilter(item, index)
			}

			return true
		})
	}, [list, search, searchKeys, extraFilter])
}
