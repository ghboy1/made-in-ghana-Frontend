import React, { useState, useEffect } from 'react';
import './manufacturers.css';

/** 
 * Manufacturers Data for Made in Ghana Marketplace 
 * Contains data for manufacturing companies by sector 
 */

// Featured Manufacturing Companies in Ghana
export const featuredManufacturers = [
  {
    id: "guinness-ghana",
    name: "Guinness Ghana",
    logo: "/logos/guinness-ghana.jpg",
    website: "https://www.guinnessghana.com",
    location: "Accra",
    description: "Leading beverage manufacturer",
    rating: 4.5,
    sector: "food-beverage" // Added sector property
  },
  {
    id: "nestle-ghana",
    name: "Nestlé Ghana",
    logo: "/logos/nestle-ghana.jpg",
    website: "https://www.nestle-ghana.com",
    location: "Accra",
    description: "Famous for its food and beverage brands",
    rating: 4.0,
    sector: "food-beverage"
  },
  {
    id: "unilever-ghana",
    name: "Unilever Ghana",
    logo: "/logos/unilever-ghana.svg",
    website: "https://www.unileverghana.com",
    location: "Tema",
    description: "Global consumer goods company",
    rating: 4.2
  },
  {
    id: "volta-aluminum",
    name: "Volta Aluminum Company (Valco)",
    logo: "/logos/valco.jpg",
    website: "https://www.valco.com.gh",
    location: "Tema",
    description: "Leading aluminum manufacturer",
    rating: 4.3
  },
  {
    id: "ghacem",
    name: "Ghana Cement Works Limited (GHACEM)",
    logo: "/logos/ghacem.svg",
    website: "https://www.ghacem.com",
    location: "Tema",
    description: "Top cement producer in Ghana",
    rating: 4.0
  },
  {
    id: "tema-steel",
    name: "Tema Steel Company Limited",
    logo: "/logos/tema-steel.jpg",
    website: "https://www.temasteel.com.gh",
    location: "Tema",
    description: "Quality steel manufacturing",
    rating: 4.1
  },
  {
    id: "polytank-gh",
    name: "PolyTank Ghana Limited",
    logo: "/logos/polytank_logo.svg",
    website: "https://www.polytankgh.com",
    location: "Accra",
    description: "Innovative water storage and plastic solutions",
    rating: 4.0
  },
  {
    id: "fan-milk",
    name: "Fan Milk Ghana Limited",
    logo: "/logos/fan-milk.jpg",
    website: "https://www.fanmilk-gh.com",
    location: "Accra",
    description: "Delicious ice creams and yogurts",
    rating: 4.2
  },
  {
    id: "kasapreko",
    name: "Kasapreko Company Limited",
    logo: "/logos/kasapreko.png",
    website: "https://www.kasapreko.com",
    location: "Kumasi",
    description: "Leading producer of non-alcoholic beverages and spirits",
    rating: 4.1
  },
  {
    id: "twellium",
    name: "Twellium Industrial Company",
    logo: "/logos/twellium.png",
    website: "https://www.twellium.com",
    location: "Accra",
    description: "Manufacturer of beverages and industrial solutions",
    rating: 4.0
  },
  {
    id: "ernest-chemists",
    name: "Ernest Chemists",
    logo: "/logos/ernest-chemists.jpg",
    website: "https://www.ernestchemists.com",
    location: "Accra",
    description: "Pharmacy and healthcare product manufacturer",
    rating: 4.3
  },
  {
    id: "icps",
    name: "Intelligent Card Production Systems",
    logo: "/logos/intelligent-card.jpg",
    website: "https://www.icps-gh.com",
    location: "Accra",
    description: "Smart card and secure ID solutions",
    rating: 4.0
  },
  {
    id: "raincoat-roofing",
    name: "Raincoat Roofing Systems",
    logo: "/logos/raincoat-roofing.jpg",
    website: "https://www.raincoatgh.com",
    location: "Accra",
    description: "Durable roofing and building materials",
    rating: 4.1
  },
  {
    id: "aluworks",
    name: "Aluworks",
    logo: "/logos/aluworks.jpg",
    website: "https://www.aluworks.com",
    location: "Accra",
    description: "Aluminum fabrication and extrusion",
    rating: 4.0
  },
  {
    id: "dannex",
    name: "Dannex Ayrton Starwin",
    logo: "/logos/dannex-ayrton-starwin.jpg",
    website: "https://www.dannexayrtonstarwin.com",
    location: "Accra",
    description: "Pharmaceuticals and consumer health products",
    rating: 4.2
  },
  {
    id: "ghana-electrometer",
    name: "Ghana Electrometer",
    logo: "/logos/ghana-electrometer.jpg",
    website: "https://www.ghanaelectrometer.com",
    location: "Accra",
    description: "Precision measurement and instrumentation",
    rating: 4.0
  },
  {
    id: "cosmo-seafoods",
    name: "Cosmo Seafoods Company",
    logo: "/logos/cosmo.jpg",
    website: "https://www.cosmoseafoods.com",
    location: "Tema",
    description: "Seafood processing and exports",
    rating: 4.3
  },
  {
    id: "melcom",
    name: "Melcom Group of Companies",
    logo: "/logos/melcom.png",
    website: "https://www.melcom.com",
    location: "Accra",
    description: "Retail conglomerate with in-house manufacturing",
    rating: 4.2
  },
  {
    id: "mahindra-ghana",
    name: "Mahindra & Mahindra Ghana Limited",
    logo: "/logos/mahindra-ghana.jpg",
    website: "https://www.mahindraghana.com",
    location: "Accra",
    description: "Automotive and tractor assembly",
    rating: 4.1
  },
  {
    id: "kantanka",
    name: "Kantanka Automobile Company Limited",
    logo: "/logos/kantanka.png",
    website: "https://www.kantankagroup.com",
    location: "Kumasi",
    description: "Indigenous automotive solutions",
    rating: 4.0
  },
  {
    id: "smido",
    name: "SMIDO (Suame Industrial Development Organization)",
    logo: "/logos/smido.jpg",
    website: "https://www.smido.org",
    location: "Kumasi",
    description: "Automotive tools and parts hub",
    rating: 4.2
  },
  {
    id: "abosso-glass",
    name: "Abosso Glass Factory",
    logo: "/logos/abosso-glass.jpg",
    website: "https://www.abossoglass.com",
    location: "Takoradi",
    description: "Glass bottle and container production",
    rating: 4.1
  }
];

