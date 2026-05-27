import { fakerPT_BR as faker } from "@faker-js/faker"

export type Regional = "SP1" | "Franquias" | "Ne" | "mG" | "SPL" | "GO" | "GO1"

export interface Garage {
	id: string
	name: string
	address: string
	city: string
	regional: Regional
}

const cityOptions = [
	"Goiânia/GO",
	"São Paulo/SP",
	"Campinas/SP",
	"Belo Horizonte/MG",
	"Uberlândia/MG",
	"Recife/PE",
	"Salvador/BA",
	"Fortaleza/CE",
	"Natal/RN",
	"João Pessoa/PB",
]

const garagePrefixes = [
	"Estacionamento",
	"Garagem",
	"Pátio",
	"Centro de Vagas",
	"Parque de Estacionamento",
]

const garageSuffixes = [
	"Central",
	"Executivo",
	"Prime",
	"Comercial",
	"Boulevard",
	"Business",
	"Alameda",
	"Plaza",
	"Corporate",
	"Norte",
	"Sul",
	"Leste",
	"Oeste",
]

const toGarageId = (baseNumber: number): string =>
	baseNumber.toString().padStart(6, "0")

const createGarageName = (): string => {
	const prefix = faker.helpers.arrayElement(garagePrefixes)
	const suffix = faker.helpers.arrayElement(garageSuffixes)
	return `${prefix} ${suffix}`
}

const createAddress = (): string => {
	const street = faker.location.street()
	const streetNumber = faker.location.buildingNumber()
	return `${street}, ${streetNumber}`
}

const getRegionalByState = (city: string): Regional => {
	const state = city.split("/")[1]

	if (state === "SP") {
		return city.startsWith("São Paulo") ? "SPL" : "SP1"
	}

	if (state === "MG") {
		return "mG"
	}

	if (["PE", "BA", "CE", "RN", "PB"].includes(state)) {
		return "Ne"
	}

	if (state === "GO") {
		return city.startsWith("Goiânia") ? "GO" : "GO1"
	}

	return "Franquias"
}

const cities = Array.from({ length: 120 }, () =>
	faker.helpers.arrayElement(cityOptions),
)

const cityCounters: Record<string, number> = {}

export const garages: Garage[] = Array.from({ length: 120 }, (_, index) => {
	const city = cities[index]
	const currentCount = (cityCounters[city] ?? 0) + 1
	cityCounters[city] = currentCount

	return {
		id: toGarageId(610 + index),
		name: createGarageName(),
		address: createAddress(),
		city,
		regional: currentCount > 10 ? "Franquias" : getRegionalByState(city),
	}
})
