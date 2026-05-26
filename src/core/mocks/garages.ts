import { fakerPT_BR as faker } from "@faker-js/faker"

export type Regional = "SP1" | "Franquias" | "Ne" | "mG" | "SPL"

export interface Garage {
	id: string
	name: string
	address: string
	city: string
	regional: Regional
}

const regionals: Regional[] = ["SP1", "Franquias", "Ne", "mG", "SPL"]

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

export const garages: Garage[] = Array.from({ length: 120 }, (_, index) => ({
	id: toGarageId(610 + index),
	name: createGarageName(),
	address: createAddress(),
	city: faker.helpers.arrayElement(cityOptions),
	regional: faker.helpers.arrayElement(regionals),
}))
