import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

interface CardRootProps extends ComponentProps<"div"> {}

const CardRoot = ({ className, ...props }: CardRootProps) => {
	return (
		<div
			className={twMerge(
				"rounded-lg border bg-card text-card-foreground shadow-sm",

				className,
			)}
			{...props}
		/>
	)
}

interface CardOverlayProps extends ComponentProps<"div"> {}
const CardOverlay = ({ className, ...props }: CardOverlayProps) => {
	return (
		<div
			className={twMerge(
				"absolute backdrop-blur-[6px] rounded-3xl bg-[rgba(68,71,90,0.3)] ",
				"inset-0 pointer-events-none group-hover:bg-[rgba(68,71,90,0.5)] transition-colors",
				className,
			)}
			{...props}
		/>
	)
}

interface CardHeaderProps extends ComponentProps<"header"> {}
const CardHeader = ({ className, ...props }: CardHeaderProps) => {
	return (
		<header
			className={twMerge(
				"w-full flex items-start justify-between z-10",
				className,
			)}
			{...props}
		/>
	)
}

interface CardTitleProps extends ComponentProps<"div"> {}
const CardTitle = ({ className, ...props }: CardTitleProps) => {
	return <div className={twMerge("w-full pt-2 z-10", className)} {...props} />
}

interface CardContentProps extends ComponentProps<"div"> {}
const CardContent = ({ className, ...props }: CardContentProps) => {
	return <div className={twMerge("w-full z-10", className)} {...props} />
}

interface CardFooterProps extends ComponentProps<"footer"> {}
const CardFooter = ({ className, ...props }: CardFooterProps) => {
	return (
		<footer
			className={twMerge(
				"opacity-70 w-full pt-[9.2px] flex flex-wrap gap-3 z-10 group-hover:opacity-100 transition-opacity",
				className,
			)}
			{...props}
		/>
	)
}

export const Card = {
	Root: CardRoot,
	Overlay: CardOverlay,
	Header: CardHeader,
	Title: CardTitle,
	Content: CardContent,
	Footer: CardFooter,
}
