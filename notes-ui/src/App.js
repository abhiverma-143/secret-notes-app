import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage'; // ✅ Naya Import

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Pehle '/' Login tha, ab HomePage kar diya */}
        <Route path="/" element={<HomePage />} />
        
        {/* ✅ Login ke liye alag rasta banaya */}
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;