import axios from "axios"
import type { AuthResponse } from "@/features/auth/types/auth-api"
import type { GaragensResponse } from "@/features/garages/types/garagen-api"

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
})

export async function fetchGarages() {
	try {
		const response = await api.get<GaragensResponse>("garagens")

		return response.data
	} catch (error) {
		console.error("Error fetching garages:", error)
		throw error
	}
}

export async function signIn(username: string, password: string) {
	try {
		const response = await api.post<AuthResponse>("auth/sign-in", {
			username,
			password,
		})

		return response.data
	} catch (error) {
		console.error("Error signing in:", error)
		throw error
	}
}
