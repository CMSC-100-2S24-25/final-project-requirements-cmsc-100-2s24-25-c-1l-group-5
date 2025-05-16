import { SidebarProvider } from "../../components/ui/sidebar"
import { AppSidebar } from "../../components/user/UserSideBar"
import { Button } from "../../components/ui/button"

export default function ShoppingCart() {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <div className="w-64">
                    <AppSidebar />
                </div>

                <main className="flex-1 p-10 bg-gray-50">
                    <h2 className="text-3xl font-semibold">Shopping Cart</h2>
                    <p className="mt-4 text-gray-500">View your shopping cart</p>

                    <div className="border-b border-gray-300 my-6"></div>

                </main>
            </div>
        </SidebarProvider>
    )
}