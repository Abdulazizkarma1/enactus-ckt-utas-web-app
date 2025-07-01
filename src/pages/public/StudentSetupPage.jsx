import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/StudentSetupPage.css';

const StudentSetupPage = () => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!/^\d{11}$/.test(studentId)) {
      setError('Student ID must be exactly 11 digits.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const voucherSerialNumber = localStorage.getItem('voucherSerialNumber');
    if (!voucherSerialNumber) {
      setError('Voucher information is missing. Please start over.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/recruitment/setup-credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          voucherSerialNumber,
          pin: localStorage.getItem('voucherPin'), // Assuming pin is also stored
          studentId,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || 'Failed to set up credentials.');
      }

      localStorage.removeItem('voucherSerialNumber');
      localStorage.removeItem('voucherPin');
      localStorage.setItem('studentId', studentId);

      navigate('/setup-success');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="student-setup-container">
      <h2>Set Up Your Credentials</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Set Credentials</button>
      </form>
    </div>
  );
};

export default StudentSetupPage;
