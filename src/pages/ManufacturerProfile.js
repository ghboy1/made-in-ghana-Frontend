import React from 'react';

const ManufacturerProfile = ({ manufacturer }) => {
  // Default profile if no prop is passed.
  const profile = manufacturer || {
    name: "ABC Manufacturing",
    description: "Leading manufacturer of high quality products in Ghana.",
    location: "Accra, Ghana",
    contact: "contact@abcmanufacturing.com"
  };

  return (
    <div className="manufacturer-profile">
      <h2>{profile.name}</h2>
      <p>{profile.description}</p>
      <p><strong>Location:</strong> {profile.location}</p>
      <p><strong>Contact:</strong> {profile.contact}</p>
    </div>
  );
};

export default ManufacturerProfile;
