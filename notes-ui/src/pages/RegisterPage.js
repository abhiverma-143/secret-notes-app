import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

// 🖌️ Icons
const Icons = {
  User: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
  Mail: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>,
  Lock: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>,
  Phone: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>,
  Eye: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>,
  EyeOff: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07-2.3 2.3"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>,
  ArrowRight: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
};

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });
  
  const [error, setError] = useState('');
  const [message, setMessage] = useState(''); // ✅ Success message state
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, mobile, email, password, confirmPassword } = formData;

    // Validation
    if (!username || !mobile || !email || !password || !confirmPassword) {
      setError("⚠️ All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      setError("❌ Passwords do not match!");
      return;
    }

    try {
      // Backend request
      await axios.post('https://secret-notes-app-pdmd.onrender.com/auth/register', {
        username,
        email, 
        mobile,
        password
      });
      
      // ✅ SUCCESS LOGIC CHANGED HERE
      // Alert hata diya aur message set kiya
      setMessage("✅ Registration Successful! Redirecting...");
      setError(""); // Purane errors saaf karo

      // 2 Second wait karke Login page par bhejo
      setTimeout(() => {
        navigate('/'); 
      }, 2000);

    } catch (err) {
      // 🔥 ERROR HANDLING
      if (err.response && err.response.data) {
          setError("❌ " + err.response.data); 
      } else {
          setError("❌ Registration Failed! Check console.");
          console.error(err);
      }
    }
  };

  return (
    <div className="register-container">
      <style>{`
        body, html { margin: 0; padding: 0; width: 100%; height: 100%; }
        .register-container { min-height: 100vh; display: flex; justify-content: center; align-items: center; font-family: 'Segoe UI', sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; }
        .glass-card { background: rgba(255, 255, 255, 0.15); box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); backdrop-filter: blur(12px); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.18); padding: 40px; width: 100%; max-width: 400px; text-align: center; color: white; animation: fadeIn 0.8s ease; }
        h2 { margin-bottom: 10px; font-size: 28px; font-weight: 700; }
        .sub-text { font-size: 14px; opacity: 0.8; margin-bottom: 30px; }
        .input-group { position: relative; margin-bottom: 20px; text-align: left; }
        .input-icon { position: absolute; left: 15px; top: 50%; transform: translateY(-50%); opacity: 0.7; color: white; }
        .toggle-password { position: absolute; right: 15px; top: 50%; transform: translateY(-50%); cursor: pointer; color: white; opacity: 0.7; }
        input { width: 100%; padding: 12px 15px 12px 45px; border-radius: 30px; border: none; outline: none; background: rgba(255, 255, 255, 0.2); color: white; font-size: 16px; box-sizing: border-box; transition: 0.3s; }
        input::placeholder { color: rgba(255, 255, 255, 0.6); }
        input:focus { background: rgba(255, 255, 255, 0.3); box-shadow: 0 0 10px rgba(255, 255, 255, 0.2); }
        .submit-btn { width: 100%; padding: 12px; border-radius: 30px; border: none; background: #2ed573; color: white; font-size: 18px; font-weight: bold; cursor: pointer; transition: 0.3s; margin-top: 10px; display: flex; align-items: center; justify-content: center; gap: 10px; }
        .submit-btn:hover { background: #26af61; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(46, 213, 115, 0.4); }
        .error-msg { color: #ff6b6b; background: rgba(0,0,0,0.2); padding: 8px; border-radius: 10px; margin-bottom: 15px; font-size: 14px; }
        .success-msg { color: #2ed573; background: rgba(46, 213, 115, 0.2); padding: 10px; border-radius: 10px; margin-bottom: 15px; font-size: 14px; font-weight: bold; border: 1px solid #2ed573; }
        .login-link { margin-top: 20px; font-size: 14px; opacity: 0.9; }
        .login-link a { color: #fff; font-weight: bold; text-decoration: none; border-bottom: 1px dashed white; }
        .login-link a:hover { color: #2ed573; border-color: #2ed573; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div className="glass-card">
        <h2>🚀 Create Account</h2>
        <p className="sub-text">Join us to keep your secrets safe!</p>
        
        {/* ✅ Success Message Display */}
        {message && <div className="success-msg">{message}</div>}

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleRegister}>
          <div className="input-group">
            <span className="input-icon"><Icons.User /></span>
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <span className="input-icon"><Icons.Mail /></span>
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <span className="input-icon"><Icons.Phone /></span>
            <input type="number" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <span className="input-icon"><Icons.Lock /></span>
            <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <Icons.EyeOff /> : <Icons.Eye />}
            </span>
          </div>

          <div className="input-group">
            <span className="input-icon"><Icons.Lock /></span>
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
          </div>

          <button type="submit" className="submit-btn">Register Now <Icons.ArrowRight /></button>
        </form>

        <p className="login-link">Already have an account? <Link to="/">Login here</Link></p>
      </div>
    </div>
  );
}

export default RegisterPage;