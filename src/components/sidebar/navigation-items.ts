import { Building2, Car } from "lucide-react"
import type { SidebarNavItem } from "@/components/ui/sidebar-nav"

export const navigationItems: SidebarNavItem[] = [
	{ label: "Garagens", icon: Building2, to: "/garagens" },
	{ label: "Mensalista", icon: Car, to: "#" },
]
