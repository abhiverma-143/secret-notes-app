import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// 🖌️ Icons Components
const Icons = {
  Sun: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>,
  Moon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>,
  User: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
  Trash: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
  Plus: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  Lock: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>,
  Close: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  Quote: () => <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z"/></svg>,
  Search: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
  Paperclip: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>,
  Camera: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>,
  Phone: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>,
  Mail: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>,
  Check: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
  XCircle: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
};

// 🍞 Toast Component
const Toast = ({ message, type, visible }) => {
  if (!visible) return null;
  const isSuccess = type === 'success';
  return (
    <div className={`toast ${isSuccess ? 'success' : 'error'}`}>
      <span className="toast-icon">{isSuccess ? <Icons.Check /> : <Icons.XCircle />}</span>
      <span className="toast-message">{message}</span>
      <style>{`
        .toast {
          position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
          display: flex; align-items: center; gap: 12px;
          padding: 12px 24px; border-radius: 50px;
          color: white; font-weight: 600; font-size: 14px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          z-index: 3000; animation: slideDown 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
          min-width: 250px; justify-content: center;
        }
        .toast.success { background: linear-gradient(135deg, #00b09b, #96c93d); }
        .toast.error { background: linear-gradient(135deg, #ff5f6d, #ffc371); }
        .toast-icon svg { width: 20px; height: 20px; }
        @keyframes slideDown { from { top: -50px; opacity: 0; } to { top: 20px; opacity: 1; } }
      `}</style>
    </div>
  );
};

