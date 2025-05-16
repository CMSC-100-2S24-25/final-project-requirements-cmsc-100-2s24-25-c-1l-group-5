import { SidebarProvider } from "../../components/ui/sidebar"
import { AppSidebar } from "../../components/user/UserSideBar"
import { Button } from "../../components/ui/button"

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


const products = [
    {
        id: 1,
        name: "Product 1",
        desc: "Description",
        type: "Crop",
        price: "20",
        stock: 100,
        image: "https://via.placeholder.com/150",
    },
    {
        id: 2,
        name: "Product 2",
        desc: "Description",
        price: "35",
        stock: 31,
        image: "https://via.placeholder.com/150",
    },
    {
        id: 3,
        name: "Product 3",
        desc: "Description",
        price: "53",
        stock: 41,
        image: "https://via.placeholder.com/150",
    },
    {
        id: 4,
        name: "Product 4",
        desc: "Description",
        price: "20",
        stock: 31,
        image: "https://via.placeholder.com/150",
    },
]

export default function Home() {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <div className="w-64">
                    <AppSidebar />
                </div>

                <main className="flex-1 p-10 bg-gray-50">
                    <h2 className="text-3xl font-semibold">Welcome to the (Website Name)</h2>
                    <p className="mt-4 text-gray-500">Insert tagline</p>

                    <div className="border-b border-gray-300 my-6"></div>

                    <div className="grid grid-cols-4 gap-6 mt-6">
                        {products.map((product) => (
                            <Card key={product.id}>
                                <CardHeader>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-48 object-cover rounded-md"
                                    />
                                    <CardTitle className="text-lg">{product.name}</CardTitle>
                                    <CardDescription className="text-sm text-muted-foreground">
                                        {product.desc}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent>
                                    <p className="text-xl font-semibold text-gray-800">₱{product.price}</p>
                                </CardContent>

                                <CardFooter className="flex justify-between items-center">
                                    Stock: {product.stock ?? "N/A"}
                                    <Button>Add to Cart</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                </main>
            </div>
        </SidebarProvider>
    )
}
