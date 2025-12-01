import React, { useState } from 'react';
import axios from 'axios';
import './manufacturer-registration.css'; // Updated CSS file for styling

const ManufacturerRegistration = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    companyName: '',
    contactEmail: '',
    productCategory: '',
    productDescription: '',
    productCatalog: null, // For PDF upload
    productImage: null, // For image upload
  });

  // State for feedback messages
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle text input changes
  const handleTextChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Optional: Add file size/type validation
      if (e.target.name === 'productCatalog' && file.type !== 'application/pdf') {
        setError('Please upload a valid PDF file for the product catalog.');
        return;
      }
      if (e.target.name === 'productImage' && !file.type.startsWith('image/')) {
        setError('Please upload a valid image file.');
        return;
      }
      setFormData({ ...formData, [e.target.name]: file });
      setError(''); // Clear error if file is valid
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('companyName', formData.companyName);
    data.append('contactEmail', formData.contactEmail);
    data.append('productCategory', formData.productCategory);
    data.append('productDescription', formData.productDescription);
    if (formData.productCatalog) data.append('productCatalog', formData.productCatalog);
    if (formData.productImage) data.append('productImage', formData.productImage);

    try {
      const response = await axios.post('/api/manufacturer/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess('Registration successful! We will review your application.');
      setError('');
      setFormData({
        companyName: '',
        contactEmail: '',
        productCategory: '',
        productDescription: '',
        productCatalog: null,
        productImage: null,
      }); // Reset form
      // Reset file inputs manually since they are uncontrolled
      document.getElementById('productCatalog').value = '';
      document.getElementById('productImage').value = '';
    } catch (err) {
      setError('There was an error submitting your registration. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="manufacturer-registration">
      <h2>Manufacturer Registration</h2>
      <p>Submit your details and files to become a verified manufacturer and showcase your products.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleTextChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactEmail">Contact Email</label>
          <input
            type="email"
            id="contactEmail"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleTextChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productCategory">Product Category</label>
          <select
            id="productCategory"
            name="productCategory"
            value={formData.productCategory}
            onChange={handleTextChange}
            required
          >
            <option value="">Select a category</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="food">Food & Beverages</option>
            <option value="home">Home & Living</option>
            {/* Add more categories as needed */}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="productDescription">Product Description</label>
          <textarea
            id="productDescription"
            name="productDescription"
            value={formData.productDescription}
            onChange={handleTextChange}
            required
            placeholder="Describe your products..."
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="productCatalog">Product Catalog (PDF)</label>
          <input
            type="file"
            id="productCatalog"
            name="productCatalog"
            accept=".pdf"
            onChange={handleFileChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="productImage">Product Image</label>
          <input
            type="file"
            id="productImage"
            name="productImage"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="submit-btn">Submit Application</button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default ManufacturerRegistration;