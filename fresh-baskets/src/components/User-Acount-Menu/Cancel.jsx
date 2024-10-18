import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Cancel = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    const updateOrderStatus = async () => {
      try {
        await axios.post(`http://localhost:3000/update-order-status/${orderId}`, {
          status: 'cancelled',
        });
        console.log('Order status updated to cancelled.');
      } catch (error) {
        console.error('Error updating order status:', error);
      }
    };

    updateOrderStatus();
  }, [orderId]);

  return (
    <div>
      <h1>Payment Cancelled</h1>
      <p>Your order has been cancelled.</p>
    </div>
  );
};

export default Cancel;