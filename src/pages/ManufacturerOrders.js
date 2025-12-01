import { useState, useEffect } from 'react';
import axios from 'axios';

const ManufacturerOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get('/api/orders/manufacturer', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setOrders(response.data);
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.map((order) => (
        <div key={order.id}>
          Order #{order.id} - Status: {order.status}
        </div>
      ))}
    </div>
  );
};

export default ManufacturerOrders;