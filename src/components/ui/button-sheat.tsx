import { Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"

interface ButtonSheetProps {
	children: React.ReactNode
}

export const ButtonSheet = ({ children }: ButtonSheetProps) => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button type="button" variant="icon" size="icon">
					<Eye />
				</Button>
			</SheetTrigger>

			{children}
		</Sheet>
	)
}
