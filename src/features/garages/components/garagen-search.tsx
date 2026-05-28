import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface GaragenSearchProps {
	value: string
	onChange: (value: string) => void
}

export const GaragenSearch = ({ value, onChange }: GaragenSearchProps) => {
	return (
		<Input.Root className="w-full md:w-80">
			<Input.Icon>
				<Search size={16} className="text-muted-foreground" />
			</Input.Icon>
			<Input.Content
				type="search"
				value={value}
				onChange={(event) => onChange(event.target.value)}
				placeholder="Buscar garagem"
			/>
		</Input.Root>
	)
}