// Manufacturing sectors with descriptions
export const manufacturingSectors = [
  {
    id: "food-beverage",
    name: "Food & Beverage",
    description: "Companies producing food and drinks including processed foods, beverages, and agricultural products"
  },
  {
    id: "textiles-apparel",
    name: "Textiles & Apparel",
    description: "Traditional and modern clothing, fabrics, and textile manufacturing"
  },
  {
    id: "construction",
    name: "Construction Materials",
    description: "Building materials, cement, roofing, and structural components"
  },
  {
    id: "automotive",
    name: "Automotive",
    description: "Vehicle assembly, auto parts, and automotive accessories"
  },
  {
    id: "pharmaceuticals",
    name: "Pharmaceuticals & Healthcare",
    description: "Medical products, medications, and healthcare items"
  },
  {
    id: "electronics",
    name: "Electronics & Technology",
    description: "Electronic components, consumer electronics, and tech solutions"
  }
];

// Regional manufacturing hubs
export const regionalHubs = [
  {
    region: "Greater Accra",
    city: "Accra & Tema",
    description: "Ghana's industrial center with major ports and industrial zones",
    specialties: ["Food Processing", "Pharmaceuticals", "Plastics", "Consumer Goods"]
  },
  {
    region: "Ashanti",
    city: "Kumasi",
    description: "Known for traditional crafts and automotive engineering",
    specialties: ["Automotive", "Furniture", "Textiles", "Crafts"]
  },
  {
    region: "Western",
    city: "Takoradi",
    description: "Port city with strong industrial presence",
    specialties: ["Petroleum", "Rubber", "Food Processing", "Export Goods"]
  }
];

