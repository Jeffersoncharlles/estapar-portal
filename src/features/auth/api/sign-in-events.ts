import { data, redirect } from "react-router"
import { z } from "zod"
import { signIn } from "@/core/services/api"

const signInSchema = z.object({
	userName: z.string().min(1, "O nome de usuário é obrigatório"),
	password: z.string().min(1, "A senha é obrigatória"),
})

export async function SignInEventsAction({ request }: { request: Request }) {
	const formData = await request.formData()
	const userName = formData.get("userName")
	const password = formData.get("password")

	const parsedData = signInSchema.safeParse({ userName, password })

	if (!parsedData.success) {
		return data({ error: "Dados inválidos informados." }, { status: 400 })
	}

	try {
		const result = await signIn(
			parsedData.data.userName,
			parsedData.data.password,
		)

		if (!result.token) {
			return data({ error: "Credenciais inválidas." }, { status: 401 })
		}

		const { token } = result

		localStorage.setItem("@estapar:token", token)
		localStorage.setItem("@estapar:user", JSON.stringify(result.user))

		return redirect("/")
	} catch (error) {
		return data(
			{ error: "Falha na comunicação com o servidor." },
			{ status: 500 },
		)
	}
}
