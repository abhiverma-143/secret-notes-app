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
        
        /* Navbar Simple (Sirf Logo) */
        .nav {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          padding: 20px 40px;
          display: flex;
          align-items: center;
          /* Justify Content 'Start' kar diya taaki logo left mein rahe */
          justify-content: flex-start; 
          box-sizing: border-box;
        }
        
        .logo { 
            font-size: 24px; 
            font-weight: bold; 
            display: flex; 
            align-items: center; 
            gap: 15px; 
            background: rgba(255, 255, 255, 0.1); /* Halka background taaki logo highlight ho */
            padding: 10px 20px;
            border-radius: 30px;
            backdrop-filter: blur(5px);
        }

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

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        @media (max-width: 600px) {
          h1 { font-size: 32px; }
          .nav { padding: 20px; }
          .hero-card { padding: 30px 20px; margin: 20px; }
        }
      `}</style>

      {/* Navigation Bar - Sirf Logo Rakha Hai */}
      <nav className="nav">
        <div className="logo">
          {/* Agar Image fail hui to Emoji dikhega */}
          <img 
            src="https://img.icons8.com/fluency/96/document-lock.png" 
            alt="🔒" 
            width="40"
            onError={(e) => {e.target.style.display='none'}} // Agar image na load ho to chhupa do
          />
          SecretNotes
        </div>
        
        {/* Yahan se Login/Register links hata diye gaye hain */}
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