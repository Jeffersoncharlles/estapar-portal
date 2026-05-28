import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { PortalForm } from "@/features/plans/components/modal/portal-form"

interface PortalModalProps {
	open: boolean
	onOpenChange: (open: boolean) => void
}

export const PortalModal = ({ open, onOpenChange }: PortalModalProps) => {
	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 z-50 bg-sheet-overlay backdrop-blur-[6px]" />
				<Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[min(92vw,760px)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto overflow-x-hidden rounded-lg border border-sheet-sidebar-border bg-card text-muted shadow-2xl outline-none">
					<div className="px-5 py-4 md:px-6">
						<div className="flex items-start justify-between gap-4">
							<div>
								<Dialog.Title className="text-lg font-semibold text-foreground">
									Novo plano
								</Dialog.Title>
								<Dialog.Description className="mt-1 text-sm text-sheet-address-text">
									Preencha os campos para criar um novo plano para a garagem.
								</Dialog.Description>
							</div>

							<Dialog.Close asChild>
								<button
									type="button"
									className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-sheet-sidebar-border text-sheet-close-icon transition-colors hover:bg-sheet-close-hover-bg hover:text-foreground"
									aria-label="Fechar"
								>
									<X size={16} />
								</button>
							</Dialog.Close>
						</div>
					</div>

					<PortalForm />

					<div className="flex flex-col-reverse gap-2 mb-6 bg-card px-5 py-4 md:flex-row md:justify-end md:px-6">
						<button
							type="button"
							className="inline-flex h-10 items-center justify-center rounded-md border border-muted-border bg-card px-4 text-sm font-medium text-sheet-table-action transition-colors hover:text-sheet-table-action-hover"
						>
							Cancelar
						</button>
						<button
							type="button"
							className="inline-flex h-10 items-center justify-center rounded-md border border-primary bg-primary px-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
						>
							Criar
						</button>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	)
}
