import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentSetupPage = () => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!/^\d{11}$/.test(studentId)) {
      newErrors.studentId = 'Student ID must be exactly 11 digits.';
    }
    if (!password) {
      newErrors.password = 'Password is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Save studentId and password to localStorage or context as needed
      localStorage.setItem('studentId', studentId);
      localStorage.setItem('password', password);
      navigate('/setup-success');
    }
  };

  return (
    <div className="student-setup-container">
      <h2>Set Your Student ID and Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="studentId"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        {errors.studentId && <p style={{ color: 'red' }}>{errors.studentId}</p>}
        <input
          type="password"
          name="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default StudentSetupPage;
