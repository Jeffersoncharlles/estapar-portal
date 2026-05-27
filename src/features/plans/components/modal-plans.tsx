import { Button } from "@/components/ui/button"
import {
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet"

interface ModalPlansProps {
	mode?: "page" | "sheet"
}

const ModalPlansBody = ({ showClose }: { showClose: boolean }) => {
	return (
		<>
			<SheetHeader>
				<SheetTitle>Detalhes do plano</SheetTitle>
				<SheetDescription>
					Visualize e acompanhe todas as informacoes deste plano.
				</SheetDescription>
			</SheetHeader>

			<div className="no-scrollbar flex-1 overflow-y-auto px-4 pb-4">
				{Array.from({ length: 14 }).map((_, index) => (
					<p
						key={index.toString()}
						className="mb-3 leading-relaxed text-muted-foreground"
					>
						Conteudo do plano {index + 1}. Aqui entram os dados, eventos e
						regras relacionadas a esta garagem.
					</p>
				))}
			</div>

			<SheetFooter className="border-t border-muted-border bg-white">
				<Button type="button">Salvar alteracoes</Button>
				{showClose ? (
					<SheetClose asChild>
						<Button type="button">Fechar</Button>
					</SheetClose>
				) : null}
			</SheetFooter>
		</>
	)
}

export const ModalPlans = ({ mode = "page" }: ModalPlansProps) => {
	if (mode === "sheet") {
		return (
			<SheetContent
				side="right"
				showCloseButton
				className="h-full w-[85vw] max-w-none border-l border-muted-border bg-white data-[side=right]:w-[85vw] data-[side=right]:sm:max-w-none"
			>
				<ModalPlansBody showClose />
			</SheetContent>
		)
	}

	return (
		<section className="flex min-h-[calc(100vh-8rem)] flex-col rounded-md border border-muted-border bg-white">
			<ModalPlansBody showClose={false} />
		</section>
	)
}
