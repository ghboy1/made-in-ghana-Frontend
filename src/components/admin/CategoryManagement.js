import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaArrowUp, FaArrowDown, FaFolder, FaFolderOpen, FaSlidersH } from 'react-icons/fa';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  
  useEffect(() => {
    // Simulate fetching categories
    setTimeout(() => {
      const sampleCategories = [
        {
          id: 1,
          name: 'Fashion',
          slug: 'fashion',
          description: 'Traditional and modern Ghanaian fashion',
          productCount: 156,
          subcategories: [
            { id: 101, name: 'Men\'s Fashion', slug: 'mens-fashion', productCount: 45 },
            { id: 102, name: 'Women\'s Fashion', slug: 'womens-fashion', productCount: 68 },
            { id: 103, name: 'Children\'s Clothing', slug: 'childrens-clothing', productCount: 32 },
            { id: 104, name: 'Accessories', slug: 'fashion-accessories', productCount: 11 }
          ]
        },
        {
          id: 2,
          name: 'Food & Drinks',
          slug: 'food-drinks',
          description: 'Authentic Ghanaian food products and beverages',
          productCount: 98,
          subcategories: [
            { id: 201, name: 'Grains & Cereals', slug: 'grains-cereals', productCount: 25 },
            { id: 202, name: 'Spices & Herbs', slug: 'spices-herbs', productCount: 30 },
            { id: 203, name: 'Beverages', slug: 'beverages', productCount: 18 },
            { id: 204, name: 'Snacks', slug: 'snacks', productCount: 25 }
          ]
        },
        {
          id: 3,
          name: 'Home & Kitchen',
          slug: 'home-kitchen',
          description: 'Handcrafted homewares and kitchenware from Ghana',
          productCount: 72,
          subcategories: [
            { id: 301, name: 'Textiles', slug: 'textiles', productCount: 20 },
            { id: 302, name: 'Cookware', slug: 'cookware', productCount: 15 },
            { id: 303, name: 'Baskets & Storage', slug: 'baskets-storage', productCount: 25 },
            { id: 304, name: 'Home Decor', slug: 'home-decor', productCount: 12 }
          ]
        },
        {
          id: 4,
          name: 'Beauty & Personal Care',
          slug: 'beauty-personal-care',
          description: 'Natural beauty products made in Ghana',
          productCount: 64,
          subcategories: [
            { id: 401, name: 'Skincare', slug: 'skincare', productCount: 24 },
            { id: 402, name: 'Hair Care', slug: 'hair-care', productCount: 18 },
            { id: 403, name: 'Body Care', slug: 'body-care', productCount: 22 }
          ]
        },
        {
          id: 5,
          name: 'Arts & Crafts',
          slug: 'arts-crafts',
          description: 'Traditional and contemporary Ghanaian arts and crafts',
          productCount: 85,
          subcategories: [
            { id: 501, name: 'Paintings', slug: 'paintings', productCount: 28 },
            { id: 502, name: 'Sculptures', slug: 'sculptures', productCount: 15 },
            { id: 503, name: 'Jewelry', slug: 'jewelry', productCount: 30 },
            { id: 504, name: 'Textile Art', slug: 'textile-art', productCount: 12 }
          ]
        }
      ];
      
      setCategories(sampleCategories);
      setLoading(false);
    }, 1000);
  }, []);
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAddCategory = () => {
    setEditingCategory(null);
    setShowAddModal(true);
  };
  
  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowAddModal(true);
  };
  
  const toggleCategoryExpansion = (categoryId) => {
    setExpandedCategories({
      ...expandedCategories,
      [categoryId]: !expandedCategories[categoryId]
    });
  };
  
  const handleMoveUp = (index) => {
    if (index === 0) return;
    const newCategories = [...categories];
    [newCategories[index], newCategories[index - 1]] = [newCategories[index - 1], newCategories[index]];
    setCategories(newCategories);
  };
  
  const handleMoveDown = (index) => {
    if (index === categories.length - 1) return;
    const newCategories = [...categories];
    [newCategories[index], newCategories[index + 1]] = [newCategories[index + 1], newCategories[index]];
    setCategories(newCategories);
  };
  
  return (
    <div className="admin-category-management">
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Category Management</h2>
          <div className="admin-header-actions">
            <button className="admin-button admin-button-primary" onClick={handleAddCategory}>
              <FaPlus /> Add Category
            </button>
          </div>
        </div>
        
        <div className="admin-filter-row">
          <div className="admin-search">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search categories..." 
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        
        {loading ? (
          <div className="admin-loading">
            <div className="spinner"></div>
            <p>Loading categories...</p>
          </div>
        ) : (
          <div className="category-list">
            <table className="admin-table category-table">
              <thead>
                <tr>
                  <th style={{ width: '40%' }}>Category Name</th>
                  <th style={{ width: '25%' }}>Slug</th>
                  <th style={{ width: '15%' }}>Products</th>
                  <th style={{ width: '20%' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category, index) => (
                  <React.Fragment key={category.id}>
                    <tr className="parent-category-row">
                      <td>
                        <div className="category-name-cell">
                          <button 
                            className="expand-button"
                            onClick={() => toggleCategoryExpansion(category.id)}
                          >
                            {expandedCategories[category.id] ? 
                              <FaFolderOpen className="folder-icon" /> : 
                              <FaFolder className="folder-icon" />
                            }
                          </button>
                          <span className="category-name">{category.name}</span>
                        </div>
                      </td>
                      <td>{category.slug}</td>
                      <td>{category.productCount}</td>
                      <td>
                        <div className="table-actions">
                          <button 
                            className="action-button edit-button" 
                            title="Edit Category"
                            onClick={() => handleEditCategory(category)}
                          >
                            <FaEdit />
                          </button>
                          <button 
                            className="action-button delete-button" 
                            title="Delete Category"
                          >
                            <FaTrash />
                          </button>
                          <button 
                            className="action-button move-button" 
                            title="Move Up"
                            onClick={() => handleMoveUp(index)}
                            disabled={index === 0}
                          >
                            <FaArrowUp />
                          </button>
                          <button 
                            className="action-button move-button" 
                            title="Move Down"
                            onClick={() => handleMoveDown(index)}
                            disabled={index === categories.length - 1}
                          >
                            <FaArrowDown />
                          </button>
                        </div>
                      </td>
                    </tr>
                    
                    {/* Subcategories */}
                    {expandedCategories[category.id] && category.subcategories && 
                      category.subcategories.map(subcategory => (
                        <tr key={subcategory.id} className="subcategory-row">
                          <td>
                            <div className="subcategory-name-cell">
                              <span className="subcategory-indent"></span>
                              <span className="subcategory-name">{subcategory.name}</span>
                            </div>
                          </td>
                          <td>{subcategory.slug}</td>
                          <td>{subcategory.productCount}</td>
                          <td>
                            <div className="table-actions">
                              <button 
                                className="action-button edit-button" 
                                title="Edit Subcategory"
                              >
                                <FaEdit />
                              </button>
                              <button 
                                className="action-button delete-button" 
                                title="Delete Subcategory"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    }
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Add/Edit Category Modal */}
      {showAddModal && (
        <div className="admin-modal">
          <div className="admin-modal-content">
            <div className="admin-modal-header">
              <h3>{editingCategory ? 'Edit Category' : 'Add New Category'}</h3>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>×</button>
            </div>
            
            <div className="admin-modal-body">
              <div className="form-group">
                <label>Category Name</label>
                <input 
                  type="text" 
                  placeholder="Enter category name" 
                  defaultValue={editingCategory ? editingCategory.name : ''}
                />
              </div>
              
              <div className="form-group">
                <label>Slug</label>
                <input 
                  type="text" 
                  placeholder="Enter slug (or leave blank to auto-generate)" 
                  defaultValue={editingCategory ? editingCategory.slug : ''}
                />
                <small className="form-help">URL-friendly name, e.g., "womens-fashion"</small>
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  placeholder="Enter category description" 
                  rows="3"
                  defaultValue={editingCategory ? editingCategory.description : ''}
                ></textarea>
              </div>
              
              {!editingCategory && (
                <div className="form-group">
                  <label>Parent Category</label>
                  <select>
                    <option value="">None (Top Level Category)</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
              )}
              
              <div className="form-group">
                <label>Display Order</label>
                <input 
                  type="number" 
                  placeholder="Enter display order" 
                  defaultValue={editingCategory ? categories.findIndex(c => c.id === editingCategory.id) + 1 : categories.length + 1}
                />
              </div>
              
              <div className="form-group">
                <label>Category Image</label>
                <div className="file-upload">
                  <input type="file" id="categoryImage" />
                  <label htmlFor="categoryImage" className="file-upload-button">
                    Choose File
                  </label>
                  <span className="file-name">No file chosen</span>
                </div>
              </div>
            </div>
            
            <div className="admin-modal-footer">
              <button 
                className="admin-button admin-button-secondary" 
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button className="admin-button admin-button-primary">
                {editingCategory ? 'Update Category' : 'Create Category'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;