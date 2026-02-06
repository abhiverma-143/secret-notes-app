import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage'; // ✅ Import Add Kiya

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Home Page */}
        <Route path="/" element={<HomePage />} />
        
        {/* ✅ Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* ✅ Forgot Password Route (Naya Add Kiya) */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        
        {/* ✅ Private Route */}
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;