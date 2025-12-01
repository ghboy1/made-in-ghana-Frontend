import api from './api';

const OrderService = {
  placeOrder: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  getBuyerOrders: async () => {
    const response = await api.get('/orders');
    return response.data;
  },

  getManufacturerOrders: async () => {
    const response = await api.get('/orders/manufacturer');
    return response.data;
  },

  getOrderById: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  updateOrderStatus: async (id, status) => {
    const response = await api.put(`/orders/${id}/status`, { status });
    return response.data;
  },

  trackOrder: async (trackingNumber) => {
    const response = await api.get(`/orders/track/${trackingNumber}`);
    return response.data;
  }
};

export default OrderService;
