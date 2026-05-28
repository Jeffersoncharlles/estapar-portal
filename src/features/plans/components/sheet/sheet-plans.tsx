import { redirect, useParams } from "react-router"
import {
	SheetContent,
	SheetDescription,
	SheetTitle,
} from "@/components/ui/sheet"
import { SheetPlansContent } from "@/features/plans/components/sheet/sheet-plans-content"

interface SheetPlansProps {
	garageId?: string
}

export const SheetPlans = ({ garageId }: SheetPlansProps) => {
	const { garageId: routeGarageId } = useParams()
	const selectedGarageId = garageId ?? routeGarageId

	if (!selectedGarageId) {
		redirect("/garagens")
	}

	return (
		<SheetContent
			side="right"
			showCloseButton={false}
			className="h-full w-full max-w-none border-l-0 bg-card p-0 data-[side=right]:w-full data-[side=right]:sm:w-[92vw] data-[side=right]:lg:w-[85vw] data-[side=right]:sm:max-w-none"
		>
			<SheetTitle className="sr-only">Detalhes da garagem</SheetTitle>
			<SheetDescription className="sr-only">
				Visualizacao de planos, vagas e informacoes da garagem selecionada.
			</SheetDescription>
			<SheetPlansContent garageId={selectedGarageId} isSheet />
		</SheetContent>
	)
}
