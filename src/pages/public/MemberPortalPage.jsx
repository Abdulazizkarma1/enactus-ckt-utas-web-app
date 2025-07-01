import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import '../../styles/MemberPortalPage.css';

const MemberPortalPage = () => {
  const [activeTab, setActiveTab] = useState('application');
  const [applicationData, setApplicationData] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    // Fetch user profile from backend
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/user/profile', {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setApplicationData(data);
        } else {
          setApplicationData(null);
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        setApplicationData(null);
      }
    };
    fetchProfile();

    // Fetch payment history from backend (placeholder)
    setPaymentHistory([
      { id: 1, date: '2024-01-15', amount: 50, method: 'MTN Momo', status: 'Completed' },
    ]);
  }, []);

  const generatePDF = () => {
    if (!applicationData) return;
    const doc = new jsPDF();
    doc.text('Enactus CKT-UTAS Application Summary', 20, 20);
    autoTable(doc, {
      startY: 30,
      head: [['Field', 'Value']],
      body: Object.entries(applicationData).map(([key, value]) => [key, String(value)])
    });
    doc.save('application_summary.pdf');
  };

  const handleMtnPayment = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/payment/mtn', {
        method: 'POST',
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        alert(data.message);
        // Optionally refresh payment history here
      } else {
        alert('MTN payment failed');
      }
    } catch (err) {
      console.error('MTN payment error:', err);
      alert('MTN payment error');
    }
  };

  const handleVodafonePayment = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/payment/vodafone', {
        method: 'POST',
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        alert(data.message);
        // Optionally refresh payment history here
      } else {
        alert('Vodafone payment failed');
      }
    } catch (err) {
      console.error('Vodafone payment error:', err);
      alert('Vodafone payment error');
    }
  };

  return (
    <section className="member-portal">
      <h1>Member Portal</h1>
      {applicationData && (
        <div className="user-info">
          {applicationData.photoUrl ? (
            <img src={applicationData.photoUrl} alt="User Photo" className="user-photo" />
          ) : (
            <div className="no-photo-placeholder">No Photo Available</div>
          )}
          <p><strong>Name:</strong> {applicationData.firstName} {applicationData.lastName}</p>
          <p><strong>Student ID:</strong> {applicationData.studentId}</p>
          <p><strong>Admission Status:</strong> {applicationData.status || 'Pending'}</p>
        </div>
      )}
      <nav className="portal-nav" aria-label="Member portal navigation">
        <button
          className={activeTab === 'application' ? 'active' : ''}
          onClick={() => setActiveTab('application')}
        >
          Application
        </button>
        <button
          className={activeTab === 'payments' ? 'active' : ''}
          onClick={() => setActiveTab('payments')}
        >
          Payments
        </button>
        <button
          className={activeTab === 'notifications' ? 'active' : ''}
          onClick={() => setActiveTab('notifications')}
        >
          Notifications
        </button>
        <button
          className={activeTab === 'recruitmentUpdate' ? 'active' : ''}
          onClick={() => setActiveTab('recruitmentUpdate')}
        >
          Recruitment Update
        </button>
      </nav>

      {activeTab === 'application' && (
        <div className="tab-content">
          {applicationData ? (
            <>
              <h2>Your Application Details</h2>
              <table className="application-details-table">
                <tbody>
                  {Object.entries(applicationData).map(([key, value]) => (
                    <tr key={key}>
                      <td><strong>{key}</strong></td>
                      <td>{String(value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={generatePDF}>Download PDF</button>
            </>
          ) : (
            <p>No application data found.</p>
          )}
        </div>
      )}

      {activeTab === 'payments' && (
        <div className="tab-content">
          <h2>Pay Dues</h2>
          <button onClick={handleMtnPayment}>
            Pay via MTN Momo
          </button>
          <button onClick={handleVodafonePayment}>
            Pay via Vodafone
          </button>
          <h3>Payment History</h3>
          <ul>
            {paymentHistory.map(payment => (
              <li key={payment.id}>
                {payment.date} - {payment.amount} USD - {payment.method} - {payment.status}
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="tab-content">
          <h2>Notifications</h2>
          <p>Interview status updates and other notifications will appear here.</p>
        </div>
      )}

      {activeTab === 'recruitmentUpdate' && (
        <div className="tab-content">
          <h2>Recruitment Update</h2>
          {applicationData && applicationData.recruitmentStatus ? (
            <p>{applicationData.recruitmentStatus}</p>
          ) : (
            <p>No recruitment update available.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default MemberPortalPage;
