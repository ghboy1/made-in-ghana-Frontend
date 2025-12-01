import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaFacebook, FaTwitter, FaWhatsapp, FaLink, FaEnvelope } from 'react-icons/fa';

const ShareModal = ({ product, onClose }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = `https://made-in-ghana.com/product/${product.id}`;
  
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Copy link to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <motion.div 
        className="modal-content share-modal"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>Share This Product</h2>
          <button 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close sharing options"
          >
            <FaTimes />
          </button>
        </div>
        
        <div className="modal-body">
          <div className="product-share-info">
            <img src={product.image} alt={product.name} className="share-product-image" />
            <div className="share-product-details">
              <h3>{product.name}</h3>
              <p className="share-product-price">GH₵{product.price.toFixed(2)}</p>
            </div>
          </div>
          
          <div className="share-options">
            <a 
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-option facebook"
              aria-label="Share on Facebook"
            >
              <FaFacebook />
              <span>Facebook</span>
            </a>
            
            <a 
              href={`https://twitter.com/intent/tweet?text=Check out ${encodeURIComponent(product.name)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-option twitter"
              aria-label="Share on Twitter"
            >
              <FaTwitter />
              <span>Twitter</span>
            </a>
            
            <a 
              href={`https://wa.me/?text=${encodeURIComponent(`Check out ${product.name}: ${shareUrl}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-option whatsapp"
              aria-label="Share on WhatsApp"
            >
              <FaWhatsapp />
              <span>WhatsApp</span>
            </a>
            
            <a 
              href={`mailto:?subject=Check out this product from Made in Ghana&body=I thought you might like this: ${product.name}%0D%0A%0D%0A${shareUrl}`}
              className="share-option email"
              aria-label="Share via Email"
            >
              <FaEnvelope />
              <span>Email</span>
            </a>
            
            <button 
              className="share-option copy-link"
              onClick={copyToClipboard}
              aria-label="Copy link to clipboard"
            >
              <FaLink />
              <span>{copied ? "Copied!" : "Copy Link"}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ShareModal;