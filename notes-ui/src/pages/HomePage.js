import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home-container">
      <style>{`
        body, html { margin: 0; padding: 0; width: 100%; height: 100%; }
        .home-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          font-family: 'Segoe UI', sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 20px;
        }
        
        /* Navbar Simple */
        .nav {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          padding: 20px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-sizing: border-box;
        }
        .logo { font-size: 24px; font-weight: bold; display: flex; align-items: center; gap: 10px; }
        .nav-links a { color: white; text-decoration: none; margin-left: 20px; font-weight: 500; transition: 0.3s; }
        .nav-links a:hover { color: #2ed573; }

        /* Hero Section */
        .hero-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 60px 40px;
          border-radius: 20px;
          max-width: 800px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          animation: float 6s ease-in-out infinite;
        }

        h1 { font-size: 48px; margin: 0 0 20px; font-weight: 800; }
        p { font-size: 20px; opacity: 0.9; margin-bottom: 40px; line-height: 1.6; }

        .btn-group { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; }
        
        .btn {
          padding: 15px 40px;
          border-radius: 30px;
          font-size: 18px;
          font-weight: bold;
          text-decoration: none;
          transition: 0.3s;
          display: inline-block;
        }

        .btn-primary {
          background: #2ed573;
          color: white;
          box-shadow: 0 5px 15px rgba(46, 213, 115, 0.4);
        }
        .btn-primary:hover { background: #26af61; transform: translateY(-3px); }

        .btn-secondary {
          background: rgba(255,255,255,0.2);
          color: white;
          border: 1px solid rgba(255,255,255,0.4);
        }
        .btn-secondary:hover { background: rgba(255,255,255,0.3); transform: translateY(-3px); }

        /* Floating Animation */
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        /* Mobile Responsive */
        @media (max-width: 600px) {
          h1 { font-size: 32px; }
          .nav { padding: 20px; }
          .hero-card { padding: 30px 20px; margin: 20px; }
        }
      `}</style>

      {/* Navigation Bar */}
      <nav className="nav">
        <div className="logo">
          <img src="https://img.icons8.com/fluency/48/document-lock.png" alt="logo" width="30"/>
          SecretNotes
        </div>
        <div className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="hero-card">
        <h1>Keep Your Thoughts <br/> Safe & Secure 🔒</h1>
        <p>
          The most secure place for your private notes. <br/>
          Encrypted, cloud-based, and accessible from anywhere.
        </p>
        
        <div className="btn-group">
          <Link to="/register" className="btn btn-primary">Get Started 🚀</Link>
          <Link to="/login" className="btn btn-secondary">Login</Link>
        </div>
      </div>

    </div>
  );
}

export default HomePage;