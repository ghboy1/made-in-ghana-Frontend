import { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { CartProvider } from '../contexts/CartContext';

const BuyerShop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartProvider);

  const fetchProducts = useCallback(async () => {
    const response = await axios.get(`/api/products?search=${searchTerm}&category=${category}`);
    setProducts(response.data);
  }, [searchTerm, category]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      <h2>Shop</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
      </select>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyerShop;