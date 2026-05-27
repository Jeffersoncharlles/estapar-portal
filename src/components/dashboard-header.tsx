import { LogOut } from "lucide-react"
import { useNavigate } from "react-router"

interface DashboardHeaderProps {
	userName?: string
}

export const DashboardHeader = ({ userName = "Usuario" }: DashboardHeaderProps) => {
	const navigate = useNavigate()

	const handleLogout = () => {
		navigate("/sign-in")
	}

	return (
		<header className="flex h-16 items-center justify-end bg-white px-4 md:px-6">
			<div className="flex items-center gap-3">
				<span className="text-sm font-medium text-foreground">{userName}</span>
				<button
					type="button"
					onClick={handleLogout}
					className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
				>
					<LogOut size={16} />
					<span>Sair</span>
				</button>
			</div>
		</header>
	)
}
