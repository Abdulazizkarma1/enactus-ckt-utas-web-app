import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/HomePage.css'
import heroImg from '../../assets/hero.jpg'; // replace with real image later

const HomePage = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Enactus CKT-UTAS
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          Empowering students to make a difference through social innovation.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="cta-btn"
        >
          Join Us Now
        </motion.button>
      </div>
      <div className="hero-image">
        <img src={heroImg} alt="Hero" />
      </div>
    </section>
  );
};

export default HomePage;