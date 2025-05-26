import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const OrderContext = createContext();

export const OrdersList = ({ children }) => {
  const [orderItems, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch orders from backend on mount
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/api/orders") // Adjust URL as needed
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch orders");
        return res.json();
      })
      .then((data) => {
        const mappedOrders = data.map((o) => ({
          ordId: o._id,
          products: o.products,
          totalPrice: o.totalPrice,
          status: o.status,
        }));
        setOrders(mappedOrders);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to fetch orders");
        setLoading(false);
      });
  }, []);

  const handleCheckout = () => {
  // 1. Build products array correctly
  const products = cartItems.map(item => ({
    prodId: item._id,
    name: item.name,
    price: item.price * item.qtyOrdered,
    qty: item.qtyOrdered,
  }));

  // 2. Calculate totalPrice (sum of all products price)
  const totalPrice = products.reduce((sum, item) => sum + item.price, 0);

  // 3. Call placeOrder with correct data
  placeOrder(products, totalPrice, userEmail);
};

  

  // Place order with required fields
  const placeOrder = async (products, totalPrice, email) => {
  try {
    const response = await fetch("http://localhost:3000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ products, totalPrice, email }),
    });

    const result = await response.json(); // always parse the body, even on error

    if (!response.ok) {
      console.error("Server responded with error:", result);
      throw new Error(result.message || "Failed to place order");
    }

    const orderMapped = {
      ordId: result._id,
      products: result.products,
      totalPrice: result.totalPrice,
      status: result.status,
    };

    setOrders((prevOrders) => [...prevOrders, orderMapped]);

    orderMapped.products.forEach((item) =>
      toast(`Placed order for ${item.name}.`, { position: "top-right" })
    );
  } catch (error) {
    console.error("Order error:", error.message);
    toast.error("Error placing order");
  }
};


  // Cancel order by ID
  const cancelOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/orders/${orderId}/cancel`, {
        method: "PUT",
      });

      if (!response.ok) throw new Error("Failed to cancel order");

      const updatedOrder = await response.json();

      const updatedMappedOrder = {
        ordId: updatedOrder._id,
        products: updatedOrder.products,
        totalPrice: updatedOrder.totalPrice,
        status: updatedOrder.status,
      };

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.ordId === orderId ? updatedMappedOrder : order
        )
      );

      toast.success(`Order #${orderId} canceled.`);
    } catch (error) {
      toast.error("Error canceling order");
    }
  };

  return (
    <OrderContext.Provider
      value={{ orderItems, placeOrder, cancelOrder, loading }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
