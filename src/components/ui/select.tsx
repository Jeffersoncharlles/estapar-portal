import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown } from "lucide-react"
import type { ComponentProps } from "react"
import { cn } from "@/core/shared/utils"

interface SelectTriggerProps
	extends ComponentProps<typeof SelectPrimitive.Trigger> {}

const SelectTrigger = ({
	className,
	children,
	...props
}: SelectTriggerProps) => {
	return (
		<SelectPrimitive.Trigger
			className={cn(
				"inline-flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 text-sm",
				"text-foreground outline-none transition-colors focus:ring-2 focus:ring-ring",
				"disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			{...props}
		>
			{children}
			<SelectPrimitive.Icon className="text-muted-foreground">
				<ChevronDown size={16} />
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
	)
}

interface SelectContentProps
	extends ComponentProps<typeof SelectPrimitive.Content> {}

const SelectContent = ({
	className,
	children,
	...props
}: SelectContentProps) => {
	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Content
				position="popper"
				sideOffset={6}
				className={cn(
					"z-[60] overflow-hidden rounded-md border border-input bg-card shadow-lg",
					className,
				)}
				{...props}
			>
				<SelectPrimitive.Viewport className="p-1">
					{children}
				</SelectPrimitive.Viewport>
			</SelectPrimitive.Content>
		</SelectPrimitive.Portal>
	)
}

interface SelectItemProps extends ComponentProps<typeof SelectPrimitive.Item> {}

const SelectItem = ({ className, children, ...props }: SelectItemProps) => {
	return (
		<SelectPrimitive.Item
			className={cn(
				"relative flex h-9 cursor-pointer items-center rounded px-8 text-sm",
				"text-foreground outline-none data-[highlighted]:bg-background-secondary",
				className,
			)}
			{...props}
		>
			<SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center text-muted-foreground">
				<Check size={14} />
			</SelectPrimitive.ItemIndicator>
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
		</SelectPrimitive.Item>
	)
}

export const Select = {
	Root: SelectPrimitive.Root,
	Value: SelectPrimitive.Value,
	Trigger: SelectTrigger,
	Content: SelectContent,
	Item: SelectItem,
}
