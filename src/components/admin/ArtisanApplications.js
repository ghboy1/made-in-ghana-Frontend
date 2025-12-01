import React, { useState, useEffect } from 'react';
import { 
  FaHandshake, FaSearch, FaEye, FaCheck, 
  FaTimes, FaDownload, FaFilter, FaEnvelope 
} from 'react-icons/fa';

const ArtisanApplications = () => {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [processingAction, setProcessingAction] = useState(false);

  useEffect(() => {
    // Simulate fetching applications from API
    const fetchApplications = async () => {
      try {
        setIsLoading(true);
        // Replace with actual API call
        const dummyData = [
          {
            id: 'APP12345',
            artisanName: 'Kwame Osei',
            businessName: 'Kwame Crafts',
            email: 'kwame.osei@example.com',
            phone: '+233 54 123 4567',
            region: 'Ashanti',
            craftType: 'Wood Carving',
            submissionDate: '2025-04-10',
            status: 'pending',
            supportingDocs: ['business_license.pdf', 'portfolio.pdf'],
            experience: '15+ years in traditional wood carving',
            samples: ['sample1.jpg', 'sample2.jpg', 'sample3.jpg'],
            socialProfiles: {
              instagram: '@kwamecrafts',
              facebook: 'KwameCrafts',
              website: 'www.kwamecrafts.com'
            },
            notes: '',
            rating: 4.5
          },
          {
            id: 'APP12346',
            artisanName: 'Ama Serwaa',
            businessName: 'Ama Kente Weaving',
            email: 'ama.serwaa@example.com',
            phone: '+233 24 765 4321',
            region: 'Volta',
            craftType: 'Kente Weaving',
            submissionDate: '2025-04-12',
            status: 'approved',
            supportingDocs: ['business_registration.pdf', 'artisan_profile.pdf'],
            experience: '20+ years in Kente weaving',
            samples: ['kente1.jpg', 'kente2.jpg', 'kente3.jpg'],
            socialProfiles: {
              instagram: '@amakente',
              facebook: 'AmaKenteGH',
              website: 'www.amakente.com'
            },
            notes: 'Exceptional quality, approved on first review',
            rating: 5.0
          },
          {
            id: 'APP12347',
            artisanName: 'Kofi Mensah',
            businessName: 'Kofi Beads & Jewelry',
            email: 'kofi.mensah@example.com',
            phone: '+233 23 987 6543',
            region: 'Eastern',
            craftType: 'Bead Making',
            submissionDate: '2025-04-15',
            status: 'rejected',
            supportingDocs: ['application.pdf'],
            experience: '5 years in bead making',
            samples: ['beads1.jpg', 'beads2.jpg'],
            socialProfiles: {
              instagram: '@kofibeads',
              facebook: '',
              website: ''
            },
            notes: 'Rejected due to poor quality samples and incomplete documentation',
            rating: 2.0
          },
          {
            id: 'APP12348',
            artisanName: 'Abena Yeboah',
            businessName: 'Abena Shea Products',
            email: 'abena.yeboah@example.com',
            phone: '+233 26 345 6789',
            region: 'Northern',
            craftType: 'Shea Butter Production',
            submissionDate: '2025-04-18',
            status: 'pending',
            supportingDocs: ['business_plan.pdf', 'certification.pdf', 'samples_info.pdf'],
            experience: '10 years in traditional shea butter production',
            samples: ['shea1.jpg', 'shea2.jpg', 'shea3.jpg', 'shea4.jpg'],
            socialProfiles: {
              instagram: '@abenashea',
              facebook: 'AbenaSheaGhana',
              website: 'www.abenashea.com'
            },
            notes: '',
            rating: 4.0
          },
          {
            id: 'APP12349',
            artisanName: 'Kwesi Amankwah',
            businessName: 'Kwesi Drums',
            email: 'kwesi.drums@example.com',
            phone: '+233 55 789 0123',
            region: 'Central',
            craftType: 'Traditional Drums',
            submissionDate: '2025-04-20',
            status: 'pending',
            supportingDocs: ['business_information.pdf', 'product_catalog.pdf'],
            experience: '25+ years making traditional drums',
            samples: ['drum1.jpg', 'drum2.jpg'],
            socialProfiles: {
              instagram: '@kwesidrums',
              facebook: 'KwesiTraditionalDrums',
              website: ''
            },
            notes: '',
            rating: 4.2
          }
        ];
        
        setTimeout(() => {
          setApplications(dummyData);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching artisan applications:', error);
        setIsLoading(false);
      }
    };
    
    fetchApplications();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.artisanName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewApplication = (application) => {
    setSelectedApplication(application);
    setShowDetailModal(true);
  };

  const handleApproveApplication = (application) => {
    setProcessingAction(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedApplications = applications.map(app => 
        app.id === application.id 
          ? { ...app, status: 'approved', notes: app.notes + '\nApproved on ' + new Date().toLocaleDateString() } 
          : app
      );
      
      setApplications(updatedApplications);
      setSelectedApplication({ ...application, status: 'approved' });
      setProcessingAction(false);
    }, 1000);
  };

  const handleRejectApplication = (application) => {
    setProcessingAction(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedApplications = applications.map(app => 
        app.id === application.id 
          ? { ...app, status: 'rejected', notes: app.notes + '\nRejected on ' + new Date().toLocaleDateString() } 
          : app
      );
      
      setApplications(updatedApplications);
      setSelectedApplication({ ...application, status: 'rejected' });
      setProcessingAction(false);
    }, 1000);
  };

  const handleSendEmail = (application) => {
    setSendingEmail(true);
    
    // Simulate sending email
    setTimeout(() => {
      setSendingEmail(false);
      alert(`Email sent to ${application.artisanName} at ${application.email}`);
    }, 1500);
  };

  const handleAddNote = (note) => {
    if (!note.trim()) return;
    
    const updatedApplication = { 
      ...selectedApplication, 
      notes: selectedApplication.notes 
        ? `${selectedApplication.notes}\n${note}` 
        : note 
    };
    
    const updatedApplications = applications.map(app => 
      app.id === selectedApplication.id ? updatedApplication : app
    );
    
    setApplications(updatedApplications);
    setSelectedApplication(updatedApplication);
  };

  const renderDetailModal = () => {
    if (!showDetailModal || !selectedApplication) return null;
    
    const { 
      id, artisanName, businessName, email, phone, region, craftType,
      submissionDate, status, supportingDocs, experience, samples,
      socialProfiles, notes, rating
    } = selectedApplication;
    
    return (
      <div className="admin-modal">
        <div className="admin-modal-content admin-modal-lg">
          <div className="admin-modal-header">
            <h3>Artisan Application Details</h3>
            <div className="application-id">ID: {id}</div>
            <button className="admin-modal-close" onClick={() => setShowDetailModal(false)}>×</button>
          </div>
          
          <div className="admin-modal-body">
            <div className="application-status-bar">
              <div className={`application-status status-${status}`}>
                {status === 'pending' && 'Pending Review'}
                {status === 'approved' && 'Approved'}
                {status === 'rejected' && 'Rejected'}
              </div>
              
              <div className="application-actions">
                {status === 'pending' && (
                  <>
                    <button 
                      className="admin-button admin-button-success"
                      onClick={() => handleApproveApplication(selectedApplication)}
                      disabled={processingAction}
                    >
                      <FaCheck /> {processingAction ? 'Processing...' : 'Approve'}
                    </button>
                    <button 
                      className="admin-button admin-button-danger"
                      onClick={() => handleRejectApplication(selectedApplication)}
                      disabled={processingAction}
                    >
                      <FaTimes /> {processingAction ? 'Processing...' : 'Reject'}
                    </button>
                  </>
                )}
                <button 
                  className="admin-button admin-button-secondary"
                  onClick={() => handleSendEmail(selectedApplication)}
                  disabled={sendingEmail}
                >
                  <FaEnvelope /> {sendingEmail ? 'Sending...' : 'Contact Artisan'}
                </button>
              </div>
            </div>
            
            <div className="application-details-grid">
              <div className="application-details-column">
                <div className="details-section">
                  <h4>Artisan Information</h4>
                  <div className="details-row">
                    <div className="detail-label">Name:</div>
                    <div className="detail-value">{artisanName}</div>
                  </div>
                  <div className="details-row">
                    <div className="detail-label">Business:</div>
                    <div className="detail-value">{businessName}</div>
                  </div>
                  <div className="details-row">
                    <div className="detail-label">Craft Type:</div>
                    <div className="detail-value">{craftType}</div>
                  </div>
                  <div className="details-row">
                    <div className="detail-label">Region:</div>
                    <div className="detail-value">{region}</div>
                  </div>
                  <div className="details-row">
                    <div className="detail-label">Experience:</div>
                    <div className="detail-value">{experience}</div>
                  </div>
                </div>
                
                <div className="details-section">
                  <h4>Contact Information</h4>
                  <div className="details-row">
                    <div className="detail-label">Email:</div>
                    <div className="detail-value">{email}</div>
                  </div>
                  <div className="details-row">
                    <div className="detail-label">Phone:</div>
                    <div className="detail-value">{phone}</div>
                  </div>
                  <div className="details-row">
                    <div className="detail-label">Website:</div>
                    <div className="detail-value">
                      {socialProfiles.website ? (
                        <a href={`https://${socialProfiles.website}`} target="_blank" rel="noopener noreferrer">
                          {socialProfiles.website}
                        </a>
                      ) : (
                        'N/A'
                      )}
                    </div>
                  </div>
                  <div className="details-row">
                    <div className="detail-label">Social:</div>
                    <div className="detail-value">
                      <div className="social-links">
                        {socialProfiles.instagram && (
                          <div>Instagram: {socialProfiles.instagram}</div>
                        )}
                        {socialProfiles.facebook && (
                          <div>Facebook: {socialProfiles.facebook}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="details-section">
                  <h4>Documents</h4>
                  <ul className="document-list">
                    {supportingDocs.map((doc, index) => (
                      <li key={index} className="document-item">
                        <span className="document-name">{doc}</span>
                        <button className="document-download">
                          <FaDownload /> Download
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="application-details-column">
                <div className="details-section">
                  <h4>Product Samples</h4>
                  <div className="sample-images">
                    {samples.map((sample, index) => (
                      <div key={index} className="sample-image-container">
                        <img 
                          src={`https://via.placeholder.com/150?text=${sample}`} 
                          alt={`Sample ${index + 1}`} 
                          className="sample-image"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="details-section">
                  <h4>Application Notes</h4>
                  <div className="notes-container">
                    <div className="existing-notes">
                      {notes ? (
                        <pre className="notes-content">{notes}</pre>
                      ) : (
                        <p className="no-notes">No notes yet.</p>
                      )}
                    </div>
                    
                    <div className="add-note">
                      <h5>Add a Note</h5>
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        const noteInput = e.target.elements.note;
                        handleAddNote(noteInput.value);
                        noteInput.value = '';
                      }}>
                        <textarea 
                          name="note" 
                          className="admin-textarea" 
                          rows="3" 
                          placeholder="Enter a note about this application..."
                        ></textarea>
                        <button type="submit" className="admin-button admin-button-primary">
                          Add Note
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Loading applications...</p>
      </div>
    );
  }

  return (
    <div className="admin-artisan-applications">
      <div className="admin-card">
        <div className="admin-card-header">
          <h2><FaHandshake /> Artisan Applications</h2>
          <div className="admin-card-actions">
            <div className="admin-filter">
              <FaFilter />
              <select value={statusFilter} onChange={handleStatusFilterChange} className="admin-select">
                <option value="all">All Applications</option>
                <option value="pending">Pending Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="admin-search-box">
              <input 
                type="text" 
                placeholder="Search applications..." 
                value={searchQuery}
                onChange={handleSearch}
              />
              <FaSearch className="search-icon" />
            </div>
          </div>
        </div>
        
        <div className="admin-table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Artisan</th>
                <th>Business</th>
                <th>Craft Type</th>
                <th>Region</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.length === 0 ? (
                <tr>
                  <td colSpan="8" className="no-results">
                    No applications found.
                  </td>
                </tr>
              ) : (
                filteredApplications.map(application => (
                  <tr key={application.id}>
                    <td>{application.id}</td>
                    <td>{application.artisanName}</td>
                    <td>{application.businessName}</td>
                    <td>{application.craftType}</td>
                    <td>{application.region}</td>
                    <td>{new Date(application.submissionDate).toLocaleDateString()}</td>
                    <td>
                      <span className={`status-badge status-${application.status}`}>
                        {application.status === 'pending' && 'Pending'}
                        {application.status === 'approved' && 'Approved'}
                        {application.status === 'rejected' && 'Rejected'}
                      </span>
                    </td>
                    <td>
                      <div className="row-actions">
                        <button 
                          className="action-button view-button" 
                          onClick={() => handleViewApplication(application)}
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        {application.status === 'pending' && (
                          <>
                            <button 
                              className="action-button approve-button" 
                              onClick={() => handleApproveApplication(application)}
                              title="Approve"
                            >
                              <FaCheck />
                            </button>
                            <button 
                              className="action-button reject-button" 
                              onClick={() => handleRejectApplication(application)}
                              title="Reject"
                            >
                              <FaTimes />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {renderDetailModal()}
    </div>
  );
};

export default ArtisanApplications;