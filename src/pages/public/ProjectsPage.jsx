import React from 'react';
import '../../styles/ProjectsPage.css';

const projects = [
  {
    id: 1,
    name: 'Clean Water Initiative',
    description: 'Providing clean and safe drinking water to rural communities.',
    donationLink: '#'
  },
  {
    id: 2,
    name: 'Youth Empowerment Program',
    description: 'Training and mentoring youth for entrepreneurship and leadership.',
    donationLink: '#'
  },
  {
    id: 3,
    name: 'Sustainable Agriculture',
    description: 'Promoting eco-friendly farming techniques to improve food security.',
    donationLink: '#'
  }
];

const ProjectsPage = () => {
  return (
    <section className="projects-page">
      <h1>Our Projects</h1>
      <div className="projects-list">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <button
              onClick={() => alert('Donation feature coming soon!')}
              aria-label={`Donate to ${project.name}`}
            >
              Donate
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsPage;
