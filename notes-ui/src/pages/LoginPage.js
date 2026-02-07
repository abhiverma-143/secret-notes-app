import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

// 🖌️ Icons (SVG Code)
// ✅ CORRECTED ICONS (Copy & Paste this)
const Icons = {
  Mail: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>,
  Lock: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>,
  // 👇 Ye wala Icon kharab tha, ab fix hai:
  Eye: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>,
  EyeOff: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07-2.3 2.3"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>,
  ArrowRight: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
};
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("⚠️ Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post('https://secret-notes-backend.onrender.com/auth/login', {
        email,
        password
      });

      // Token aur Username save karo
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);

      // Dashboard par bhejo
      navigate('/dashboard');

    } catch (err) {
      setError("❌ Invalid Email or Password");
    }
  };

  return (
    <div className="login-container">
      <style>{`
        * { box-sizing: border-box; }
        body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; }

        .login-container { 
            min-height: 100vh; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            font-family: 'Segoe UI', sans-serif; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            padding: 20px; 
        }

        .glass-card { 
            background: rgba(255, 255, 255, 0.15); 
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); 
            backdrop-filter: blur(12px); 
            -webkit-backdrop-filter: blur(12px);
            border-radius: 20px; 
            border: 1px solid rgba(255, 255, 255, 0.18); 
            padding: 40px 30px; 
            width: 100%; 
            max-width: 380px; 
            text-align: center; 
            color: white; 
            animation: fadeIn 0.8s ease; 
        }

        .logo-img {
            width: 60px;
            margin-bottom: 15px;
            filter: drop-shadow(0 0 10px rgba(255,255,255,0.3));
        }

        h2 { margin: 0 0 10px; font-size: 28px; font-weight: 700; letter-spacing: 0.5px; }
        .sub-text { font-size: 14px; opacity: 0.8; margin-bottom: 30px; }

        .input-group { position: relative; margin-bottom: 20px; text-align: left; }
        .input-icon { position: absolute; left: 15px; top: 50%; transform: translateY(-50%); opacity: 0.8; color: white; }
        
        .toggle-password { 
            position: absolute; right: 15px; top: 50%; 
            transform: translateY(-50%); cursor: pointer; color: white; opacity: 0.8; 
            transition: 0.3s;
        }
        .toggle-password:hover { opacity: 1; transform: translateY(-50%) scale(1.1); }

        input { 
            width: 100%; 
            padding: 14px 15px 14px 45px; 
            border-radius: 30px; 
            border: 2px solid transparent; 
            outline: none; 
            background: rgba(255, 255, 255, 0.2); 
            color: white; 
            font-size: 16px; 
            transition: 0.3s; 
        }
        input::placeholder { color: rgba(255, 255, 255, 0.7); }
        input:focus { 
            background: rgba(255, 255, 255, 0.25); 
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.1); 
            border-color: rgba(255,255,255,0.3);
        }

        /* 🔥 New CSS for Forgot Password */
        .forgot-pass-container {
            text-align: right;
            margin-top: -10px;
            margin-bottom: 20px;
        }
        .forgot-pass-link {
            color: rgba(255, 255, 255, 0.8);
            font-size: 13px;
            text-decoration: none;
            transition: 0.3s;
        }
        .forgot-pass-link:hover {
            color: white;
            text-decoration: underline;
        }

        .submit-btn { 
            width: 100%; 
            padding: 14px; 
            border-radius: 30px; 
            border: none; 
            background: #2ed573; 
            color: white; 
            font-size: 18px; 
            font-weight: bold; 
            cursor: pointer; 
            transition: 0.3s; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            gap: 10px; 
            box-shadow: 0 4px 15px rgba(46, 213, 115, 0.3);
        }
        .submit-btn:hover { 
            background: #26af61; 
            transform: translateY(-2px); 
            box-shadow: 0 6px 20px rgba(46, 213, 115, 0.5); 
        }

        .error-msg { 
            color: #ff6b6b; 
            background: rgba(0,0,0,0.3); 
            padding: 10px; 
            border-radius: 10px; 
            margin-bottom: 20px; 
            font-size: 14px; 
            border: 1px solid #ff6b6b;
            display: flex; align-items: center; justify-content: center; gap: 8px;
        }

        .footer-links { margin-top: 25px; font-size: 14px; opacity: 0.9; }
        .footer-links a { color: #fff; font-weight: bold; text-decoration: none; border-bottom: 1px dashed white; transition: 0.3s; }
        .footer-links a:hover { color: #2ed573; border-color: #2ed573; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div className="glass-card">
        <img 
            src="https://img.icons8.com/fluency/96/document-lock.png" 
            alt="Logo" 
            className="logo-img"
        />

        <h2>Welcome Back</h2>
        <p className="sub-text">Enter your details to access your secret notes.</p>
        
        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <span className="input-icon"><Icons.Mail /></span>
            <input 
                type="email" 
                placeholder="Email Address" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
            />
          </div>

          <div className="input-group">
            <span className="input-icon"><Icons.Lock /></span>
            <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
            />
            <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <Icons.EyeOff /> : <Icons.Eye />}
            </span>
          </div>

          {/* 🔥 Forgot Password Option Added Here */}
          <div className="forgot-pass-container">
            <Link to="/forgot-password" className="forgot-pass-link">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="submit-btn">
            Login <Icons.ArrowRight />
          </button>
        </form>

        <div className="footer-links">
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;