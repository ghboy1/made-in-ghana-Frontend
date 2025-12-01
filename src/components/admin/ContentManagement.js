import React, { useState, useEffect } from 'react';
import { 
  FaPlus, FaEdit, FaTrash, FaSearch, FaImage, 
  FaFileAlt, FaVideo, FaNewspaper, FaTag, FaFilter,
  FaLink, FaUpload, FaEye, FaSlidersH, FaCalendarAlt
} from 'react-icons/fa';

const ContentManagement = () => {
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [contentType, setContentType] = useState('banners');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    // Simulate fetching content data
    const fetchContent = async () => {
      setIsLoading(true);
      
      // Mock data for different content types
      const mockData = {
        banners: [
          {
            id: 1,
            title: 'Ashanti Crafts Promotion',
            image: 'https://via.placeholder.com/1200x400',
            position: 'home-top',
            url: '/ashanti',
            startDate: '2025-04-15',
            endDate: '2025-05-15',
            status: 'active',
            createdAt: '2025-04-10'
          },
          {
            id: 2,
            title: 'Special Festival Collection',
            image: 'https://via.placeholder.com/1200x400',
            position: 'home-middle',
            url: '/festival-collection',
            startDate: '2025-04-20',
            endDate: '2025-06-01',
            status: 'scheduled',
            createdAt: '2025-04-12'
          },
          {
            id: 3,
            title: 'Kente Cloth Sale',
            image: 'https://via.placeholder.com/1200x400',
            position: 'category',
            url: '/kente-cloth',
            startDate: '2025-03-01',
            endDate: '2025-04-30',
            status: 'inactive',
            createdAt: '2025-02-25'
          }
        ],
        
        blog: [
          {
            id: 1,
            title: 'The Art of Kente Weaving',
            image: 'https://via.placeholder.com/800x400',
            author: 'Kwame Nkrumah',
            excerpt: 'Exploring the rich tradition of Kente cloth weaving in Ghana...',
            category: 'Crafts',
            publishDate: '2025-04-05',
            status: 'published',
            createdAt: '2025-03-29'
          },
          {
            id: 2,
            title: 'Traditional Ghanaian Cuisine',
            image: 'https://via.placeholder.com/800x400',
            author: 'Ama Ata',
            excerpt: 'Discover the flavors and techniques behind Ghana\'s most beloved dishes...',
            category: 'Food',
            publishDate: '2025-04-12',
            status: 'published',
            createdAt: '2025-04-01'
          },
          {
            id: 3,
            title: 'Sustainable Farming Practices in Ghana',
            image: 'https://via.placeholder.com/800x400',
            author: 'Kofi Annan',
            excerpt: 'How local farmers are adopting sustainable methods...',
            category: 'Agriculture',
            publishDate: '2025-04-25',
            status: 'draft',
            createdAt: '2025-04-10'
          }
        ],
        
        videos: [
          {
            id: 1,
            title: 'Ghana Artisan Documentary',
            thumbnail: 'https://via.placeholder.com/640x360',
            videoUrl: 'https://example.com/video1',
            duration: '12:45',
            category: 'Documentary',
            publishDate: '2025-03-15',
            status: 'published',
            createdAt: '2025-03-10'
          },
          {
            id: 2,
            title: 'How to Weave Kente Cloth',
            thumbnail: 'https://via.placeholder.com/640x360',
            videoUrl: 'https://example.com/video2',
            duration: '8:30',
            category: 'Tutorial',
            publishDate: '2025-04-05',
            status: 'published',
            createdAt: '2025-03-25'
          },
          {
            id: 3,
            title: 'Ghana Independence Day Celebration',
            thumbnail: 'https://via.placeholder.com/640x360',
            videoUrl: 'https://example.com/video3',
            duration: '15:20',
            category: 'Event',
            publishDate: '2025-03-06',
            status: 'published',
            createdAt: '2025-03-01'
          }
        ],
        
        pages: [
          {
            id: 1,
            title: 'About Us',
            slug: 'about-us',
            excerpt: 'Learn about our mission to promote Ghanaian crafts and products...',
            status: 'published',
            createdAt: '2025-01-15',
            updatedAt: '2025-03-10'
          },
          {
            id: 2,
            title: 'FAQ',
            slug: 'faq',
            excerpt: 'Frequently asked questions about our products and services...',
            status: 'published',
            createdAt: '2025-01-20',
            updatedAt: '2025-04-05'
          },
          {
            id: 3,
            title: 'Privacy Policy',
            slug: 'privacy-policy',
            excerpt: 'Our policy regarding user data and privacy...',
            status: 'published',
            createdAt: '2025-01-25',
            updatedAt: '2025-02-15'
          }
        ]
      };
      
      setTimeout(() => {
        setContent(mockData[contentType] || []);
        setIsLoading(false);
      }, 800);
    };
    
    fetchContent();
  }, [contentType]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleContentTypeChange = (e) => {
    setContentType(e.target.value);
  };

  const filteredContent = content.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddContent = () => {
    setSelectedContent(null);
    setShowAddModal(true);
  };

  const handleEditContent = (item) => {
    setSelectedContent(item);
    setShowAddModal(true);
  };

  const handleDeletePrompt = (item) => {
    setConfirmDelete(item);
  };

  const handleDeleteConfirm = () => {
    // Delete logic would go here
    setContent(content.filter(item => item.id !== confirmDelete.id));
    setConfirmDelete(null);
  };

  const handleDeleteCancel = () => {
    setConfirmDelete(null);
  };

  const getContentTypeIcon = () => {
    switch (contentType) {
      case 'banners':
        return <FaImage />;
      case 'blog':
        return <FaNewspaper />;
      case 'videos':
        return <FaVideo />;
      case 'pages':
        return <FaFileAlt />;
      default:
        return <FaFileAlt />;
    }
  };

  const renderContentTable = () => {
    if (contentType === 'banners') {
      return (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Image</th>
              <th>Position</th>
              <th>Date Range</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContent.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-results">
                  No banners found.
                </td>
              </tr>
            ) : (
              filteredContent.map(banner => (
                <tr key={banner.id}>
                  <td>{banner.title}</td>
                  <td>
                    <div className="content-thumbnail">
                      <img src={banner.image} alt={banner.title} />
                    </div>
                  </td>
                  <td>{banner.position}</td>
                  <td>
                    {new Date(banner.startDate).toLocaleDateString()} to {new Date(banner.endDate).toLocaleDateString()}
                  </td>
                  <td>
                    <span className={`status-badge status-${banner.status}`}>
                      {banner.status}
                    </span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button 
                        className="action-button view-button" 
                        title="View"
                      >
                        <FaEye />
                      </button>
                      <button 
                        className="action-button edit-button" 
                        onClick={() => handleEditContent(banner)}
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="action-button delete-button"
                        onClick={() => handleDeletePrompt(banner)}
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
      );
    } else if (contentType === 'blog') {
      return (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Publish Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContent.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-results">
                  No blog posts found.
                </td>
              </tr>
            ) : (
              filteredContent.map(post => (
                <tr key={post.id}>
                  <td className="content-title">
                    <div className="title-with-image">
                      <img src={post.image} alt={post.title} className="mini-thumbnail" />
                      <span>{post.title}</span>
                    </div>
                  </td>
                  <td>{post.author}</td>
                  <td>
                    <span className="category-tag">
                      <FaTag /> {post.category}
                    </span>
                  </td>
                  <td>{new Date(post.publishDate).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge status-${post.status}`}>
                      {post.status}
                    </span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button 
                        className="action-button view-button" 
                        title="View"
                      >
                        <FaEye />
                      </button>
                      <button 
                        className="action-button edit-button" 
                        onClick={() => handleEditContent(post)}
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="action-button delete-button"
                        onClick={() => handleDeletePrompt(post)}
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
      );
    } else if (contentType === 'videos') {
      return (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Thumbnail</th>
              <th>Duration</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContent.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-results">
                  No videos found.
                </td>
              </tr>
            ) : (
              filteredContent.map(video => (
                <tr key={video.id}>
                  <td>{video.title}</td>
                  <td>
                    <div className="content-thumbnail">
                      <img src={video.thumbnail} alt={video.title} />
                      <div className="video-duration">{video.duration}</div>
                    </div>
                  </td>
                  <td>{video.duration}</td>
                  <td>{video.category}</td>
                  <td>
                    <span className={`status-badge status-${video.status}`}>
                      {video.status}
                    </span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button 
                        className="action-button view-button" 
                        title="View"
                      >
                        <FaEye />
                      </button>
                      <button 
                        className="action-button edit-button" 
                        onClick={() => handleEditContent(video)}
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="action-button delete-button"
                        onClick={() => handleDeletePrompt(video)}
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
      );
    } else if (contentType === 'pages') {
      return (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Slug</th>
              <th>Updated</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContent.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-results">
                  No pages found.
                </td>
              </tr>
            ) : (
              filteredContent.map(page => (
                <tr key={page.id}>
                  <td>{page.title}</td>
                  <td>
                    <code className="page-slug">/{page.slug}</code>
                  </td>
                  <td>{new Date(page.updatedAt).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge status-${page.status}`}>
                      {page.status}
                    </span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button 
                        className="action-button view-button" 
                        title="View"
                      >
                        <FaEye />
                      </button>
                      <button 
                        className="action-button edit-button" 
                        onClick={() => handleEditContent(page)}
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="action-button delete-button"
                        onClick={() => handleDeletePrompt(page)}
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
      );
    }
  };

  const renderAddContentModal = () => {
    if (!showAddModal) return null;
    
    const title = selectedContent ? `Edit ${contentType.slice(0, -1)}` : `Add New ${contentType.slice(0, -1)}`;
    
    return (
      <div className="admin-modal">
        <div className="admin-modal-content">
          <div className="admin-modal-header">
            <h3>{title}</h3>
            <button className="admin-modal-close" onClick={() => setShowAddModal(false)}>×</button>
          </div>
          <div className="admin-modal-body">
            {/* Form content would change based on content type */}
            <div className="admin-form-group">
              <label>Title</label>
              <input 
                type="text" 
                className="admin-input" 
                defaultValue={selectedContent ? selectedContent.title : ''}
              />
            </div>
            
            {contentType === 'banners' && (
              <>
                <div className="admin-form-group">
                  <label>Image</label>
                  <div className="admin-file-upload">
                    <input type="file" accept="image/*" />
                    <button className="admin-button admin-button-secondary">
                      <FaImage /> Choose Image
                    </button>
                    {selectedContent && (
                      <div className="admin-upload-preview">
                        <img src={selectedContent.image} alt="Preview" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="admin-form-group">
                  <label>Position</label>
                  <select className="admin-select">
                    <option value="home-top">Home Page (Top)</option>
                    <option value="home-middle">Home Page (Middle)</option>
                    <option value="home-bottom">Home Page (Bottom)</option>
                    <option value="category">Category Pages</option>
                    <option value="product">Product Pages</option>
                  </select>
                </div>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Start Date</label>
                    <input 
                      type="date" 
                      className="admin-input" 
                      defaultValue={selectedContent ? selectedContent.startDate : ''}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>End Date</label>
                    <input 
                      type="date" 
                      className="admin-input" 
                      defaultValue={selectedContent ? selectedContent.endDate : ''}
                    />
                  </div>
                </div>
                <div className="admin-form-group">
                  <label>Link URL</label>
                  <input 
                    type="text" 
                    className="admin-input" 
                    defaultValue={selectedContent ? selectedContent.url : ''}
                    placeholder="/product-category or https://..."
                  />
                </div>
              </>
            )}
            
            {contentType === 'blog' && (
              <>
                <div className="admin-form-group">
                  <label>Featured Image</label>
                  <div className="admin-file-upload">
                    <input type="file" accept="image/*" />
                    <button className="admin-button admin-button-secondary">
                      <FaImage /> Choose Image
                    </button>
                    {selectedContent && (
                      <div className="admin-upload-preview">
                        <img src={selectedContent.image} alt="Preview" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Author</label>
                    <input 
                      type="text" 
                      className="admin-input" 
                      defaultValue={selectedContent ? selectedContent.author : ''}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Category</label>
                    <select className="admin-select">
                      <option value="Crafts">Crafts</option>
                      <option value="Food">Food</option>
                      <option value="Agriculture">Agriculture</option>
                      <option value="Culture">Culture</option>
                      <option value="Business">Business</option>
                    </select>
                  </div>
                </div>
                <div className="admin-form-group">
                  <label>Excerpt</label>
                  <textarea 
                    className="admin-textarea" 
                    rows="3"
                    defaultValue={selectedContent ? selectedContent.excerpt : ''}
                  ></textarea>
                </div>
                <div className="admin-form-group">
                  <label>Content</label>
                  <textarea 
                    className="admin-textarea" 
                    rows="10"
                    defaultValue=""
                  ></textarea>
                </div>
                <div className="admin-form-group">
                  <label>Publish Date</label>
                  <input 
                    type="date" 
                    className="admin-input" 
                    defaultValue={selectedContent ? selectedContent.publishDate : ''}
                  />
                </div>
              </>
            )}
            
            {contentType === 'videos' && (
              <>
                <div className="admin-form-group">
                  <label>Video URL</label>
                  <input 
                    type="text" 
                    className="admin-input" 
                    defaultValue={selectedContent ? selectedContent.videoUrl : ''}
                    placeholder="https://..."
                  />
                </div>
                <div className="admin-form-group">
                  <label>Thumbnail</label>
                  <div className="admin-file-upload">
                    <input type="file" accept="image/*" />
                    <button className="admin-button admin-button-secondary">
                      <FaImage /> Choose Image
                    </button>
                    {selectedContent && (
                      <div className="admin-upload-preview">
                        <img src={selectedContent.thumbnail} alt="Preview" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Duration</label>
                    <input 
                      type="text" 
                      className="admin-input" 
                      defaultValue={selectedContent ? selectedContent.duration : ''}
                      placeholder="MM:SS"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Category</label>
                    <select className="admin-select">
                      <option value="Tutorial">Tutorial</option>
                      <option value="Documentary">Documentary</option>
                      <option value="Event">Event</option>
                      <option value="Interview">Interview</option>
                    </select>
                  </div>
                </div>
                <div className="admin-form-group">
                  <label>Description</label>
                  <textarea 
                    className="admin-textarea" 
                    rows="4"
                    defaultValue=""
                  ></textarea>
                </div>
                <div className="admin-form-group">
                  <label>Publish Date</label>
                  <input 
                    type="date" 
                    className="admin-input" 
                    defaultValue={selectedContent ? selectedContent.publishDate : ''}
                  />
                </div>
              </>
            )}
            
            {contentType === 'pages' && (
              <>
                <div className="admin-form-group">
                  <label>Slug</label>
                  <div className="admin-input-group">
                    <span className="admin-input-prefix">/</span>
                    <input 
                      type="text" 
                      className="admin-input" 
                      defaultValue={selectedContent ? selectedContent.slug : ''}
                      placeholder="page-slug"
                    />
                  </div>
                </div>
                <div className="admin-form-group">
                  <label>Excerpt</label>
                  <textarea 
                    className="admin-textarea" 
                    rows="3"
                    defaultValue={selectedContent ? selectedContent.excerpt : ''}
                  ></textarea>
                </div>
                <div className="admin-form-group">
                  <label>Content</label>
                  <textarea 
                    className="admin-textarea" 
                    rows="10"
                    defaultValue=""
                  ></textarea>
                </div>
                <div className="admin-form-group">
                  <label>Meta Title</label>
                  <input 
                    type="text" 
                    className="admin-input" 
                    defaultValue=""
                  />
                </div>
                <div className="admin-form-group">
                  <label>Meta Description</label>
                  <textarea 
                    className="admin-textarea" 
                    rows="2"
                    defaultValue=""
                  ></textarea>
                </div>
              </>
            )}
            
            <div className="admin-form-group">
              <label>Status</label>
              <select className="admin-select">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>
          </div>
          <div className="admin-modal-footer">
            <button className="admin-button admin-button-secondary" onClick={() => setShowAddModal(false)}>
              Cancel
            </button>
            <button className="admin-button admin-button-primary">
              {selectedContent ? 'Update' : 'Save'}
            </button>
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
            <p>Are you sure you want to delete <strong>{confirmDelete.title}</strong>?</p>
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

  return (
    <div className="admin-content-management">
      <div className="admin-page-header">
        <h2>Content Management</h2>
        <button 
          className="admin-button admin-button-primary"
          onClick={handleAddContent}
        >
          <FaPlus /> Add New {contentType.slice(0, -1)}
        </button>
      </div>
      
      <div className="admin-card">
        <div className="admin-content-tabs">
          <button 
            className={`admin-tab ${contentType === 'banners' ? 'active' : ''}`}
            onClick={() => setContentType('banners')}
          >
            <FaImage /> Banners
          </button>
          <button 
            className={`admin-tab ${contentType === 'blog' ? 'active' : ''}`}
            onClick={() => setContentType('blog')}
          >
            <FaNewspaper /> Blog
          </button>
          <button 
            className={`admin-tab ${contentType === 'videos' ? 'active' : ''}`}
            onClick={() => setContentType('videos')}
          >
            <FaVideo /> Videos
          </button>
          <button 
            className={`admin-tab ${contentType === 'pages' ? 'active' : ''}`}
            onClick={() => setContentType('pages')}
          >
            <FaFileAlt /> Pages
          </button>
        </div>
        
        <div className="admin-search-filter">
          <div className="admin-search">
            <input 
              type="text" 
              placeholder={`Search ${contentType}...`} 
              value={searchQuery}
              onChange={handleSearch}
            />
            <FaSearch className="search-icon" />
          </div>
        </div>
        
        <div className="admin-content-table">
          {isLoading ? (
            <div className="admin-loading">
              <div className="spinner"></div>
              <p>Loading content...</p>
            </div>
          ) : (
            renderContentTable()
          )}
        </div>
      </div>
      
      {renderAddContentModal()}
      {renderDeleteConfirmation()}
    </div>
  );
};

export default ContentManagement;