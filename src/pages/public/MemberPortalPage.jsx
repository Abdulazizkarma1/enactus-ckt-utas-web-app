import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../../styles/MemberPortalPage.css';

const MemberPortalPage = () => {
  const [activeTab, setActiveTab] = useState('application');
  const [applicationData, setApplicationData] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    // Fetch application data from backend (placeholder)
    // For now, load from localStorage or dummy data
    const savedApp = localStorage.getItem('recruitmentForm');
    if (savedApp) {
      setApplicationData(JSON.parse(savedApp));
    }
    // Fetch payment history from backend (placeholder)
    setPaymentHistory([
      { id: 1, date: '2024-01-15', amount: 50, method: 'MTN Momo', status: 'Completed' },
      { id: 2, date: '2024-03-10', amount: 50, method: 'Card', status: 'Pending' },
    ]);
  }, []);

  const generatePDF = () => {
    if (!applicationData) return;
    const doc = new jsPDF();
    doc.text('Enactus CKT-UTAS Application Summary', 20, 20);
    doc.autoTable({
      startY: 30,
      head: [['Field', 'Value']],
      body: Object.entries(applicationData).map(([key, value]) => [key, String(value)])
    });
    doc.save('application_summary.pdf');
  };

  return (
    <section className="member-portal">
      <h1>Member Portal</h1>
      {applicationData && (
        <div className="user-info">
          {applicationData.photoUrl && (
            <img src={applicationData.photoUrl} alt="User Photo" className="user-photo" />
          )}
          <p><strong>Name:</strong> {applicationData.firstName} {applicationData.lastName}</p>
          <p><strong>Student ID:</strong> {applicationData.studentId}</p>
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
              <pre>{JSON.stringify(applicationData, null, 2)}</pre>
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
          <button onClick={() => alert('MTN Momo payment integration coming soon!')}>
            Pay via MTN Momo
          </button>
          <button onClick={() => alert('Card payment integration coming soon!')}>
            Pay via Card
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
