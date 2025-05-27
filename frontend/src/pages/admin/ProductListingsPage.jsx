import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MoreHorizontal,
  ArrowUpDown,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import ProductFormDialog from "./ProductFormDialog";
import toast from "react-hot-toast";
import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { SidebarProvider } from "../../components/ui/sidebar";
import { AppSidebar } from "../../components/SideBar";

export default function ProductListingsPage() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sorting, setSorting] = useState({ column: null, direction: "asc" });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const itemsPerPage = 5;

  // Fetch products on mount
  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((products) => {
        setData(products);
        setFilteredData(products);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        toast.error("Failed to load products");
      });
  }, []);

  // Filter and sort
  useEffect(() => {
    let result = data;

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.type.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (sorting.column) {
      result = [...result].sort((a, b) => {
        const aValue = a[sorting.column];
        const bValue = b[sorting.column];
        if (typeof aValue === "string" && typeof bValue === "string") {
          return sorting.direction === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else {
          return sorting.direction === "asc" ? aValue - bValue : bValue - aValue;
        }
      });
    }

    setFilteredData(result);
    setCurrentPage(1);
  }, [searchQuery, data, sorting]);

  const handleSort = (column) => {
    setSorting((prev) => ({
      column,
      direction:
        prev.column === column && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (id) => {
    const product = data.find((p) => p._id === id);
    setEditingProduct(product);
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
  if (!confirm("Are you sure you want to delete this product?")) return;

  try {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete product");
    setData((prev) => prev.filter((p) => p._id !== id));
    toast.success("Product deleted");
  } catch (err) {
    toast.error(err.message || "Failed to delete product");
  }
};


  const handleFormSubmit = async (productData) => {
  try {
    if (editingProduct) {
      const res = await fetch(
        `http://localhost:3000/api/products/${productData.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        }
      );
      if (!res.ok) throw new Error("Failed to update product");
      const updated = await res.json();
      setData((prev) =>
        prev.map((item) => (item._id === updated._id ? updated : item))
      );
      toast.success("Product updated");
    } else {
      const res = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      if (!res.ok) throw new Error("Failed to add product");
      const created = await res.json();
      setData((prev) => [...prev, created]);
      toast.success("Product added");
    }
    setDialogOpen(false);
    setEditingProduct(null);
  } catch (err) {
    toast.error(err.message || "Failed to save product");
  }
};

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
              <div className="w-48">
                <AppSidebar />
              </div>
              <div className="m-12">
      <div className="mt-2 mb-8">
        <h2 className="text-3xl font-semibold">Product Inventory</h2>
        <p className="mt-4 text-gray-500">
          Manage (add, edit, delete) all product listings here.
        </p>
      </div>
      <Card className="flex flex-col w-full h-[70vh]">
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="relative flex gap-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
            <Button onClick={handleAdd} className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </div>
          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("name")}
                      className="flex items-center gap-1 font-medium"
                    >
                      Product
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("type")}
                      className="flex items-center gap-1 font-medium"
                    >
                      Type
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("price")}
                      className="flex items-center gap-1 font-medium"
                    >
                      Price
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("qty")}
                      className="flex items-center gap-1 font-medium"
                    >
                      Quantity
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell>
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={product.imageURL || "/placeholder.svg"}
                            alt={product.name}
                          />
                          <AvatarFallback>
                            <ImageIcon className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell>{product.type}</TableCell>
                      <TableCell>₱{product.price.toFixed(2)}</TableCell>
                      <TableCell className="max-w-[300px] truncate">
                        {product.description}
                      </TableCell>
                      <TableCell>{product.qty}</TableCell>
                      <TableCell className="relative">
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="h-8 w-8 p-0">
        <span className="sr-only">Open menu</span>
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem onClick={() => handleEdit(product._id)}>Edit</DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => handleDelete(product._id)}
        className="text-destructive focus:text-destructive"
      >
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</TableCell>

                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No products found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>

        {/* Pagination */}
        <CardFooter className="flex items-center justify-between mt-auto">
          <div className="text-sm text-muted-foreground">
            Showing{" "}
            {paginatedData.length > 0
              ? (currentPage - 1) * itemsPerPage + 1
              : 0}{" "}
            to {Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
            {filteredData.length} products
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className="h-8 w-8 p-0"
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>

        {/* Product Form Dialog */}
        <ProductFormDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          initialData={editingProduct}
          onSubmit={handleFormSubmit}
        />
      </Card>
    </div>
      </div>
      </SidebarProvider>
  );
}
