import { SidebarProvider } from "../../components/ui/sidebar";
import { AppSidebar } from "../../components/SideBar";
import { Button } from "../../components/ui/button";
import { useCart } from "../../components/user/Cart";
import { useState, useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");

  const updateProductQty = (productId, newQty) => {
    setProducts((prev) =>
      prev.map((p) => (p._id === productId ? { ...p, qty: newQty } : p))
    );
  };

  const handleAddToCart = async (product) => {
    await addToCart(product, updateProductQty);
  };

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  const sortedProducts = [...products];


  if (sortOption === "name-asc") {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === "name-desc") {
    sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortOption === "price-asc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-desc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === "qty-asc") {
    sortedProducts.sort((a, b) => a.qty - b.qty);
  } else if (sortOption === "qty-desc") {
    sortedProducts.sort((a, b) => b.qty - a.qty);
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <div className="w-48">
          <AppSidebar />
        </div>

        <main className="flex-1 p-10 bg-gray-50">
          <h2 className="text-3xl font-semibold">Welcome to the DA Website</h2>
          <p className="mt-4 text-gray-500">Fresh produce at your fingertips.</p>

          <div className="border-b border-gray-300 my-6"></div>

          <div>
            <Select onValueChange={setSortOption}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name (A–Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z–A)</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="qty-asc">Quantity: Low to High</SelectItem>
                <SelectItem value="qty-desc">Quantity: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 gap-6 mt-6">
            {sortedProducts.map((product) => (
              <Card key={product._id}>
                <CardHeader>
                  <img
                    src={product.imageURL || "https://via.placeholder.com/150"}
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
                  Stock: {product.qty ?? "N/A"}
                  <Button
  className="w-full sm:w-auto"
  disabled={product.qty <= 0}
  onClick={() => handleAddToCart(product)}
>
  {product.qty > 0 ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
