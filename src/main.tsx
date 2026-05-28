import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { AppRoutes } from "./routes"

const root = document.getElementById("root") as HTMLElement

async function enableMocking() {
	// Se não for desenvolvimento, sai fora imediatamente
	if (import.meta.env.MODE !== "development") {
		return
	}

	const { worker } = await import("./core/mocks/browser")

	// O 'return' aqui é crucial! Ele obriga o .then() lá de baixo
	// a esperar que o Service Worker esteja 100% ativo no browser
	return worker.start({
		onUnhandledRequest: "bypass",
	})
}

// O React Router e as rotas só inicializam quando o MSW der o sinal de pronto
enableMocking().then(() => {
	createRoot(root).render(
		<StrictMode>
			<AppRoutes />
		</StrictMode>,
	)
})
