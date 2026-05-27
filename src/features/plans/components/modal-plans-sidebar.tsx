import { Cog, LayoutGrid, Percent } from "lucide-react"

export type ModalPlansMenu = "planos" | "placas" | "descontos" | "configuracoes"

interface ModalPlansSidebarProps {
	selectedMenu: ModalPlansMenu
	onSelectMenu: (menu: ModalPlansMenu) => void
}

export const ModalPlansSidebar = ({
	selectedMenu,
	onSelectMenu,
}: ModalPlansSidebarProps) => {
	return (
		<aside className="h-fit self-start border-r border-sheet-sidebar-border bg-sheet-sidebar-bg px-3 pt-3 pb-10">
			<nav className="space-y-3 text-xs text-sheet-sidebar-text">
				<button
					type="button"
					data-selected={selectedMenu === "planos"}
					onClick={() => onSelectMenu("planos")}
					className="relative -ml-3 flex w-[calc(100%+12px)] items-center gap-1.5 border-l-2 border-l-transparent pl-[10px] text-left data-[selected=true]:z-10 data-[selected=true]:font-medium data-[selected=true]:text-sheet-sidebar-active-text"
					style={{
						borderLeftColor:
							selectedMenu === "planos"
								? "var(--sheet-sidebar-selected)"
								: "transparent",
					}}
				>
					<LayoutGrid
						size={12}
						className="data-[selected=true]:text-sheet-sidebar-selected"
						data-selected={selectedMenu === "planos"}
					/>
					Planos
				</button>
				<button
					type="button"
					data-selected={selectedMenu === "descontos"}
					onClick={() => onSelectMenu("descontos")}
					className="relative -ml-3 flex w-[calc(100%+12px)] items-center gap-1.5 border-l-2 border-l-transparent pl-[10px] text-left data-[selected=true]:z-10 data-[selected=true]:font-medium data-[selected=true]:text-sheet-sidebar-active-text"
					style={{
						borderLeftColor:
							selectedMenu === "descontos"
								? "var(--sheet-sidebar-selected)"
								: "transparent",
					}}
				>
					<Percent
						size={12}
						className="data-[selected=true]:text-sheet-sidebar-selected"
						data-selected={selectedMenu === "descontos"}
					/>
					Descontos
				</button>
				<button
					type="button"
					data-selected={selectedMenu === "configuracoes"}
					onClick={() => onSelectMenu("configuracoes")}
					className="relative -ml-3 flex w-[calc(100%+12px)] items-center gap-1.5 border-l-2 border-l-transparent pl-[10px] text-left data-[selected=true]:z-10 data-[selected=true]:font-medium data-[selected=true]:text-sheet-sidebar-active-text"
					style={{
						borderLeftColor:
							selectedMenu === "configuracoes"
								? "var(--sheet-sidebar-selected)"
								: "transparent",
					}}
				>
					<Cog
						size={12}
						className="data-[selected=true]:text-sheet-sidebar-selected"
						data-selected={selectedMenu === "configuracoes"}
					/>
					Configuracoes
				</button>
			</nav>
		</aside>
	)
}
