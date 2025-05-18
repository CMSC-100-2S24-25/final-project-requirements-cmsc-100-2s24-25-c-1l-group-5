import React, { createContext, useContext, useState } from "react";
import toast from 'react-hot-toast';

const CartContext = createContext(); // use context to pass data around without passing props

export const Cart = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);


  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const isInCart = prevItems.find((item) => item.id === product.id);
      if (isInCart) {
        // If item already in cart, increase quantity and update total item price
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1,itemPrice: (item.quantity + 1) * item.price }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1, itemPrice: product.price }];
      }
    });
    toast(`${product.name} added to cart!`,{position: 'top-right'});
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const increaseQuantity = (product) =>{
    setCartItems((prevItems) => {
        const isInCart = prevItems.find((item) => item.id === product.id);
        if (isInCart) {
        // If item already in cart, increase quantity
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1,itemPrice: (item.quantity + 1) * item.price }
            : item
        );
      }
    });
  }

  const decreaseQuantity = (product) =>{
    setCartItems((prevItems) => {
        const isInCart = prevItems.find((item) => item.id === product.id);
        if (isInCart) {
        // If item already in cart, decrease quantity
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1,itemPrice: (item.quantity - 1) * item.price }
            : item
        ).filter((item) => item.quantity > 0); // automatically removes item if quantity is zero
      }
    });
  }

  const clearCart = () => {
    setCartItems([]); // set crt to empty
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (item.itemPrice || item.price * item.quantity || 0),
    0
  ); // compute for total price


  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
