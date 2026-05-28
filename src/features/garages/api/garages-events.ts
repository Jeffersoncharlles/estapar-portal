import { fetchGarages } from "@/core/services/api"

export async function garagensLoader() {
	return {
		data: fetchGarages(),
	}
}
