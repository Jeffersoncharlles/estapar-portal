import { createBrowserRouter, RouterProvider } from "react-router"
import { AuthLayout } from "@/layouts/auth"
import { DashboardLayout } from "@/layouts/dashboard"
import { HomePage } from "@/pages/home"
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
		],
	},
])

export const AppRoutes = () => {
	return <RouterProvider router={routes} />
}
