import { SidebarProvider } from "../../components/ui/sidebar";
import { AppSidebar } from "../../components/user/UserSideBar";
import { Button } from "../../components/ui/button";
import { useCart } from "../../components/user/Cart";


import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"; // Assuming you have a Card component for layout

export default function ShoppingCart() {
  const { cartItems, removeFromCart, clearCart, increaseQuantity, decreaseQuantity, totalPrice } = useCart();

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
                            –
                          </Button>
                          <span>{item.quantity}</span>
                          <Button variant="outline" size="icon" onClick={() => increaseQuantity(item)}>
                            +
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
                  <span className="text-xl font-semibold">Total: ₱{totalPrice.toFixed(2)}</span>
                  <Button onClick={clearCart} variant="outline">Clear Cart</Button>
                </div>

                <Button>Proceed to Checkout</Button>
              </div>
          )}
          
        </main>
      </div>
    </SidebarProvider>
  );
}
