import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { AppRoutes } from "./routes"

const root = document.getElementById("root") as HTMLElement

createRoot(root).render(
	<StrictMode>
		<AppRoutes />
	</StrictMode>,
)
