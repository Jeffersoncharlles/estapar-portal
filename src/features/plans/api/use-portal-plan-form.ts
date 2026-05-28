import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import type {
	PortalFormDateValue,
	PortalFormInitialData,
} from "@/features/plans/api/types"

export const VEHICLE_TYPES = [
	"carro",
	"moto",
	"suv",
	"utilitario",
	"eletrico",
] as const

const portalFormSchema = z.object({
	description: z.string().min(1, "A descrição é obrigatória"),
	isActive: z.boolean(),
	vehicleType: z.enum(["carro", "moto", "suv", "utilitario", "eletrico"]),
	totalSpots: z.number().int().nonnegative(),
	monthlyValue: z.number().int().nonnegative(),
	cancelValue: z.number().int().nonnegative(),
	validityStartDate: z
		.date()
		.optional()
		.transform((value) => (value ? value.getTime() : undefined)),
	validityEndDate: z
		.date()
		.optional()
		.transform((value) => (value ? value.getTime() : undefined)),
})

type PortalFormInput = z.input<typeof portalFormSchema>
type PortalFormOutput = z.output<typeof portalFormSchema>

const toDateValue = (value: PortalFormDateValue): Date | undefined => {
	if (!value || value === "") return undefined
	if (value instanceof Date) {
		return Number.isNaN(value.getTime()) ? undefined : value
	}
	const parsed = new Date(value)
	return Number.isNaN(parsed.getTime()) ? undefined : parsed
}

const buildDefaultValues = (
	initialData?: PortalFormInitialData,
): PortalFormInput => ({
	description: initialData?.description ?? "Mensal Executivo",
	isActive: initialData?.isActive ?? true,
	vehicleType: initialData?.vehicleType ?? "carro",
	totalSpots: initialData?.totalSpots ?? 0,
	monthlyValue: initialData?.monthlyValue ?? 0,
	cancelValue: initialData?.cancelValue ?? 0,
	validityStartDate: toDateValue(initialData?.validityStartDate) ?? new Date(),
	validityEndDate: toDateValue(initialData?.validityEndDate),
})

export const usePortalPlanForm = (initialData?: PortalFormInitialData) => {
	const form = useForm<PortalFormInput, unknown, PortalFormOutput>({
		resolver: zodResolver(portalFormSchema),
		defaultValues: buildDefaultValues(initialData),
	})

	useEffect(() => {
		form.reset(buildDefaultValues(initialData))
	}, [initialData, form])

	return {
		register: form.register,
		control: form.control,
		handleSubmit: form.handleSubmit,
	}
}
