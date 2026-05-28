import { type LoaderFunctionArgs, redirect } from "react-router"
import { fetchGarages } from "@/core/services/api"
import type { GaragensResponse } from "../types/garagen-api"

let garagesCache: GaragensResponse | null = null

export interface GaragensLoaderResult {
	data: Promise<GaragensResponse>
}

export async function garagensLoader({
	params,
}: LoaderFunctionArgs): Promise<GaragensLoaderResult | Response> {
	const { garageId } = params

	if (garageId) {
		const garagesData = garagesCache || (await fetchGarages())

		const garageExists = garagesData.some((g) => g.id === garageId)

		if (!garageExists) {
			return redirect("/garagens")
		}
	}

	if (garagesCache) {
		fetchGarages().then((freshData) => {
			garagesCache = freshData
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
