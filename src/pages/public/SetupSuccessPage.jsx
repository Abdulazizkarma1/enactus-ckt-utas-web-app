import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/SetupSuccessPage.css';

const SetupSuccessPage = () => {
  return (
    <div className="setup-success-container">
      <h2>Congratulations!</h2>
      <p>You have successfully set your credentials.</p>
      <p>You will use these credentials to access the main recruitment portal.</p>
      <Link to="/recruitment-instructions" className="proceed-button">
        Proceed to Application
      </Link>
    </div>
  );
};

export default SetupSuccessPage;
