import { z } from "zod"

const authSchema = z.object({
	user: z.object({
		id: z.string(),
		username: z.string().max(100),
		avatar: z.string(),
		role: z.string(),
	}),
	token: z.string(),
})

export type AuthResponse = z.infer<typeof authSchema>
