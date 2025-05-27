import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"; // adjust path as needed
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Package, ShoppingCart, TrendingUp } from "lucide-react";
import { BarChart } from "../../components/admin/BarChart";
import { SidebarProvider } from "../../components/ui/sidebar";
import { AppSidebar } from "../../components/SideBar";

// Mock data for
const timePeriodsData = {
  weekly: {
    totalProducts: { value: 12 },
    totalSales: { value: 1231.89 },
    totalTransactions: { value: 24 },
    totalCustomers: { value: 50 },
    salesData: [
      { name: "Mon", value: 400 },
      { name: "Tue", value: 300 },
      { name: "Wed", value: 500 },
      { name: "Thu", value: 280 },
      { name: "Fri", value: 590 },
      { name: "Sat", value: 320 },
      { name: "Sun", value: 280 },
    ],
    productSales: [
      {
        id: 1,
        product: "Organic Eggs",
        type: "Poultry",
        price: 4.99,
        quantitySold: 150,
        salesIncome: 748.5,
      },
      {
        id: 2,
        product: "Free-Range Chicken",
        type: "Poultry",
        price: 12.99,
        quantitySold: 85,
        salesIncome: 1104.15,
      },
      {
        id: 3,
        product: "Heirloom Tomatoes",
        type: "Crop",
        price: 3.49,
        quantitySold: 200,
        salesIncome: 698.0,
      },
      {
        id: 4,
        product: "Organic Kale",
        type: "Crop",
        price: 2.99,
        quantitySold: 120,
        salesIncome: 358.8,
      },
      {
        id: 5,
        product: "Duck Eggs",
        type: "Poultry",
        price: 6.99,
        quantitySold: 75,
        salesIncome: 524.25,
      },
    ],
  },
  monthly: {
    totalProducts: { value: 15 },
    totalSales: { value: 4231.89 },
    totalTransactions: { value: 32 },
    totalCustomers: { value: 256 },
    salesData: [
      { name: "Week 1", value: 1800 },
      { name: "Week 2", value: 1200 },
      { name: "Week 3", value: 2100 },
      { name: "Week 4", value: 1500 },
    ],
    productSales: [
      {
        id: 1,
        product: "Organic Eggs",
        type: "Poultry",
        price: 4.99,
        quantitySold: 600,
        salesIncome: 2994.0,
      },
      {
        id: 2,
        product: "Free-Range Chicken",
        type: "Poultry",
        price: 12.99,
        quantitySold: 340,
        salesIncome: 4416.6,
      },
      {
        id: 3,
        product: "Heirloom Tomatoes",
        type: "Crop",
        price: 3.49,
        quantitySold: 800,
        salesIncome: 2792.0,
      },
      {
        id: 4,
        product: "Organic Kale",
        type: "Crop",
        price: 2.99,
        quantitySold: 480,
        salesIncome: 1435.2,
      },
      {
        id: 5,
        product: "Duck Eggs",
        type: "Poultry",
        price: 6.99,
        quantitySold: 300,
        salesIncome: 2097.0,
      },
    ],
  },
  yearly: {
    totalProducts: { value: 24 },
    totalSales: { value: 52845.67 },
    totalTransactions: { value: 45 },
    totalCustomers: { value: 1080 },
    salesData: [
      { name: "Jan", value: 4200 },
      { name: "Feb", value: 3800 },
      { name: "Mar", value: 5100 },
      { name: "Apr", value: 4800 },
      { name: "May", value: 5600 },
      { name: "Jun", value: 4900 },
      { name: "Jul", value: 5400 },
      { name: "Aug", value: 5200 },
      { name: "Sep", value: 4700 },
      { name: "Oct", value: 5300 },
      { name: "Nov", value: 5800 },
      { name: "Dec", value: 6200 },
    ],
    productSales: [
      {
        id: 1,
        product: "Organic Eggs",
        type: "Poultry",
        price: 4.99,
        quantitySold: 7200,
        salesIncome: 35928.0,
      },
      {
        id: 2,
        product: "Free-Range Chicken",
        type: "Poultry",
        price: 12.99,
        quantitySold: 4080,
        salesIncome: 53001.6,
      },
      {
        id: 3,
        product: "Heirloom Tomatoes",
        type: "Crop",
        price: 3.49,
        quantitySold: 9600,
        salesIncome: 33504.0,
      },
      {
        id: 4,
        product: "Organic Kale",
        type: "Crop",
        price: 2.99,
        quantitySold: 5760,
        salesIncome: 17222.4,
      },
      {
        id: 5,
        product: "Duck Eggs",
        type: "Poultry",
        price: 6.99,
        quantitySold: 3600,
        salesIncome: 25164.0,
      },
      {
        id: 6,
        product: "Organic Eggs",
        type: "Poultry",
        price: 4.99,
        quantitySold: 7200,
        salesIncome: 35928.0,
      },
      {
        id: 7,
        product: "Free-Range Chicken",
        type: "Poultry",
        price: 12.99,
        quantitySold: 4080,
        salesIncome: 53001.6,
      },
      {
        id: 8,
        product: "Heirloom Tomatoes",
        type: "Crop",
        price: 3.49,
        quantitySold: 9600,
        salesIncome: 33504.0,
      },
      {
        id: 9,
        product: "Organic Kale",
        type: "Crop",
        price: 2.99,
        quantitySold: 5760,
        salesIncome: 17222.4,
      },
      {
        id: 10,
        product: "Duck Eggs",
        type: "Poultry",
        price: 6.99,
        quantitySold: 3600,
        salesIncome: 25164.0,
      },
    ],
  },
};

export default function DashboardPage() {
  const [timePeriod, setTimePeriod] = useState("monthly");
  const data = timePeriodsData[timePeriod];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <div className="w-48">
          <AppSidebar userType="admin" />
        </div>
        <div className="w-full p-12 space-y-4">
          <div>
            <h2 className="text-3xl font-semibold">Sales Overview</h2>
            <p className="mt-4 text-gray-500">
              View and analyze sales data across different time periods. Use the
              tabs to switch between weekly, monthly, and yearly reports.
            </p>
          </div>
          <div className="flex flex-row justify-end gap-4">
            <Tabs
              value={timePeriod}
              onValueChange={setTimePeriod}
              className="w-full sm:w-auto"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="yearly">Yearly</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Products
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {data.totalProducts.value}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Sales
                </CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  $
                  {data.totalSales.value.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Transactions
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {data.totalTransactions.value}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Customers
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {data.totalCustomers.value.toLocaleString()}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
            <Card className="col-span-3 h-auto">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>
                  {timePeriod === "weekly"
                    ? "Daily sales for this week"
                    : timePeriod === "monthly"
                    ? "Weekly sales for this month"
                    : "Monthly sales for this year"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <BarChart data={data.salesData} />
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-5">
              <CardHeader>
                <CardTitle>Product Sales</CardTitle>
                <CardDescription>
                  {timePeriod === "weekly"
                    ? "Overall sales for this week"
                    : timePeriod === "monthly"
                    ? "Overall sales for this month"
                    : "Overall sales for this year"}
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Quantity Sold</TableHead>
                      <TableHead>Sales Income</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.productSales.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {item.product}
                        </TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>₱{item.price}</TableCell>
                        <TableCell>{item.quantitySold}</TableCell>
                        <TableCell>
                          ₱
                          {item.salesIncome.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