function DashboardPage() {
  const [notes, setNotes] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newNote, setNewNote] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState({ message: '', type: '', visible: false });

  // 👤 User Profile Data (Fetched from Backend)
  const [username, setUsername] = useState('User');
  const [userEmail, setUserEmail] = useState('Loading...');
  const [userMobile, setUserMobile] = useState('Loading...');
  const [profilePic, setProfilePic] = useState(null);

  const fileInputRef = useRef(null);
  const profileInputRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const navigate = useNavigate();

  const colors = ["#ff9ff3", "#feca57", "#54a0ff", "#5f27cd", "#48dbfb", "#1dd1a1"];

  useEffect(() => {
    fetchNotes();
    fetchUserProfile(); 
    loadLocalProfilePic();
  }, []);

  const showToast = (message, type) => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  // 🔥 Fetch Registered User Details from Backend
  const fetchUserProfile = async () => {
    // ✅ FIX: localStorage and 'token'
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await axios.get('https://secret-notes-app-pdmd.onrender.com/auth/me', {
        headers: { 'Authorization': token }
      });
      
      const { username, email, mobile } = response.data;
      setUsername(username.charAt(0).toUpperCase() + username.slice(1));
      setUserEmail(email || 'No Email');
      setUserMobile(mobile || 'No Mobile');

    } catch (error) {
      console.error("Failed to fetch profile", error);
    }
  };

  const loadLocalProfilePic = () => {
     // ✅ FIX: localStorage and 'token'
     const token = localStorage.getItem('token');
     if(token) {
        try {
            const base64Url = token.split(' ')[1]; 
            const user = atob(base64Url).split(':')[0];
            const savedPic = localStorage.getItem(`pic_${user}`);
            if (savedPic) setProfilePic(savedPic);
        } catch(e) {}
     }
  };

  const fetchNotes = async () => {
    // ✅ FIX: localStorage and 'token'
    const token = localStorage.getItem('token');
    
    // 🛑 AB YAHAN REDIRECT NAHI HOGA AGAR TOKEN HAI
    if (!token) { navigate('/'); return; }
    
    try {
      const response = await axios.get('https://secret-notes-app-pdmd.onrender.com/notes', {
        headers: { 'Authorization': token }
      });
      setNotes(response.data);
    } catch (error) { 
        if (error.response && error.response.status === 401) {
            // ✅ FIX: localStorage
            localStorage.removeItem('token');
            navigate('/');
        }
    }
  };

  const handleTitleChange = (e) => {
    const inputValue = e.target.value;
    const words = inputValue.trim().split(/\s+/).filter(w => w.length > 0);
    if (words.length > 7 && inputValue.length > newTitle.length) return;
    setNewTitle(inputValue);
  };

  const handleFileClick = () => { fileInputRef.current.click(); };
  const handleFileChange = () => { /* Logic */ };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        localStorage.setItem(`pic_${username.toLowerCase()}`, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddNote = async () => {
    if (!newTitle.trim() && !newNote.trim() && !fileInputRef.current?.files[0]) return;
    
    // ✅ FIX: localStorage
    const token = localStorage.getItem('token');
    
    const formData = new FormData();
    formData.append('title', newTitle);
    formData.append('content', newNote);
    if (fileInputRef.current && fileInputRef.current.files[0]) {
        formData.append('file', fileInputRef.current.files[0]);
    }

    try {
      await axios.post('https://secret-notes-app-pdmd.onrender.com/notes', formData, { 
        headers: { 'Authorization': token, 'Content-Type': 'multipart/form-data' } 
      });
      setNewTitle(''); setNewNote('');
      if(fileInputRef.current) fileInputRef.current.value = "";
      fetchNotes();
      showToast("Note Added Successfully!", "success");
    } catch (error) { showToast("Failed to add note!", "error"); }
  };
  
  const handleDeleteNote = async (e, id) => {
    e.stopPropagation();
    // ✅ FIX: localStorage
    const token = localStorage.getItem('token');
    
    try {
      await axios.delete(`https://secret-notes-app-pdmd.onrender.com/notes/${id}`, {
        headers: { 'Authorization': token }
      });
      setNotes(notes.filter(note => note.id !== id));
      if (selectedNote && selectedNote.id === id) setSelectedNote(null);
      showToast("Note Deleted!", "error");
    } catch (error) { showToast("Failed to delete!", "error"); }
  };

  const handleLogout = () => {
    // ✅ FIX: localStorage
    localStorage.removeItem('token');
    navigate('/', { replace: true });
  };

  const filteredNotes = notes.filter((note) => {
    if (!searchTerm) return true;
    const title = note.title ? note.title.toLowerCase() : "";
    return title.includes(searchTerm.toLowerCase());
  });

  const currentWordCount = newTitle.trim().split(/\s+/).filter(w => w.length > 0).length;

  return (
    <div className={`app-container ${darkMode ? 'dark' : 'light'}`}>
      <Toast message={toast.message} type={toast.type} visible={toast.visible} />

      <style>{`
        body, html { margin: 0; padding: 0; box-sizing: border-box; width: 100%; }
        .app-container { min-height: 100vh; font-family: 'Segoe UI', sans-serif; transition: 0.3s; padding-top: 20px; }
        .light { background-color: #f4f7f6; color: #333; }
        .dark { background-color: #20232a; color: #e4e6eb; }
        
        .glass { border-radius: 16px; transition: 0.3s; }
        .light .glass { background-color: #ffffff; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid #e1e1e1; }
        .dark .glass { background-color: #2c313c; box-shadow: 0 4px 15px rgba(0,0,0,0.2); border: 1px solid #3b4048; }

        .navbar { display: flex; justify-content: space-between; align-items: center; padding: 10px 20px; margin: 0 15px 25px 15px; position: sticky; top: 10px; z-index: 100; }
        .nav-logo-area { display: flex; align-items: center; gap: 10px; }
        .nav-logo-text { font-size: 20px; font-weight: bold; }
        
        .nav-search { flex: 1; margin: 0 20px; max-width: 500px; display: flex; align-items: center; padding: 10px 15px; border-radius: 30px; transition: 0.3s; }
        .light .nav-search { background: rgba(0,0,0,0.06); } .dark .nav-search { background: rgba(255,255,255,0.1); }
        .nav-search:focus-within { background: transparent; box-shadow: 0 0 0 3px rgba(46, 213, 115, 0.3); border-color: #2ed573; }
        .search-input { width: 100%; border: none; background: transparent; margin-left: 10px; outline: none; font-size: 16px; color: inherit; }

        @media (max-width: 768px) { .nav-logo-text { display: none; } .nav-search { margin: 0 10px; } .navbar { padding: 10px 15px; } }

        .icon-btn { background: transparent; border: none; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; color: inherit; }
        .light .icon-btn:hover { background: rgba(0,0,0,0.05); } .dark .icon-btn:hover { background: rgba(255,255,255,0.1); }
        
        .profile-avatar-container { width: 80px; height: 80px; margin: 0 auto 10px auto; position: relative; cursor: pointer; }
        .profile-avatar { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; border: 3px solid #2ed573; background: #eee; display: flex; align-items: center; justify-content: center; }
        .camera-badge { position: absolute; bottom: 0; right: 0; background: #2ed573; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.2); }

        .profile-info-row { display: flex; align-items: center; gap: 8px; justify-content: center; font-size: 13px; opacity: 0.8; margin-bottom: 6px; }

        .input-title { width: 100%; border: none; outline: none; background: transparent; color: inherit; font-size: 18px; font-weight: bold; margin-bottom: 5px; font-family: inherit; }
        .input-content { width: 100%; border: none; outline: none; background: transparent; color: inherit; font-size: 16px; resize: none; font-family: inherit; }
        .word-counter { font-size: 12px; font-weight: bold; margin-left: 10px; transition: color 0.3s; }
        .attach-btn { background: transparent; border: none; cursor: pointer; color: inherit; padding: 8px; border-radius: 50%; transition: 0.2s; display: flex; align-items: center; justify-content: center; }
        .attach-btn:hover { background: rgba(128,128,128,0.2); }

        .grid-container { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; padding: 0 0 40px 0; }
        .note-card { padding: 20px; border-radius: 16px; min-height: 120px; display: flex; flex-direction: column; justify-content: space-between; color: white; cursor: pointer; transition: transform 0.2s; position: relative; }
        .note-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.15); }

        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); backdrop-filter: blur(10px); display: flex; justify-content: center; align-items: center; z-index: 2000; animation: fadeIn 0.3s ease; }
        .modal-content { width: 90%; max-width: 500px; padding: 30px; border-radius: 24px; position: relative; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3); animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1); overflow: hidden; }
        .light .modal-content { background: #ffffff; color: #2d3436; } .dark .modal-content { background: #1e1e1e; color: #f5f6fa; border: 1px solid #333; }
        .secret-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(108, 92, 231, 0.1); color: #6c5ce7; padding: 6px 12px; border-radius: 20px; font-size: 11px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 15px; }
        .dark .secret-badge { background: rgba(108, 92, 231, 0.2); color: #a29bfe; }
        .modal-title { margin: 0; font-size: 26px; font-weight: 800; line-height: 1.3; background: linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .modal-body { font-size: 17px; line-height: 1.6; margin-top: 20px; position: relative; min-height: 100px; }
        .watermark-icon { position: absolute; top: -10px; left: -10px; opacity: 0.05; pointer-events: none; z-index: 0; color: #000; }
        .dark .watermark-icon { color: #fff; opacity: 0.05; }
        .modal-text { position: relative; z-index: 1; font-weight: 500; }
        .close-btn { position: absolute; top: 20px; right: 20px; background: rgba(128,128,128,0.1); border: none; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; color: inherit; }
        .modal-footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(0,0,0,0.05); display: flex; justify-content: space-between; align-items: center; }
        .dark .modal-footer { border-top: 1px solid rgba(255,255,255,0.05); }
        .delete-btn { background: rgba(255, 71, 87, 0.1); color: #ff4757; border: none; padding: 10px 20px; border-radius: 12px; font-size: 14px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: 0.2s; }
        .delete-btn:active { transform: scale(0.95); }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>

      {/* Navbar */}
      <nav className="navbar glass">
        <div className="nav-logo-area">
          <Icons.Lock /> 
          <span className="nav-logo-text">Secret Notes</span>
        </div>
        
        <div className="nav-search">
           <Icons.Search />
           <input type="text" placeholder="Search notes..." className="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button onClick={() => setDarkMode(!darkMode)} className="icon-btn">{darkMode ? <Icons.Sun /> : <Icons.Moon />}</button>
          
          <button onClick={() => setShowProfile(!showProfile)} className="icon-btn" style={{border: showProfile ? '2px solid #2ed573' : 'none'}}>
              {profilePic ? (
                  <img src={profilePic} alt="u" style={{width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover'}} />
              ) : (
                  <Icons.User />
              )}
          </button>
        </div>
      </nav>

      {/* Profile Modal */}
      {showProfile && (
        <div className="glass" style={{ position: 'absolute', top: '70px', right: '20px', padding: '25px', width: '280px', textAlign: 'center', zIndex: 200, animation: 'fadeIn 0.2s ease' }}>
          
          <div className="profile-avatar-container" onClick={() => profileInputRef.current.click()}>
              {profilePic ? (
                  <img src={profilePic} alt="Profile" className="profile-avatar" />
              ) : (
                  <div className="profile-avatar"><Icons.User /></div>
              )}
              <div className="camera-badge"><Icons.Camera /></div>
          </div>
          <input type="file" ref={profileInputRef} onChange={handleProfilePicChange} style={{display: 'none'}} accept="image/*" />

          <h3 style={{ margin: '0 0 10px 0', fontSize: '20px' }}>{username}</h3>
          
          {/* 🔥 EMAIL & MOBILE HERE */}
          <div className="profile-info-row">
              <Icons.Mail /> {userEmail}
          </div>
          <div className="profile-info-row">
              <Icons.Phone /> {userMobile}
          </div>

          <div style={{marginTop: '20px', borderTop: '1px solid rgba(128,128,128,0.2)', paddingTop: '15px'}}>
            <button onClick={handleLogout} style={{ width: '100%', padding: '10px', background: '#ff4757', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>
                Logout
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 15px' }}>
        
        {/* Input Box */}
        <div className="glass" style={{ padding: '20px', marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <input type="text" placeholder="Title (Max 7 words)" className="input-title" value={newTitle} onChange={handleTitleChange} />
            {newTitle.length > 0 && <span className="word-counter" style={{ color: currentWordCount === 7 ? '#ff9f43' : '#2ed573' }}>{currentWordCount}/7</span>}
          </div>
          <textarea rows="2" placeholder="Take a note..." className="input-content" value={newNote} onChange={(e) => setNewNote(e.target.value)} />

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', alignItems: 'center' }}>
            <div style={{position: 'relative'}}>
                <button className="attach-btn" onClick={handleFileClick} title="Attach">
                    <Icons.Paperclip />
                </button>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{display: 'none'}} />
            </div>

            <button onClick={handleAddNote} style={{ background: '#2ed573', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', gap: '8px' }}>
              <Icons.Plus /> Add
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid-container">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note, index) => (
              <div key={note.id} className="note-card" style={{ backgroundColor: colors[index % colors.length] }} onClick={() => setSelectedNote(note)}>
                {note.attachmentUrl && (
                    <div style={{ width: '100%', height: '150px', overflow: 'hidden', borderRadius: '8px', marginBottom: '10px' }}>
                        <img src={note.attachmentUrl} alt="attachment" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                )}
                <h3 style={{ margin: '0 0 10px 0', fontSize: '20px' }}>{note.title || "Untitled Note"}</h3>
                <p style={{ margin: 0, fontSize: '14px', opacity: 0.8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{note.content}</p>
                <div style={{ position: 'absolute', bottom: '15px', right: '15px' }}>
                  <button onClick={(e) => handleDeleteNote(e, note.id)} style={{ background: 'rgba(255,255,255,0.3)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', color: 'white' }}><Icons.Trash /></button>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', opacity: 0.6, marginTop: '20px' }}><h3>🔍 No notes found matching "{searchTerm}"</h3></div>
          )}
        </div>
      </div>

      {/* Note Detail Modal */}
      {selectedNote && (
        <div className="modal-overlay" onClick={() => setSelectedNote(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ paddingRight: '40px' }}>
                <div className="secret-badge"><Icons.Lock /> Secret Note</div>
                <h2 className="modal-title">{selectedNote.title || "Untitled"}</h2>
            </div>
            <button onClick={() => setSelectedNote(null)} className="close-btn"><Icons.Close /></button>
            <div className="modal-body">
               {selectedNote.attachmentUrl && (
                   <img src={selectedNote.attachmentUrl} alt="attachment" style={{ width: '100%', borderRadius: '12px', marginBottom: '15px', objectFit: 'cover' }} />
               )}
               <div className="watermark-icon"><Icons.Quote /></div>
               <p className="modal-text">{selectedNote.content}</p>
            </div>
            <div className="modal-footer">
              <span style={{ fontSize: '12px', opacity: 0.5, fontFamily: 'monospace' }}>ID: #{selectedNote.id}</span>
              <button onClick={(e) => handleDeleteNote(e, selectedNote.id)} className="delete-btn">
                <Icons.Trash /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;