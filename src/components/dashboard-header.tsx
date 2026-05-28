import { LogOut } from "lucide-react"
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
			<div className="flex items-center gap-3">
				<span className="text-sm font-medium text-foreground">
					{user?.name}
				</span>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					onClick={handleLogout}
					className="border-muted-border"
				>
					<LogOut size={16} />
					<span>Sair</span>
				</Button>
			</div>
		</header>
	)
}
