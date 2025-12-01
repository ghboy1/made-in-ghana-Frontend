// CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import CartService from '../services/cartService';
import { useAuth } from './AuthContext';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState({
    items: [],
    totalAmount: 0,
    itemCount: 0
  });
  
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  // Function to calculate cart totals
  const calculateCartTotals = (items) => {
    return {
      items,
      totalAmount: items.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0),
      itemCount: items.reduce((count, item) => count + item.quantity, 0)
    };
  };
  
  // Load cart from backend or localStorage on component mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (currentUser) {
          // Fetch cart from API if logged in
          const cartData = await CartService.getCart();
          setCart(calculateCartTotals(cartData));
        } else {
          // Load from localStorage if not logged in
          const savedCart = localStorage.getItem('cart');
          if (savedCart) {
            try {
              setCart(JSON.parse(savedCart));
            } catch (error) {
              console.error('Error parsing cart from localStorage:', error);
              setCart({ items: [], totalAmount: 0, itemCount: 0 });
            }
          }
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
        // Try to load from localStorage as fallback
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          try {
            setCart(JSON.parse(savedCart));
          } catch (error) {
            setCart({ items: [], totalAmount: 0, itemCount: 0 });
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [currentUser]);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, loading]);
  
  const addToCart = async (product, quantity = 1) => {
    console.log('Adding to cart:', product, 'quantity:', quantity);
    
    // Validate product data
    if (!product) {
      console.error('Product is undefined or null');
      return;
    }
    
    if (!product.id) {
      console.error('Product has no ID:', product);
      return;
    }
    
    try {
      if (currentUser) {
        // If logged in, add to server cart
        await CartService.addToCart(product.id, quantity);
      }
      
      // Always update local state
      setCart(prevCart => {
        const existingItemIndex = prevCart.items.findIndex(item => item.id === product.id);
        
        if (existingItemIndex >= 0) {
          // Update quantity if item exists
          const updatedItems = [...prevCart.items];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + quantity
          };
          
          return calculateCartTotals(updatedItems);
        } else {
          // Add new item
          const newItem = { ...product, quantity };
          const updatedItems = [...prevCart.items, newItem];
          
          return calculateCartTotals(updatedItems);
        }
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };
  
  const removeFromCart = async (productId) => {
    try {
      if (currentUser) {
        // If logged in, remove from server cart
        await CartService.removeFromCart(productId);
      }
      
      // Always update local state
      setCart(prevCart => {
        const updatedItems = prevCart.items.filter(item => item.id !== productId);
        return calculateCartTotals(updatedItems);
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };
  
  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      return removeFromCart(productId);
    }
    
    try {
      if (currentUser) {
        // If logged in, update quantity in server cart
        await CartService.updateQuantity(productId, newQuantity);
      }
      
      // Always update local state
      setCart(prevCart => {
        const updatedItems = prevCart.items.map(item => 
          item.id === productId ? { ...item, quantity: newQuantity } : item
        );
        
        return calculateCartTotals(updatedItems);
      });
    } catch (error) {
      console.error('Error updating cart quantity:', error);
    }
  };
  
  const clearCart = async () => {
    try {
      if (currentUser) {
        // If logged in, clear server cart
        await CartService.clearCart();
      }
      
      // Always clear local state
      setCart({
        items: [],
        totalAmount: 0,
        itemCount: 0
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };
  
  const resetCart = async () => {
    try {
      await clearCart();
      localStorage.removeItem('cart');
      console.log('Cart has been reset');
    } catch (error) {
      console.error('Error resetting cart:', error);
    }
  };
  
  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart,
      removeFromCart, 
      updateQuantity, 
      clearCart,
      resetCart,
      loading
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}