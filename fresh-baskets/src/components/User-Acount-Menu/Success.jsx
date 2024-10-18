import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Success = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    const updateOrderStatus = async () => {
      try {
        await axios.post(`http://localhost:3000/update-order-status/${orderId}`, {
          status: 'paid',
        });
        console.log('Order status updated to paid.');
      } catch (error) {
        console.error('Error updating order status:', error);
      }
    };

    updateOrderStatus();
  }, [orderId]);

  return (
    <div>
      <h1>Payment Successful</h1>
      <p>Your order has been completed!</p>
    </div>
  );
};

export default Success;