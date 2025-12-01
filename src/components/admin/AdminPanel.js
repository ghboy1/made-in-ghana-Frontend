import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaHome, FaBox, FaUsers, FaChartBar, FaShoppingCart, 
  FaTags, FaImages, FaMapMarkerAlt, FaHandshake, FaCog, 
  FaSignOutAlt, FaBell, FaSearch, FaPlus, FaFilter, 
  FaDownload, FaUpload, FaTrash, FaEdit, FaEye 
} from 'react-icons/fa';
import { GiAfrica } from 'react-icons/gi';
import { useAuth } from '../../contexts/AuthContext';
import './AdminPanel.css';

// Lazy-loaded admin sub-pages for better performance
const Dashboard = lazy(() => import('./Dashboard'));
const ProductManagement = lazy(() => import('./ProductManagement'));
const UserManagement = lazy(() => import('./UserManagement'));
const OrderManagement = lazy(() => import('./OrderManagement'));
const Analytics = lazy(() => import('./Analytics'));
const CategoryManagement = lazy(() => import('./CategoryManagement'));
const ContentManagement = lazy(() => import('./ContentManagement'));
const RegionManagement = lazy(() => import('./RegionManagement'));
const ArtisanApplications = lazy(() => import('./ArtisanApplications'));
const Settings = lazy(() => import('./Settings'));

const AdminPanel = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check admin authorization
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login', { state: { from: location, message: 'You must be an admin to access this page' } });
    }
  }, [user, navigate, location]);
  
  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Replace with actual API call
        const response = await fetch('/api/admin/notifications');
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    
    fetchNotifications();
    
    // Set up polling or websocket connection for real-time updates
    const interval = setInterval(fetchNotifications, 5 * 60 * 1000); // Poll every 5 minutes
    
    return () => clearInterval(interval);
  }, []);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Implement admin panel search functionality
    console.log('Searching for:', searchQuery);
  };
  
  const getPageTitle = () => {
    const path = location.pathname.split('/admin/')[1] || '';
    if (!path) return 'Dashboard';
    return path.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  
  // Navigation items with icons
  const navItems = [
    { path: '/admin', icon: <FaHome />, label: 'Dashboard', exact: true },
    { path: '/admin/products', icon: <FaBox />, label: 'Products' },
    { path: '/admin/users', icon: <FaUsers />, label: 'Users' },
    { path: '/admin/orders', icon: <FaShoppingCart />, label: 'Orders' },
    { path: '/admin/analytics', icon: <FaChartBar />, label: 'Analytics' },
    { path: '/admin/categories', icon: <FaTags />, label: 'Categories' },
    { path: '/admin/content', icon: <FaImages />, label: 'Content' },
    { path: '/admin/regions', icon: <FaMapMarkerAlt />, label: 'Regions' },
    { path: '/admin/artisan-applications', icon: <FaHandshake />, label: 'Artisan Applications' },
    { path: '/admin/settings', icon: <FaCog />, label: 'Settings' },
  ];
  
  // Loading fallback component
  const LoadingFallback = () => (
    <div className="admin-loading">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
  
  return (
    <div className={`admin-panel ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div className="admin-logo">
            <GiAfrica className="admin-logo-icon" />
            {!isSidebarCollapsed && <h2>Made in Ghana</h2>}
          </div>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <span></span>
          </button>
        </div>
        
        <nav className="admin-nav">
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => isActive ? 'active' : ''}
                  end={item.exact}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {!isSidebarCollapsed && <span className="nav-label">{item.label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="admin-sidebar-footer">
          <button className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt />
            {!isSidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <h1 className="page-title">{getPageTitle()}</h1>
          
          <div className="admin-header-actions">
            <form className="admin-search" onSubmit={handleSearch}>
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">
                <FaSearch />
              </button>
            </form>
            
            <div className="notifications-container">
              <button 
                className="notifications-button" 
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <FaBell />
                {notifications.length > 0 && (
                  <span className="notification-badge">{notifications.length}</span>
                )}
              </button>
              
              {showNotifications && (
                <div className="notifications-dropdown">
                  <h3>Notifications</h3>
                  {notifications.length > 0 ? (
                    <ul className="notifications-list">
                      {notifications.map((notification) => (
                        <li key={notification.id} className={notification.read ? 'read' : 'unread'}>
                          <div className="notification-content">
                            <p>{notification.message}</p>
                            <span className="notification-time">
                              {new Date(notification.timestamp).toLocaleString()}
                            </span>
                          </div>
                          {!notification.read && (
                            <button className="mark-read-button">Mark as read</button>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="no-notifications">No new notifications</p>
                  )}
                  <button className="view-all-button">View all notifications</button>
                </div>
              )}
            </div>
            
            <div className="admin-profile">
              <img 
                src={user?.avatar || '/default-avatar.png'} 
                alt="Admin profile" 
                className="admin-avatar"
              />
              {!isSidebarCollapsed && (
                <div className="admin-info">
                  <p className="admin-name">{user?.name || 'Admin User'}</p>
                  <p className="admin-role">Administrator</p>
                </div>
              )}
            </div>
          </div>
        </header>
        
        {/* Content area */}
        <div className="admin-content">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products/*" element={<ProductManagement />} />
              <Route path="/users/*" element={<UserManagement />} />
              <Route path="/orders/*" element={<OrderManagement />} />
              <Route path="/analytics/*" element={<Analytics />} />
              <Route path="/categories/*" element={<CategoryManagement />} />
              <Route path="/content/*" element={<ContentManagement />} />
              <Route path="/regions/*" element={<RegionManagement />} />
              <Route path="/artisan-applications/*" element={<ArtisanApplications />} />
              <Route path="/settings/*" element={<Settings />} />
            </Routes>
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;