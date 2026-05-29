import type { ComponentProps } from "react"

import { cn } from "@/core/shared/utils"

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "icon"
type ButtonSize = "sm" | "md" | "icon"

interface ButtonRootProps extends ComponentProps<"button"> {
	variant?: ButtonVariant
	size?: ButtonSize
}

const variantClass: Record<ButtonVariant, string> = {
	primary: "border-primary bg-primary text-primary-foreground hover:opacity-90",
	secondary:
		"border-sheet-cta-border bg-sheet-cta-bg text-sheet-cta-text hover:opacity-90",
	outline:
		"border-muted-border bg-card text-sheet-table-action hover:text-sheet-table-action-hover",
	ghost:
		"border-transparent bg-transparent text-muted-foreground hover:text-foreground",
	icon: "border-transparent bg-transparent text-muted-foreground hover:text-foreground",
}

const sizeClass: Record<ButtonSize, string> = {
	sm: "h-8 px-3 text-xs",
	md: "h-10 px-4 text-sm",
	icon: "h-8 w-8 px-0",
}

const ButtonRoot = ({
	className,
	variant = "primary",
	size = "md",
	...props
}: ButtonRootProps) => {
	return (
		<button
			className={cn(
				"inline-flex items-center justify-center gap-2 rounded-md border font-medium transition-colors",
				"focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
				"disabled:cursor-not-allowed disabled:opacity-50",
				variantClass[variant],
				sizeClass[size],
				className,
			)}
			{...props}
		/>
	)
}

export const Button = ButtonRoot
