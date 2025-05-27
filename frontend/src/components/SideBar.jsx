import { List, ShoppingBasket, Package, Users, BarChart2 } from "lucide-react"
import { Link } from "react-router-dom" // Use Link for navigation

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"


const adminMenu = [
  {
    title: "Sales Dashboard",
    url: "/sales",
    icon: BarChart2,
  },
  {
    title: "Order Fulfillment",
    url: "/order-fulfillment",
    icon: Package,
  },
  {
    title: "Product Listings",
    url: "/product-listing",
    icon: List,
  },
  {
    title: "User Management",
    url: "/user-management",
    icon: Users,
  },
];


const userMenu = [
  {
    title: "Product Listing",
    url: "/homepage",
    icon: List,
  },
  {
    title: "Shopping Cart",
    url: "/cart",
    icon: ShoppingBasket,
  },
  {
    title: "Orders",
    url: "/orders",
    icon: Package,
  },
]



export function AppSidebar({userType}) {
  const menuItems = userType === "admin" ? adminMenu : userMenu;
    return (
    <Sidebar className="w-48">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Website Name</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon size={20} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    );
}
