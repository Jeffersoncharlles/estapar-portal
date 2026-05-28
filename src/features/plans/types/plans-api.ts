import { z } from "zod"

const garagensDetailsSchema = z.object({
	id: z.string(),
	name: z.string(),
	address: z.string(),
	city: z.string(),
	regional: z.string(),
	garageId: z.string(),
	filial: z.string(),
	qrCode: z.string(),
	totalSpots: z.number(),
	occupiedSpots: z.number(),
	availableSpots: z.number(),
})

export type GaragensDetailsResponse = z.infer<typeof garagensDetailsSchema>
