import { Eye } from "lucide-react"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"

interface ButtonSheetProps {
	children: React.ReactNode
}

export const ButtonSheet = ({ children }: ButtonSheetProps) => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<button className="cursor-pointer" type="button">
					<Eye />
				</button>
			</SheetTrigger>

			{children}
		</Sheet>
	)
}
