import axios from "axios"
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
