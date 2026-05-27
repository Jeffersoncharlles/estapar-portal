import * as Separator from "@radix-ui/react-separator"
import { NavLink } from "react-router"
import { SidebarNav } from "@/components/ui/sidebar-nav"
import { cn } from "@/core/shared/utils"
import { navigationItems } from "./navigation-items"

interface PrimarySidebarContentProps {
	collapsed: boolean
	onNavigate?: () => void
}

export const PrimarySidebarContent = ({
	collapsed,
	onNavigate,
}: PrimarySidebarContentProps) => {
	return (
		<>
			<div
				className={cn(
					"mb-8 flex items-center gap-3 px-2",
					collapsed && "justify-center px-0",
				)}
			>
				<NavLink to={"/"}>
					<img src="logo.svg" alt="Logo" className="sidebar-logo h-8 w-24" />
				</NavLink>
			</div>
			<Separator.Root
				className="-mx-4 mb-5 h-px bg-sidebar-border"
				decorative
			/>
			<SidebarNav
				items={navigationItems}
				collapsed={collapsed}
				onNavigate={onNavigate}
			/>
		</>
	)
}
