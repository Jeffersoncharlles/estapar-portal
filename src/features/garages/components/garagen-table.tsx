import * as Dialog from "@radix-ui/react-dialog"
import { Eye, X } from "lucide-react"
import type { Garage } from "@/core/mocks/garages"

interface GaragenTableProps {
	items: Garage[]
}

export const GaragenTable = ({ items }: GaragenTableProps) => {
	return (
		<div className="overflow-hidden rounded-md border border-muted-border bg-white">
			<div className="overflow-x-auto">
				<table className="min-w-full text-left text-sm">
					<thead className="text-muted-foreground">
						<tr>
							<th className="px-4 py-3 font-medium">ID</th>
							<th className="px-4 py-3 font-medium">Nome</th>
							<th className="px-4 py-3 font-medium">Endereco</th>
							<th className="px-4 py-3 font-medium">Cidade</th>
							<th className="px-4 py-3 font-medium">Regional</th>
							<th className="px-4 py-3 text-right font-medium">Acoes</th>
						</tr>
					</thead>
					<tbody>
						{items.map((garage) => (
							<tr key={garage.id} className="border-t border-muted-border">
								<td className="px-4 py-3 text-muted-foreground">{garage.id}</td>
								<td className="px-4 py-3 font-medium text-foreground">{garage.name}</td>
								<td className="px-4 py-3 text-muted-foreground">{garage.address}</td>
								<td className="px-4 py-3 text-muted-foreground">{garage.city}</td>
								<td className="px-4 py-3 text-muted-foreground">{garage.regional}</td>
								<td className="px-4 py-3 text-right">
									<Dialog.Root>
										<Dialog.Trigger asChild>
											<button
												type="button"
											className="inline-flex items-center justify-center rounded-md border border-muted-border p-2 text-muted-foreground transition-colors hover:text-foreground"
												aria-label={`Ver detalhes da garagem ${garage.name}`}
											>
												<Eye size={16} />
											</button>
										</Dialog.Trigger>
										<Dialog.Portal>
											<Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
											<Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-5 shadow-lg">
												<Dialog.Title className="text-base font-semibold text-foreground">
													Detalhes da garagem
												</Dialog.Title>
												<div className="mt-4 space-y-2 text-sm text-muted-foreground">
													<p>
														<span className="font-medium text-foreground">ID:</span> {garage.id}
													</p>
													<p>
														<span className="font-medium text-foreground">Nome:</span> {garage.name}
													</p>
													<p>
														<span className="font-medium text-foreground">Endereco:</span> {garage.address}
													</p>
													<p>
														<span className="font-medium text-foreground">Cidade:</span> {garage.city}
													</p>
													<p>
														<span className="font-medium text-foreground">Regional:</span> {garage.regional}
													</p>
												</div>
												<Dialog.Close asChild>
													<button
														type="button"
													className="absolute right-4 top-4 rounded-md border border-muted-border p-1 text-muted-foreground hover:text-foreground"
														aria-label="Fechar"
													>
														<X size={14} />
													</button>
												</Dialog.Close>
											</Dialog.Content>
										</Dialog.Portal>
									</Dialog.Root>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
