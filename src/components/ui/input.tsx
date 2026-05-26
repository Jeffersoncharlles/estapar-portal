import type { ComponentProps } from "react"
import { cn } from "@/core/shared/utils"

export interface InputRootProps extends ComponentProps<"div"> {}

const InputRoot = ({ className, ...props }: InputRootProps) => {
	return (
		<div
			className={cn(
				"group bg-background text-foreground ring-offset-background transition-colors",
				"flex h-11 w-full items-center overflow-hidden rounded-sm border border-input",
				"focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
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
			className={cn(
				"h-full w-full border-0 px-3",
				"bg-transparent text-foreground placeholder:text-muted-foreground ",
				"outline-none ring-0 disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			{...props}
		/>
	)
}

export interface InputIconProps extends ComponentProps<"span"> {}
const InputIcon = ({ className, ...props }: InputIconProps) => {
	return (
		<span
			className={cn(
				"flex h-full items-center px-3 text-muted-foreground",
				className,
			)}
			{...props}
		/>
	)
}

export const Input = {
	Root: InputRoot,
	Icon: InputIcon,
	Content: InputContent,
}
