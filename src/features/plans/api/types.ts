import type { GaragePlan } from "@/core/mocks/garage-plans"

export type PortalVehicleType =
	| "carro"
	| "moto"
	| "suv"
	| "utilitario"
	| "eletrico"

export interface PortalPlanFormData {
	description: string
	isActive: boolean
	vehicleType: PortalVehicleType
	totalSpots: number
	monthlyValue: number
	cancelValue: number
	validityStartDate?: number
	validityEndDate?: number
}

export type PortalFormDateValue = Date | number | string | undefined

export interface PortalFormInitialData {
	description?: string
	isActive?: boolean
	vehicleType?: PortalVehicleType
	totalSpots?: number
	monthlyValue?: number
	cancelValue?: number
	validityStartDate?: PortalFormDateValue
	validityEndDate?: PortalFormDateValue
}

export interface SaveGaragePlanPayload {
	garageId: string
	description: string
	vehicleType: GaragePlan["vehicleType"]
	totalSpotsByVehicleType: number
	price: number
	cancellationFee: number
	validityStart?: string
	validityEnd?: string
}

export const toPortalVehicleType = (
	vehicleType: GaragePlan["vehicleType"],
): PortalVehicleType => {
	switch (vehicleType) {
		case "Carro":
			return "carro"
		case "Moto":
			return "moto"
		case "SUV":
			return "suv"
		case "Utilitário":
			return "utilitario"
		case "Elétrico":
			return "eletrico"
		default:
			return "carro"
	}
}

const toApiVehicleType = (
	vehicleType: PortalVehicleType,
): GaragePlan["vehicleType"] => {
	switch (vehicleType) {
		case "carro":
			return "Carro"
		case "moto":
			return "Moto"
		case "suv":
			return "SUV"
		case "utilitario":
			return "Utilitário"
		case "eletrico":
			return "Elétrico"
		default:
			return "Carro"
	}
}

const toIsoDate = (value?: number) => {
	if (!value) return undefined
	return new Date(value).toISOString().split("T")[0]
}

export const toSaveGaragePlanPayload = (
	garageId: string,
	formData: PortalPlanFormData,
): SaveGaragePlanPayload => {
	return {
		garageId,
		description: formData.description,
		vehicleType: toApiVehicleType(formData.vehicleType),
		totalSpotsByVehicleType: formData.totalSpots,
		price: formData.monthlyValue / 100,
		cancellationFee: formData.cancelValue / 100,
		validityStart: toIsoDate(formData.validityStartDate),
		validityEnd: toIsoDate(formData.validityEndDate),
	}
}
