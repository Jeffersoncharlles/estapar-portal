import { zodResolver } from "@hookform/resolvers/zod"
import { Lock, User2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { useActionData, useNavigation, useSubmit } from "react-router"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
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
			<Card.Root className="shadow-md hover:bg-white">
				<p className="mb-8 text-gray-600">
					Entre com suas credenciais para acessar o sistema
				</p>
				<div className="space-y-2">
					<div className="space-y-3">
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-900"
						>
							Usuário
						</label>
						<Input.Root
							data-error={!!errors.userName}
							className={
								errors.userName
									? "border-destructive focus-within:ring-destructive"
									: undefined
							}
						>
							<Input.Icon>
								<User2 className="w-4 h-4 text-gray-400" />
							</Input.Icon>
							<Input.Content
								placeholder="Digite seu usuário"
								aria-invalid={!!errors.userName}
								{...register("userName")}
							/>
						</Input.Root>
						<p
							className={
								errors.userName
									? "min-h-4 text-xs text-destructive"
									: "min-h-4 text-xs text-transparent"
							}
							aria-live="polite"
						>
							{errors.userName?.message ?? " "}
						</p>
					</div>
					<div className="space-y-3">
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-900"
						>
							Senha
						</label>
						<Input.Root
							data-error={!!errors.password}
							className={
								errors.password
									? "border-destructive focus-within:ring-destructive"
									: undefined
							}
						>
							<Input.Icon>
								<Lock className="w-4 h-4 text-gray-400" />
							</Input.Icon>
							<Input.Content
								type="password"
								placeholder="Digite sua senha"
								aria-invalid={!!errors.password}
								{...register("password")}
							/>
						</Input.Root>
						<p
							className={
								errors.password
									? "min-h-4 text-xs text-destructive"
									: "min-h-4 text-xs text-transparent"
							}
							aria-live="polite"
						>
							{errors.password?.message ?? " "}
						</p>
					</div>
					<Button disabled={navigation.state === "submitting"}>Entrar</Button>
				</div>
			</Card.Root>
		</form>
	)
}
