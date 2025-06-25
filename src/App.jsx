import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import ProjectsPage from './pages/public/ProjectsPage';
import TeamPage from './pages/public/TeamPage';
import RecruitmentPage from './pages/public/RecruitmentPage';
import DonatePage from './pages/public/DonatePage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/recruitment" element={<RecruitmentPage />} />
        <Route path="/donate" element={<DonatePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
