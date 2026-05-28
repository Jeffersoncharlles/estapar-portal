import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { GaragePlan } from "@/core/mocks/garage-plans"
import { createGaragePlan, updateGaragePlan } from "@/core/services/api"
import {
	type PortalPlanFormData,
	toSaveGaragePlanPayload,
} from "@/features/plans/api/types"
import { garagePlansQueryKey } from "@/features/plans/api/use-garage-plans-query"

interface UseSaveGaragePlanMutationParams {
	garageId: string
	plan?: GaragePlan
	onSuccess?: () => void
}

export const useSaveGaragePlanMutation = ({
	garageId,
	plan,
	onSuccess,
}: UseSaveGaragePlanMutationParams) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (formData: PortalPlanFormData) => {
			const targetGarageId = plan?.garageId ?? garageId
			const payload = toSaveGaragePlanPayload(targetGarageId, formData)

			if (plan) {
				return updateGaragePlan({
					originalPlan: plan,
					nextPlan: payload,
				})
			}

			return createGaragePlan(payload)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: garagePlansQueryKey(garageId) })
			onSuccess?.()
		},
	})
}
