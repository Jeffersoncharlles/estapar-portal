import { LogOut, User } from "lucide-react"
import { useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import {
	getAuthenticatedUser,
	handleMiddleLogout,
} from "@/core/middlewares/auth"

export const DashboardHeader = () => {
	const navigate = useNavigate()
	const user = getAuthenticatedUser()

	const handleLogout = () => {
		handleMiddleLogout()
		navigate("/sign-in")
	}

	return (
		<header className="flex h-16 items-center justify-end bg-white px-4 md:px-6">
			<div className="flex items-center gap-4">
				<span className="text-sm font-medium text-foreground items-center flex">
					<User size={16} className="inline-block mr-1" />
					{user?.name}
				</span>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={handleLogout}
					className="border-0 cursor-pointer"
				>
					<LogOut size={16} />
					<span>Sair</span>
				</Button>
			</div>
		</header>
	)
}
