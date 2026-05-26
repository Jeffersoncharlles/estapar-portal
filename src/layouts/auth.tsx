import { Outlet } from "react-router"

export const AuthLayout = () => {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-background">
			<Outlet />
		</div>
	)
}
