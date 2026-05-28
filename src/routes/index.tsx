import { createBrowserRouter, RouterProvider } from "react-router"
import {
	protectedRouteMiddleware,
	publicRouteMiddleware,
} from "@/core/middlewares/auth"
import { SignInEventsAction } from "@/features/auth/api/sign-in-events"
import { garagensLoader } from "@/features/garages/api/garages-events"
import { AuthLayout } from "@/layouts/auth"
import { DashboardLayout } from "@/layouts/dashboard"
import { GaragePage } from "@/pages/garage"
import { HomePage } from "@/pages/home"
import { SignInPage } from "@/pages/sign-in"

export const AppRoutes = () => {
	const routes = createBrowserRouter([
		{
			element: <AuthLayout />,

			loader: publicRouteMiddleware,
			children: [
				{
					path: "/sign-in",
					element: <SignInPage />,
					action: SignInEventsAction,
				},
			],
		},
		{
			element: <DashboardLayout />,
			loader: protectedRouteMiddleware,
			children: [
				{
					path: "/",
					element: <HomePage />,
				},
				{
					path: "/garagens",
					element: <GaragePage />,
					loader: garagensLoader,
				},
				{
					path: "/garagens/:garageId/planos",
					element: <GaragePage />,
					loader: garagensLoader,
				},
			],
		},
	])

	return <RouterProvider router={routes} />
}
