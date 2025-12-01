import React from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './Analytics.css';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend
);

const ghanaColors = {
  red: 'rgba(206, 17, 38, 0.8)',
  gold: 'rgba(252, 209, 22, 0.8)',
  green: 'rgba(0, 107, 63, 0.8)',
};

const ProductPerformance = ({ products = [] }) => {
  // Use sample data if no products are provided
  const productData = products.length > 0 ? products : [
    { name: "Boys' Traditional Kente Outfit", sales: 120, views: 1450, conversionRate: 8.3 },
    { name: "Modern Ankara Shirt", sales: 95, views: 1200, conversionRate: 7.9 },
    { name: "Northern Fugu Set", sales: 85, views: 980, conversionRate: 8.7 },
    { name: "School Uniform Set", sales: 210, views: 1800, conversionRate: 11.7 },
    { name: "Traditional Sandals", sales: 65, views: 820, conversionRate: 7.9 }
  ];

  // Sort by sales for better visualization
  const sortedProducts = [...productData].sort((a, b) => b.sales - a.sales).slice(0, 10);

  const data = {
    labels: sortedProducts.map(product => product.name),
    datasets: [
      {
        label: 'Sales',
        data: sortedProducts.map(product => product.sales),
        backgroundColor: ghanaColors.gold,
        borderWidth: 0,
        borderRadius: 4,
      },
      {
        label: 'Views (÷10)',
        data: sortedProducts.map(product => product.views / 10), // Scaled down for better visualization
        backgroundColor: ghanaColors.green,
        borderWidth: 0,
        borderRadius: 4,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Top Products Performance',
        font: { size: 16 }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            let value = context.parsed.y;
            if (label === 'Views (÷10)') {
              value = value * 10; // Display the actual view count
              return `Views: ${value}`;
            }
            return `${label}: ${value}`;
          },
          afterBody: (tooltipItems) => {
            const index = tooltipItems[0].dataIndex;
            return `Conversion Rate: ${sortedProducts[index].conversionRate}%`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(200, 200, 200, 0.2)'
        }
      }
    }
  };

  return (
    <div className="analytics-container">
      <h2 className="section-title">Product Performance Analysis</h2>
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
      
      <div className="product-performance-table">
        <h3>Detailed Product Metrics</h3>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Sales</th>
              <th>Views</th>
              <th>Conversion Rate</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.sales}</td>
                <td>{product.views}</td>
                <td>{product.conversionRate}%</td>
                <td>
                  <span className={`status-badge ${product.conversionRate > 8 ? 'good' : 'average'}`}>
                    {product.conversionRate > 8 ? 'Good' : 'Average'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductPerformance;