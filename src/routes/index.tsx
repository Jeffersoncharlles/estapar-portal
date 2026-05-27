import { createBrowserRouter, RouterProvider } from "react-router"

import { SheetPlans } from "@/features/plans/components/sheet/sheet-plans"
import { AuthLayout } from "@/layouts/auth"
import { DashboardLayout } from "@/layouts/dashboard"
import { GaragePage } from "@/pages/garage"
import { HomePage } from "@/pages/home"
import { PlanDetails } from "@/pages/plan-details"
import { SignInPage } from "@/pages/sign-in"

export const routes = createBrowserRouter([
	{
		element: <AuthLayout />,
		loader: async () => {},
		children: [
			{
				path: "/sign-in",
				element: <SignInPage />,
			},
		],
	},
	{
		element: <DashboardLayout />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "/garagens",
				element: <GaragePage />,
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

export const AppRoutes = () => {
	return <RouterProvider router={routes} />
}
