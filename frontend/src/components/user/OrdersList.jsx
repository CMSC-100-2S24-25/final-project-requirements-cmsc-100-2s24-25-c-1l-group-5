import React, { createContext, useContext, useState } from "react";
import toast from 'react-hot-toast';

const OrderContext = createContext();
var orderId = 0;

export const OrdersList = ({ children }) => {
    const [orderItems, setOrders] = useState([]);

    const placeOrder = (products, totalPrice) => {
      orderId++;
      setOrders(prevOrders => [...prevOrders,
        {
          ordId: orderId,
          products: products,
          totalPrice: totalPrice 
        }
      ]);
      products.forEach(item =>
        toast(`Placed order for ${item.name}`, { position: 'top-right' })
      );
    };

    const cancelOrder = (orderId) =>{
        setOrders((prevOrders) => prevOrders.filter((item) => item.ordId !== orderId));
    }

    return (
    <OrderContext.Provider value={{ orderItems, placeOrder, cancelOrder}}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrders = () => useContext(OrderContext);