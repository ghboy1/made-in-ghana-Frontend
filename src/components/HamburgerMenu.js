import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext.js'; 
import './HamburgerMenu.css';

function HamburgerMenu({ onClose }) {
  const { user } = useContext(UserContext);

  const [menuItems, setMenuItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuPath, setMenuPath] = useState([]);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  useEffect(() => {
    const fetchedMenuData = [
      {
        title: 'Digital Content & Devices',
        items: [
          { label: 'GHANA CINEMA', to: '/prime-video' },
          { label: 'GHANA MUSIC', to: '/music-library' },
          { label: ' GHANA EDUCATION', to: '/Education' },
        ],
      },
      {
        title: 'Shop by Department',
        items: [
          { label: 'Manufacturing Companies in Ghana', to: '/manufacturers' },
          {
            label: 'Electronics',
            to: '/electronics',
            subItems: [
              { label: 'Accessories & Supplies', to: '/electronics/accessories' },
              { label: 'Camera & Photo', to: '/electronics/camera' },
              { label: 'Car & Vehicle Electronics', to: '/electronics/car' },
              { label: 'Cell Phones & Accessories', to: '/electronics/cell-phones' },
              { label: 'Computers & Accessories', to: '/electronics/computers' },
              { label: 'GPS & Navigation', to: '/electronics/gps' },
              { label: 'Headphones', to: '/electronics/headphones' },
              { label: 'Home Audio', to: '/electronics/home-audio' },
              { label: 'Office Electronics', to: '/electronics/office' },
              { label: 'Portable Audio & Video', to: '/electronics/portable' },
              { label: 'Security & Surveillance', to: '/electronics/security' },
              { label: 'Service Plans', to: '/electronics/service-plans' },
              { label: 'Television & Video', to: '/electronics/television' },
              { label: 'Video Game Consoles & Accessories', to: '/electronics/video-games' },
              { label: 'Video Projectors', to: '/electronics/projectors' },
              { label: 'Wearable Technology', to: '/electronics/wearables' },
              { label: 'eBook Readers & Accessories', to: '/electronics/ebook-readers' },
            ],
          },
          {
            label: 'Computers',
            to: '/computers',
            subItems: [
              { label: 'Computer Accessories & Peripherals', to: '/computers/accessories' },
              { label: 'Computer Components', to: '/computers/components' },
              { label: 'Computers & Tablets', to: '/computers/computers-tablets' },
              { label: 'Data Storage', to: '/computers/data-storage' },
              { label: 'External Components', to: '/computers/external-components' },
              { label: 'Laptop Accessories', to: '/computers/laptop-accessories' },
              { label: 'Monitors', to: '/computers/monitors' },
              { label: 'Networking Products', to: '/computers/networking' },
              { label: 'Power Strips & Surge Protectors', to: '/computers/power-strips' },
              { label: 'Printers', to: '/computers/printers' },
              { label: 'Scanners', to: '/computers/scanners' },
              { label: 'Servers', to: '/computers/servers' },
              { label: 'Tablet Accessories', to: '/computers/tablet-accessories' },
              { label: 'Tablet Replacement Parts', to: '/computers/tablet-parts' },
              { label: 'Warranties & Services', to: '/computers/warranties' },
            ],
          },
          {
            label: 'Smart Home',
            to: '/smart-home',
            subItems: [
              { label: 'Amazon Smart Home', to: '/smart-home/amazon' },
              { label: 'Works with Alexa Devices', to: '/smart-home/alexa-devices' },
              { label: 'Smart Home Lighting', to: '/smart-home/lighting' },
              { label: 'Smart Locks and Entry', to: '/smart-home/locks' },
              { label: 'Security Cameras and Systems', to: '/smart-home/security' },
              { label: 'Plugs and Outlets', to: '/smart-home/plugs' },
              { label: 'New Smart Devices', to: '/smart-home/new' },
              { label: 'Heating and Cooling', to: '/smart-home/heating-cooling' },
              { label: 'Detectors and Sensors', to: '/smart-home/detectors' },
              { label: 'Home Entertainment', to: '/smart-home/entertainment' },
              { label: 'Pet', to: '/smart-home/pet' },
              { label: 'Voice Assistants and Hubs', to: '/smart-home/voice-assistants' },
              { label: 'Kitchen', to: '/smart-home/kitchen' },
              { label: 'Vacuums and Mops', to: '/smart-home/vacuums' },
              { label: 'Lawn and Garden', to: '/smart-home/lawn-garden' },
              { label: 'WIFI and Networking', to: '/smart-home/wifi' },
              { label: 'Other Solutions', to: '/smart-home/other' },
            ]
          },
          {
            label: 'Arts & Crafts',
            to: '/arts-crafts',
            subItems: [
              { label: 'Painting, Drawing & Art Supplies', to: '/arts-crafts/painting' },
              { label: 'Beading & Jewelry Making', to: '/arts-crafts/beading' },
              { label: 'Crafting', to: '/arts-crafts/crafting' },
              { label: 'Fabric', to: '/arts-crafts/fabric' },
              { label: 'Fabric Decorating', to: '/arts-crafts/fabric-decorating' },
              { label: 'Knitting & Crochet', to: '/arts-crafts/knitting' },
              { label: 'Needlework', to: '/arts-crafts/needlework' },
              { label: 'Organization, Storage & Transport', to: '/arts-crafts/organization' },
              { label: 'Printmaking', to: '/arts-crafts/printmaking' },
              { label: 'Scrapbooking & Stamping', to: '/arts-crafts/scrapbooking' },
              { label: 'Sewing', to: '/arts-crafts/sewing' },
              { label: 'Party Decorations & Supplies', to: '/arts-crafts/party' },
              { label: 'Gift Wrapping Supplies', to: '/arts-crafts/gift-wrapping' },
            ],
          },
          {
            label: 'Automotive',
            to: '/automotive',
            subItems: [
              { label: 'Car Care', to: '/automotive/car-care' },
              { label: 'Car Electronics & Accessories', to: '/automotive/electronics' },
              { label: 'Exterior Accessories', to: '/automotive/exterior' },
              { label: 'Interior Accessories', to: '/automotive/interior' },
              { label: 'Lights & Lighting Accessories', to: '/automotive/lights' },
              { label: 'Motorcycle & Powersports', to: '/automotive/motorcycle' },
              { label: 'Oils & Fluids', to: '/automotive/oils-fluids' },
              { label: 'Paint & Paint Supplies', to: '/automotive/paint' },
              { label: 'Performance Parts & Accessories', to: '/automotive/performance' },
              { label: 'Replacement Parts', to: '/automotive/replacement' },
              { label: 'RV Parts & Accessories', to: '/automotive/rv' },
              { label: 'Tires & Wheels', to: '/automotive/tires-wheels' },
              { label: 'Tools & Equipment', to: '/automotive/tools' },
              { label: 'Automotive Enthusiast Merchandise', to: '/automotive/merchandise' },
              { label: 'Heavy Duty & Commercial Vehicle Equipment', to: '/automotive/heavy-duty' },
              { label: 'Amazon Autos', to: '/automotive/amazon-autos' },
            ],
          },
          {
            label: 'Baby',
            to: '/baby',
            subItems: [
              { label: 'Activity & Entertainment', to: '/baby/activity' },
              { label: 'Apparel & Accessories', to: '/baby/apparel' },
              { label: 'Baby & Toddler Toys', to: '/baby/toys' },
              { label: 'Baby Care', to: '/baby/care' },
              { label: 'Baby Stationery', to: '/baby/stationery' },
              { label: 'Car Seats & Accessories', to: '/baby/car-seats' },
              { label: 'Diapering', to: '/baby/diapering' },
              { label: 'Feeding', to: '/baby/feeding' },
              { label: 'Gifts', to: '/baby/gifts' },
              { label: 'Nursery', to: '/baby/nursery' },
              { label: 'Potty Training', to: '/baby/potty' },
              { label: 'Pregnancy & Maternity', to: '/baby/pregnancy' },
              { label: 'Safety', to: '/baby/safety' },
              { label: 'Strollers & Accessories', to: '/baby/strollers' },
              { label: 'Travel Gear', to: '/baby/travel' },
            ],
          },
          {
            label: 'Beauty and Personal Care',
            to: '/beauty',
            subItems: [
              { label: 'Makeup', to: '/beauty/makeup' },
              { label: 'Skin Care', to: '/beauty/skin-care' },
              { label: 'Hair Care', to: '/beauty/hair-care' },
              { label: 'Fragrance', to: '/beauty/fragrance' },
              { label: 'Foot, Hand & Nail Care', to: '/beauty/foot-hand-nail' },
              { label: 'Tools & Accessories', to: '/beauty/tools' },
              { label: 'Shave & Hair Removal', to: '/beauty/shave' },
              { label: 'Personal Care', to: '/beauty/personal-care' },
              { label: 'Oral Care', to: '/beauty/oral-care' },
            ],
          },
          {
            label: "Women's Fashion",
            to: '/womens-fashion',
            subItems: [
              { label: 'Clothing', to: '/womens-fashion/clothing' },
              { label: 'Shoes', to: '/womens-fashion/shoes' },
              { label: 'Jewelry', to: '/womens-fashion/jewelry' },
              { label: 'Watches', to: '/womens-fashion/watches' },
              { label: 'Handbags', to: '/womens-fashion/handbags' },
              { label: 'Accessories', to: '/womens-fashion/accessories' },
            ],
          },
          {
            label: "Men's Fashion",
            to: '/mens-fashion',
            subItems: [
              { label: 'Traditional Wear', to: '/mens-fashion/traditional-wear' },
              { label: 'Modern African Prints', to: '/mens-fashion/african-prints' },
              { label: 'Casual Wear', to: '/mens-fashion/casual-wear' },
              { label: 'Formal Attire', to: '/mens-fashion/formal-attire' },
              { label: 'Footwear', to: '/mens-fashion/footwear' },
              { label: 'Accessories', to: '/mens-fashion/accessories' },
            ],
          },
          {
            label: "Girls' Fashion",
            to: '/girls-fashion',
            subItems: [
              { label: 'Clothing', to: '/girls-fashion/clothing' },
              { label: 'Shoes', to: '/girls-fashion/shoes' },
              { label: 'Jewelry', to: '/girls-fashion/jewelry' },
              { label: 'Watches', to: '/girls-fashion/watches' },
              { label: 'Accessories', to: '/girls-fashion/accessories' },
              { label: 'School Uniforms', to: '/girls-fashion/school-uniforms' },
            ],
          },
          {
            label: "Boys' Fashion",
            to: '/boys-fashion',
            subItems: [
              { label: 'Clothing', to: '/boys-fashion/clothing' },
              { label: 'Shoes', to: '/boys-fashion/shoes' },
              { label: 'Jewelry', to: '/boys-fashion/jewelry' },
              { label: 'Watches', to: '/boys-fashion/watches' },
              { label: 'Accessories', to: '/boys-fashion/accessories' },
              { label: 'School Uniforms', to: '/boys-fashion/school-uniforms' },
            ],
          },
          {
            label: 'Health and Household',
            to: '/health-household',
            subItems: [
              { label: 'Baby & Child Care', to: '/health-household/baby-child' },
              { label: 'Health Care', to: '/health-household/health-care' },
              { label: 'Household Supplies', to: '/health-household/household-supplies' },
              { label: 'Medical Supplies & Equipment', to: '/health-household/medical' },
              { label: 'Oral Care', to: '/health-household/oral-care' },
              { label: 'Personal Care', to: '/health-household/personal-care' },
              { label: 'Sexual Wellness', to: '/health-household/sexual-wellness' },
              { label: 'Sports Nutrition', to: '/health-household/sports-nutrition' },
              { label: 'Stationery & Gift Wrapping Supplies', to: '/health-household/stationery' },
              { label: 'Vision Care', to: '/health-household/vision' },
              { label: 'Vitamins & Dietary Supplements', to: '/health-household/vitamins' },
              { label: 'Wellness & Relaxation', to: '/health-household/wellness' },
            ],
          },
          {
            label: 'Home and Kitchen',
            to: '/home-kitchen',
            subItems: [
              { label: "Kids' Home Store", to: '/home-kitchen/kids' },
              { label: 'Kitchen & Dining', to: '/home-kitchen/kitchen-dining' },
              { label: 'Bedding', to: '/home-kitchen/bedding' },
              { label: 'Bath', to: '/home-kitchen/bath' },
              { label: 'Furniture', to: '/home-kitchen/furniture' },
              { label: 'Home Décor', to: '/home-kitchen/decor' },
              { label: 'Wall Art', to: '/home-kitchen/wall-art' },
              { label: 'Lighting & Ceiling Fans', to: '/home-kitchen/lighting' },
              { label: 'Seasonal Décor', to: '/home-kitchen/seasonal' },
              { label: 'Event & Party Supplies', to: '/home-kitchen/event-party' },
              { label: 'Heating, Cooling & Air Quality', to: '/home-kitchen/heating-cooling' },
              { label: 'Irons & Steamers', to: '/home-kitchen/irons' },
              { label: 'Vacuums & Floor Care', to: '/home-kitchen/vacuums' },
              { label: 'Storage & Organization', to: '/home-kitchen/storage' },
              { label: 'Cleaning Supplies', to: '/home-kitchen/cleaning' },
            ]
          }
        ]
      },
    ];
    setMenuItems(fetchedMenuData);
  }, []);

  const navigateToSubMenu = (sectionIndex, itemIndex) => {
    setMenuPath([...menuPath, { sectionIndex, itemIndex }]);
    setSearchQuery('');
  };

  const goBack = () => {
    setMenuPath(menuPath.slice(0, -1));
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  const handleLogout = () => {
    console.log("Logging out user");
    setShowUserDropdown(false);
    onClose();
  };

  const getCurrentMenu = () => {
    if (menuPath.length === 0) return menuItems;
    let current = menuItems;
    for (const { sectionIndex, itemIndex } of menuPath) {
      if (!current[sectionIndex]?.items[itemIndex]?.subItems) return [];
      current = current[sectionIndex].items[itemIndex].subItems;
    }
    return current;
  };

  const currentMenu = getCurrentMenu();
  const filteredMenu = menuPath.length === 0
    ? menuItems.map((section) => ({
        ...section,
        items: section.items.filter((item) =>
          item.label.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter((section) => section.items.length > 0)
    : currentMenu.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div className="hmenu-container open" role="navigation" aria-label="Main menu">
      <div className="hmenu-header">
        {user ? (
          <div className="user-profile-section">
            <div className="user-info" onClick={toggleUserDropdown}>
              {user.profileImage ? (
                <img 
                  src={user.profileImage} 
                  alt={user.name} 
                  className="user-avatar" 
                />
              ) : (
                <div className="user-avatar-placeholder">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="user-name">{user.name}</span>
              <i className={`dropdown-arrow ${showUserDropdown ? 'up' : 'down'}`}></i>
            </div>
            
            {showUserDropdown && (
              <div className="user-dropdown">
                <Link to="/profile" onClick={() => {setShowUserDropdown(false); onClose();}}>
                  My Profile
                </Link>
                <Link to="/orders" onClick={() => {setShowUserDropdown(false); onClose();}}>
                  My Orders
                </Link>
                <Link to="/wishlist" onClick={() => {setShowUserDropdown(false); onClose();}}>
                  Wishlist
                </Link>
                <button onClick={handleLogout} className="logout-button">
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="login-button" onClick={onClose}>
              Login
            </Link>
            <Link to="/signup" className="signup-button" onClick={onClose}>
              Sign Up
            </Link>
          </div>
        )}
        <button 
          className="close-btn" 
          onClick={onClose} 
          aria-label="Close menu"
        >
          <i className="close-icon">✕</i>
        </button>
      </div>

      {menuPath.length > 0 && (
        <button
          className="hmenu-item hmenu-back-button"
          onClick={goBack}
          aria-label="Back to previous menu"
        >
          <i className="nav-sprite hmenu-arrow-prev"></i>
          <span>Back</span>
        </button>
      )}

      <div className="hmenu-search">
        <input
          type="text"
          placeholder="Search Menu..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search menu items"
        />
        {searchQuery && (
          <button 
            className="clear-search"
            onClick={() => setSearchQuery('')}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      <ul className="hmenu">
        {menuPath.length === 0 ? (
          filteredMenu.map((section, sectionIndex) => (
            <React.Fragment key={sectionIndex}>
              <li><div className="hmenu-title">{section.title}</div></li>
              {section.items.map((item, itemIndex) => (
                <li key={`${sectionIndex}-${itemIndex}`}>
                  <div className={`hmenu-item ${section.title === 'Shop by Department' ? 'category' : ''}`}>
                    <Link to={item.to} onClick={onClose}>
                      {item.label}
                    </Link>
                    {item.subItems && (
                      <button
                        className="submenu-toggle"
                        onClick={() => navigateToSubMenu(sectionIndex, itemIndex)}
                        aria-label={`Expand ${item.label}`}
                      >
                        <i className="arrow-right"></i>
                      </button>
                    )}
                  </div>
                </li>
              ))}
              <li className="hmenu-separator"></li>
            </React.Fragment>
          ))
        ) : (
          filteredMenu.map((item, index) => (
            <li key={index}>
              <div className="hmenu-item">
                <Link to={item.to} onClick={onClose}>
                  {item.label}
                </Link>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default HamburgerMenu;