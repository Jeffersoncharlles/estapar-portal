import { Search } from "lucide-react"

interface GaragenSearchProps {
	value: string
	onChange: (value: string) => void
}

export const GaragenSearch = ({ value, onChange }: GaragenSearchProps) => {
	return (
		<div className="relative w-full md:w-80">
			<Search
				size={16}
				className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
			/>
			<input
				type="search"
				value={value}
				onChange={(event) => onChange(event.target.value)}
				placeholder="Buscar garagem"
				className="h-10 w-full rounded-lg border border-muted-border bg-white pl-9 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
			/>
		</div>
	)
}
