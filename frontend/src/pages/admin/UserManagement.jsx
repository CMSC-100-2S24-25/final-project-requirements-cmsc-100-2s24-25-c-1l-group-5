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
} from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import UserFormDialog from "./UserFormDialog";
import { AppSidebar } from "../../components/SideBar";
import { SidebarProvider } from "../../components/ui/sidebar";

export default function UserManagementPage() {
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState({
    column: null,
    direction: "asc",
  });

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/users");
      const responseData = await res.json();
      // Ensure we always get an array
      const users = Array.isArray(responseData.users)
        ? responseData.users
        : Array.isArray(responseData)
        ? responseData
        : [];
      setData(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      setData([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter and sort data based on search query
  useEffect(() => {
    // Ensure data is always an array
    const safeData = Array.isArray(data) ? data : [];
    let result = [];

    if (searchQuery.trim() === "") {
      result = safeData;
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      result = safeData.filter(
        (user) =>
          (user.fName || "").toLowerCase().includes(lowercasedQuery) ||
          (user.mName || "").toLowerCase().includes(lowercasedQuery) ||
          (user.lName || "").toLowerCase().includes(lowercasedQuery) ||
          (user.email || "").toLowerCase().includes(lowercasedQuery)
      );
    }

    // Then sort the filtered data if sorting is active
    if (sorting.column) {
      result = [...result].sort((a, b) => {
        const aValue = a[sorting.column] || "";
        const bValue = b[sorting.column] || "";
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

  // Ensure filteredData is always an array before using array methods
  const safeFilteredData = Array.isArray(filteredData) ? filteredData : [];

  // Calculate pagination
  const totalPages = Math.ceil(safeFilteredData.length / itemsPerPage);
  const paginatedData = safeFilteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle opening edit dialog
  const handleEdit = (id) => {
    const safeData = Array.isArray(data) ? data : [];
    const userToEdit = safeData.find((user) => user._id === id);
    setEditingUser(userToEdit);
    setDialogOpen(true);
  };

  // Handle opening add dialog
  const handleAdd = () => {
    setEditingUser(null);
    setDialogOpen(true);
  };

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete user");
      setData((prev) =>
        Array.isArray(prev) ? prev.filter((user) => user._id !== id) : []
      );
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  // Handle form submission (both add and edit)
  const handleFormSubmit = async (userData) => {
    try {
      if (userData._id) {
        // Update user
        await fetch(`http://localhost:3000/api/users/${userData._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
      } else {
        // Create user
        await fetch("http://localhost:3000/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
      }

      // Refetch user list or update UI
      await fetchUsers();
      setDialogOpen(false);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <div className="w-48">
          <AppSidebar />
        </div>
        <div className="flex-1 p-12">
          <div className="mt-2 mb-8">
            <h2 className="text-3xl font-semibold">User Management</h2>
            <p className="mt-4 text-gray-500">
              Manage (add, edit, delete) all users here.
            </p>
          </div>
          <Card className="flex flex-col w-full h-[70vh]">
            <CardContent className="space-y-4">
              {/* Search Bar */}
              <div className="relative flex gap-4">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
                <Button onClick={handleAdd} className="flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  Add User
                </Button>
              </div>

              {/* Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => handleSort("fName")}
                          className="flex items-center gap-1 font-medium"
                        >
                          First Name
                          <ArrowUpDown className="h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>Middle Name</TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => handleSort("lName")}
                          className="flex items-center gap-1 font-medium"
                        >
                          Last Name
                          <ArrowUpDown className="h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => handleSort("email")}
                          className="flex items-center gap-1 font-medium"
                        >
                          Email
                          <ArrowUpDown className="h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="w-[80px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((user) => (
                        <TableRow key={user._id || user.email || user.id}>
                          <TableCell className="font-medium">
                            {user.fName || "N/A"}
                          </TableCell>
                          <TableCell>{user.mName || ""}</TableCell>
                          <TableCell>{user.lName || "N/A"}</TableCell>
                          <TableCell>{user.email || "N/A"}</TableCell>
                          <TableCell>
                            {user.uType
                              ? user.uType.charAt(0).toUpperCase() +
                                user.uType.slice(1)
                              : "Unknown"}
                          </TableCell>
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
                                  onClick={() => handleEdit(user._id)}
                                >
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDelete(user._id)}
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
                          No users found.
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
                to{" "}
                {Math.min(currentPage * itemsPerPage, safeFilteredData.length)}{" "}
                of {safeFilteredData.length} users
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
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className="h-8 w-8 p-0"
                    >
                      {page}
                    </Button>
                  )
                )}
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

            {/* User Form Dialog */}
            <UserFormDialog
              open={dialogOpen}
              onOpenChange={setDialogOpen}
              initialData={editingUser}
              onSubmit={handleFormSubmit}
            />
          </Card>
        </div>
      </div>
    </SidebarProvider>
  );
}
