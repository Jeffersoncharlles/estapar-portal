import * as SwitchPrimitive from "@radix-ui/react-switch"
import type { ComponentProps } from "react"
import { cn } from "@/core/shared/utils"

interface SwitchProps extends ComponentProps<typeof SwitchPrimitive.Root> {}

export const Switch = ({ className, ...props }: SwitchProps) => {
	return (
		<SwitchPrimitive.Root
			className={cn(
				"peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-muted-border bg-gray-200 transition-colors",
				"data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-200",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
				"disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			{...props}
		>
			<SwitchPrimitive.Thumb
				className={cn(
					"block h-5 w-5 rounded-full bg-white shadow transition-transform",
					"data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
				)}
			/>
		</SwitchPrimitive.Root>
	)
}
