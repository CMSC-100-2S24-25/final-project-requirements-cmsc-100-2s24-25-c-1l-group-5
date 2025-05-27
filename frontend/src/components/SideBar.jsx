import { List, ShoppingBasket, Package, LogOut, Users,  BarChart2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext";

import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { Button } from "@/components/ui/button"

const adminMenu = [
  {
    title: "Order Fulfillment",
    url: "/admin/orders",
    icon: Package,
  },
  {
    title: "Product Listings",
    url: "/admin/products",
    icon: List,
  },
  {
    title: "User Management",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Sales Dashboard",
    url: "/admin/sales-report",
    icon: BarChart2,
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


export function AppSidebar() {
  const { token, userType } = useAuth();
  const isUserLoggedIn = !!token;

  const menuItems = isUserLoggedIn && userType === "customer" ? userMenu : adminMenu;

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <SidebarProvider>
      <Sidebar className="w-48 h-screen flex flex-col">
        <SidebarContent className="flex flex-col h-full">
          <SidebarGroup className="flex-1 flex flex-col">
            <SidebarGroupLabel>Website Name</SidebarGroupLabel>
            <SidebarGroupContent className="flex-1 flex flex-col">
              <SidebarMenu className="flex-1 flex flex-col">
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
                <div className="flex-1" />
                {/* Logout Button at the bottom */}
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 w-full justify-start text-red-600"
                      onClick={handleLogout}
                    >
                      <LogOut size={20} />
                      <span>Logout</span>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}
