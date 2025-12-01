import React from 'react';
import { VerifiedBadge, ResponseBadge } from './UIComponents';

const CompanyCard = ({ company }) => (
  <div className="company-card">
    <img src={company.logo} alt={company.name} className="company-image" loading="lazy" />
    <div className="company-info">
      <h3>{company.name}</h3>
      {company.verified && <VerifiedBadge />}
      {company.fastResponse && <ResponseBadge />}
      <p className="company-category">{company.category}</p>
      {company.website && (
        <a
          href={company.website}
          target="_blank"
          rel="noopener noreferrer"
          className="website-link"
        >
          Visit Website
        </a>
      )}
    </div>
  </div>
);

export default CompanyCard;