import React, { useState } from 'react';
import './ContentDevices.css';

const ContentDevices = () => {
  const [devices, setDevices] = useState([
    {
      id: 1,
      name: "Kwame's iPhone",
      type: 'mobile',
      os: 'iOS 16.4.1',
      location: 'Accra, GH',
      lastActive: 'Active now',
      isPrimary: true
    },
    {
      id: 2,
      name: "Main Laptop",
      type: 'desktop',
      os: 'Windows 11',
      location: 'Kumasi, GH',
      lastActive: '2 hours ago',
      isPrimary: false
    },
    {
      id: 3,
      name: "Family Tablet",
      type: 'tablet',
      os: 'Android 13',
      location: 'Tamale, GH',
      lastActive: '5 days ago',
      isPrimary: false
    }
  ]);

  const [selectedDevice, setSelectedDevice] = useState(null);

  const removeDevice = (deviceId) => {
    setDevices(prev => prev.filter(device => device.id !== deviceId));
    setSelectedDevice(null);
  };

  const setAsPrimary = (deviceId) => {
    setDevices(prev => prev.map(device => ({
      ...device,
      isPrimary: device.id === deviceId
    })));
  };

  return (
    <div className="content-devices-container">
      <header className="devices-header">
        <h1>Content & Devices</h1>
        <p>Manage your registered devices and content access</p>
      </header>

      <section className="device-management">
        <div className="device-list">
          <h2>Registered Devices ({devices.length})</h2>
          <div className="devices-grid">
            {devices.map(device => (
              <div key={device.id} className="device-card">
                <div className="device-icon">
                  {device.type === 'mobile' && <i className="fas fa-mobile-alt"></i>}
                  {device.type === 'desktop' && <i className="fas fa-desktop"></i>}
                  {device.type === 'tablet' && <i className="fas fa-tablet-alt"></i>}
                </div>
                <div className="device-info">
                  <h3>{device.name}</h3>
                  <p className="device-os">{device.os}</p>
                  <p className="device-location">
                    <i className="fas fa-map-marker-alt"></i> {device.location}
                  </p>
                  <p className="device-status">
                    {device.isPrimary && <span className="primary-badge">Primary Device</span>}
                    <span className="activity">{device.lastActive}</span>
                  </p>
                </div>
                <div className="device-actions">
                  {!device.isPrimary && (
                    <>
                      <button 
                        className="action-btn set-primary"
                        onClick={() => setAsPrimary(device.id)}
                      >
                        Set as Primary
                      </button>
                      <button
                        className="action-btn remove"
                        onClick={() => setSelectedDevice(device)}
                      >
                        Remove
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="content-access">
          <h2>Content Access</h2>
          <div className="access-controls">
            <div className="control-card">
              <h3>Download Permissions</h3>
              <div className="toggle-switch">
                <label>
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
                <span>Allow offline downloads</span>
              </div>
            </div>
            <div className="control-card">
              <h3>Parental Controls</h3>
              <button className="configure-btn">
                Configure Restrictions <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {selectedDevice && (
        <div className="confirmation-modal">
          <div className="modal-content">
            <h3>Confirm Device Removal</h3>
            <p>
              Are you sure you want to remove {selectedDevice.name}? 
              This will revoke all content access from this device.
            </p>
            <div className="modal-actions">
              <button 
                className="cancel-btn"
                onClick={() => setSelectedDevice(null)}
              >
                Cancel
              </button>
              <button 
                className="confirm-btn"
                onClick={() => removeDevice(selectedDevice.id)}
              >
                Remove Device
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentDevices;