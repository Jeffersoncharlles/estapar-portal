import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

interface ButtonRootProps extends ComponentProps<"button"> {}
const ButtonRoot = ({ className, ...props }: ButtonRootProps) => {
	return <button className={twMerge("", className)} {...props} />
}

export const Button = ButtonRoot
