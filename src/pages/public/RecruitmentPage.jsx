import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../../styles/RecruitmentPage.css';

const RecruitmentPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('recruitmentForm');
    return saved ? JSON.parse(saved) : {
      serial: '', pin: '', studentId: '', password: '',
      lastName: '', firstName: '', dob: '', department: '',
      programme: '', zone: '', hostel: '', phone: '', whatsapp: '',
      cv: null, photo: null, motivation: '', teamInterest: '', agreeTerms: false
    };
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    localStorage.setItem('recruitmentForm', JSON.stringify(formData));
  }, [formData]);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const val = type === 'checkbox' ? checked : type === 'file' ? files[0] : value;

    if (type === 'file' && name === 'photo') {
      if (!files[0].type.startsWith('image/')) {
        setErrors({ ...errors, photo: 'Photo must be an image file.' });
        return;
      } else if (files[0].size > 1024 * 1024) {
        setErrors({ ...errors, photo: 'Photo must be under 1MB.' });
        return;
      } else {
        const newErrors = { ...errors };
        delete newErrors.photo;
        setErrors(newErrors);
      }
    }

    if (type === 'file' && name === 'cv') {
      if (!files[0].name.endsWith('.pdf')) {
        setErrors({ ...errors, cv: 'CV must be a PDF file.' });
        return;
      } else if (files[0].size > 2 * 1024 * 1024) {
        setErrors({ ...errors, cv: 'CV must be under 2MB.' });
        return;
      } else {
        const newErrors = { ...errors };
        delete newErrors.cv;
        setErrors(newErrors);
      }
    }

    setFormData({ ...formData, [name]: val });
  };

  const saveForm = () => {
    localStorage.setItem('recruitmentForm', JSON.stringify(formData));
    alert('Progress saved!');
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Enactus CKT-UTAS Recruitment Summary', 20, 20);
    doc.autoTable({
      startY: 30,
      head: [['Field', 'Value']],
      body: [
        ['Full Name', `${formData.firstName} ${formData.lastName}`],
        ['Student ID', formData.studentId],
        ['Date of Birth', formData.dob],
        ['Department', formData.department],
        ['Programme', formData.programme],
        ['Zone', formData.zone],
        ['Hostel', formData.hostel],
        ['Phone', formData.phone],
        ['WhatsApp', formData.whatsapp],
        ['Motivation', formData.motivation],
        ['Preferred Team', formData.teamInterest]
      ]
    });
    doc.save('enactus_recruitment_summary.pdf');
  };


  return (
    <div className="recruitment-container">
      <h2>Enactus CKT-UTAS Recruitment</h2>
            <div className="step-form">
        <button onClick={saveForm}>💾 Save Progress</button>
      </div>

       {/* Example error display */}
      {errors.photo && <p style={{ color: 'red' }}>{errors.photo}</p>}
      {errors.cv && <p style={{ color: 'red' }}>{errors.cv}</p>}

            {/* Simulate final submit step */}
      {step === 5 && (
        <div className="step-form">
          <button onClick={generatePDF}>Generate PDF Summary</button>
        </div>
      )}

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
