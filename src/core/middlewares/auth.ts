import { redirect } from "react-router"

export interface AuthUser {
	name: string
	username: string
	role: string
	avatar?: string
}

function isAuthenticated(): boolean {
	if (typeof window === "undefined") return false
	return !!localStorage.getItem("@estapar:token")
}

export function getAuthenticatedUser(): AuthUser | null {
	if (typeof window === "undefined") return null

	const userJson = localStorage.getItem("@estapar:user")
	if (!userJson) return null

	try {
		return JSON.parse(userJson) as AuthUser
	} catch {
		return null
	}
}

export function handleMiddleLogout() {
	localStorage.removeItem("@estapar:token")
	localStorage.removeItem("@estapar:user")
}

export async function protectedRouteMiddleware() {
	if (!isAuthenticated()) {
		return redirect("/sign-in")
	}
	return null
}

export async function publicRouteMiddleware() {
	if (isAuthenticated()) {
		return redirect("/")
	}
	return null
}
