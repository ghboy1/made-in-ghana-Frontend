// This is a simplified recommendation engine
export const getRecommendedProducts = (cartItems, allProducts) => {
  // Ensure allProducts is an array
  if (!Array.isArray(allProducts)) {
    console.error('getRecommendedProducts received non-array allProducts:', allProducts);
    return [];
  }
  
  // If cart is empty, return popular products
  if (!cartItems || cartItems.length === 0) {
    try {
      return [...allProducts]
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 6);
    } catch (error) {
      console.error('Error sorting products:', error);
      return allProducts.slice(0, 6);
    }
  }
  
  // Extract categories/tags from cart items
  const cartTags = new Set();
  cartItems.forEach(item => {
    if (item.tags) {
      item.tags.forEach(tag => cartTags.add(tag.toLowerCase()));
    }
  });
  
  // Score products based on matching tags and add some randomness
  const scoredProducts = allProducts
    .filter(product => !cartItems.some(item => item.id === product.id)) // Filter out items already in cart
    .map(product => {
      let score = 0;
      
      // Add score for matching tags
      if (product.tags) {
        product.tags.forEach(tag => {
          if (cartTags.has(tag.toLowerCase())) {
            score += 1;
          }
        });
      }
      
      // Add rating to score
      score += product.rating / 5;
      
      // Add slight randomness for variety
      score += Math.random() * 0.5;
      
      return { ...product, recommendationScore: score };
    });
    // Sort by score and return top 6
  try {
    return scoredProducts
      .sort((a, b) => b.recommendationScore - a.recommendationScore)
      .slice(0, 6);
  } catch (error) {
    console.error('Error sorting scored products:', error);
    return scoredProducts.slice(0, 6);
  }
};