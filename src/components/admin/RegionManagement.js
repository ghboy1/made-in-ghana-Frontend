import React, { useState, useEffect } from 'react';
import { 
  FaPlus, FaEdit, FaTrash, FaSearch, 
  FaMapMarkedAlt, FaImage, FaUpload, FaCheck, FaTimes
} from 'react-icons/fa';

const RegionManagement = () => {
  const [regions, setRegions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    capital: '',
    description: '',
    image: '',
    icon: '',
    isActive: true
  });
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    // Simulate fetching regions from API
    const fetchRegions = async () => {
      try {
        setIsLoading(true);
        // Replace with actual API call
        const dummyData = [
          { 
            id: 1, 
            name: 'Ashanti Region', 
            capital: 'Kumasi', 
            description: 'Known for kente cloth, wood carving, and traditional crafts',
            image: 'https://example.com/ashanti.jpg',
            icon: '🏛️',
            products: 245,
            artisans: 118,
            isActive: true
          },
          { 
            id: 2, 
            name: 'Greater Accra', 
            capital: 'Accra', 
            description: 'Home to the capital city and major commercial centers',
            image: 'https://example.com/accra.jpg',
            icon: '🏙️',
            products: 320,
            artisans: 145,
            isActive: true
          },
          { 
            id: 3, 
            name: 'Northern Region', 
            capital: 'Tamale', 
            description: 'Rich in traditional smock production and agriculture',
            image: 'https://example.com/northern.jpg',
            icon: '🌄',
            products: 178,
            artisans: 87,
            isActive: true
          },
          { 
            id: 4, 
            name: 'Volta Region', 
            capital: 'Ho', 
            description: 'Famous for kente weaving and natural attractions',
            image: 'https://example.com/volta.jpg',
            icon: '⛰️',
            products: 156,
            artisans: 68,
            isActive: true
          },
          { 
            id: 5, 
            name: 'Western Region', 
            capital: 'Sekondi-Takoradi', 
            description: 'Rich in natural resources including gold and cocoa',
            image: 'https://example.com/western.jpg',
            icon: '🌊',
            products: 198,
            artisans: 92,
            isActive: true
          }
        ];
        
        setTimeout(() => {
          setRegions(dummyData);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching regions:', error);
        setIsLoading(false);
      }
    };
    
    fetchRegions();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredRegions = regions.filter(region => 
    region.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    region.capital.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddNewRegion = () => {
    setSelectedRegion(null);
    setFormData({
      name: '',
      capital: '',
      description: '',
      image: '',
      icon: '',
      isActive: true
    });
    setShowAddModal(true);
  };

  const handleEditRegion = (region) => {
    setSelectedRegion(region);
    setFormData({
      name: region.name,
      capital: region.capital,
      description: region.description,
      image: region.image,
      icon: region.icon,
      isActive: region.isActive
    });
    setShowAddModal(true);
  };

  const handleDeletePrompt = (region) => {
    setConfirmDelete(region);
  };

  const handleDeleteConfirm = () => {
    // Delete logic would go here
    setRegions(regions.filter(region => region.id !== confirmDelete.id));
    setConfirmDelete(null);
  };

  const handleDeleteCancel = () => {
    setConfirmDelete(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (selectedRegion) {
      // Update existing region
      const updatedRegions = regions.map(region => 
        region.id === selectedRegion.id ? { ...region, ...formData } : region
      );
      setRegions(updatedRegions);
    } else {
      // Add new region
      const newRegion = {
        id: regions.length + 1,
        ...formData,
        products: 0,
        artisans: 0
      };
      setRegions([...regions, newRegion]);
    }
    
    setShowAddModal(false);
  };

  const renderAddEditModal = () => {
    if (!showAddModal) return null;
    
    const title = selectedRegion ? 'Edit Region' : 'Add New Region';
    
    return (
      <div className="admin-modal">
        <div className="admin-modal-content">
          <div className="admin-modal-header">
            <h3>{title}</h3>
            <button className="admin-modal-close" onClick={() => setShowAddModal(false)}>×</button>
          </div>
          <div className="admin-modal-body">
            <form onSubmit={handleSubmit}>
              <div className="admin-form-group">
                <label>Region Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  className="admin-input" 
                  required
                />
              </div>
              
              <div className="admin-form-group">
                <label>Capital City</label>
                <input 
                  type="text" 
                  name="capital" 
                  value={formData.capital} 
                  onChange={handleInputChange} 
                  className="admin-input" 
                  required
                />
              </div>
              
              <div className="admin-form-group">
                <label>Description</label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleInputChange} 
                  className="admin-textarea" 
                  rows="3"
                  required
                ></textarea>
              </div>
              
              <div className="admin-form-group">
                <label>Region Icon</label>
                <input 
                  type="text" 
                  name="icon" 
                  value={formData.icon} 
                  onChange={handleInputChange} 
                  className="admin-input" 
                  placeholder="Icon or emoji (e.g., 🏛️, 🌄)"
                />
              </div>
              
              <div className="admin-form-group">
                <label>Region Image</label>
                <div className="admin-file-upload">
                  <input type="file" accept="image/*" />
                  <button type="button" className="admin-button admin-button-secondary">
                    <FaUpload /> Choose Image
                  </button>
                  {formData.image && (
                    <div className="admin-upload-preview">
                      <img src={formData.image} alt="Region Preview" />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="admin-form-group admin-checkbox-group">
                <label>Status</label>
                <div className="admin-checkbox">
                  <input 
                    type="checkbox" 
                    id="isActive" 
                    name="isActive" 
                    checked={formData.isActive} 
                    onChange={handleInputChange} 
                  />
                  <label htmlFor="isActive">Active</label>
                </div>
              </div>
              
              <div className="admin-modal-footer">
                <button type="button" className="admin-button admin-button-secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-button admin-button-primary">
                  {selectedRegion ? 'Update Region' : 'Add Region'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const renderDeleteConfirmation = () => {
    if (!confirmDelete) return null;
    
    return (
      <div className="admin-modal">
        <div className="admin-modal-content admin-modal-sm">
          <div className="admin-modal-header">
            <h3>Confirm Deletion</h3>
            <button className="admin-modal-close" onClick={handleDeleteCancel}>×</button>
          </div>
          <div className="admin-modal-body">
            <p>Are you sure you want to delete <strong>{confirmDelete.name}</strong>?</p>
            <p>This will also affect all products and artisans associated with this region.</p>
          </div>
          <div className="admin-modal-footer">
            <button className="admin-button admin-button-secondary" onClick={handleDeleteCancel}>
              Cancel
            </button>
            <button className="admin-button admin-button-danger" onClick={handleDeleteConfirm}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Loading regions...</p>
      </div>
    );
  }

  return (
    <div className="admin-region-management">
      <div className="admin-card">
        <div className="admin-card-header">
          <h2><FaMapMarkedAlt /> Regions</h2>
          <div className="admin-card-actions">
            <div className="admin-search-box">
              <input 
                type="text" 
                placeholder="Search regions..." 
                value={searchQuery}
                onChange={handleSearch}
              />
              <FaSearch className="search-icon" />
            </div>
            <button className="admin-button admin-button-primary" onClick={handleAddNewRegion}>
              <FaPlus /> Add Region
            </button>
          </div>
        </div>
        
        <div className="admin-table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Region</th>
                <th>Capital</th>
                <th>Description</th>
                <th>Products</th>
                <th>Artisans</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRegions.length === 0 ? (
                <tr>
                  <td colSpan="7" className="no-results">
                    No regions found.
                  </td>
                </tr>
              ) : (
                filteredRegions.map(region => (
                  <tr key={region.id}>
                    <td>
                      <div className="region-info">
                        <span className="region-icon">{region.icon}</span>
                        <span className="region-name">{region.name}</span>
                      </div>
                    </td>
                    <td>{region.capital}</td>
                    <td className="region-description">{region.description}</td>
                    <td>{region.products}</td>
                    <td>{region.artisans}</td>
                    <td>
                      <span className={`status-badge ${region.isActive ? 'status-active' : 'status-inactive'}`}>
                        {region.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <div className="row-actions">
                        <button 
                          className="action-button edit-button" 
                          onClick={() => handleEditRegion(region)}
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          className="action-button delete-button"
                          onClick={() => handleDeletePrompt(region)}
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {renderAddEditModal()}
      {renderDeleteConfirmation()}
    </div>
  );
};

export default RegionManagement;