import { zodResolver } from "@hookform/resolvers/zod"
import { Lock, User2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { useActionData, useNavigation, useSubmit } from "react-router"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const signInFormSchema = z.object({
	userName: z.string().min(1, "O nome de usuário é obrigatório"),
	password: z.string().min(1, "A senha é obrigatória"),
})

type SignInFormData = z.infer<typeof signInFormSchema>

export const SignInForm = () => {
	const submit = useSubmit()
	const actionData = useActionData<{ error?: string } | undefined>()
	const navigation = useNavigation()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignInFormData>({
		resolver: zodResolver(signInFormSchema),
	})

	const onSubmit = (data: SignInFormData) => {
		submit(data, { method: "post" })
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<img src="/logo.svg" alt="Logo" className=" h-24 mx-auto mb-10" />
			<div className="bg-white p-6 rounded-lg shadow-md">
				<p className="mb-8 text-gray-600">
					Entre com suas credenciais para acessar o sistema
				</p>
				<div className="space-y-6">
					<div className="space-y-3">
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-900"
						>
							Usuário
						</label>
						<Input.Root>
							<Input.Icon>
								<User2 className="w-4 h-4 text-gray-400" />
							</Input.Icon>
							<Input.Content
								placeholder="Digite seu usuário"
								{...register("userName")}
							/>
							{errors.userName && (
								<p className="text-xs text-destructive">
									{errors.userName.message}
								</p>
							)}
						</Input.Root>
					</div>
					<div className="space-y-3">
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-900"
						>
							Senha
						</label>
						<Input.Root>
							<Input.Icon>
								<Lock className="w-4 h-4 text-gray-400" />
							</Input.Icon>
							<Input.Content
								type="password"
								placeholder="Digite sua senha"
								{...register("password")}
							/>
							{errors.password && (
								<p className="text-xs text-destructive">
									{errors.password.message}
								</p>
							)}
						</Input.Root>
					</div>
					<Button disabled={navigation.state === "submitting"}>Entrar</Button>
				</div>
			</div>
		</form>
	)
}
