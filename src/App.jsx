import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import ProjectsPage from './pages/public/ProjectsPage';
import TeamPage from './pages/public/TeamPage';
import RecruitmentPage from './pages/public/RecruitmentPage';
import DonatePage from './pages/public/DonatePage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import VoucherEntryPage from './pages/public/VoucherEntryPage';
import StudentSetupPage from './pages/public/StudentSetupPage';
import SetupSuccessPage from './pages/public/SetupSuccessPage';
import RecruitmentInstructionsPage from './pages/public/RecruitmentInstructionsPage';
import MemberPortalPage from './pages/public/MemberPortalPage';
import StudentLoginPage from './pages/public/StudentLoginPage';
import ApplicationSubmittedPage from './pages/public/ApplicationSubmittedPage';

const NotFoundPage = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h2>404 - Page Not Found</h2>
    <p>The page you are looking for does not exist.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/recruitment" element={<Navigate to="/voucher-entry" />} />
        <Route path="/voucher-entry" element={<VoucherEntryPage />} />
        <Route path="/student-setup" element={<StudentSetupPage />} />
        <Route path="/setup-success" element={<SetupSuccessPage />} />
        <Route path="/recruitment-instructions" element={<RecruitmentInstructionsPage />} />
        <Route path="/recruitment-form" element={<RecruitmentPage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/member-portal" element={<MemberPortalPage />} />
        <Route path="/student-login" element={<StudentLoginPage />} />
        <Route path="/application-submitted" element={<ApplicationSubmittedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
