import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const initialFormState = {
    name: '',
    email: '',
    message: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you could send formData to your API.
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    // Optionally, reset form after submission:
    // setFormData(initialFormState);
  };

  return (
    <section className="contact">
      <div className="contact-form">
        <h2>Contact Us</h2>
        {submitted ? (
          <div className="success-message">
            Thank you for your message! We will get back to you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                placeholder="Your full name" 
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                placeholder="you@example.com" 
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                rows="5" 
                required 
                placeholder="Your message"
              />
            </div>

            <button type="submit">Send Message</button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Contact;
