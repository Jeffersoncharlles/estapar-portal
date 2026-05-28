import { Cog, LayoutGrid, Percent } from "lucide-react"
import { Button } from "@/components/ui/button"

export type SheetPlansMenu = "planos" | "placas" | "descontos" | "configuracoes"

interface SheetPlansSidebarProps {
	selectedMenu: SheetPlansMenu
	onSelectMenu: (menu: SheetPlansMenu) => void
}

export const SheetPlansSidebar = ({
	selectedMenu,
	onSelectMenu,
}: SheetPlansSidebarProps) => {
	return (
		<aside className="h-fit self-start border-b border-sheet-sidebar-border bg-sheet-sidebar-bg px-3 py-3 md:border-r md:border-b-0 md:pt-3 md:pb-10">
			<nav className="flex flex-wrap gap-2 text-sm text-sheet-sidebar-text md:block md:space-y-3">
				<Button
					type="button"
					variant="ghost"
					size="sm"
					data-selected={selectedMenu === "planos"}
					onClick={() => onSelectMenu("planos")}
					className="relative gap-1.5 rounded-sm border border-transparent px-2 py-1 text-left data-[selected=true]:z-10 data-[selected=true]:font-medium data-[selected=true]:text-sheet-sidebar-active-text md:-ml-3 md:flex md:h-auto md:w-[calc(100%+12px)] md:justify-start md:rounded-none md:border-0 md:border-l-[3px] md:border-l-transparent md:px-0 md:pl-[10px] md:py-0"
					style={{
						borderLeftColor:
							selectedMenu === "planos"
								? "var(--sheet-sidebar-selected)"
								: "transparent",
					}}
				>
					<LayoutGrid
						size={14}
						className="shrink-0 data-[selected=true]:text-sheet-sidebar-selected"
						data-selected={selectedMenu === "planos"}
					/>
					Planos
				</Button>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					data-selected={selectedMenu === "descontos"}
					onClick={() => onSelectMenu("descontos")}
					className="relative gap-1.5 rounded-sm border border-transparent px-2 py-1 text-left data-[selected=true]:z-10 data-[selected=true]:font-medium data-[selected=true]:text-sheet-sidebar-active-text md:-ml-3 md:flex md:h-auto md:w-[calc(100%+12px)] md:justify-start md:rounded-none md:border-0 md:border-l-[3px] md:border-l-transparent md:px-0 md:pl-[10px] md:py-0"
					style={{
						borderLeftColor:
							selectedMenu === "descontos"
								? "var(--sheet-sidebar-selected)"
								: "transparent",
					}}
				>
					<Percent
						size={14}
						className="shrink-0 data-[selected=true]:text-sheet-sidebar-selected"
						data-selected={selectedMenu === "descontos"}
					/>
					Descontos
				</Button>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					data-selected={selectedMenu === "configuracoes"}
					onClick={() => onSelectMenu("configuracoes")}
					className="relative gap-1.5 rounded-sm border border-transparent px-2 py-1 text-left data-[selected=true]:z-10 data-[selected=true]:font-medium data-[selected=true]:text-sheet-sidebar-active-text md:-ml-3 md:flex md:h-auto md:w-[calc(100%+12px)] md:justify-start md:rounded-none md:border-0 md:border-l-[3px] md:border-l-transparent md:px-0 md:pl-[10px] md:py-0"
					style={{
						borderLeftColor:
							selectedMenu === "configuracoes"
								? "var(--sheet-sidebar-selected)"
								: "transparent",
					}}
				>
					<Cog
						size={14}
						className="shrink-0 data-[selected=true]:text-sheet-sidebar-selected"
						data-selected={selectedMenu === "configuracoes"}
					/>
					Configuracoes
				</Button>
			</nav>
		</aside>
	)
}
