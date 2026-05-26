import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

interface SkeletonProps extends ComponentProps<"div"> {}

export const Skeleton = ({ className, ...props }: SkeletonProps) => {
	return (
		<div
			className={twMerge(
				"bg-muted-foreground/20 animate-pulse rounded-lg",
				className,
			)}
			{...props}
		/>
	)
}
