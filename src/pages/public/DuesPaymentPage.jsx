import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/DuesPaymentPage.css';

const DuesPaymentPage = () => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('mtn');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePayment = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    setLoading(true);
    try {
      const endpoint = paymentMethod === 'mtn' ? 'mtn' : 'vodafone';
      const res = await fetch(`http://localhost:5000/api/payment/${endpoint}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Number(amount) }),
      });
      if (res.ok) {
        const data = await res.json();
        alert(data.message || 'Payment initiated successfully');
        navigate('/member-portal'); // Redirect back to member portal after payment
      } else {
        alert('Payment failed');
      }
    } catch (err) {
      console.error('Payment error:', err);
      alert('Payment error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="dues-payment-page">
      <h1>Dues Payment</h1>
      <div className="payment-form">
        <label htmlFor="amount">Amount to Pay (USD):</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
          step="0.01"
          disabled={loading}
        />
        <label>Payment Method:</label>
        <div className="payment-methods">
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="mtn"
              checked={paymentMethod === 'mtn'}
              onChange={() => setPaymentMethod('mtn')}
              disabled={loading}
            />
            MTN Momo
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="vodafone"
              checked={paymentMethod === 'vodafone'}
              onChange={() => setPaymentMethod('vodafone')}
              disabled={loading}
            />
            Vodafone
          </label>
        </div>
        <button onClick={handlePayment} disabled={loading}>
          {loading ? 'Processing...' : 'Checkout'}
        </button>
      </div>
    </section>
  );
};

export default DuesPaymentPage;
