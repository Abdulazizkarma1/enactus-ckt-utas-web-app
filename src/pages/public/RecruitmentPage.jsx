import React, { useState } from 'react';
import '../../styles/RecruitmentPage.css';

const RecruitmentPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serial: '',
    pin: '',
    studentId: '',
    password: '',
    lastName: '',
    firstName: '',
    dob: '',
    department: '',
    programme: '',
    zone: '',
    hostel: '',
    phone: '',
    whatsapp: '',
    cv: null,
    photo: null,
    motivation: '',
    teamInterest: '',
    agreeTerms: false
  });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const val = type === 'checkbox' ? checked : type === 'file' ? files[0] : value;
    setFormData({ ...formData, [name]: val });
  };

  return (
    <div className="recruitment-container">
      <h2>Enactus CKT-UTAS Recruitment</h2>
      {step === 1 && (
        <div className="step-form">
          <p>Please enter your voucher serial and pin to begin registration.</p>
          <input name="serial" value={formData.serial} onChange={handleChange} placeholder="Voucher Serial" />
          <input name="pin" value={formData.pin} onChange={handleChange} placeholder="Voucher Pin" />
          <button onClick={handleNext}>Verify and Continue</button>
        </div>
      )}

      {step === 2 && (
        <div className="step-form">
          <p>Set your Student ID and Password</p>
          <input name="studentId" value={formData.studentId} onChange={handleChange} placeholder="Student ID" />
          <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="New Password" />
          <button onClick={handleBack}>Back</button>
          <button onClick={handleNext}>Continue</button>
        </div>
      )}

      {step === 3 && (
        <div className="step-form">
          <p>Personal Details</p>
          <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
          <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
          <input name="dob" type="date" value={formData.dob} onChange={handleChange} />
          <input name="department" value={formData.department} onChange={handleChange} placeholder="Department" />
          <input name="programme" value={formData.programme} onChange={handleChange} placeholder="Programme" />
          <input name="zone" value={formData.zone} onChange={handleChange} placeholder="Zone" />
          <input name="hostel" value={formData.hostel} onChange={handleChange} placeholder="Hostel" />
          <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
          <input name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="WhatsApp" />
          <label>Upload CV <input name="cv" type="file" onChange={handleChange} /></label>
          <label>Upload Passport Photo <input name="photo" type="file" onChange={handleChange} /></label>
          <button onClick={handleBack}>Back</button>
          <button onClick={handleNext}>Continue</button>
        </div>
      )}

      {step === 4 && (
        <div className="step-form">
          <p>Motivation and Team Selection</p>
          <textarea name="motivation" value={formData.motivation} onChange={handleChange} placeholder="Why do you want to join Enactus?" />
          <select name="teamInterest" value={formData.teamInterest} onChange={handleChange}>
            <option value="">Select Team</option>
            <option value="research">Research Team</option>
            <option value="presentation">Presentation Team</option>
            <option value="it">IT Team</option>
            <option value="script">Script Team</option>
          </select>
          <button onClick={handleBack}>Back</button>
          <button onClick={handleNext}>Continue</button>
        </div>
      )}

      {step === 5 && (
        <div className="step-form">
          <p>Data Privacy</p>
          <p>This data will be used for interview and membership purposes. It may be shared with external bodies when necessary.</p>
          <label><input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} /> I agree to the terms and privacy policy</label>
          <button onClick={handleBack}>Back</button>
          <button disabled={!formData.agreeTerms}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default RecruitmentPage;
