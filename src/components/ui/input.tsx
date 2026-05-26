import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

export interface InputRootProps extends ComponentProps<"div"> {}

const InputRoot = ({ className, ...props }: InputRootProps) => {
	return (
		<div
			className={twMerge(
				"bg-background text-foreground placeholder:text-muted-foreground border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			{...props}
		/>
	)
}

export interface InputContentProps extends ComponentProps<"input"> {}
const InputContent = ({ className, ...props }: InputContentProps) => {
	return (
		<input
			className={twMerge(
				"bg-background text-foreground placeholder:text-muted-foreground border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			{...props}
		/>
	)
}

export const Input = {
	Root: InputRoot,
	Content: InputContent,
}
