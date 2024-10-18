import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../utils/CartsContext';
import axios from 'axios';

const Cart = () => {
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } = useCart();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const calculateGrandTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleAddProduct = () => {
    const product = {
      id: 1,
      name: 'Test Product',
      price: 100,
      quantity: 1,
      image: 'https://via.placeholder.com/150',
    };
    addToCart(product);
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/create-checkout-session', {
        cartItems: cartItems.map(item => ({
          productName: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount: calculateGrandTotal(),
        user: userId,
      });

      window.location.href = response.data.checkoutUrl;
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto mt-10">
      <button 
        className="mb-6 text-green-500 hover:text-green-700 flex items-center"
        onClick={() => navigate(-1)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <h2 className="text-2xl font-bold text-green-600 text-center mb-6">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="flex items-center border-b border-gray-300 py-4">
            <img src={item.image} alt={item.name} className="w-24 h-24 mr-6 rounded-lg object-cover" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
              <p className="text-gray-600">Price: ₱{item.price}</p>
              <p className="text-gray-600">Total: ₱{(item.price * item.quantity).toFixed(2)}</p>
              <div className="flex items-center mt-2">
                <button className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700" onClick={() => decreaseQuantity(item.id)}>-</button>
                <span className="mx-4 text-lg font-semibold">Qty: {item.quantity}</span>
                <button className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700" onClick={() => increaseQuantity(item.id)}>+</button>
              </div>
            </div>
          </div>
        ))
      )}
      <div className="mt-6 text-right">
        <h3 className="text-lg font-semibold">Grand Total: ₱{calculateGrandTotal()}</h3>
        <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>
      <button className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600" onClick={handleAddProduct}>
        Add Test Product to Cart
      </button>
    </div>
  );
};

export default Cart;