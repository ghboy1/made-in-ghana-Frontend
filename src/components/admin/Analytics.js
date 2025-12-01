import React, { useState, useEffect } from 'react';
import { 
  FaChartLine, FaChartBar, FaChartPie, 
  FaDownload, FaMapMarkerAlt, FaShoppingBag, 
  FaCalendarAlt, FaUsers, FaExchangeAlt 
} from 'react-icons/fa';
import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';

const Analytics = () => {
  const [timeframe, setTimeframe] = useState('month');
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState(null);
  
  useEffect(() => {
    // Simulate loading analytics data
    setLoading(true);
    setTimeout(() => {
      setAnalyticsData({
        salesData: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          values: [12500, 17800, 15300, 21000, 18600, 24500, 22300]
        },
        categoryData: {
          labels: ['Fashion', 'Food & Drink', 'Home & Kitchen', 'Beauty', 'Accessories', 'Craft', 'Other'],
          values: [35, 25, 15, 10, 8, 5, 2]
        },
        regionData: {
          labels: ['Ashanti', 'Greater Accra', 'Western', 'Eastern', 'Central', 'Northern', 'Other'],
          values: [30, 25, 15, 10, 10, 5, 5]
        },
        topProducts: [
          { name: 'Kente Cloth', sales: 125, revenue: 15000 },
          { name: 'Shea Butter', sales: 230, revenue: 5750 },
          { name: 'African Print Dress', sales: 84, revenue: 8400 },
          { name: 'Handwoven Basket', sales: 76, revenue: 3800 },
          { name: 'Ghana Cocoa Powder', sales: 65, revenue: 3250 }
        ],
        visitorStats: {
          total: 45600,
          returning: 28800,
          new: 16800,
          conversionRate: 3.2
        },
        deviceStats: {
          mobile: 65,
          desktop: 28,
          tablet: 7
        }
      });
      setLoading(false);
    }, 1500);
  }, [timeframe]);
  
  const salesChartData = {
    labels: analyticsData?.salesData.labels || [],
    datasets: [
      {
        label: 'Sales (GHC)',
        data: analyticsData?.salesData.values || [],
        borderColor: '#006B3F',
        backgroundColor: 'rgba(0, 107, 63, 0.2)',
        tension: 0.4,
        fill: true
      }
    ]
  };
  
  const categoriesChartData = {
    labels: analyticsData?.categoryData.labels || [],
    datasets: [
      {
        data: analyticsData?.categoryData.values || [],
        backgroundColor: [
          '#006B3F', // Ghana green
          '#FCD116', // Ghana gold
          '#CE1126', // Ghana red
          '#4CAF50',
          '#2196F3',
          '#9C27B0',
          '#607D8B'
        ],
        borderWidth: 1
      }
    ]
  };
  
  const regionChartData = {
    labels: analyticsData?.regionData.labels || [],
    datasets: [
      {
        label: 'Sales by Region (%)',
        data: analyticsData?.regionData.values || [],
        backgroundColor: [
          '#006B3F',
          '#FCD116',
          '#CE1126',
          '#4CAF50',
          '#2196F3',
          '#9C27B0',
          '#607D8B'
        ],
        borderWidth: 0
      }
    ]
  };
  
  const pieChartOptions = {
    plugins: {
      legend: {
        position: 'right'
      }
    }
  };
  
  const formatCurrency = (amount) => {
    return `₵${amount.toFixed(2)}`;
  };
  
  return (
    <div className="admin-analytics">
      <div className="analytics-header admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Sales Analytics</h2>
          <div className="admin-header-actions">
            <div className="timeframe-selector">
              <FaCalendarAlt className="selector-icon" />
              <select 
                value={timeframe} 
                onChange={(e) => setTimeframe(e.target.value)}
              >
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="quarter">Last 90 Days</option>
                <option value="year">Last 12 Months</option>
              </select>
            </div>
            <button className="admin-button admin-button-secondary">
              <FaDownload /> Export Data
            </button>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="admin-loading">
          <div className="spinner"></div>
          <p>Loading analytics data...</p>
        </div>
      ) : (
        <>
          {/* Sales Overview */}
          <div className="analytics-cards">
            <div className="analytics-stat-card admin-card">
              <div className="stat-card-content">
                <div className="stat-card-icon revenue-icon">
                  <FaChartLine />
                </div>
                <div className="stat-card-info">
                  <h3>Total Revenue</h3>
                  <p className="stat-value">{formatCurrency(132250)}</p>
                  <p className="stat-comparison">
                    <span className="stat-up">↑ 12.5%</span> vs previous period
                  </p>
                </div>
              </div>
            </div>
            
            <div className="analytics-stat-card admin-card">
              <div className="stat-card-content">
                <div className="stat-card-icon orders-icon">
                  <FaShoppingBag />
                </div>
                <div className="stat-card-info">
                  <h3>Total Orders</h3>
                  <p className="stat-value">1,534</p>
                  <p className="stat-comparison">
                    <span className="stat-up">↑ 8.2%</span> vs previous period
                  </p>
                </div>
              </div>
            </div>
            
            <div className="analytics-stat-card admin-card">
              <div className="stat-card-content">
                <div className="stat-card-icon avg-icon">
                  <FaExchangeAlt />
                </div>
                <div className="stat-card-info">
                  <h3>Average Order Value</h3>
                  <p className="stat-value">{formatCurrency(86.21)}</p>
                  <p className="stat-comparison">
                    <span className="stat-up">↑ 4.3%</span> vs previous period
                  </p>
                </div>
              </div>
            </div>
            
            <div className="analytics-stat-card admin-card">
              <div className="stat-card-content">
                <div className="stat-card-icon visitors-icon">
                  <FaUsers />
                </div>
                <div className="stat-card-info">
                  <h3>Total Visitors</h3>
                  <p className="stat-value">{analyticsData.visitorStats.total.toLocaleString()}</p>
                  <p className="stat-comparison">
                    <span className="stat-up">↑ 15.7%</span> vs previous period
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Charts Row */}
          <div className="analytics-charts-row">
            <div className="admin-card chart-card sales-chart">
              <h3 className="chart-title">
                <FaChartLine /> Revenue Trend
              </h3>
              <div className="chart-container">
                <Chart type="line" data={salesChartData} />
              </div>
            </div>
            
            <div className="analytics-small-charts">
              <div className="admin-card chart-card category-chart">
                <h3 className="chart-title">
                  <FaChartPie /> Sales by Category
                </h3>
                <div className="chart-container">
                  <Chart 
                    type="pie" 
                    data={categoriesChartData} 
                    options={pieChartOptions} 
                  />
                </div>
              </div>
              
              <div className="admin-card chart-card region-chart">
                <h3 className="chart-title">
                  <FaMapMarkerAlt /> Sales by Region
                </h3>
                <div className="chart-container">
                  <Chart 
                    type="bar" 
                    data={regionChartData} 
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Top Products */}
          <div className="admin-card">
            <h3 className="chart-title">
              <FaChartBar /> Top Performing Products
            </h3>
            
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Units Sold</th>
                    <th>Revenue</th>
                    <th>% of Total</th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsData.topProducts.map((product, index) => (
                    <tr key={index}>
                      <td>{product.name}</td>
                      <td>{product.sales}</td>
                      <td>{formatCurrency(product.revenue)}</td>
                      <td>
                        <div className="percentage-bar-container">
                          <div 
                            className="percentage-bar" 
                            style={{ width: `${(product.revenue / 15000) * 100}%` }}
                          ></div>
                          <span>{((product.revenue / 15000) * 100).toFixed(1)}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Customer & Device Insights */}
          <div className="analytics-insights-row">
            <div className="admin-card insights-card">
              <h3 className="chart-title">
                <FaUsers /> Visitor Insights
              </h3>
              
              <div className="insights-content">
                <div className="insights-stat">
                  <h4>Conversion Rate</h4>
                  <p className="large-stat">{analyticsData.visitorStats.conversionRate}%</p>
                  <p className="stat-comparison">
                    <span className="stat-up">↑ 0.5%</span> vs previous period
                  </p>
                </div>
                
                <div className="insights-chart">
                  <div className="visitor-types">
                    <div className="visitor-type">
                      <h4>New Visitors</h4>
                      <p className="visitor-percentage">
                        {Math.round((analyticsData.visitorStats.new / analyticsData.visitorStats.total) * 100)}%
                      </p>
                      <div className="visitor-bar">
                        <div 
                          className="visitor-bar-fill new-visitors" 
                          style={{ width: `${(analyticsData.visitorStats.new / analyticsData.visitorStats.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="visitor-type">
                      <h4>Returning Visitors</h4>
                      <p className="visitor-percentage">
                        {Math.round((analyticsData.visitorStats.returning / analyticsData.visitorStats.total) * 100)}%
                      </p>
                      <div className="visitor-bar">
                        <div 
                          className="visitor-bar-fill returning-visitors" 
                          style={{ width: `${(analyticsData.visitorStats.returning / analyticsData.visitorStats.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="admin-card insights-card">
              <h3 className="chart-title">
                <FaChartPie /> Device Breakdown
              </h3>
              
              <div className="insights-content">
                <div className="device-chart">
                  <div className="device-stat">
                    <h4>Mobile</h4>
                    <p className="device-percentage">{analyticsData.deviceStats.mobile}%</p>
                    <div className="device-bar">
                      <div 
                        className="device-bar-fill mobile" 
                        style={{ width: `${analyticsData.deviceStats.mobile}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="device-stat">
                    <h4>Desktop</h4>
                    <p className="device-percentage">{analyticsData.deviceStats.desktop}%</p>
                    <div className="device-bar">
                      <div 
                        className="device-bar-fill desktop" 
                        style={{ width: `${analyticsData.deviceStats.desktop}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="device-stat">
                    <h4>Tablet</h4>
                    <p className="device-percentage">{analyticsData.deviceStats.tablet}%</p>
                    <div className="device-bar">
                      <div 
                        className="device-bar-fill tablet" 
                        style={{ width: `${analyticsData.deviceStats.tablet}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="insights-advice">
                  <h4>Recommendation</h4>
                  <p>Optimize your mobile experience as it accounts for the majority of your traffic.</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;