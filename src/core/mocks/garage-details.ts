import { fakerPT_BR as faker } from "@faker-js/faker"

import { garages } from "./garages"

export interface GarageDetails {
	garageId: string
	address: string
	filial: string
	qrCode: string
	totalSpots: number
	occupiedSpots: number
	availableSpots: number
}

const branchNames = [
	"Filial Centro",
	"Filial Jardins",
	"Filial Aeroporto",
	"Filial Shopping",
	"Filial Empresarial",
	"Filial Rodoviária",
	"Filial Paulista",
	"Filial Savassi",
	"Filial Boa Viagem",
	"Filial Setor Oeste",
]

export const garageDetails: GarageDetails[] = garages.map((garage) => {
	const totalSpots = faker.number.int({ min: 80, max: 650 })
	const occupiedSpots = faker.number.int({
		min: Math.floor(totalSpots * 0.35),
		max: Math.floor(totalSpots * 0.97),
	})

	return {
		garageId: garage.id,
		address: garage.address,
		filial: faker.helpers.arrayElement(branchNames),
		qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=garage-${garage.id}`,
		totalSpots,
		occupiedSpots,
		availableSpots: totalSpots - occupiedSpots,
	}
})
