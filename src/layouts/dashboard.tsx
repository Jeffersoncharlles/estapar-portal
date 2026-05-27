import { useState } from "react"
import { Outlet } from "react-router"

import { DashboardHeader } from "@/components/dashboard-header"
import { Sidebar } from "@/components/sidebar/sidebar"

export const DashboardLayout = () => {
	const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

	return (
		<div className="flex min-h-screen bg-background">
			<Sidebar
				isMobileOpen={isMobileSidebarOpen}
				setIsMobileOpen={setIsMobileSidebarOpen}
			/>
			<div className="flex min-h-screen flex-1 flex-col bg-white">
				<DashboardHeader userName="Usuario" />
				<main className="flex-1 bg-white p-4 pt-20 md:p-6 md:pt-6">
					<Outlet />
				</main>
			</div>
		</div>
	)
}
