import React from 'react';
import { Link } from 'react-router-dom';
import './Baby.css';

const Baby = () => {
  const categories = [
    {
      name: 'Car Seats & Accessories',
      subcats: ['Infant Car Seats', 'Convertible Car Seats', 'Booster Seats', 'Car Seat Bases', 'Car Seat Covers'],
      image: '/images/baby/car-seats-placeholder.jpg' // Placeholder path
    },
    {
      name: 'Diapering',
      subcats: ['Disposable Diapers', 'Cloth Diapers', 'Diaper Bags', 'Changing Pads', 'Wipes & Warmers'],
      image: '/images/baby/diapering-placeholder.jpg'
    },
    {
      name: 'Feeding',
      subcats: ['Bottles & Nipples', 'Breast Pumps', 'Formula', 'High Chairs', 'Bibs & Burp Cloths'],
      image: '/images/baby/feeding-placeholder.jpg'
    },
    {
      name: 'Nursery',
      subcats: ['Cribs & Bassinets', 'Mattresses & Bedding', 'Gliders & Rockers', 'Storage & Organization', 'Decor & Lighting'],
      image: '/images/baby/nursery-placeholder.jpg'
    },
    {
      name: 'Safety',
      subcats: ['Baby Monitors', 'Gates & Guards', 'Outlet Covers', 'Corner Protectors', 'First Aid Kits'],
      image: '/images/baby/safety-placeholder.jpg'
    },
    {
      name: 'Travel Gear',
      subcats: ['Strollers', 'Baby Carriers', 'Travel Systems', 'Portable Cribs', 'Diaper Bags'],
      image: '/images/baby/travel-gear-placeholder.jpg'
    },
    {
      name: 'Maternity Clothing',
      subcats: ['Tops & Tunics', 'Dresses', 'Pants & Leggings', 'Nursing Bras', 'Maternity Support Belts'],
      image: '/images/baby/maternity-clothing-placeholder.jpg'
    },
    {
      name: 'Toys & Playtime',
      subcats: ['Rattles & Teethers', 'Activity Gyms', 'Stuffed Animals', 'Educational Toys', 'Outdoor Play'],
      image: '/images/baby/toys-placeholder.jpg'
    }
  ];

  return (
    <div className="category-page">
      <h1>Baby & Maternity</h1>
      <div className="subcategory-grid">
        {categories.map((cat, index) => (
          <div key={index} className="subcategory-card">
            <div className="category-image-holder">
              <img src={cat.image} alt={cat.name} onError={(e) => e.target.style.display = 'none'} />
              <div className="image-placeholder">{cat.name}</div>
            </div>
            <h2>
              <Link to={`/baby/${cat.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}>
                {cat.name}
              </Link>
            </h2>
            {cat.subcats && (
              <ul className="subcat-list">
                {cat.subcats.map((sub, i) => (
                  <li key={i}>
                    <Link to={`/baby/${cat.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}/${sub.toLowerCase().replace(/ /g, '-')}`}>
                      {sub}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Baby;