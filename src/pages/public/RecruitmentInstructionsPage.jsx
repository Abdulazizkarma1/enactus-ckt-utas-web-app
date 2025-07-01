import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/RecruitmentInstructionsPage.css';

const RecruitmentInstructionsPage = () => {
  return (
    <div className="recruitment-instructions-container">
      <h2>Recruitment Application Instructions</h2>
      <p>Please read the following instructions carefully before you begin the application process.</p>
      <ul>
        <li>Ensure you have a stable internet connection.</li>
        <li>You will need to upload a soft copy of your CV (in PDF format).</li>
        <li>A passport-sized photo is also required.</li>
        <li>The form is divided into several sections. Please fill out all required fields.</li>
        <li>You can save your progress and return later to complete the application.</li>
      </ul>
      <Link to="/recruitment-form" className="start-button">
        Start Application
      </Link>
    </div>
  );
};

export default RecruitmentInstructionsPage;
