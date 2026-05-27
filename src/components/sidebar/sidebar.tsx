import { useState } from "react"
import { DesktopSidebar } from "@/components/sidebar/desktop-sidebar"
import { MobileSidebarDrawer } from "@/components/sidebar/mobile-sidebar-drawer"

interface SidebarProps {
	isMobileOpen: boolean
	setIsMobileOpen: (value: boolean) => void
}

export const Sidebar = ({ isMobileOpen, setIsMobileOpen }: SidebarProps) => {
	const [isCollapsed, setIsCollapsed] = useState(false)

	return (
		<div
			data-state={isCollapsed ? "collapsed" : "expanded"}
			data-mobile={isMobileOpen ? "open" : "closed"}
			className="sidebar-shell relative min-h-screen self-stretch bg-sidebar-background"
		>
			<MobileSidebarDrawer
				isMobileOpen={isMobileOpen}
				setIsMobileOpen={setIsMobileOpen}
			/>
			<DesktopSidebar
				isCollapsed={isCollapsed}
				onToggleCollapsed={() => setIsCollapsed((prev) => !prev)}
			/>
		</div>
	)
}
