import * as Dialog from "@radix-ui/react-dialog"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PrimarySidebarContent } from "./primary-sidebar-content"

interface MobileSidebarDrawerProps {
	isMobileOpen: boolean
	setIsMobileOpen: (value: boolean) => void
}

export const MobileSidebarDrawer = ({
	isMobileOpen,
	setIsMobileOpen,
}: MobileSidebarDrawerProps) => {
	return (
		<>
			<Button
				type="button"
				variant="icon"
				size="icon"
				onClick={() => setIsMobileOpen(true)}
				className="fixed left-4 top-4 z-40 border-sidebar-border bg-sidebar-background md:hidden"
				aria-label="Abrir menu"
			>
				<Menu size={18} />
			</Button>

			<Dialog.Root open={isMobileOpen} onOpenChange={setIsMobileOpen}>
				<Dialog.Portal>
					<Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 md:hidden" />
					<Dialog.Content className="fixed left-0 top-0 z-50 h-full w-[86%] max-w-sm bg-sidebar-background p-4 shadow-lg md:hidden">
						<Dialog.Title className="sr-only">Menu lateral</Dialog.Title>
						<Dialog.Close asChild>
							<Button
								type="button"
								variant="icon"
								size="icon"
								className="absolute right-4 top-4 border-sidebar-border"
								aria-label="Fechar menu"
							>
								<X size={16} />
							</Button>
						</Dialog.Close>
						<div className="overflow-y-auto pb-6 pr-10">
							<PrimarySidebarContent
								collapsed={false}
								onNavigate={() => setIsMobileOpen(false)}
							/>
						</div>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
		</>
	)
}
