import { Home, Globe, PlusCircle, Settings, ShoppingBag } from "lucide-react";

export const dashboardNavItems = [
  {
    href: "/dashboard",
    icon: Home,
    label: "Overview",
  },
  {
    href: "/dashboard/domains",
    icon: Globe,
    label: "Manage Domains",
  },
  {
    href: "/dashboard/domains/add",
    icon: PlusCircle,
    label: "Add Domain",
  },
  {
    href: "/marketplace",
    icon: ShoppingBag,
    label: "Marketplace",
  },
  {
    href: "/dashboard/settings",
    icon: Settings,
    label: "Settings",
  },
] as const;
