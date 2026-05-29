import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const GaragenContainerSkeleton = () => {
	const tableRows = Array.from({ length: 12 })

	return (
		<div className="space-y-4">
			<Card.Root className="rounded-md p-4 md:p-5">
				<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
					<div className="inline-flex items-center gap-2">
						<Skeleton className="h-5 w-10 rounded-full" />
						<Skeleton className="h-4 w-36" />
					</div>
					<Skeleton className="h-4 w-28" />
					<Skeleton className="h-10 w-full md:w-72" />
				</div>
			</Card.Root>

			<div className="overflow-hidden rounded-md border border-muted-border bg-white">
				<div className="overflow-x-auto p-4 min-h-[70vh]">
					<div className="min-w-275 space-y-3">
						<div className="grid grid-cols-[120px_220px_1fr_180px_88px_56px] gap-4 px-4 py-2">
							<Skeleton className="h-4 w-12" />
							<Skeleton className="h-4 w-16" />
							<Skeleton className="h-4 w-20" />
							<Skeleton className="h-4 w-16" />
							<Skeleton className="h-4 w-12" />
							<Skeleton className="ml-auto h-4 w-8" />
						</div>

						{tableRows.map((_, index) => (
							<div
								key={`garage-row-skeleton-${index.toString() + 1}`}
								className="grid grid-cols-[120px_220px_1fr_180px_88px_56px] gap-4 border-t border-muted-border px-4 py-3"
							>
								<Skeleton className="h-5 w-24" />
								<Skeleton className="h-5 w-40" />
								<Skeleton className="h-5 w-full" />
								<Skeleton className="h-5 w-28" />
								<Skeleton className="h-5 w-10" />
								<Skeleton className="ml-auto h-8 w-8 rounded-md" />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
