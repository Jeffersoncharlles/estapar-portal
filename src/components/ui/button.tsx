import type { ComponentProps } from "react"

import { cn } from "@/core/shared/utils"

interface ButtonRootProps extends ComponentProps<"button"> {}
const ButtonRoot = ({ className, ...props }: ButtonRootProps) => {
	return (
		<button
			className={cn(
				"group bg-lime-500 text-foreground  transition-colors",
				"flex h-11 w-full justify-center items-center overflow-hidden rounded-sm border border-input",
				"focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
				className,
			)}
			{...props}
		/>
	)
}

export const Button = ButtonRoot
