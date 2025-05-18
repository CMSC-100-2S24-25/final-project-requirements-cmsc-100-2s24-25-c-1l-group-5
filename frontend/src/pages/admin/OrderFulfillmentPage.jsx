"use client";

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

// Sample order data
const initialOrders = [
  {
    id: "1",
    prodId: "1",
    qty: 3,
    status: 1, // pending
    email: "customer1@example.com",
    date: new Date("2025-05-17T10:30:00Z"),
    time: "10:30 AM",
  },
  {
    id: "2",
    prodId: "3",
    qty: 2,
    status: 2, // completed
    email: "customer2@example.com",
    date: new Date("2025-05-16T14:45:00Z"),
    time: "2:45 PM",
  },
  {
    id: "3",
    prodId: "5",
    qty: 5,
    status: 0, // pending
    email: "customer3@example.com",
    date: new Date("2025-05-15T09:00:00Z"),
    time: "9:00 AM",
  },
  {
    id: "4",
    prodId: "3",
    qty: 1,
    status: 1, // pending
    email: "customer4@example.com",
    date: new Date("2025-05-14T16:00:00Z"),
    time: "4:00 PM",
  },
  {
    id: "5",
    prodId: "2",
    qty: 10,
    status: 2, // completed
    email: "customer5@example.com",
    date: new Date("2025-05-13T12:15:00Z"),
    time: "12:15 PM",
  },
];

export default function OrderTable() {
  const [data, setData] = useState(initialOrders);
  const [sorting, setSorting] = useState({
    column: null,
    direction: "asc",
  });

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(initialOrders);

  // Type filter state
  const [activeFilterTab, setActiveFilterTab] = useState("all");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter and sort data
  useEffect(() => {
    let filteredData = [...data];

    // Apply status filter based on active tab
    if (activeFilterTab === "0") {
      filteredData = filteredData.filter((order) => order.status === 0);
    } else if (activeFilterTab === "1") {
      filteredData = filteredData.filter((order) => order.status === 1);
    } else if (activeFilterTab === "2") {
      filteredData = filteredData.filter((order) => order.status === 2);
    }

    // Apply search filter
    if (searchQuery.trim() !== "") {
      const lowercasedQuery = searchQuery.toLowerCase();
      filteredData = filteredData.filter(
        (order) =>
          order.prodId.toLowerCase().includes(lowercasedQuery) ||
          order.email.toLowerCase().includes(lowercasedQuery)
      );
    }

    // Apply sorting
    if (sorting.column) {
      filteredData.sort((a, b) => {
        const aValue = a[sorting.column];
        const bValue = b[sorting.column];

        if (sorting.column === "date") {
          return sorting.direction === "asc"
            ? a.date - b.date
            : b.date - a.date;
        } else if (typeof aValue === "string" && typeof bValue === "string") {
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

    setFilteredData(filteredData);
    // Reset to first page when search or sort changes
    setCurrentPage(1);
  }, [searchQuery, data, activeFilterTab, sorting.column, sorting.direction]);

  // Handle sorting
  const handleSort = (column) => {
    setSorting((prev) => ({
      column,
      direction:
        prev.column === column && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Handle filter tab change
  const handleFilterTabChange = (value) => {
    setActiveFilterTab(value);
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

  // Handle delete action
  const handleDelete = (id) => {
    setData(data.filter((order) => order.id !== id));
  };

  const handleStatusChange = (id, newType) => {
    setData((prevData) =>
      prevData.map((order) =>
        order.id === id ? { ...order, status: newType } : order
      )
    );
  };

  // Render status badge with appropriate color
  const renderStatusBadge = (status) => {
    if (status === 0) {
      return (
        <Badge
          variant="outline"
          className="bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center gap-1"
        >
          Pending
        </Badge>
      );
    } else if (status === 1) {
      return (
        <Badge
          variant="outline"
          className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1"
        >
          Completed
        </Badge>
      );
    } else if (status === 2) {
      return (
        <Badge
          variant="outline"
          className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1"
        >
          Cancelled
        </Badge>
      );
    }
    return status;
  };

  const pendingCount = data.filter((order) => order.status === 0).length;
  const completedCount = data.filter((order) => order.status === 1).length;
  const cancelledCount = data.filter((order) => order.status === 2).length;

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
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        {order.prodId}
                      </TableCell>
                      <TableCell>{order.qty}</TableCell>
                      <TableCell>{order.email}</TableCell>
                      <TableCell>{order.date.toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Select
                          defaultValue={order.status.toString() ?? "0"}
                          onValueChange={(value) =>
                            handleStatusChange(order.id, parseInt(value))
                          }
                        >
                          <SelectTrigger className="w-[130px]">
                            <SelectValue
                              placeholder={renderStatusBadge(order.status)}
                            >
                              {renderStatusBadge(order.status)}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">
                              {renderStatusBadge(0)}
                            </SelectItem>
                            <SelectItem value="1">
                              {renderStatusBadge(1)}
                            </SelectItem>
                            <SelectItem value="2">
                              {renderStatusBadge(2)}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 text-destructive focus:text-destructive"
                          onClick={() => handleDelete(order.id)}
                        >
                          <span className="sr-only">Delete</span>
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
