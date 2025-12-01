import api from './api';

// Keep mock data for fallback and development
const allProducts = [
  {
    id: 1,
    name: "Handwoven Kente Cloth",
    price: "GH₵ 89",
    image: "/images/kente.jpg",
    rating: 4.5,
    tags: ["Traditional", "Handmade", "Clothing"],
    category: "Textiles"
  },
  {
    id: 2,
    name: "Shea Butter Bundle",
    price: "GH₵ 24",
    image: "/images/shea.jpg",
    rating: 4.8,
    tags: ["Organic", "Skincare", "Beauty"],
    category: "Beauty & Personal Care"
  },
  {
    id: 3,
    name: "Adinkra Symbol Art",
    price: "GH₵ 150",
    image: "/images/adinkra.jpg",
    rating: 4.7,
    tags: ["Cultural", "Decor", "Art"],
    category: "Home & Decor"
  },
  {
    id: 4,
    name: "Beaded Jewelry Set",
    price: "GH₵ 65",
    image: "/images/beads.jpg",
    rating: 4.6,
    tags: ["Fashion", "Handmade", "Accessories"],
    category: "Jewelry"
  },
  {
    id: 5,
    name: "Wooden Drum (Djembe)",
    price: "GH₵ 320",
    image: "/images/djembe.jpg",
    rating: 4.9,
    tags: ["Music", "Traditional", "Instrument"],
    category: "Musical Instruments"
  },
  {
    id: 6,
    name: "Batik Print Dress",
    price: "GH₵ 180",
    image: "/images/batik.jpg",
    rating: 4.4,
    tags: ["Fashion", "Handmade", "Clothing"],
    category: "Clothing"
  },
  {
    id: 7,
    name: "Ghana Chocolate Gift Box",
    price: "GH₵ 45",
    image: "/images/chocolate.jpg",
    rating: 4.7,
    tags: ["Food", "Gift", "Organic"],
    category: "Food & Drinks"
  },
  {
    id: 8,
    name: "Hand-carved Wooden Stool",
    price: "GH₵ 120",
    image: "/images/stool.jpg",
    rating: 4.5,
    tags: ["Furniture", "Handmade", "Traditional"],
    category: "Home & Decor"
  },
  {
    id: 9,
    name: "African Print Notebook",
    price: "GH₵ 18",
    image: "/images/notebook.jpg",
    rating: 4.3,
    tags: ["Stationery", "Handmade", "Office"],
    category: "Stationery"
  },
  {
    id: 10,
    name: "Traditional Kente Sandals",
    price: "GH₵ 75",
    image: "/images/sandals.jpg",
    rating: 4.6,
    tags: ["Footwear", "Handmade", "Fashion"],
    category: "Footwear"
  },
  {
    id: 11,
    name: "Coconut Oil (Organic)",
    price: "GH₵ 35",
    image: "/images/coconut-oil.jpg",
    rating: 4.8,
    tags: ["Organic", "Beauty", "Health"],
    category: "Beauty & Personal Care"
  },
  {
    id: 12,
    name: "Handmade African Basket",
    price: "GH₵ 60",
    image: "/images/basket.jpg",
    rating: 4.7,
    tags: ["Home", "Handmade", "Storage"],
    category: "Home & Decor"
  }
];

// API methods with local fallbacks
export const getAllProducts = async () => {
  try {
    const response = await api.get('/products');
    // Make sure we always return an array
    if (response.data && Array.isArray(response.data)) {
      return response.data;
    } else if (response.data && response.data.products && Array.isArray(response.data.products)) {
      return response.data.products;
    } else {
      console.warn('API returned non-array data for products, using fallback data');
      return allProducts;
    }
  } catch (error) {
    console.warn('Using mock data - could not fetch from API:', error);
    return allProducts;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.warn('Using mock data - could not fetch from API:', error);
    return allProducts.find(product => product.id === id);
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const response = await api.get('/products', { 
      params: { category }
    });
    return response.data;
  } catch (error) {
    console.warn('Using mock data - could not fetch from API:', error);
    return allProducts.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  }
};

export const getProductsByTag = async (tag) => {
  try {
    const response = await api.get('/products/search', { 
      params: { tag }
    });
    return response.data;
  } catch (error) {
    console.warn('Using mock data - could not fetch from API:', error);
    return allProducts.filter(product => 
      product.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
  }
};

// Additional API methods
export const searchProducts = async (searchTerm) => {
  try {
    const response = await api.get('/products/search', { 
      params: { term: searchTerm }
    });
    return response.data;
  } catch (error) {
    console.warn('Using mock data - could not fetch from API:', error);
    // Search in mock data
    return allProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }
};

// For manufacturer use
export const createProduct = async (productData) => {
  const response = await api.post('/products', productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await api.put(`/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

// User favorites functions
export const getUserFavorites = async () => {
  const response = await api.get('/users/favorites');
  return response.data;
};

export const addToFavorites = async (productId) => {
  const response = await api.post('/users/favorites', { productId });
  return response.data;
};

export const removeFromFavorites = async (productId) => {
  const response = await api.delete(`/users/favorites/${productId}`);
  return response.data;
};