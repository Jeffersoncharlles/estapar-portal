import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PortalForm } from "@/features/plans/components/modal/portal-form"

interface PortalModalProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	planId?: string | number
}

export const PortalModal = ({
	open,
	onOpenChange,
	planId,
}: PortalModalProps) => {
	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 z-50 bg-sheet-overlay backdrop-blur-[6px]" />
				<Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[min(92vw,760px)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto overflow-x-hidden rounded-lg border border-sheet-sidebar-border bg-card text-muted shadow-2xl outline-none">
					<div className="px-5 py-4 md:px-6">
						<div className="flex items-start justify-between gap-4">
							<div>
								<Dialog.Title className="text-lg font-semibold text-foreground">
									{planId ? "Editar plano" : "Novo plano"}
								</Dialog.Title>
								<Dialog.Description className="mt-1 text-sm text-sheet-address-text">
									{planId
										? `Edite os campos do plano ${planId}.`
										: "Preencha os campos para criar um novo plano para a garagem."}
								</Dialog.Description>
							</div>

							<Dialog.Close asChild>
								<Button
									type="button"
									variant="icon"
									size="icon"
									className="border-sheet-sidebar-border text-sheet-close-icon hover:bg-sheet-close-hover-bg"
									aria-label="Fechar"
								>
									<X size={16} />
								</Button>
							</Dialog.Close>
						</div>
					</div>

					<PortalForm />

					<div className="mb-6 flex flex-col-reverse gap-2 bg-card px-5 py-4 md:flex-row md:justify-end md:px-6">
						<Dialog.Close asChild>
							<Button
								type="button"
								variant="outline"
								className="text-sheet-table-action hover:text-sheet-table-action-hover"
							>
								Cancelar
							</Button>
						</Dialog.Close>
						<Button
							type="submit"
							form="portal-plan-form"
							variant="primary"
							className="font-semibold"
						>
							Criar
						</Button>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	)
}
