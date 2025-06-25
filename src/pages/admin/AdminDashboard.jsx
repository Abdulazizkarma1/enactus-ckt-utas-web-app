import React, { useEffect, useState } from 'react';
import '../../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [recruits, setRecruits] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/admin-data', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setRecruits(data))
      .catch(err => console.error(err));
  }, []);

  const filtered = recruits.filter(
    r =>
      r.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const changeStatus = async (id, newStatus) => {
    const res = await fetch(`http://localhost:5000/api/change-status/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
      credentials: 'include'
    });

    if (res.ok) {
      setRecruits(prev =>
        prev.map(item =>
          item._id === id ? { ...item, status: newStatus } : item
        )
      );
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>📊 Admin Dashboard</h2>
      <input
        type="text"
        placeholder="Search name, ID..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Student ID</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(r => (
            <tr key={r._id}>
              <td>{r.firstName} {r.lastName}</td>
              <td>{r.studentId}</td>
              <td>{r.phone}</td>
              <td>{r.status || 'Pending'}</td>
              <td>
                <select
                  value={r.status || 'Pending'}
                  onChange={(e) => changeStatus(r._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Disqualified">Disqualified</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
