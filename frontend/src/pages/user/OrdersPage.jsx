import { useOrders } from "../../components/user/OrdersList";
import { SidebarProvider } from "../../components/ui/sidebar";
import { AppSidebar } from "../../components/SideBar";
import { Button } from "../../components/ui/button";
import toast from 'react-hot-toast';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function OrdersPage() {
  const { orderItems, cancelOrder, loading } = useOrders();

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

          {loading ? (
            <p>Loading orders...</p>
          ) : orderItems.length === 0 ? (
            <p>No Orders yet</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 mt-6">
              {orderItems
  .filter(order => order.status !== 2) // Hide canceled
  .map(order => (
                <Card key={order.ordId} className="bg-white shadow-md rounded-lg">
                  <CardHeader>
                    <CardTitle>Order #{order.ordId}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {order.products && Array.isArray(order.products) ? (
  order.products.map((item, idx) => (
    <div key={idx} className="flex justify-between">
      <div>
        <div>{item.name}</div>
        <div className="text-xs text-gray-500">Qty: {item.qty}</div>
      </div>
      <div>₱{(item.price * item.qty).toFixed(2)}</div>
    </div>
  ))
) : (
  <p>No products found</p>
)}
                  </CardContent>
                  <CardFooter className="flex justify-between items-center px-4 pb-4">
                    <Button
                      onClick={() => cancelOrder(order.ordId)}
                      variant="secondary"
                      size="sm"
                    >
                      Cancel
                    </Button>
                    <div className="text-xl font-semibold">
                      Total: ₱{order.totalPrice}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </SidebarProvider>
  );
}
