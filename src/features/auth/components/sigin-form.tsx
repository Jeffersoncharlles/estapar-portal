import { Lock, User2 } from "lucide-react"
import { Form } from "react-router"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const SignInForm = () => {
	return (
		<Form>
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
							<Input.Content placeholder="Digite seu usuário" />
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
							<Input.Content type="password" placeholder="Digite sua senha" />
						</Input.Root>
					</div>
					<Button>Entrar</Button>
				</div>
			</div>
		</Form>
	)
}
