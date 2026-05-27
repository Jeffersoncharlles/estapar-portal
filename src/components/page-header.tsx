import type { ReactNode } from "react"

interface PageHeaderProps {
	title: string
	description?: string
	actions?: ReactNode
	icon?: ReactNode
}

export const PageHeader = ({
	title,
	description,
	actions,
	icon,
}: PageHeaderProps) => {
	return (
		<header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
			<div className="space-y-2">
				<div className="flex items-center gap-3">
					{icon ? <div className="shrink-0">{icon}</div> : null}
					<h1 className="text-2xl font-semibold text-foreground">{title}</h1>
				</div>
				{description ? (
					<p className="max-w-3xl text-sm leading-6 text-muted-foreground md:text-base">
						{description}
					</p>
				) : null}
			</div>
			{actions ? <div className="shrink-0">{actions}</div> : null}
		</header>
	)
}
