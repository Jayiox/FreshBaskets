import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders', {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [userId]);

  if (orders.length === 0) {
    return <p>No orders found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-green-600 text-center mb-6">My Orders</h2>
      {orders.map(order => (
        <div key={order._id} className="border-b pb-4 mb-4">
          <h3 className="font-semibold">Order ID: {order._id}</h3>
          <p>Total Amount: ₱{order.totalAmount}</p>
          <p>Status: {order.status}</p>
          <ul className="mt-4">
            {order.items.map((item, index) => (
              <li key={index} className="mb-2">
                {item.productName} - ₱{item.price} x {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;