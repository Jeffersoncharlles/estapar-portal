import * as Separator from "@radix-ui/react-separator"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/core/shared/utils"
import { PrimarySidebarContent } from "./primary-sidebar-content"

interface DesktopSidebarProps {
	isCollapsed: boolean
	onToggleCollapsed: () => void
}

export const DesktopSidebar = ({
	isCollapsed,
	onToggleCollapsed,
}: DesktopSidebarProps) => {
	return (
		<aside
			data-state={isCollapsed ? "collapsed" : "expanded"}
			className={cn(
				"relative hidden h-full bg-sidebar-background p-4 transition-[width,padding] duration-200 md:block",
				"data-[state=expanded]:w-64 data-[state=collapsed]:w-20",
				"[&[data-state=collapsed]_.sidebar-nav-label]:hidden",
				"[&[data-state=collapsed]_.sidebar-logo]:w-8",
			)}
		>
			<Separator.Root
				orientation="vertical"
				className="pointer-events-none absolute right-0 top-0 h-full w-[1.5px] bg-sidebar-border"
				decorative
			/>
			<div className="mb-4 flex justify-end data-[state=collapsed]:justify-center">
				<button
					type="button"
					onClick={onToggleCollapsed}
					className="absolute -right-3 top-24 z-10 -translate-y-1/2 rounded-full border border-sidebar-border bg-sidebar-background p-1 text-muted-foreground shadow-sm transition-colors hover:bg-gray-100 hover:text-foreground"
					aria-label={isCollapsed ? "Expandir sidebar" : "Minificar sidebar"}
				>
					{isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
				</button>
			</div>
			<PrimarySidebarContent collapsed={isCollapsed} />
		</aside>
	)
}
