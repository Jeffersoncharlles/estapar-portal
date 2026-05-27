import type { ComponentProps } from "react"
import { cn } from "@/core/shared/utils"

interface TableRootProps extends ComponentProps<"table"> {}

const TableRoot = ({ className, ...props }: TableRootProps) => {
	return (
		<table
			className={cn("min-w-full text-left text-sm", className)}
			{...props}
		/>
	)
}

interface TableHeadProps extends ComponentProps<"thead"> {}

const TableHead = ({ className, ...props }: TableHeadProps) => {
	return <thead className={cn("text-muted-foreground", className)} {...props} />
}

interface TableRowProps extends ComponentProps<"tr"> {}

const TableRow = ({ className, ...props }: TableRowProps) => {
	return <tr className={cn("", className)} {...props} />
}

interface TableHeadCellProps extends ComponentProps<"th"> {}

const TableHeadCell = ({ className, ...props }: TableHeadCellProps) => {
	return <th className={cn("px-4 py-3 font-medium", className)} {...props} />
}

interface TableBodyProps extends ComponentProps<"tbody"> {}

const TableBody = ({ className, ...props }: TableBodyProps) => {
	return <tbody className={cn("", className)} {...props} />
}

interface TableBodyCellProps extends ComponentProps<"td"> {}

const TableBodyCell = ({ className, ...props }: TableBodyCellProps) => {
	return <td className={cn("", className)} {...props} />
}

export const Table = {
	Root: TableRoot,
	Head: TableHead,
	Row: TableRow,
	HeadCell: TableHeadCell,
	Body: TableBody,
	BodyCell: TableBodyCell,
}
