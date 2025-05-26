import { List, Users, BarChart, Package, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const adminItems = [
  {
    title: "Product Listings",
    url: "/admin/products",
    icon: List,
  },
  {
    title: "Order Fulfillment",
    url: "/admin/orders",
    icon: Package,
  },
  {
    title: "Sales Report",
    url: "/admin/sales-report",
    icon: BarChart,
  },
  {
    title: "User Management",
    url: "/admin/users",
    icon: Users,
  },
];

export function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    navigate("/login");
  };

  return (
    <SidebarProvider>
      <Sidebar className="w-56 h-screen flex flex-col">
        <SidebarContent className="flex flex-col h-full">
          <SidebarGroup className="flex-1 flex flex-col">
            <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
            <SidebarGroupContent className="flex-1 flex flex-col">
              <SidebarMenu className="flex-1 flex flex-col">
                {adminItems.map((item) => (
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
