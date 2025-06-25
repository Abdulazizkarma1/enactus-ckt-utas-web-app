import React, { useState } from 'react';
import '../../styles/TeamPage.css';
import johnImg from '../../assets/executives/john.jpg';
import kwameImg from '../../assets/executives/kwame.jpg';

const dummyExecutives = {
  '2024': [
    {
      name: 'Kwame Mensah',
      position: 'President',
      image: johnImg,
      facebook: '#',
      linkedin: '#',
      twitter: '#',
      github: '#'
    },
    {
      name: 'Ama Serwaa',
      position: 'Vice President',
      image: kwameImg,
      facebook: '#',
      linkedin: '#',
      twitter: '#',
      github: '#'
    }
  ],
  '2023': [
    {
      name: 'John Doe',
      position: 'President',
      image: johnImg,
      facebook: '#',
      linkedin: '#',
      twitter: '#',
      github: '#'
    }
  ]
};

const TeamPage = () => {
  const [year, setYear] = useState('2024');
  const executives = dummyExecutives[year] || [];

  return (
    <div className="team-container">
      <h2>Meet Our Executives</h2>

      <select className="year-selector" value={year} onChange={(e) => setYear(e.target.value)}>
        {Object.keys(dummyExecutives).map((yr) => (
          <option key={yr} value={yr}>{yr}</option>
        ))}
      </select>

      <div className="executive-grid">
        {executives.map((exec, index) => (
          <div className="exec-card" key={index}>
            <img src={exec.image} alt={exec.name} className="exec-photo" />
            <h3>{exec.name}</h3>
            <p>{exec.position}</p>
            <div className="exec-links">
              <a href={exec.facebook} target="_blank" rel="noreferrer">Facebook</a>
              <a href={exec.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <a href={exec.twitter} target="_blank" rel="noreferrer">X</a>
              <a href={exec.github} target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
