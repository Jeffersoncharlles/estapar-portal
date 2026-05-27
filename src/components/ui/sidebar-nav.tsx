import type { LucideIcon } from "lucide-react"
import { NavLink } from "react-router"

import { cn } from "@/core/shared/utils"

export interface SidebarNavItem {
	label: string
	to: string
	icon: LucideIcon
	end?: boolean
}

interface SidebarNavProps {
	items: SidebarNavItem[]
	collapsed?: boolean
	onNavigate?: () => void
}

export const SidebarNav = ({
	items,
	collapsed = false,
	onNavigate,
}: SidebarNavProps) => {
	return (
		<nav className="space-y-1">
			{items.map((item) => {
				const Icon = item.icon

				return (
					<NavLink
						key={item.label}
						to={item.to}
						end={item.end}
						onClick={onNavigate}
						title={collapsed ? item.label : undefined}
						className={cn(
							"group flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium text-muted-foreground opacity-60 transition-[color,opacity] hover:text-foreground hover:opacity-100",
							"[&[aria-current=page]]:text-foreground [&[aria-current=page]]:opacity-100",
							collapsed && "justify-center px-2",
						)}
					>
						<span
							className={cn(
								"flex w-full items-center gap-3",
								collapsed && "justify-center",
							)}
						>
							<Icon size={18} className="shrink-0" />
							<span className="sidebar-nav-label truncate">{item.label}</span>
						</span>
					</NavLink>
				)
			})}
		</nav>
	)
}
