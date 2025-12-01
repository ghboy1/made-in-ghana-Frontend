import React from 'react';
import { FixedSizeGrid } from 'react-window';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const ProductGrid = ({ products, wishlist, onToggleWishlist, onQuickView, onAddToCart }) => {
  // Calculate the number of columns based on screen width
  const getColumnCount = () => {
    if (window.innerWidth < 576) return 1;
    if (window.innerWidth < 992) return 2;
    if (window.innerWidth < 1200) return 3;
    return 4;
  };

  const [columnCount, setColumnCount] = React.useState(getColumnCount());
  const rowCount = Math.ceil(products.length / columnCount);

  // Update columns on window resize
  React.useEffect(() => {
    const handleResize = () => {
      setColumnCount(getColumnCount());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cell renderer
  const Cell = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * columnCount + columnIndex;
    
    if (index >= products.length) {
      return <div style={style} />;
    }
    
    const product = products[index];
    
    return (
      <div style={{
        ...style,
        padding: '10px',
        boxSizing: 'border-box'
      }}>
        <ProductCard
          product={product}
          wishlist={wishlist}
          onToggleWishlist={onToggleWishlist}
          onQuickView={onQuickView}
          onAddToCart={onAddToCart}
        />
      </div>
    );
  };

  return (
    <div className="product-grid-container">
      <FixedSizeGrid
        className="product-grid"
        columnCount={columnCount}
        columnWidth={window.innerWidth / columnCount}
        height={800} // Adjust as needed or make dynamic
        rowCount={rowCount}
        rowHeight={400} // Adjust based on your card height
        width={window.innerWidth}
      >
        {Cell}
      </FixedSizeGrid>
    </div>
  );
};

export default ProductGrid;