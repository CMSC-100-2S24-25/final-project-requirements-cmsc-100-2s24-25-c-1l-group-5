import { SidebarProvider } from "../../components/ui/sidebar";
import { AppSidebar } from "../../components/user/UserSideBar";
import { Button } from "../../components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area"

import { Plus, Minus, Truck } from "lucide-react"

import { useCart } from "../../components/user/Cart";
import { useOrders } from "../../components/user/OrdersList";


import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function ShoppingCart() {
  const { cartItems, removeFromCart, clearCart, increaseQuantity, decreaseQuantity, totalPrice, totalQuantity } = useCart();
  const{ placeOrder } = useOrders();

  return (
    <SidebarProvider>
      <Drawer>
        <div className="flex min-h-screen w-full">
          <div className="w-48">
            <AppSidebar />
          </div>

          <main className="flex-1 p-10 bg-gray-50">
            <h2 className="text-3xl font-semibold">Shopping Cart</h2>
            <p className="mt-4 text-gray-500">View your shopping cart</p>

            <div className="border-b border-gray-300 my-6"></div>

            <div>
              {cartItems.length === 0 ? (
                <p>Your cart is empty!</p>
              ) : (
                <div className="grid grid-cols-1 gap-4 mt-6">
                  {cartItems.map((item) => (
                    <Card key={item.id} className="bg-white shadow-md rounded-lg ">
                      <CardContent className="flex justify-between items-center h-full px-4">
                        <div className="flex flex-col">
                          <CardTitle className="text-md font-medium">{item.name}</CardTitle>
                          <CardDescription className="text-sm text-muted-foreground">
                            Unit Price: ₱{item.price}
                          </CardDescription>
                        </div>

                        <div className="flex flex-col items-end text-right space-y-2">
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="icon" onClick={() => decreaseQuantity(item)}>
                              <Minus/>
                            </Button>
                            <span>{item.quantity}</span>
                            <Button variant="outline" size="icon" onClick={() => increaseQuantity(item)}>
                              <Plus/>
                            </Button>
                          </div>
                          <p className="text-lg font-semibold text-gray-800">
                            ₱{item.itemPrice}
                          </p>
                        </div>
                      </CardContent>


                      <CardFooter className="flex justify-between items-center">
                        <Button onClick={() => removeFromCart(item.id)} variant="secondary" size="sm">
                          Remove
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="flex justify-between items-center mt-6 w-full">
                <div className="flex flex-col gap-2">
                  <Button onClick={clearCart} variant="outline">Clear Cart</Button>
                </div>
                <div className="flex justify-end flex-col gap-2 text-right">
                  <div className="flex justify-end flex-col pr-4">
                    <span className="text-xl font-semibold">Total: ₱{totalPrice}</span>
                    <span className="text-sm">{totalQuantity} items</span>
                  </div>
                  <DrawerTrigger asChild>
                    <Button>Proceed to Checkout</Button>
                  </DrawerTrigger>
                </div>
              </div>
            )}
          </main>
        </div>

        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Checkout</DrawerTitle>
              <DrawerDescription>Order summary</DrawerDescription>
            </DrawerHeader>

            <ScrollArea className="h-[200px] w-[350px] p-1">
              {cartItems.map((item) => (
                <Card className="mb-1" key={item.id}>
                  <CardContent>
                    <li className="flex justify-between list-none">
                      <div>
                        <div>{item.name}</div>
                        <div className="text-xs text-gray-500">Qty.: {item.quantity}</div>
                      </div>
                      <a>₱{item.itemPrice}</a>
                    </li>
                  </CardContent>
                </Card>
            ))}</ScrollArea>
            

            <div className="p-2">
              <div className="text-center mb-3">
                <div className="text-2xl font-semibold">Total: ₱{totalPrice}</div>
                <span className="text-sm">{totalQuantity} items</span>
              </div>
            </div>

            <DrawerFooter>
              <div class="flex flex-row justify-between italic">
                Mode of Payment: Cash on Delivery
                <Truck/>
              </div>
              <Button onClick={() => {
                  placeOrder(cartItems, totalPrice);
                  clearCart();
                }}>
                Place Order
              </Button>

              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

    </SidebarProvider>
  );
}
