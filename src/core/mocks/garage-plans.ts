import { fakerPT_BR as faker } from "@faker-js/faker"

import { garages } from "./garages"

export type VehicleType = "Carro" | "Moto" | "SUV" | "Utilitário" | "Elétrico"

export interface GaragePlan {
	garageId: string
	description: string
	vehicleType: VehicleType
	totalSpotsByVehicleType: number
	price: number
	cancellationFee: number
	validityStart: string
	validityEnd: string
}

const planDescriptions = [
	"Plano Mensal Integral",
	"Plano Mensal Noturno",
	"Plano Comercial Seg a Sex",
	"Plano Fim de Semana",
	"Plano Rotativo Premium",
	"Plano Mensal Empresarial",
	"Plano Conveniado Shopping",
	"Plano Mensal Compacto",
]

const vehicleTypes: VehicleType[] = ["Carro", "Moto", "SUV", "Utilitário", "Elétrico"]

const garagesWithoutPlans = new Set(garages.slice(0, 2).map((garage) => garage.id))
const garagesWithSinglePlan = new Set(garages.slice(2, 4).map((garage) => garage.id))

const createPlanDates = () => {
	const validityStart = faker.date.soon({ days: 45 })
	const validityEnd = faker.date.future({ years: 1, refDate: validityStart })

	return {
		validityStart: validityStart.toISOString().split("T")[0],
		validityEnd: validityEnd.toISOString().split("T")[0],
	}
}

export const garagePlans: GaragePlan[] = garages.flatMap((garage) => {
	const planCount = garagesWithoutPlans.has(garage.id)
		? 0
		: garagesWithSinglePlan.has(garage.id)
			? 1
			: faker.number.int({ min: 2, max: 5 })

	return Array.from({ length: planCount }, () => {
		const price = faker.number.int({ min: 180, max: 1200 })
		const cancellationFee = Number((price * faker.number.float({ min: 0.1, max: 0.4, fractionDigits: 2 })).toFixed(2))
		const dates = createPlanDates()

		return {
			garageId: garage.id,
			description: faker.helpers.arrayElement(planDescriptions),
			vehicleType: faker.helpers.arrayElement(vehicleTypes),
			totalSpotsByVehicleType: faker.number.int({ min: 15, max: 250 }),
			price,
			cancellationFee,
			validityStart: dates.validityStart,
			validityEnd: dates.validityEnd,
		}
	})
})
