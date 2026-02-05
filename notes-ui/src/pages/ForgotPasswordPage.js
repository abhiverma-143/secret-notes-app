import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Icons = {
  Mail: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>,
  Lock: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>,
  Key: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>,
  Check: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
};

function ForgotPasswordPage() {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP & New Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Step 1: Send OTP to Email
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Backend Endpoint: /auth/forgot-password (Email bhejega)
      await axios.post('http://localhost:8081/auth/forgot-password', { email });
      setStep(2); // Go to next step
      alert(`✅ OTP Code sent to ${email}`);
    } catch (err) {
      setError("❌ User not found or Email failed to send.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP & Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Backend Endpoint: /auth/reset-password (OTP + New Password Verify karega)
      await axios.post('http://localhost:8081/auth/reset-password', { 
        email, 
        otp, 
        newPassword 
      });
      
      alert("🎉 Password Reset Successful! Login now.");
      navigate('/'); // Redirect to Login
    } catch (err) {
      setError("❌ Invalid OTP Code or Error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fp-container">
      {/* CSS Styles */}
      <style>{`
        body, html { margin: 0; padding: 0; width: 100%; height: 100%; }
        .fp-container { min-height: 100vh; display: flex; justify-content: center; align-items: center; font-family: 'Segoe UI', sans-serif; background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%); padding: 20px; }
        .glass-card { background: rgba(255, 255, 255, 0.15); box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37); backdrop-filter: blur(12px); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.18); padding: 40px; width: 100%; max-width: 400px; text-align: center; color: white; }
        h2 { margin-bottom: 10px; font-size: 26px; }
        .sub-text { font-size: 14px; opacity: 0.8; margin-bottom: 25px; }
        .input-group { position: relative; margin-bottom: 20px; text-align: left; }
        .input-icon { position: absolute; left: 15px; top: 50%; transform: translateY(-50%); opacity: 0.8; color: white; }
        input { width: 100%; padding: 12px 15px 12px 45px; border-radius: 30px; border: none; outline: none; background: rgba(255, 255, 255, 0.2); color: white; font-size: 16px; box-sizing: border-box; transition: 0.3s; }
        input::placeholder { color: rgba(255, 255, 255, 0.6); }
        input:focus { background: rgba(255, 255, 255, 0.3); }
        .submit-btn { width: 100%; padding: 12px; border-radius: 30px; border: none; background: #f1c40f; color: #2c3e50; font-size: 18px; font-weight: bold; cursor: pointer; transition: 0.3s; margin-top: 10px; }
        .submit-btn:hover { background: #f39c12; transform: translateY(-2px); }
        .error-msg { color: #ff6b6b; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 8px; margin-bottom: 15px; font-size: 14px; }
        .back-link { margin-top: 20px; display: block; color: white; text-decoration: none; opacity: 0.8; }
        .back-link:hover { text-decoration: underline; opacity: 1; }
      `}</style>

      <div className="glass-card">
        {step === 1 ? (
          <>
            <h2>🔑 Forgot Password?</h2>
            <p className="sub-text">Enter your email to receive a reset code.</p>
            
            {error && <div className="error-msg">{error}</div>}

            <form onSubmit={handleSendOtp}>
              <div className="input-group">
                <span className="input-icon"><Icons.Mail /></span>
                <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Sending..." : "Send Code"}
              </button>
            </form>
          </>
        ) : (
          <>
            <h2>🔒 Reset Password</h2>
            <p className="sub-text">Check your email for the code!</p>

            {error && <div className="error-msg">{error}</div>}

            <form onSubmit={handleResetPassword}>
              <div className="input-group">
                <span className="input-icon"><Icons.Key /></span>
                <input type="text" placeholder="Enter OTP Code" value={otp} onChange={(e) => setOtp(e.target.value)} required />
              </div>
              
              <div className="input-group">
                <span className="input-icon"><Icons.Lock /></span>
                <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
              </div>

              <button type="submit" className="submit-btn" style={{background: '#2ecc71', color: 'white'}} disabled={loading}>
                {loading ? "Verifying..." : "Reset Password"}
              </button>
            </form>
          </>
        )}

        <Link to="/" className="back-link">Back to Login</Link>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;