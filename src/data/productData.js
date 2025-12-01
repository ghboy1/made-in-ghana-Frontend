// Sample featured products
export const featuredProducts = [
  {
    id: 1,
    name: 'Handcrafted Kente Shirt',
    image: '/image/kente-shirt.jpg',
    price: 150.00,
    rating: 4.7,
    discount: '15% off',
    category: 'fashion',
    endTime: Date.now() + 86400000, // 24 hours from now
    seller: {
      name: 'Ghana Textiles Ltd',
      verified: true
    }
  },
  {
    id: 2,
    name: 'Premium Cocoa Powder',
    image: '/image/cocoa-powder.jpg',
    price: 35.00,
    rating: 4.9,
    discount: '10% off',
    category: 'food',
    endTime: Date.now() + 172800000, // 48 hours from now
    seller: {
      name: 'Cocoa Processing Company',
      verified: true
    }
  },
  {
    id: 3,
    name: 'Handwoven Basket Set',
    image: '/image/basket-set.jpg',
    price: 85.00,
    rating: 4.6,
    discount: '20% off',
    category: 'home-kitchen',
    endTime: Date.now() + 259200000, // 72 hours from now
    seller: {
      name: 'Northern Crafts Cooperative',
      verified: false
    }
  }
];

// Featured manufacturers
export const featuredManufacturers = [
  {
    id: 1,
    name: 'Ghana Textiles Ltd',
    logo: '/logos/ghana-textiles.jpg',
    website: 'https://ghanatextiles.com'
  },
  {
    id: 2,
    name: 'Cocoa Processing Company',
    logo: '/logos/cpc.jpg',
    website: 'https://cocoaprocessingcompany.gh'
  },
  {
    id: 3,
    name: 'Northern Crafts Cooperative',
    logo: '/logos/northern-crafts.jpg',
    website: 'https://northerncrafts.gh'
  }
];

// Product categories
export const organicFoodProductCategories = [
  {
    name: 'Fruits',
    description: 'Fresh organic fruits grown in Ghana',
    image: '/images/categories/fruits.jpg',
    icon: '🍎'
  },
  {
    name: 'Vegetables',
    description: 'Fresh organic vegetables grown in Ghana',
    image: '/images/categories/vegetables.jpg',
    icon: '🥦'
  },
  {
    name: 'Grains & Cereals',
    image: '/images/categories/grains.jpg',
    icon: '🌾'
  },
  {
    name: 'Tubers',
    image: '/images/categories/tubers.jpg',
    icon: '🥔'
  },
  {
    name: 'Nuts & Seeds',
    image: '/images/categories/nuts.jpg',
    icon: '🥜'
  },
  {
    name: 'Herbs & Spices',
    image: '/images/categories/spices.jpg',
    icon: '🌿'
  },
  {
    name: 'Processed Foods',
    description: 'Traditional Ghanaian processed foods and condiments',
    image: '/images/categories/processed-foods.jpg',
    icon: '🥫'
  },
  {
    name: 'Beverages',
    description: 'Traditional and modern Ghanaian drinks',
    image: '/images/categories/beverages.jpg',
    icon: '🍹'
  }
];