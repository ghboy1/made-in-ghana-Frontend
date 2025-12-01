import React, { useState } from 'react';
import './Memberships.css';

const Memberships = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([
    { id: 1, date: '2024-03-15', amount: 'GH₵45', status: 'Completed' },
    { id: 2, date: '2024-02-15', amount: 'GH₵45', status: 'Completed' },
    { id: 3, date: '2024-01-15', amount: 'GH₵45', status: 'Completed' }
  ]);

  const subscriptionPlans = [
    {
      tier: 'Basic',
      price: 'GH₵29',
      duration: 'month',
      features: [
        'Access to standard content',
        'HD streaming quality',
        '2 simultaneous screens',
        'Basic support'
      ]
    },
    {
      tier: 'Premium',
      price: 'GH₵45',
      duration: 'month',
      features: [
        '4K Ultra HD quality',
        '4 simultaneous screens',
        'Offline downloads',
        'Priority support',
        'Exclusive content'
      ],
      popular: true
    },
    {
      tier: 'Family',
      price: 'GH₵65',
      duration: 'month',
      features: [
        '6 simultaneous screens',
        'Parental controls',
        'Personalized profiles',
        '4K Ultra HD quality',
        'Offline downloads'
      ]
    }
  ];

  const currentSubscription = {
    plan: 'Premium',
    renewDate: '2024-04-15',
    paymentMethod: 'Visa •••• 1234'
  };

  return (
    <div className="memberships-container">
      <header className="memberships-header">
        <h1>Memberships & Subscriptions</h1>
        <p>Manage your subscription plan and payment settings</p>
      </header>

      <section className="current-subscription">
        <div className="subscription-card">
          <h3>Current Plan: {currentSubscription.plan}</h3>
          <div className="subscription-details">
            <p>Renews on: {currentSubscription.renewDate}</p>
            <p>Payment Method: {currentSubscription.paymentMethod}</p>
          </div>
          <div className="subscription-actions">
            <button className="change-plan-btn">Change Plan</button>
            <button className="cancel-btn">Cancel Subscription</button>
          </div>
        </div>
      </section>

      <section className="available-plans">
        <h2>Choose Your Plan</h2>
        <div className="plan-grid">
          {subscriptionPlans.map(plan => (
            <div 
              key={plan.tier}
              className={`plan-card ${plan.popular ? 'popular' : ''} ${selectedPlan === plan.tier ? 'selected' : ''}`}
              onClick={() => setSelectedPlan(plan.tier)}
            >
              {plan.popular && <div className="popular-badge">Most Popular</div>}
              <h3>{plan.tier}</h3>
              <div className="plan-price">
                {plan.price}<span>/{plan.duration}</span>
              </div>
              <ul className="plan-features">
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <button className="subscribe-btn">
                {selectedPlan === plan.tier ? 'Selected' : 'Subscribe Now'}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="payment-history">
        <h2>Payment History</h2>
        <div className="history-table">
          <div className="table-header">
            <span>Date</span>
            <span>Amount</span>
            <span>Status</span>
          </div>
          {paymentHistory.map(transaction => (
            <div key={transaction.id} className="table-row">
              <span>{transaction.date}</span>
              <span>{transaction.amount}</span>
              <span className={`status ${transaction.status.toLowerCase()}`}>
                {transaction.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Memberships;