const Manufacturers = () => {
  const [manufacturers, setManufacturers] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');

  // Get unique locations from manufacturers
  const locations = ['All', ...new Set(featuredManufacturers.map(m => m.location))];

  useEffect(() => {
    // Filter manufacturers based on selections
    let filtered = [...featuredManufacturers];
    
    if (selectedLocation !== 'All') {
      filtered = filtered.filter(m => m.location === selectedLocation);
    }
    
    if (selectedSector !== 'All') {
      // Note: You need to add a 'sector' property to your manufacturer data
      // or create a mapping between manufacturers and sectors
      filtered = filtered.filter(m => m.sector === selectedSector);
    }
    
    if (searchTerm.trim()) { // Added .trim() to handle space-only searches
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(m => 
        m.name.toLowerCase().includes(searchLower) ||
        m.description.toLowerCase().includes(searchLower) ||
        m.location.toLowerCase().includes(searchLower) || 
        (m.sector && m.sector.toLowerCase().includes(searchLower))
      );
    }
    
    setManufacturers(filtered);
  }, [selectedLocation, selectedSector, searchTerm]);

  // Initialize with all manufacturers
  useEffect(() => {
    setManufacturers(featuredManufacturers);
  }, []);

  return (
    <div className="manufacturers-page">
      <div className="manufacturers-hero">
        <h1>Made in Ghana</h1>
        <h2>Manufacturing Directory</h2>
        <p>Discover Ghana's leading manufacturers across all industries</p>
      </div>

      <div className="filters-container">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search manufacturers..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-dropdown">
          <label>Location:</label>
          <select 
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>
        <div className="filter-dropdown">
          <label>Sector:</label>
          <select 
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
          >
            <option value="All">All Sectors</option>
            {manufacturingSectors.map(sector => (
              <option key={sector.id} value={sector.id}>{sector.name}</option>
            ))}
          </select>
        </div>
      </div>

      <section className="manufacturing-sectors">
        <h2>Manufacturing Sectors</h2>
        <div className="sectors-grid">
          {manufacturingSectors.map(sector => (
            <div key={sector.id} className="sector-card">
              <h3>{sector.name}</h3>
              <p>{sector.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="manufacturers-section">
        <h2>Manufacturers Directory</h2>
        <p>{manufacturers.length} companies found</p>
        <div className="manufacturers-grid">
          {manufacturers.map(manufacturer => (
            <div key={manufacturer.id} className="manufacturer-card">
              <div className="card-header">
                <img 
                  src={manufacturer.logo || '/placeholder.jpg'} 
                  alt={manufacturer.name} 
                  className="company-logo"
                />
              </div>
              <div className="card-body">
                <h3>{manufacturer.name}</h3>
                <div className="location"><i className="fas fa-map-marker-alt"></i> {manufacturer.location}</div>
                <p className="description">{manufacturer.description}</p>
                <div className="rating">
                  Rating: {manufacturer.rating}/5
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(manufacturer.rating) ? 'star filled' : 'star'}>★</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <a href={manufacturer.website} target="_blank" rel="noopener noreferrer" className="website-btn">
                  Visit Website
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="regional-hubs">
        <h2>Regional Manufacturing Hubs</h2>
        <div className="hubs-grid">
          {regionalHubs.map((hub, index) => (
            <div key={index} className="hub-card">
              <h3>{hub.region}</h3>
              <h4>{hub.city}</h4>
              <p>{hub.description}</p>
              <div className="specialties">
                <h5>Specialties:</h5>
                <ul>
                  {hub.specialties.map((specialty, i) => (
                    <li key={i}>{specialty}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Manufacturers;

