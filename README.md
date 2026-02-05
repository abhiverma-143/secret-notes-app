# 🔒 Secret Notes App

A secure and modern note-taking application where users can create, manage, and search private notes with image attachments. The app features secure authentication and cloud storage.

![Project Status](https://img.shields.io/badge/Status-Live-green)

## 🚀 Tech Stack

### Frontend (UI)
* **React.js** - For building the user interface.
* **CSS/Glassmorphism** - For modern styling.
* **Axios** - For API communication.

### Backend (Server)
* **Java Spring Boot** - REST API framework.
* **Spring Security** - For authentication & JWT.
* **Hibernate/JPA** - For database management.

### Database & Storage
* **PostgreSQL (Neon Tech)** - Cloud database.
* **Cloudinary** - For storing image attachments.

---

## ✨ Features

* **User Authentication:** Secure Login and Registration system.
* **Create Notes:** Add notes with titles and content.
* **Image Support:** Upload images directly to Cloudinary via the app.
* **Search:** Real-time search functionality to filter notes.
* **Responsive UI:** Works on Desktop and Mobile.
* **Secure:** Passwords are encrypted using BCrypt.

---

## 🛠️ Environment Variables

To run this project, you will need to add the following environment variables:

**Backend (`application.properties` or Render Env Vars):**

```properties
DB_URL=postgres://...
DB_USERNAME=...
DB_PASSWORD=...
CLOUD_NAME=...
API_KEY=...
API_SECRET=...

Haha, aap shayad "README" file ki baat kar rahe hain! Redmi toh phone ki company hai! 📱😂

GitHub par project ko professional dikhane ke liye README.md file bahut zaroori hoti hai. Isse koi bhi samajh sakta hai ki aapka project kya karta hai aur kaunsi technologies use hui hain.

Niche maine aapke Secret Notes App ke liye ek badhiya sa README banaya hai.

Step 1: File Banao 📝
Apne Project ke Main Folder (SecretNotesApp) mein ek nayi file banao aur uska naam rakho: README.md (Capital letters mein).

Step 2: Ye Code Paste Karo 📋
Markdown
# 🔒 Secret Notes App

A secure and modern note-taking application where users can create, manage, and search private notes with image attachments. The app features secure authentication and cloud storage.

![Project Status](https://img.shields.io/badge/Status-Live-green)

## 🚀 Tech Stack

### Frontend (UI)
* **React.js** - For building the user interface.
* **CSS/Glassmorphism** - For modern styling.
* **Axios** - For API communication.

### Backend (Server)
* **Java Spring Boot** - REST API framework.
* **Spring Security** - For authentication & JWT.
* **Hibernate/JPA** - For database management.

### Database & Storage
* **PostgreSQL (Neon Tech)** - Cloud database.
* **Cloudinary** - For storing image attachments.

---

## ✨ Features

* **User Authentication:** Secure Login and Registration system.
* **Create Notes:** Add notes with titles and content.
* **Image Support:** Upload images directly to Cloudinary via the app.
* **Search:** Real-time search functionality to filter notes.
* **Responsive UI:** Works on Desktop and Mobile.
* **Secure:** Passwords are encrypted using BCrypt.

---

## 🛠️ Environment Variables

To run this project, you will need to add the following environment variables:

**Backend (`application.properties` or Render Env Vars):**

```properties
DB_URL=postgres://...
DB_USERNAME=...
DB_PASSWORD=...
CLOUD_NAME=...
API_KEY=...
API_SECRET=...
🏗️ How to Run Locally
Clone the Repo:

Bash
git clone [https://github.com/YOUR_USERNAME/secret-notes-app.git](https://github.com/YOUR_USERNAME/secret-notes-app.git)
Backend Setup:

Navigate to notes-backend.

Update application.properties with your DB and Cloudinary credentials.

Run: mvn spring-boot:run

Frontend Setup:

Navigate to notes-frontend (or notes-ui).

Run: npm install

Run: npm start