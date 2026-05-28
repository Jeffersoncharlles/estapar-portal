import { createBrowserRouter, RouterProvider } from "react-router"
import {
	protectedRouteMiddleware,
	publicRouteMiddleware,
} from "@/core/middlewares/auth"
import { SignInEventsAction } from "@/features/auth/api/sign-in-events"
import { garagensLoader } from "@/features/garages/api/garages-events"
import { SheetPlans } from "@/features/plans/components/sheet/sheet-plans"
import { AuthLayout } from "@/layouts/auth"
import { DashboardLayout } from "@/layouts/dashboard"
import { GaragePage } from "@/pages/garage"
import { HomePage } from "@/pages/home"
import { PlanDetails } from "@/pages/plan-details"
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
					path: "/plans",
					element: <PlanDetails />,
					children: [
						{
							path: ":planId",
							element: <SheetPlans />,
						},
					],
				},
			],
		},
	])

	return <RouterProvider router={routes} />
}
