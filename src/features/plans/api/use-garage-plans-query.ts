import { useQuery } from "@tanstack/react-query"
import type { GaragePlan } from "@/core/mocks/garage-plans"
import { fetchGaragePlans } from "@/core/services/api"

export const garagePlansQueryKey = (garageId?: string) =>
	["garages", "plans", garageId] as const

export const useGaragePlansQuery = (garageId?: string) => {
	return useQuery<GaragePlan[]>({
		queryKey: garagePlansQueryKey(garageId),
		queryFn: () => fetchGaragePlans(garageId as string),
		enabled: !!garageId,
	})
}
