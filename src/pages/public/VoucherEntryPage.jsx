import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/VoucherEntryPage.css';

const VoucherEntryPage = () => {
  const [serialNumber, setSerialNumber] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!serialNumber || !pin) {
      setError('Please enter both voucher serial and pin.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/recruitment/validate-voucher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serialNumber, pin }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || 'Voucher validation failed');
      }

      localStorage.setItem('voucherSerialNumber', serialNumber);
      navigate('/student-setup');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="voucher-entry-container">
      <h2>Enter Your Voucher Details</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Voucher Serial Number"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
        />
        <input
          type="password"
          placeholder="Voucher PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Proceed</button>
      </form>
    </div>
  );
};

export default VoucherEntryPage;
