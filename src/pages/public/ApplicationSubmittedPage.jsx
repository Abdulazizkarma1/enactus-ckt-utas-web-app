import React from 'react';
import { useNavigate } from 'react-router-dom';

const ApplicationSubmittedPage = () => {
  const navigate = useNavigate();

  const handleGoToPortal = () => {
    navigate('/student-login');
  };

  return (
    <div className="application-submitted">
      <h2>Application Submitted</h2>
      <p>
        Your application has been submitted successfully. Please prepare for the interview.
        Dates, time, and venue will be communicated 3 days before the interview.
      </p>
      <p>
        Note: Completing the form does not guarantee membership in Enactus (ENACTOR).
        The outcome of the interview will determine membership admission.
        Failure to appear before the panel for the interview is automatic disqualification.
      </p>
      <button onClick={handleGoToPortal}>Go to Student Login</button>
    </div>
  );
};

export default ApplicationSubmittedPage;
