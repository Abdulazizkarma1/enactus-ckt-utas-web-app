import React, { useState } from 'react';
import '../../styles/TeamPage.css';

const teamsByYear = {
  2024: [
    { id: 1, name: 'John Doe', role: 'President', photo: '/assets/executives/john.jpg' },
    { id: 2, name: 'Kwame Nkrumah', role: 'Vice President', photo: '/assets/executives/kwame.jpg' },
  ],
  2023: [
    { id: 3, name: 'Jane Smith', role: 'President', photo: '/assets/executives/jane.jpg' },
    { id: 4, name: 'Michael Johnson', role: 'Secretary', photo: '/assets/executives/michael.jpg' },
  ],
};

const TeamPage = () => {
  const [selectedYear, setSelectedYear] = useState(2024);

  const years = Object.keys(teamsByYear).sort((a, b) => b - a);

  return (
    <section className="team-page">
      <h1>Executive Team</h1>
      <div className="year-selector">
        <label htmlFor="year-select">Select Academic Year: </label>
        <select
          id="year-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
        >
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div className="team-list">
        {teamsByYear[selectedYear].map(member => (
          <div key={member.id} className="team-member">
            <img src={member.photo} alt={`${member.name} - ${member.role}`} />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamPage;
