import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaUserPlus, FaDownload, FaTrash, FaEdit, FaEye, FaUserShield, FaStore } from 'react-icons/fa';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  
  useEffect(() => {
    // Simulated data loading
    setTimeout(() => {
      setUsers([
        { id: 1, name: 'Kofi Mensah', email: 'kofi@example.com', role: 'customer', status: 'active', created: '2025-01-15', lastLogin: '2025-04-24' },
        { id: 2, name: 'Ama Owusu', email: 'ama@example.com', role: 'artisan', status: 'active', created: '2025-02-10', lastLogin: '2025-04-25' },
        { id: 3, name: 'John Addo', email: 'john@example.com', role: 'admin', status: 'active', created: '2024-11-05', lastLogin: '2025-04-26' },
        { id: 4, name: 'Grace Akoto', email: 'grace@example.com', role: 'customer', status: 'inactive', created: '2025-03-20', lastLogin: '2025-04-10' },
        { id: 5, name: 'Daniel Kwame', email: 'daniel@example.com', role: 'artisan', status: 'pending', created: '2025-04-01', lastLogin: 'Never' },
        { id: 6, name: 'Sarah Boateng', email: 'sarah@example.com', role: 'customer', status: 'active', created: '2025-03-15', lastLogin: '2025-04-22' },
        { id: 7, name: 'Ernest Opoku', email: 'ernest@example.com', role: 'customer', status: 'active', created: '2025-02-25', lastLogin: '2025-04-20' },
        { id: 8, name: 'Priscilla Nyarko', email: 'priscilla@example.com', role: 'artisan', status: 'active', created: '2025-01-30', lastLogin: '2025-04-21' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);
  
  const filteredUsers = users.filter(user => {
    // Apply role filter
    if (filter !== 'all' && user.role !== filter) return false;
    
    // Apply search term
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  
  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return <FaUserShield className="role-icon admin-role" />;
      case 'artisan': return <FaStore className="role-icon artisan-role" />;
      default: return null;
    }
  };
  
  const getStatusBadge = (status) => {
    let className = "status-badge";
    switch (status) {
      case 'active': className += " status-active"; break;
      case 'inactive': className += " status-inactive"; break;
      case 'pending': className += " status-pending"; break;
      default: className += " status-inactive";
    }
    return <span className={className}>{status}</span>;
  };
  
  return (
    <div className="admin-user-management">
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">User Management</h2>
          <div className="admin-header-actions">
            <button className="admin-button admin-button-primary" onClick={() => setShowAddUserModal(true)}>
              <FaUserPlus /> Add User
            </button>
            <button className="admin-button admin-button-secondary">
              <FaDownload /> Export
            </button>
          </div>
        </div>
        
        <div className="admin-filter-row">
          <div className="admin-search">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="admin-filter">
            <FaFilter className="filter-icon" />
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Users</option>
              <option value="customer">Customers</option>
              <option value="artisan">Artisans</option>
              <option value="admin">Administrators</option>
            </select>
          </div>
        </div>
        
        {loading ? (
          <div className="admin-loading">
            <div className="spinner"></div>
            <p>Loading users...</p>
          </div>
        ) : (
          <>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Last Login</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id}>
                      <td>#{user.id}</td>
                      <td>
                        <div className="user-name-cell">
                          {getRoleIcon(user.role)}
                          {user.name}
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`role-badge ${user.role}-role`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      <td>{getStatusBadge(user.status)}</td>
                      <td>{user.created}</td>
                      <td>{user.lastLogin}</td>
                      <td>
                        <div className="table-actions">
                          <button className="action-button view-button" title="View User">
                            <FaEye />
                          </button>
                          <button className="action-button edit-button" title="Edit User">
                            <FaEdit />
                          </button>
                          <button className="action-button delete-button" title="Delete User">
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="admin-pagination">
              <div className="pagination-info">
                Showing 1-{filteredUsers.length} of {filteredUsers.length} users
              </div>
              <div className="pagination-controls">
                <button className="pagination-button" disabled>&lt;</button>
                <button className="pagination-button active">1</button>
                <button className="pagination-button">&gt;</button>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Add User Modal (hidden by default) */}
      {showAddUserModal && (
        <div className="admin-modal">
          <div className="admin-modal-content">
            <div className="admin-modal-header">
              <h3>Add New User</h3>
              <button className="modal-close" onClick={() => setShowAddUserModal(false)}>×</button>
            </div>
            
            <div className="admin-modal-body">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Enter full name" />
              </div>
              
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Enter email address" />
              </div>
              
              <div className="form-group">
                <label>Role</label>
                <select>
                  <option value="customer">Customer</option>
                  <option value="artisan">Artisan</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Password</label>
                <input type="password" placeholder="Create password" />
              </div>
              
              <div className="form-group">
                <label>Status</label>
                <select>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
            
            <div className="admin-modal-footer">
              <button 
                className="admin-button admin-button-secondary" 
                onClick={() => setShowAddUserModal(false)}
              >
                Cancel
              </button>
              <button className="admin-button admin-button-primary">
                Create User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;