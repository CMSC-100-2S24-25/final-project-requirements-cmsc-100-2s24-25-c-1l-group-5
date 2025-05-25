import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit } from "lucide-react";

const user = {
  fName: "John",
  mName: "Q.",
  lName: "Doe",
  email: "john.doe@example.com",
  uType: "merchant",
};
const orders = [
  {
    id: "1",
    prodId: "1",
    qty: 3,
    status: 1, // pending
    email: "john.doe@example.com",
    date: new Date("2025-05-17T10:30:00Z"),
    time: "10:30 AM",
  },
  {
    id: "2",
    prodId: "3",
    qty: 2,
    status: 2, // completed
    email: "john.doe@example.com",
    date: new Date("2025-05-16T14:45:00Z"),
    time: "2:45 PM",
  },
  {
    id: "3",
    prodId: "5",
    qty: 5,
    status: 0, // pending
    email: "john.doe@example.com",
    date: new Date("2025-05-15T09:00:00Z"),
    time: "9:00 AM",
  },
  {
    id: "4",
    prodId: "3",
    qty: 1,
    status: 1, // pending
    email: "john.doe@example.com",
    date: new Date("2025-05-14T16:00:00Z"),
    time: "4:00 PM",
  },
  {
    id: "5",
    prodId: "2",
    qty: 10,
    status: 2, // completed
    email: "john.doe@example.com",
    date: new Date("2025-05-13T12:15:00Z"),
    time: "12:15 PM",
  },
];

export default function ProfilePage() {
  const statusMap = {
    0: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
    1: { label: "Completed", color: "bg-green-100 text-green-800" },
    2: { label: "Canceled", color: "bg-red-100 text-red-800" },
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <CardTitle className="text-3xl font-bold">
            {user.fName} {user.mName} {user.lName}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>Email: {user.email}</p>
          <p>
            User Type:{" "}
            <Badge>
              {user.uType.charAt(0).toUpperCase()}
              {user.uType.slice(1)}
            </Badge>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <p className="text-sm text-muted-foreground">No orders found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product ID</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.prodId}</TableCell>
                    <TableCell>{order.qty}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded ${
                          statusMap[order.status]?.color
                        }`}
                      >
                        {statusMap[order.status]?.label || "Unknown"}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(order.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{order.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
