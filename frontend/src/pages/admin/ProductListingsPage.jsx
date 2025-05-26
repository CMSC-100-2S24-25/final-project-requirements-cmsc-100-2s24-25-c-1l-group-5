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
  ImageIcon,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProductFormDialog from "./ProductFormDialog";
import toast from "react-hot-toast";

// Sample product data
const initialProducts = [
  {
    id: "1",
    name: "Organic Tomatoes",
    type: "Crop",
    price: 3.99,
    description: "Fresh organic tomatoes grown without pesticides",
    quantity: 150,
    imageUrl:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Free-range Eggs",
    type: "Poultry",
    price: 5.99,
    description: "Farm fresh eggs from free-range chickens",
    quantity: 200,
    imageUrl:
      "https://images.unsplash.com/photo-1506976785307-8732e854ad03?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Sweet Corn",
    type: "Crop",
    price: 0.99,
    description: "Locally grown sweet corn, picked daily",
    quantity: 75,
    imageUrl:
      "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Chicken Breast",
    type: "Poultry",
    price: 8.99,
    description: "Hormone-free chicken breast from local farms",
    quantity: 50,
    imageUrl:
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: "5",
    name: "Organic Lettuce",
    type: "Crop",
    price: 2.49,
    description: "Crisp organic lettuce, perfect for salads",
    quantity: 100,
    imageUrl:
      "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: "6",
    name: "Duck Eggs",
    type: "Poultry",
    price: 7.99,
    description: "Premium duck eggs with rich flavor",
    quantity: 45,
    imageUrl: "https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: "7",
    name: "Organic Carrots",
    type: "Crop",
    price: 1.99,
    description: "Sweet and crunchy organic carrots",
    quantity: 120,
    imageUrl: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: "8",
    name: "Turkey Breast",
    type: "Poultry",
    price: 9.99,
    description: "Lean turkey breast from free-range turkeys",
    quantity: 30,
    imageUrl: "https://images.unsplash.com/photo-1606728035253-49e8a23146de?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: "9",
    name: "Bell Peppers",
    type: "Crop",
    price: 2.29,
    description: "Colorful bell peppers, perfect for salads and cooking",
    quantity: 85,
    imageUrl: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: "10",
    name: "Quail Eggs",
    type: "Poultry",
    price: 6.49,
    description: "Small, delicate quail eggs with spotted shells",
    quantity: 60,
    imageUrl: "https://images.unsplash.com/photo-1518492104633-130d0cc84637?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: "11",
    name: "Organic Potatoes",
    type: "Crop",
    price: 3.49,
    description: "Versatile organic potatoes for various dishes",
    quantity: 200,
    imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: "12",
    name: "Chicken Thighs",
    type: "Poultry",
    price: 6.99,
    description: "Juicy chicken thighs, perfect for grilling",
    quantity: 70,
    imageUrl: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?q=80&w=150&auto=format&fit=crop",
  },
];

export default function ProductListingsPage() {
  const [data, setData] = useState(initialProducts);
  const [sorting, setSorting] = useState({
    column: null,
    direction: "asc",
  });

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(initialProducts);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Filter and sort data based on search query
  useEffect(() => {
    let result = [];
    if (searchQuery.trim() === "") {
      result = data;
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      result = data.filter(
        (product) =>
          product.name.toLowerCase().includes(lowercasedQuery) ||
          product.type.toLowerCase().includes(lowercasedQuery) ||
          product.description.toLowerCase().includes(lowercasedQuery)
      );
    }

    // Then sort the filtered data if sorting is active
    if (sorting.column) {
      result = [...result].sort((a, b) => {
        const aValue = a[sorting.column];
        const bValue = b[sorting.column];
        if (typeof aValue === "string" && typeof bValue === "string") {
          return sorting.direction === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else {
          return sorting.direction === "asc"
            ? aValue - bValue
            : bValue - aValue;
        }
      });
    }

    // Update state with the filtered and sorted data
    setFilteredData(result);
    setCurrentPage(1);
  }, [searchQuery, data, sorting, sorting.column, sorting.direction]);

  // Handle sorting
  const handleSort = (column) => {
    setSorting((prev) => ({
      column,
      direction:
        prev.column === column && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle opening edit dialog
  const handleEdit = (id) => {
    const productToEdit = data.find((product) => product.id === id);
    setEditingProduct(productToEdit);
    setDialogOpen(true);
  };

  const handleDialogCase =() =>{
    setDialogOpen(false);
    setEditingProduct(null);
  }

  // Handle opening add dialog
  const handleAdd = () => {
    setEditingProduct(null);
    setDialogOpen(true);
  };

  // Handle delete action
  const handleDelete = (id) => {
    setData(data.filter((product) => product.id !== id));
  };

  // Handle form submission (both add and edit)
  const handleFormSubmit = (productData) => {
    if (editingProduct) {
      // Update existing product
      setData((prevData) =>
        prevData.map((item) =>
          item.id === productData.id ? productData : item
        )
      );
    } else {
      // Add new product
      setData((prevData) => [...prevData, productData]);
    }
  };

  return (
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
                      onClick={() => handleSort("quantity")}
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
                    <TableRow key={product.id}>
                      <TableCell>
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={product.imageUrl || "/placeholder.svg"}
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
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleEdit(product.id)}
                            >
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(product.id)}
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
          onOpenChange={handleDialogCase}
          initialData={editingProduct}
          onSubmit={handleFormSubmit}
        />
      </Card>
    </div>
  );
}
