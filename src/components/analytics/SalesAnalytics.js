import React, { useState } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement, 
  PointElement,
  Title, 
  Tooltip, 
  Legend, 
  ArcElement,
  RadialLinearScale,
  Filler
} from 'chart.js';
import { Bar, Line, Pie, Doughnut, PolarArea } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement,
  PointElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement,
  RadialLinearScale,
  Filler
);

// Set custom Ghana-themed colors
const ghanaColors = {
  red: 'rgba(206, 17, 38, 0.8)',
  redLight: 'rgba(206, 17, 38, 0.2)',
  gold: 'rgba(252, 209, 22, 0.8)',
  goldLight: 'rgba(252, 209, 22, 0.2)',
  green: 'rgba(0, 107, 63, 0.8)',
  greenLight: 'rgba(0, 107, 63, 0.2)',
  black: 'rgba(0, 0, 0, 0.8)',
  blackLight: 'rgba(0, 0, 0, 0.2)',
};

const SalesAnalytics = ({ salesData, productData, regionData, timeRange = 'monthly' }) => {
  const [chartType, setChartType] = useState('bar');
  
  // Format monthly sales data for charts
  const monthlySalesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Sales (GH₵)',
        data: salesData?.monthlySales || [5000, 7200, 8100, 6800, 9200, 11500, 10800, 12000, 11500, 13200, 14500, 16800],
        backgroundColor: ghanaColors.goldLight,
        borderColor: ghanaColors.gold,
        borderWidth: 2,
        tension: 0.3,
        fill: true,
      },
      {
        label: 'Orders',
        data: salesData?.monthlyOrders || [120, 145, 160, 135, 180, 210, 195, 220, 215, 240, 255, 280],
        backgroundColor: ghanaColors.greenLight,
        borderColor: ghanaColors.green,
        borderWidth: 2,
        tension: 0.3,
        fill: true,
      }
    ]
  };

  // Category breakdown data
  const categoryData = {
    labels: productData?.categories?.map(cat => cat.name) || 
           ['Traditional Wear', 'Modern Prints', 'School Uniforms', 'Footwear', 'Accessories'],
    datasets: [{
      label: 'Sales by Category',
      data: productData?.categories?.map(cat => cat.sales) || [35, 25, 20, 15, 5],
      backgroundColor: [
        ghanaColors.red,
        ghanaColors.gold,
        ghanaColors.green,
        ghanaColors.black,
        'rgba(100, 100, 100, 0.8)'
      ],
      borderWidth: 1
    }]
  };

  // Regional sales data
  const regionalData = {
    labels: regionData?.regions?.map(region => region.name) || 
            ['Ashanti', 'Greater Accra', 'Northern', 'Eastern', 'Western', 'Volta', 'Other Regions'],
    datasets: [{
      label: 'Regional Sales Distribution (%)',
      data: regionData?.regions?.map(region => region.percentage) || [32, 28, 15, 10, 8, 5, 2],
      backgroundColor: [
        ghanaColors.red,
        ghanaColors.gold,
        ghanaColors.green,
        ghanaColors.black,
        'rgba(150, 100, 50, 0.7)',
        'rgba(50, 120, 180, 0.7)',
        'rgba(180, 180, 180, 0.7)'
      ],
      borderWidth: 1
    }]
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: timeRange === 'monthly' ? 
              'Monthly Sales Performance' : 
              'Weekly Sales Performance',
        font: {
          size: 16
        }
      },
    },
    scales: chartType !== 'pie' && chartType !== 'doughnut' && chartType !== 'polarArea' ? {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(200, 200, 200, 0.2)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    } : undefined
  };

  const renderChart = () => {
    switch(chartType) {
      case 'bar':
        return <Bar data={monthlySalesData} options={chartOptions} />;
      case 'line':
        return <Line data={monthlySalesData} options={chartOptions} />;
      case 'pie':
        return <Pie data={categoryData} options={{...chartOptions, aspectRatio: 1.5}} />;
      case 'doughnut':
        return <Doughnut data={regionalData} options={{...chartOptions, aspectRatio: 1.5}} />;
      case 'polarArea':
        return <PolarArea data={categoryData} options={{...chartOptions, aspectRatio: 1.5}} />;
      default:
        return <Bar data={monthlySalesData} options={chartOptions} />;
    }
  };

  return (
    <div className="analytics-container">
      <div className="chart-controls">
        <div className="chart-type-selector">
          <label htmlFor="chart-type">Chart Type:</label>
          <select 
            id="chart-type" 
            value={chartType} 
            onChange={(e) => setChartType(e.target.value)}
            className="chart-select"
          >
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
            <option value="pie">Category Breakdown (Pie)</option>
            <option value="doughnut">Regional Sales (Doughnut)</option>
            <option value="polarArea">Category Comparison (Polar)</option>
          </select>
        </div>
      </div>
      
      <div className="chart-container">
        {renderChart()}
      </div>
      
      <div className="analytics-summary">
        <div className="summary-card total-sales">
          <h3>Total Sales</h3>
          <p className="amount">GH₵ {salesData?.totalSales?.toLocaleString() || '126,200'}</p>
          <p className="trend positive">+12.5% from last period</p>
        </div>
        
        <div className="summary-card total-orders">
          <h3>Total Orders</h3>
          <p className="amount">{salesData?.totalOrders?.toLocaleString() || '2,355'}</p>
          <p className="trend positive">+8.2% from last period</p>
        </div>
        
        <div className="summary-card avg-order">
          <h3>Avg. Order Value</h3>
          <p className="amount">GH₵ {salesData?.avgOrderValue?.toLocaleString() || '53.59'}</p>
          <p className="trend positive">+4.1% from last period</p>
        </div>
      </div>
    </div>
  );
};

export default SalesAnalytics;