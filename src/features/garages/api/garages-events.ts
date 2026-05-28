import { fetchGarages } from "@/core/services/api"
import type { GaragensResponse } from "../types/garagen-api"

let garagesCache: GaragensResponse | null = null

export async function garagensLoader() {
	if (garagesCache) {
		fetchGarages().then((freshdData) => {
			garagesCache = freshdData
		})

		return {
			data: Promise.resolve(garagesCache),
		}
	}
	const pendingPromise = fetchGarages().then((data) => {
		garagesCache = data
		return data
	})

	return {
		data: pendingPromise,
	}
}
