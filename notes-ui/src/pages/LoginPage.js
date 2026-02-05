import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

// 🖌️ Icons (Mail Icon Added)
const Icons = {
  Mail: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>,
  Lock: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>,
  Eye: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8-11-8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>,
  EyeOff: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07-2.3 2.3"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>,
  ArrowRight: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>,
  Check: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
  XCircle: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
};

const Toast = ({ message, type, visible }) => {
  if (!visible) return null;
  const isSuccess = type === 'success';
  return (
    <div className={`toast ${isSuccess ? 'success' : 'error'}`}>
      <span className="toast-icon">{isSuccess ? <Icons.Check /> : <Icons.XCircle />}</span>
      <span className="toast-message">{message}</span>
      <style>{`
        .toast { position: fixed; top: 20px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; gap: 12px; padding: 12px 24px; border-radius: 50px; color: white; font-weight: 600; font-size: 14px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); z-index: 3000; animation: slideDown 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55); min-width: 250px; justify-content: center; }
        .toast.success { background: linear-gradient(135deg, #00b09b, #96c93d); }
        .toast.error { background: linear-gradient(135deg, #ff5f6d, #ffc371); }
        .toast-icon svg { width: 20px; height: 20px; }
        @keyframes slideDown { from { top: -50px; opacity: 0; } to { top: 20px; opacity: 1; } }
      `}</style>
    </div>
  );
};

function LoginPage() {
  const [email, setEmail] = useState(''); // 🔥 State changed to Email
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '', visible: false });
  const navigate = useNavigate();

  const showToast = (message, type) => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 3000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // 🔥 Sending 'email' instead of 'username'
      const response = await axios.post('http://localhost:8081/auth/login', { 
        email, 
        password 
      });
      
      sessionStorage.setItem('auth_token', response.data);
      showToast("🚀 Login Successful!", "success");
      setTimeout(() => navigate('/dashboard'), 1000);

    } catch (error) {
      showToast("Invalid Email or Password!", "error");
    }
  };

  return (
    <div className="login-container">
      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
      <style>{`
        body, html { margin: 0; padding: 0; font-family: 'Segoe UI', sans-serif; height: 100%; }
        .login-container { height: 100vh; display: flex; justify-content: center; align-items: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .glass-card { background: rgba(255, 255, 255, 0.15); box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); backdrop-filter: blur(12px); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.18); padding: 40px; width: 100%; max-width: 400px; text-align: center; color: white; }
        h2 { margin-bottom: 20px; font-weight: 800; font-size: 28px; }
        .input-group { position: relative; margin-bottom: 20px; text-align: left; }
        .input-icon { position: absolute; left: 15px; top: 50%; transform: translateY(-50%); opacity: 0.7; color: white; }
        input { width: 100%; padding: 12px 15px 12px 45px; border-radius: 30px; border: none; outline: none; background: rgba(255, 255, 255, 0.2); color: white; font-size: 16px; box-sizing: border-box; transition: 0.3s; }
        input::placeholder { color: rgba(255, 255, 255, 0.6); }
        input:focus { background: rgba(255, 255, 255, 0.3); }
        .toggle-pass { position: absolute; right: 15px; top: 50%; transform: translateY(-50%); cursor: pointer; color: white; opacity: 0.7; }
        .forgot-link { text-align: right; margin-top: -10px; margin-bottom: 20px; font-size: 13px; }
        .forgot-link a { color: white; text-decoration: none; opacity: 0.8; transition: 0.2s; }
        .forgot-link a:hover { opacity: 1; text-decoration: underline; }
        .btn-login { width: 100%; padding: 12px; border-radius: 30px; border: none; background: #2ed573; color: white; font-size: 18px; font-weight: bold; cursor: pointer; transition: 0.3s; display: flex; align-items: center; justify-content: center; gap: 10px; }
        .btn-login:hover { background: #26af61; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(46, 213, 115, 0.4); }
        .register-link { margin-top: 20px; font-size: 14px; opacity: 0.9; }
        .register-link a { color: #fff; font-weight: bold; text-decoration: none; border-bottom: 1px dashed white; }
        .register-link a:hover { color: #2ed573; border-color: #2ed573; }
      `}</style>

      <div className="glass-card">
        <h2>Welcome Back</h2>
        <form onSubmit={handleLogin}>
          
          <div className="input-group">
            {/* 🔥 Username Icon replaced with Mail Icon */}
            <span className="input-icon"><Icons.Mail /></span>
            <input 
              type="email" 
              placeholder="Email Address" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <span className="input-icon"><Icons.Lock /></span>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="toggle-pass" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <Icons.EyeOff /> : <Icons.Eye />}
            </div>
          </div>

          <div className="forgot-link">
             <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <button type="submit" className="btn-login">
            Login <Icons.ArrowRight />
          </button>
        </form>

        <div className="register-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;