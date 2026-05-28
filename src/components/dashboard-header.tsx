import { LogOut } from "lucide-react"
import { useNavigate } from "react-router"
import { Button } from "@/components/ui/button"

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
