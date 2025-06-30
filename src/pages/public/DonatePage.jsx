import React from 'react';
import '../../styles/DonatePage.css';

const DonatePage = () => {
  return (
    <section className="donate-page">
      <h1>Support Enactus CKT-UTAS</h1>
      <p>Your donations help us continue our social impact projects and empower students.</p>
      <div className="donation-options">
        <button onClick={() => alert('MTN Momo payment integration coming soon!')} aria-label="Donate via MTN Momo">
          Donate via MTN Momo
        </button>
        <button onClick={() => alert('Flutterwave payment integration coming soon!')} aria-label="Donate via Card (Flutterwave)">
          Donate via Card (Flutterwave)
        </button>
      </div>
    </section>
  );
};

export default DonatePage;
