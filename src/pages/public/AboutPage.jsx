import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/AboutPage.css';
import teamBg from '../../assets/hero.jpg'; // placeholder image path

const AboutPage = () => {
  return (
    <div className="about-container">
      <div className="about-bg">
        <div className="about-overlay">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About Enactus CKT-UTAS
          </motion.h2>

          <motion.p
            className="about-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Enactus is an international non-profit organization dedicated to 
            inspiring students to improve the world through entrepreneurial action. 
            At CKT-UTAS, our Enactus team embraces this mission by empowering students with the knowledge,
             tools, and opportunities to develop community-impact projects.
          </motion.p>
        </div>
        <img src={teamBg} alt="Team Background" className="about-background-image" />
      </div>

      <div className="about-cards">
        <motion.div
          className="about-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3>Our Mission</h3>
          <p>To engage students in social entrepreneurship, enabling sustainable and scalable solutions for real-world problems.</p>
        </motion.div>

        <motion.div
          className="about-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3>Our Vision</h3>
          <p>To become a leading force of student-led innovation and impact in Ghana and across Africa.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;