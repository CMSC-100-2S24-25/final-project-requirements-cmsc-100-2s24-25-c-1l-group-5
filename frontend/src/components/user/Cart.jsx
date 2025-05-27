import React, { createContext, useContext, useState } from "react";
import toast from 'react-hot-toast';

const CartContext = createContext(); // use context to pass data around without passing props

export const Cart = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);


  const addToCart = async (product, updateProductQty) => {
  if (!product?._id) {
    toast.error("Invalid product ID");
    return;
  }

  try {
    const res = await fetch(`http://localhost:3000/api/products/${product._id}/decrement`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ qty: 1 }), // qty to decrement
    });

    // debug: log raw response
    // console.log('Response status:', res.status);

    const data = await res.json();

    if (!res.ok) {
      console.error("Backend error:", data);
      throw new Error(data.error || "Failed to update stock");
    }

    // Update cart state
    setCartItems((prevItems) => {
      const isInCart = prevItems.find((item) => item._id === product._id);
      if (isInCart) {
        return prevItems.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + 1,
                itemPrice: (item.quantity + 1) * item.price,
              }
            : item
        );
      } else {
        return [
          ...prevItems,
          {
            ...product,
            quantity: 1,
            itemPrice: product.price,
          },
        ];
      }
    });

    updateProductQty(product._id, data.qty); // update UI with new qty

    toast.success(`${product.name} added to cart!`, { position: "top-right" });
  } catch (err) {
    console.error("Error adding to cart:", err.message);
    toast.error(err.message || "Failed to add to cart. Maybe out of stock?", {
      position: "top-right",
    });
  }
};


  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== productId));
  };

  const increaseQuantity = (product) =>{
    setCartItems((prevItems) => {
        const isInCart = prevItems.find((item) => item._id === product._id);
        if (isInCart) {
        // If item already in cart, increase quantity
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1,itemPrice: (item.quantity + 1) * item.price }
            : item
        );
      }
    });
  }

  const decreaseQuantity = (product) =>{
    setCartItems((prevItems) => {
        const isInCart = prevItems.find((item) => item._id === product._id);
        if (isInCart) {
        // If item already in cart, decrease quantity
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity - 1,itemPrice: (item.quantity - 1) * item.price }
            : item
        ).filter((item) => item.quantity > 0); // automatically removes item if quantity is zero
      }
    });
  }

  const clearCart = () => {
    setCartItems([]); // set cart to empty
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (item.itemPrice || item.price * item.quantity || 0),
    0
  ); // compute for total price

  const totalQuantity = cartItems.reduce(
    (acc, item) => acc + (item.quantity || 0),
    0
  ); // compute for total quantity


  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, totalPrice, totalQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
