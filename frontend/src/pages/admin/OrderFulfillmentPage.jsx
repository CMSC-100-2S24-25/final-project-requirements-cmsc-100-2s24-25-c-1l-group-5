import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowUpDown,
  Search,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  Trash,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { SidebarProvider } from "../../components/ui/sidebar";

export default function OrderFulfillmentPage() {
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState({ column: null, direction: "asc" });

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [activeFilterTab, setActiveFilterTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch orders from backend
  useEffect(() => {
    fetch("http://localhost:3000/api/orders/")
      .then(res => res.json())
      .then(json => {
        setData(json);
        setFilteredData(json);
      });
  }, []);

  // Filter, sort, and search
  useEffect(() => {
    let filtered = [...data];

    if (activeFilterTab === "0") filtered = filtered.filter(o => o.status === 0);
    else if (activeFilterTab === "1") filtered = filtered.filter(o => o.status === 1);
    else if (activeFilterTab === "2") filtered = filtered.filter(o => o.status === 2);

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        o =>
          o.prodId.toLowerCase().includes(q) ||
          o.email.toLowerCase().includes(q)
      );
    }

    if (sorting.column) {
      filtered.sort((a, b) => {
        const aVal = a[sorting.column];
        const bVal = b[sorting.column];

        if (sorting.column === "date") {
          return sorting.direction === "asc"
            ? new Date(aVal) - new Date(bVal)
            : new Date(bVal) - new Date(aVal);
        } else if (typeof aVal === "string") {
          return sorting.direction === "asc"
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        } else {
          return sorting.direction === "asc" ? aVal - bVal : bVal - aVal;
        }
      });
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchQuery, data, activeFilterTab, sorting]);

  const handleSort = (column) => {
    setSorting(prev => ({
      column,
      direction: prev.column === column && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleFilterTabChange = (value) => {
    setActiveFilterTab(value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/api/orders/${id}`, { method: "DELETE" });
    setData(prev => prev.filter(o => o._id !== id));
  };

  const handleStatusChange = async (id, newStatus) => {
    await fetch(`http://localhost:3000/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    setData(prev =>
      prev.map(o => (o._id === id ? { ...o, status: newStatus } : o))
    );
  };

  const renderStatusBadge = (status) => {
    if (status === 0) {
      return (
        <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>
      );
    } else if (status === 1) {
      return (
        <Badge className="bg-green-50 text-green-700 border-green-200">Completed</Badge>
      );
    } else if (status === 2) {
      return (
        <Badge className="bg-red-50 text-red-700 border-red-200">Cancelled</Badge>
      );
    }
    return status;
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const pendingCount = data.filter(o => o.status === 0).length;
  const completedCount = data.filter(o => o.status === 1).length;
  const cancelledCount = data.filter(o => o.status === 2).length;

  return (
    <div className="m-12">
      <div className="mt-2 mb-8">
        <h2 className="text-3xl font-semibold">Order Fulfillment</h2>
        <p className="mt-4 text-gray-500">
          Change order status of the customer
        </p>
      </div>
      <Card className="flex flex-col w-full h-[70vh]">
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="relative flex gap-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
            {/* Type Filter Tabs */}
            <Tabs
              value={activeFilterTab}
              onValueChange={handleFilterTabChange}
              className="w-auto"
            >
              <TabsList>
                <TabsTrigger value="all" className="text-xs px-3">
                  All ({data.length})
                </TabsTrigger>
                <TabsTrigger value="0" className="text-xs px-3">
                  <Clock className="h-3 w-3 mr-1 text-yellow-600" />
                  Pending ({pendingCount})
                </TabsTrigger>
                <TabsTrigger value="1" className="text-xs px-3">
                  <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                  Completed ({completedCount})
                </TabsTrigger>
                <TabsTrigger value="2" className="text-xs px-3">
                  <XCircle className="h-3 w-3 mr-1 text-red-600" />
                  Cancelled ({cancelledCount})
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("prodId")}
                      className="flex items-center gap-1 font-medium"
                    >
                      Product ID
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </TableHead>
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
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("date")}
                      className="flex items-center gap-1 font-medium"
                    >
                      Date
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length > 0 ? (
  paginatedData.map((order) => (
    <TableRow key={order._id}>
      <TableCell className="font-medium">
        {/* Join all product IDs */}
        {order.products.map(p => `${p.name} (${p.qtyOrdered})`).join(", ")}
      </TableCell>
      <TableCell>
        {order.products.reduce((sum, p) => sum + p.qtyOrdered, 0)}
      </TableCell>
      <TableCell>{order.email}</TableCell>
      <TableCell>
        {new Date(order.date).toLocaleDateString()}
      </TableCell>
      <TableCell>
        <Select
          defaultValue={order.status.toString()}
          onValueChange={(value) =>
            handleStatusChange(order._id, parseInt(value))
          }
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue>
              {renderStatusBadge(order.status)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">{renderStatusBadge(0)}</SelectItem>
            <SelectItem value="1">{renderStatusBadge(1)}</SelectItem>
            <SelectItem value="2">{renderStatusBadge(2)}</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 text-destructive focus:text-destructive"
          onClick={() => handleDelete(order._id)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  ))
) : (
  <TableRow>
    <TableCell colSpan={7} className="h-24 text-center">
      No orders found.
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
            {filteredData.length} orders
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
      </Card>
    </div>
  );
}
