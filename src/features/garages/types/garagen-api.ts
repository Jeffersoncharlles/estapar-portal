import { z } from "zod"

const garagensSchema = z.array(
	z.object({
		id: z.string(),
		name: z.string().max(100),
		address: z.string().max(200),
		city: z.string().max(20),
		regional: z.string(),
	}),
)

export type GaragensResponse = z.infer<typeof garagensSchema>
