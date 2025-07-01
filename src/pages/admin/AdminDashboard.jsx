import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../../styles/AdminDashboard.css';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [recruits, setRecruits] = useState([]);
  const [vouchers, setVouchers] = useState([]);
  const [executiveRecords, setExecutiveRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [voucherSerial, setVoucherSerial] = useState('');
  const [voucherPin, setVoucherPin] = useState('');
  const [voucherStatusFilter, setVoucherStatusFilter] = useState('all');
  const [execYearFilter, setExecYearFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/admin-data', {
      credentials: 'include'
    })
      .then(res => {
        if (res.status === 403) navigate('/admin');
        return res.json();
      })
      .then(data => setRecruits(data))
      .catch(err => console.error(err));
  }, [navigate]);

  useEffect(() => {
    fetchVouchers();
    fetchExecutiveRecords();
  }, []);

  const fetchVouchers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/vouchers', {
        credentials: 'include'
      });
      if (res.ok) {
        const data = await res.json();
        setVouchers(data);
      }
    } catch (err) {
      console.error('Failed to fetch vouchers', err);
    }
  };

  const fetchExecutiveRecords = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/executive-records', {
        credentials: 'include'
      });
      if (res.ok) {
        const data = await res.json();
        setExecutiveRecords(data);
        if (data.length > 0) {
          setExecYearFilter(data[0].academicYear);
        }
      }
    } catch (err) {
      console.error('Failed to fetch executive records', err);
    }
  };

  const filteredRecruits = recruits.filter(
    r =>
      (r.firstName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (r.lastName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (r.studentId?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const filteredVouchers = vouchers.filter(v => {
    if (voucherStatusFilter === 'all') return true;
    return v.status === voucherStatusFilter;
  });

  const filteredExecutiveRecords = executiveRecords.filter(record => {
    if (!execYearFilter) return true;
    return record.academicYear === execYearFilter;
  });

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

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Recruitment Summary', 20, 20);
    const tableData = filteredRecruits.map(r => [
      r.firstName + ' ' + r.lastName,
      r.studentId,
      r.phone,
      r.status || 'Pending'
    ]);
    doc.autoTable({
      head: [['Name', 'Student ID', 'Phone', 'Status']],
      body: tableData
    });
    doc.save('recruitment-summary.pdf');
  };

  const exportVouchersToCSV = () => {
    const headers = ['Serial Number', 'Pin', 'Status', 'Used', 'Created At'];
    const rows = filteredVouchers.map(v => [
      v.serialNumber,
      v.pin,
      v.status,
      v.used ? 'Yes' : 'No',
      new Date(v.createdAt).toLocaleString()
    ]);
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.join(',') + '\n';
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'vouchers.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLogout = async () => {
    await fetch('http://localhost:5000/api/admin-logout', {
      credentials: 'include'
    });
    navigate('/admin');
  };

  const generateVoucher = async () => {
    if (!voucherSerial || !voucherPin) {
      alert('Please enter both serial number and pin to generate a voucher.');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/vouchers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ serialNumber: voucherSerial, pin: voucherPin }),
      });
      if (res.ok) {
        alert('Voucher generated successfully!');
        setVoucherSerial('');
        setVoucherPin('');
        fetchVouchers();
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to generate voucher');
      }
    } catch (err) {
      alert('Error generating voucher');
      console.error(err);
    }
  };

  const deleteVoucher = async (id) => {
    if (!window.confirm('Are you sure you want to delete this voucher?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/vouchers/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        alert('Voucher deleted');
        fetchVouchers();
      } else {
        alert('Failed to delete voucher');
      }
    } catch (err) {
      alert('Error deleting voucher');
      console.error(err);
    }
  };

  const toggleVoucherStatus = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/vouchers/${id}/toggle`, {
        method: 'PUT',
        credentials: 'include',
      });
      if (res.ok) {
        fetchVouchers();
      } else {
        alert('Failed to toggle voucher status');
      }
    } catch (err) {
      alert('Error toggling voucher status');
      console.error(err);
    }
  };

  // Executive Records management functions

  const addExecutiveRecord = async (record) => {
    try {
      const res = await fetch('http://localhost:5000/api/executive-records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(record),
      });
      if (res.ok) {
        fetchExecutiveRecords();
        alert('Executive record added');
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to add executive record');
      }
    } catch (err) {
      alert('Error adding executive record');
      console.error(err);
    }
  };

  const updateExecutiveRecord = async (id, record) => {
    try {
      const res = await fetch(`http://localhost:5000/api/executive-records/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(record),
      });
      if (res.ok) {
        fetchExecutiveRecords();
        alert('Executive record updated');
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to update executive record');
      }
    } catch (err) {
      alert('Error updating executive record');
      console.error(err);
    }
  };

  const deleteExecutiveRecord = async (id) => {
    if (!window.confirm('Are you sure you want to delete this executive record?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/executive-records/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        fetchExecutiveRecords();
        alert('Executive record deleted');
      } else {
        alert('Failed to delete executive record');
      }
    } catch (err) {
      alert('Error deleting executive record');
      console.error(err);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>📊 Admin Dashboard</h2>
      <div className="dashboard-controls">
        <input
          type="text"
          placeholder="Search name, ID..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={exportToPDF}>📄 Export PDF</button>
        <button onClick={handleLogout}>🚪 Logout</button>
      </div>

      <h3>Recruits</h3>
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
          {filteredRecruits.map(r => (
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

      <h3>Voucher Management</h3>
      <div className="voucher-controls">
        <input
          type="text"
          placeholder="Serial Number"
          value={voucherSerial}
          onChange={(e) => setVoucherSerial(e.target.value)}
        />
        <input
          type="text"
          placeholder="Pin"
          value={voucherPin}
          onChange={(e) => setVoucherPin(e.target.value)}
        />
        <button onClick={generateVoucher}>Generate Voucher</button>
        <button onClick={exportVouchersToCSV}>Export Vouchers CSV</button>
      </div>

      <div className="voucher-table-container">
        <table>
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Pin</th>
              <th>Status</th>
              <th>Used</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVouchers.map(v => (
              <tr key={v._id}>
                <td>{v.serialNumber}</td>
                <td>{v.pin}</td>
                <td>{v.status}</td>
                <td>{v.used ? 'Yes' : 'No'}</td>
                <td>{new Date(v.createdAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => toggleVoucherStatus(v._id)}>
                    {v.status === 'active' ? 'Expire' : 'Activate'}
                  </button>
                  <button onClick={() => deleteVoucher(v._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>Executive Records</h3>
      <div className="executive-records-controls">
        <label htmlFor="execYearFilter">Filter by Academic Year: </label>
        <select
          id="execYearFilter"
          value={execYearFilter}
          onChange={(e) => setExecYearFilter(e.target.value)}
        >
          <option value="">All</option>
          {executiveRecords.map(record => (
            <option key={record._id} value={record.academicYear}>
              {record.academicYear}
            </option>
          ))}
        </select>
      </div>

      <div className="executive-records-list">
        {filteredExecutiveRecords.map(record => (
          <div key={record._id} className="executive-record">
            <h4>{record.academicYear}</h4>
            <ul>
              {record.members.map((member, idx) => (
                <li key={idx}>
                  <strong>{member.name}</strong> - {member.role}
                </li>
              ))}
            </ul>
            <button onClick={() => deleteExecutiveRecord(record._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
