import React, { useState, useEffect } from 'react';
import { 
  FaSave, FaGlobe, FaEnvelope, FaKey, FaUser, 
  FaShieldAlt, FaCreditCard, FaShippingFast, FaFileInvoiceDollar,
  FaUserTag, FaCheck, FaAngleRight, FaUpload, FaToggleOn, FaToggleOff
} from 'react-icons/fa';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Made in Ghana',
    tagline: 'Authentic Ghanaian Crafts & Products',
    supportEmail: 'support@madeinghana.com',
    contactPhone: '+233 20 123 4567',
    address: '123 Independence Ave, Accra, Ghana',
    logoUrl: 'https://via.placeholder.com/200x80',
    faviconUrl: 'https://via.placeholder.com/32x32',
    currencySymbol: '₵',
    currencyCode: 'GHS',
    weightUnit: 'kg',
    dimensionUnit: 'cm',
    defaultLanguage: 'en',
    timeZone: 'Africa/Accra',
    enableMaintenanceMode: false,
    maintenanceMessage: 'We are currently performing scheduled maintenance. Please check back soon.',
  });
  
  const [emailSettings, setEmailSettings] = useState({
    smtpServer: 'smtp.example.com',
    smtpPort: '587',
    smtpUsername: 'notifications@madeinghana.com',
    smtpPassword: '••••••••••••',
    senderName: 'Made in Ghana',
    senderEmail: 'notifications@madeinghana.com',
    enableEmailNotifications: true
  });
  
  const [paymentSettings, setPaymentSettings] = useState({
    enableCashOnDelivery: true,
    enableMobileMoney: true,
    enableCardPayments: true,
    paymentApiKey: 'pk_test_123456789',
    paymentSecretKey: '••••••••••••',
    testMode: true,
    mobileMoneyProviders: [
      { name: 'MTN Mobile Money', enabled: true },
      { name: 'Vodafone Cash', enabled: true },
      { name: 'AirtelTigo Money', enabled: false }
    ]
  });
  
  const [shippingSettings, setShippingSettings] = useState({
    enableFreeShipping: true,
    freeShippingMinimum: 200,
    defaultShippingFee: 15,
    internationalShipping: false,
    shippingZones: [
      { name: 'Accra', fee: 10 },
      { name: 'Kumasi', fee: 20 },
      { name: 'Other Cities', fee: 30 }
    ]
  });
  
  useEffect(() => {
    // Simulate loading settings from an API
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleEmailSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEmailSettings({
      ...emailSettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handlePaymentSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPaymentSettings({
      ...paymentSettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleShippingSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setShippingSettings({
      ...shippingSettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSaveSettings = () => {
    setIsSaving(true);
    
    // Simulate saving to an API
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      
      // Reset saved notification after a delay
      setTimeout(() => {
        setSaved(false);
      }, 3000);
    }, 1000);
  };
  
  const tabs = [
    { id: 'general', label: 'General', icon: <FaGlobe /> },
    { id: 'account', label: 'Account', icon: <FaUser /> },
    { id: 'security', label: 'Security', icon: <FaShieldAlt /> },
    { id: 'payment', label: 'Payment', icon: <FaCreditCard /> },
    { id: 'shipping', label: 'Shipping', icon: <FaShippingFast /> },
    { id: 'tax', label: 'Tax', icon: <FaFileInvoiceDollar /> },
    { id: 'email', label: 'Email', icon: <FaEnvelope /> },
    { id: 'roles', label: 'User Roles', icon: <FaUserTag /> },
    { id: 'api', label: 'API Keys', icon: <FaKey /> },
  ];
  
  const renderTabContent = () => {
    if (loading) {
      return (
        <div className="admin-loading">
          <div className="spinner"></div>
          <p>Loading settings...</p>
        </div>
      );
    }
    
    switch (activeTab) {
      case 'general':
        return (
          <div className="settings-form">
            <h2>General Settings</h2>
            <div className="form-section">
              <h3>Site Information</h3>
              <div className="form-group">
                <label>Site Name</label>
                <input 
                  type="text" 
                  name="siteName" 
                  value={generalSettings.siteName} 
                  onChange={handleInputChange} 
                  className="admin-input"
                />
              </div>
              
              <div className="form-group">
                <label>Tagline</label>
                <input 
                  type="text" 
                  name="tagline" 
                  value={generalSettings.tagline} 
                  onChange={handleInputChange} 
                  className="admin-input"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Logo</label>
                  <div className="image-upload-container">
                    <img src={generalSettings.logoUrl} alt="Site Logo" className="preview-image" />
                    <button className="admin-button admin-button-secondary">
                      <FaUpload /> Upload New Logo
                    </button>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Favicon</label>
                  <div className="image-upload-container">
                    <img src={generalSettings.faviconUrl} alt="Favicon" className="preview-image favicon" />
                    <button className="admin-button admin-button-secondary">
                      <FaUpload /> Upload Favicon
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h3>Contact Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Support Email</label>
                  <input 
                    type="email" 
                    name="supportEmail" 
                    value={generalSettings.supportEmail} 
                    onChange={handleInputChange} 
                    className="admin-input"
                  />
                </div>
                
                <div className="form-group">
                  <label>Contact Phone</label>
                  <input 
                    type="tel" 
                    name="contactPhone" 
                    value={generalSettings.contactPhone} 
                    onChange={handleInputChange} 
                    className="admin-input"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Business Address</label>
                <textarea 
                  name="address" 
                  value={generalSettings.address} 
                  onChange={handleInputChange} 
                  className="admin-textarea"
                  rows="3"
                ></textarea>
              </div>
            </div>
            
            <div className="form-section">
              <h3>Regional Settings</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Currency Symbol</label>
                  <input 
                    type="text" 
                    name="currencySymbol" 
                    value={generalSettings.currencySymbol} 
                    onChange={handleInputChange} 
                    className="admin-input"
                  />
                </div>
                
                <div className="form-group">
                  <label>Currency Code</label>
                  <input 
                    type="text" 
                    name="currencyCode" 
                    value={generalSettings.currencyCode} 
                    onChange={handleInputChange} 
                    className="admin-input"
                  />
                </div>
                
                <div className="form-group">
                  <label>Default Language</label>
                  <select 
                    name="defaultLanguage" 
                    value={generalSettings.defaultLanguage} 
                    onChange={handleInputChange}
                    className="admin-select"
                  >
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="tw">Twi</option>
                    <option value="ga">Ga</option>
                    <option value="ha">Hausa</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Time Zone</label>
                  <select 
                    name="timeZone" 
                    value={generalSettings.timeZone} 
                    onChange={handleInputChange}
                    className="admin-select"
                  >
                    <option value="Africa/Accra">Accra (GMT+0)</option>
                    <option value="Africa/Lagos">Lagos (GMT+1)</option>
                    <option value="Europe/London">London (GMT+0/+1)</option>
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Weight Unit</label>
                  <select 
                    name="weightUnit" 
                    value={generalSettings.weightUnit} 
                    onChange={handleInputChange}
                    className="admin-select"
                  >
                    <option value="kg">Kilograms (kg)</option>
                    <option value="g">Grams (g)</option>
                    <option value="lb">Pounds (lb)</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Dimension Unit</label>
                  <select 
                    name="dimensionUnit" 
                    value={generalSettings.dimensionUnit} 
                    onChange={handleInputChange}
                    className="admin-select"
                  >
                    <option value="cm">Centimeters (cm)</option>
                    <option value="m">Meters (m)</option>
                    <option value="in">Inches (in)</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h3>Maintenance Mode</h3>
              <div className="form-group toggle-group">
                <label>Enable Maintenance Mode</label>
                <div className="toggle-control">
                  <input 
                    type="checkbox" 
                    id="enableMaintenance" 
                    name="enableMaintenanceMode" 
                    checked={generalSettings.enableMaintenanceMode} 
                    onChange={handleInputChange} 
                    className="toggle-input"
                  />
                  <label htmlFor="enableMaintenance" className="toggle-label">
                    {generalSettings.enableMaintenanceMode ? <FaToggleOn /> : <FaToggleOff />}
                  </label>
                </div>
              </div>
              
              {generalSettings.enableMaintenanceMode && (
                <div className="form-group">
                  <label>Maintenance Message</label>
                  <textarea 
                    name="maintenanceMessage" 
                    value={generalSettings.maintenanceMessage} 
                    onChange={handleInputChange} 
                    className="admin-textarea"
                    rows="3"
                  ></textarea>
                </div>
              )}
            </div>
          </div>
        );
      case 'email':
        return (
          <div className="settings-form">
            <h2>Email Settings</h2>
            <div className="form-section">
              <h3>SMTP Configuration</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>SMTP Server</label>
                  <input 
                    type="text" 
                    name="smtpServer" 
                    value={emailSettings.smtpServer} 
                    onChange={handleEmailSettingsChange} 
                    className="admin-input"
                  />
                </div>
                
                <div className="form-group">
                  <label>SMTP Port</label>
                  <input 
                    type="text" 
                    name="smtpPort" 
                    value={emailSettings.smtpPort} 
                    onChange={handleEmailSettingsChange} 
                    className="admin-input"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>SMTP Username</label>
                  <input 
                    type="text" 
                    name="smtpUsername" 
                    value={emailSettings.smtpUsername} 
                    onChange={handleEmailSettingsChange} 
                    className="admin-input"
                  />
                </div>
                
                <div className="form-group">
                  <label>SMTP Password</label>
                  <input 
                    type="password" 
                    name="smtpPassword" 
                    value={emailSettings.smtpPassword} 
                    onChange={handleEmailSettingsChange} 
                    className="admin-input"
                  />
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h3>Email Sender Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Sender Name</label>
                  <input 
                    type="text" 
                    name="senderName" 
                    value={emailSettings.senderName} 
                    onChange={handleEmailSettingsChange} 
                    className="admin-input"
                  />
                </div>
                
                <div className="form-group">
                  <label>Sender Email</label>
                  <input 
                    type="email" 
                    name="senderEmail" 
                    value={emailSettings.senderEmail} 
                    onChange={handleEmailSettingsChange} 
                    className="admin-input"
                  />
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h3>Email Notifications</h3>
              <div className="form-group toggle-group">
                <label>Enable Email Notifications</label>
                <div className="toggle-control">
                  <input 
                    type="checkbox" 
                    id="enableEmailNotifications" 
                    name="enableEmailNotifications" 
                    checked={emailSettings.enableEmailNotifications} 
                    onChange={handleEmailSettingsChange} 
                    className="toggle-input"
                  />
                  <label htmlFor="enableEmailNotifications" className="toggle-label">
                    {emailSettings.enableEmailNotifications ? <FaToggleOn /> : <FaToggleOff />}
                  </label>
                </div>
              </div>
              
              <div className="form-action">
                <button className="admin-button admin-button-secondary">
                  Send Test Email
                </button>
              </div>
            </div>
          </div>
        );
      case 'payment':
        return (
          <div className="settings-form">
            <h2>Payment Settings</h2>
            <div className="form-section">
              <h3>Payment Methods</h3>
              <div className="form-group toggle-group">
                <label>Cash on Delivery</label>
                <div className="toggle-control">
                  <input 
                    type="checkbox" 
                    id="enableCashOnDelivery" 
                    name="enableCashOnDelivery" 
                    checked={paymentSettings.enableCashOnDelivery} 
                    onChange={handlePaymentSettingsChange} 
                    className="toggle-input"
                  />
                  <label htmlFor="enableCashOnDelivery" className="toggle-label">
                    {paymentSettings.enableCashOnDelivery ? <FaToggleOn /> : <FaToggleOff />}
                  </label>
                </div>
              </div>
              
              <div className="form-group toggle-group">
                <label>Mobile Money</label>
                <div className="toggle-control">
                  <input 
                    type="checkbox" 
                    id="enableMobileMoney" 
                    name="enableMobileMoney" 
                    checked={paymentSettings.enableMobileMoney} 
                    onChange={handlePaymentSettingsChange} 
                    className="toggle-input"
                  />
                  <label htmlFor="enableMobileMoney" className="toggle-label">
                    {paymentSettings.enableMobileMoney ? <FaToggleOn /> : <FaToggleOff />}
                  </label>
                </div>
              </div>
              
              <div className="form-group toggle-group">
                <label>Card Payments</label>
                <div className="toggle-control">
                  <input 
                    type="checkbox" 
                    id="enableCardPayments" 
                    name="enableCardPayments" 
                    checked={paymentSettings.enableCardPayments} 
                    onChange={handlePaymentSettingsChange} 
                    className="toggle-input"
                  />
                  <label htmlFor="enableCardPayments" className="toggle-label">
                    {paymentSettings.enableCardPayments ? <FaToggleOn /> : <FaToggleOff />}
                  </label>
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h3>API Configuration</h3>
              <div className="form-group toggle-group">
                <label>Test Mode</label>
                <div className="toggle-control">
                  <input 
                    type="checkbox" 
                    id="testMode" 
                    name="testMode" 
                    checked={paymentSettings.testMode} 
                    onChange={handlePaymentSettingsChange} 
                    className="toggle-input"
                  />
                  <label htmlFor="testMode" className="toggle-label">
                    {paymentSettings.testMode ? <FaToggleOn /> : <FaToggleOff />}
                  </label>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Payment API Key</label>
                  <input 
                    type="text" 
                    name="paymentApiKey" 
                    value={paymentSettings.paymentApiKey} 
                    onChange={handlePaymentSettingsChange} 
                    className="admin-input"
                  />
                </div>
                
                <div className="form-group">
                  <label>Payment Secret Key</label>
                  <input 
                    type="password" 
                    name="paymentSecretKey" 
                    value={paymentSettings.paymentSecretKey} 
                    onChange={handlePaymentSettingsChange} 
                    className="admin-input"
                  />
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h3>Mobile Money Providers</h3>
              {paymentSettings.mobileMoneyProviders.map((provider, index) => (
                <div key={index} className="form-group toggle-group">
                  <label>{provider.name}</label>
                  <div className="toggle-control">
                    <input 
                      type="checkbox" 
                      id={`provider-${index}`} 
                      checked={provider.enabled} 
                      onChange={() => {
                        const updatedProviders = [...paymentSettings.mobileMoneyProviders];
                        updatedProviders[index].enabled = !provider.enabled;
                        setPaymentSettings({
                          ...paymentSettings,
                          mobileMoneyProviders: updatedProviders
                        });
                      }} 
                      className="toggle-input"
                    />
                    <label htmlFor={`provider-${index}`} className="toggle-label">
                      {provider.enabled ? <FaToggleOn /> : <FaToggleOff />}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'shipping':
        return (
          <div className="settings-form">
            <h2>Shipping Settings</h2>
            <div className="form-section">
              <h3>Shipping Options</h3>
              <div className="form-group toggle-group">
                <label>Enable Free Shipping</label>
                <div className="toggle-control">
                  <input 
                    type="checkbox" 
                    id="enableFreeShipping" 
                    name="enableFreeShipping" 
                    checked={shippingSettings.enableFreeShipping} 
                    onChange={handleShippingSettingsChange} 
                    className="toggle-input"
                  />
                  <label htmlFor="enableFreeShipping" className="toggle-label">
                    {shippingSettings.enableFreeShipping ? <FaToggleOn /> : <FaToggleOff />}
                  </label>
                </div>
              </div>
              
              {shippingSettings.enableFreeShipping && (
                <div className="form-group">
                  <label>Minimum Order Amount for Free Shipping (₵)</label>
                  <input 
                    type="number" 
                    name="freeShippingMinimum" 
                    value={shippingSettings.freeShippingMinimum} 
                    onChange={handleShippingSettingsChange} 
                    className="admin-input"
                    min="0"
                    step="10"
                  />
                </div>
              )}
              
              <div className="form-group">
                <label>Default Shipping Fee (₵)</label>
                <input 
                  type="number" 
                  name="defaultShippingFee" 
                  value={shippingSettings.defaultShippingFee} 
                  onChange={handleShippingSettingsChange} 
                  className="admin-input"
                  min="0"
                  step="5"
                />
              </div>
              
              <div className="form-group toggle-group">
                <label>International Shipping</label>
                <div className="toggle-control">
                  <input 
                    type="checkbox" 
                    id="internationalShipping" 
                    name="internationalShipping" 
                    checked={shippingSettings.internationalShipping} 
                    onChange={handleShippingSettingsChange} 
                    className="toggle-input"
                  />
                  <label htmlFor="internationalShipping" className="toggle-label">
                    {shippingSettings.internationalShipping ? <FaToggleOn /> : <FaToggleOff />}
                  </label>
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h3>Shipping Zones</h3>
              <div className="shipping-zones">
                {shippingSettings.shippingZones.map((zone, index) => (
                  <div key={index} className="shipping-zone-item">
                    <div className="zone-name">{zone.name}</div>
                    <div className="zone-fee">₵{zone.fee.toFixed(2)}</div>
                    <div className="zone-actions">
                      <button className="admin-button admin-button-sm admin-button-secondary">Edit</button>
                    </div>
                  </div>
                ))}
                <button className="admin-button admin-button-secondary">
                  Add Shipping Zone
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="settings-form">
            <div className="form-section">
              <h3>Coming Soon</h3>
              <p>This section is under development.</p>
            </div>
          </div>
        );
    }
  };
  
  return (
    <div className="admin-settings">
      <div className="settings-header">
        <h1>System Settings</h1>
        <div className="settings-actions">
          <button 
            className={`admin-button admin-button-primary ${isSaving ? 'button-loading' : ''}`}
            onClick={handleSaveSettings}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <div className="button-spinner"></div>
                Saving...
              </>
            ) : (
              <>
                <FaSave /> Save Changes
              </>
            )}
          </button>
          
          {saved && (
            <div className="save-notification">
              <FaCheck /> Settings saved successfully!
            </div>
          )}
        </div>
      </div>
      
      <div className="settings-container">
        <div className="settings-sidebar">
          <ul className="settings-tabs">
            {tabs.map(tab => (
              <li 
                key={tab.id}
                className={activeTab === tab.id ? 'active' : ''}
              >
                <button onClick={() => setActiveTab(tab.id)}>
                  <span className="tab-icon">{tab.icon}</span>
                  <span className="tab-label">{tab.label}</span>
                  <FaAngleRight className="tab-arrow" />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="settings-content">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;