import axios from "axios"
import type { GaragePlan } from "@/core/mocks/garage-plans"
import type { AuthResponse } from "@/features/auth/types/auth-api"
import type { GaragensResponse } from "@/features/garages/types/garagen-api"
import type { GaragensDetailsResponse } from "@/features/plans/types/plans-api"

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

export async function fetchGarageDetails(garageId: string) {
	try {
		const response = await api.get<GaragensDetailsResponse>(
			`/garagens/${garageId}`,
		)
		return response.data
	} catch (error) {
		console.error("Error fetching garage details:", error)
		throw error
	}
}

export async function fetchGaragePlans(garageId: string) {
	try {
		const response = await api.get<GaragePlan[]>(`/garagens/${garageId}/planos`)
		return response.data
	} catch (error) {
		console.error("Error fetching garage plans:", error)
		throw error
	}
}
