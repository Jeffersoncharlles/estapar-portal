import { ArrowRight, Building2, Car } from "lucide-react"
import { Link } from "react-router"
import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/ui/card"

export const HomeDashboard = () => {
	return (
		<div className="space-y-6">
			<PageHeader
				title="Bem vindo ao portal Estapar B2B"
				description="Gerenciar seus servicos de estacionamentos, acesso relatorios, configure credenciados e contrate planos de mensalidade em um so lugar."
			/>

			<div className="grid gap-4 sm:grid-cols-2">
				<Link to="/garagens" className="group">
					<Card.Root>
						<div className="flex items-start justify-between gap-4">
							<div className="space-y-5">
								<Building2 size={42} className="text-primary" />
								<div className="space-y-1">
									<h2 className="text-base font-semibold text-foreground">
										Garagens
									</h2>
									<p className="text-sm text-muted-foreground">
										Veja a lista de garagens disponiveis e suas configuracoes.
									</p>
								</div>
							</div>
							<ArrowRight
								size={18}
								className="mt-1 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
							/>
						</div>
					</Card.Root>
				</Link>

				<Link to="/" className="group">
					<Card.Root>
						<div className="flex items-start justify-between gap-4">
							<div className="space-y-5">
								<Car size={42} className="text-primary" />
								<div className="space-y-1">
									<h2 className="text-base font-semibold text-foreground">
										Mensalistas
									</h2>
									<p className="text-sm text-muted-foreground">
										Acesse os planos de mensalidade e gerencie os credenciados.
									</p>
								</div>
							</div>
							<ArrowRight
								size={18}
								className="mt-1 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
							/>
						</div>
					</Card.Root>
				</Link>
			</div>
		</div>
	)
}
