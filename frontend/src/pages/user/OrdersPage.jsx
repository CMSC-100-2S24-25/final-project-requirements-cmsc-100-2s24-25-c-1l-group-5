import { SidebarProvider } from "../../components/ui/sidebar"
import { AppSidebar } from "../../components/user/UserSideBar"
import { Button } from "../../components/ui/button"
import { useOrders } from "../../components/user/OrdersList";
import toast from 'react-hot-toast';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function OrdersPage() {
  const { orderItems, cancelOrder } = useOrders();
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <div className="w-48">
          <AppSidebar />
        </div>

        <main className="flex-1 p-10 bg-gray-50">
          <h2 className="text-3xl font-semibold">Orders</h2>
          <p className="mt-4 text-gray-500">View your orders</p>

          <div className="border-b border-gray-300 my-6"></div>

          <div>
            {orderItems.length === 0 ? ( 
              <p>No Orders yet</p>
              ) : (
                <div className="grid grid-cols-1 gap-4 mt-6">
                  {orderItems.map((order) => (
                  <Card key={order.ordId} className="bg-white shadow-md rounded-lg">
                    <CardHeader>
                      <CardTitle>Order #{order.ordId}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {order.products.map((item) => (
                        <div key={item.id} className="flex justify-between">
                          <div>
                            <div>{item.name}</div>
                            <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                          </div>
                          <div>₱{item.itemPrice}</div>
                        </div>
                      ))}
                    </CardContent>
                    <CardFooter className="flex justify-between items-center px-4 pb-4">
                      <Button
                        onClick={() => cancelOrder(order.ordId)}
                        variant="secondary"
                        size="sm"
                      >Cancel
                      </Button>
                      <div className="text-xl font-semibold">
                        Total: ₱{order.totalPrice}
                      </div>
                    </CardFooter>

                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
