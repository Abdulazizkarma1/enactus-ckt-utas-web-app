import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../../styles/RecruitmentPage.css';

const RecruitmentPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('recruitmentForm');
    const studentId = localStorage.getItem('studentId');
    return saved ? JSON.parse(saved) : {
      studentId: studentId || '',
      lastName: '', firstName: '', dob: '', department: '',
      programme: '', zone: '', hostel: '', phone: '', whatsapp: '',
      cv: null, photo: null, motivation: '', teamInterest: '', agreeTerms: false
    };
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    localStorage.setItem('recruitmentForm', JSON.stringify(formData));
  }, [formData]);

  const handleNext = () => {
    let currentErrors = {};

    if (step === 1) {
      const requiredFields = ['lastName', 'firstName', 'dob', 'department', 'programme', 'zone', 'hostel', 'phone', 'whatsapp'];
      requiredFields.forEach(field => {
        if (!formData[field]) {
          currentErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
        }
      });
    }

    if (step === 2) {
      if (!formData.motivation) {
        currentErrors.motivation = 'Motivation is required.';
      }
      if (!formData.teamInterest) {
        currentErrors.teamInterest = 'Please select a team.';
      }
    }

    if (step === 3) {
      if (!formData.agreeTerms) {
        currentErrors.agreeTerms = 'You must agree to the terms.';
      }
    }

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    } else {
      setErrors({});
      setStep(step + 1);
    }
  };

  const handleBack = () => setStep(step - 1);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const val = type === 'checkbox' ? checked : type === 'file' ? files[0] : value;
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

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/recruitment/submit-application', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error('DB error');

      localStorage.removeItem('recruitmentForm');
      localStorage.removeItem('studentId');
      // Redirect to application submitted confirmation page
      window.location.href = '/application-submitted';
    } catch (err) {
      alert('❌ Submission failed');
      console.error(err);
    }
  };

  return (
    <>
      <div className="recruitment-container">
        <h2>Enactus CKT-UTAS Recruitment</h2>
        <div className="step-form">
          <button onClick={saveForm}>💾 Save Progress</button>
        </div>

        {step === 1 && (
          <div className="step-form">
            <p>Personal Details</p>
            <input name="studentId" value={formData.studentId} onChange={handleChange} placeholder="Student ID" readOnly />
            <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
            {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}
            <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
            {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName}</p>}
            <input name="dob" type="date" value={formData.dob} onChange={handleChange} />
            {errors.dob && <p style={{ color: 'red' }}>{errors.dob}</p>}
            <input name="department" value={formData.department} onChange={handleChange} placeholder="Department" />
            {errors.department && <p style={{ color: 'red' }}>{errors.department}</p>}
            <input name="programme" value={formData.programme} onChange={handleChange} placeholder="Programme" />
            {errors.programme && <p style={{ color: 'red' }}>{errors.programme}</p>}
            <input name="zone" value={formData.zone} onChange={handleChange} placeholder="Zone" />
            {errors.zone && <p style={{ color: 'red' }}>{errors.zone}</p>}
            <input name="hostel" value={formData.hostel} onChange={handleChange} placeholder="Hostel" />
            {errors.hostel && <p style={{ color: 'red' }}>{errors.hostel}</p>}
            <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
            {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
            <input name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="WhatsApp" />
            {errors.whatsapp && <p style={{ color: 'red' }}>{errors.whatsapp}</p>}
            <label>Upload CV <input name="cv" type="file" onChange={handleChange} /></label>
            <label>Upload Passport Photo <input name="photo" type="file" onChange={handleChange} /></label>
            <button onClick={handleNext}>Continue</button>
          </div>
        )}

        {step === 2 && (
          <div className="step-form">
            <p>Motivation and Team Selection</p>
            <textarea name="motivation" value={formData.motivation} onChange={handleChange} placeholder="Why do you want to join Enactus?" />
            {errors.motivation && <p style={{ color: 'red' }}>{errors.motivation}</p>}
            <select name="teamInterest" value={formData.teamInterest} onChange={handleChange}>
              <option value="">Select Team</option>
              <option value="research">Research Team</option>
              <option value="presentation">Presentation Team</option>
              <option value="it">IT Team</option>
              <option value="script">Script Team</option>
            </select>
            {errors.teamInterest && <p style={{ color: 'red' }}>{errors.teamInterest}</p>}
            <button onClick={handleBack}>Back</button>
            <button onClick={handleNext}>Continue</button>
          </div>
        )}

        {step === 3 && (
          <div className="step-form">
            <p>Data Privacy</p>
            <p>This data will be used for interview and membership purposes. It may be shared with external bodies when necessary.</p>
            <label><input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} /> I agree to the terms and privacy policy</label>
            {errors.agreeTerms && <p style={{ color: 'red' }}>{errors.agreeTerms}</p>}
            <button onClick={handleBack}>Back</button>
            <button onClick={generatePDF}>Generate PDF Summary</button>
            <button disabled={!formData.agreeTerms} onClick={handleSubmit}>Submit Application</button>
          </div>
        )}
      </div>
    </>
  );
};

export default RecruitmentPage;
