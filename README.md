# 🎓 VIT-AP Faculty Ranker

VIT-AP Faculty Ranker is a full-stack web application designed for students to search, view, and rate professors at VIT-AP University. It provides an intuitive platform to share reviews, check faculty ratings, and find the best professors.

---

## 🚀 Key Features

* **Advanced Faculty Search**: Responsive search bar with regex-based querying for instant results.
* **Ratings & Reviews**: Share anonymous or authenticated ratings, reviews, and qualitative feedback on faculty members.
* **Verification Panel**: Admin dashboard to verify new faculty additions and manage user reports.
* **Security & Authentication**: Robust JWT-based authentication combined with secure API endpoints.
* **Access Control**: Comprehensive user access controls (ban/unban capabilities) to maintain platform integrity.
* **Rate Limiting**: Daily limit controls on faculty creation to prevent spam.

---

## 🛠️ Architecture & Tech Stack

### Frontend
* **Core**: React.js
* **Styling**: Tailwind CSS & Vanilla CSS (Harmonious Dark Theme)
* **Icons**: Lucide React

### Backend
* **Runtime**: Node.js & Express
* **Database**: MongoDB (via Mongoose)
* **Authentication**: Passport.js & JWT (JSON Web Tokens)
* **Cloud Services**: Cloudinary (Image storage/management)
* **Deployments**: Structured for serverless deployment (Vercel / Netlify Functions)

---

## 🤝 Meet The Team

Our platform was designed and developed by a dedicated team of digital craftsmen:

| Contributor | Role | Key Contributions | GitHub |
| :--- | :--- | :--- | :--- |
| **Hmm183** | DBA & Lead Engineer | Designed & optimized database infrastructure; implemented security protocols, login, and jwtAuth; created image management and faculty verification APIs. | [@hmm183](https://github.com/hmm183) |
| **BumbleBee** | Data Visualization Specialist | Developed responsive search bar, regex-based faculty GET APIs, and core page layouts (including the About Us page). | [@Vishwa5395](https://github.com/Vishwa5395) |
| **Odd Problem** | Backend Developer | Created the rate-limited POST API for adding faculty; implemented schemas to log user actions and added faculty. | [@oddproblem](https://github.com/oddproblem) |
| **RS** | Frontend Developer | Built the responsive home interface, paginated results viewing component, and integrated styling systems. | [@RaushanShrivastwa](https://github.com/RaushanShrivastwa) |
| **Kunal** | Access Control Specialist | Designed API endpoints to manage user profiles and implemented access control states (ban/unban PUT requests). | [@priyanshuu-02](https://github.com/priyanshuu-02) |

---

## ⚙️ Development Setup

To run the application locally:

### 1. Backend Setup
1. Navigate to the `/server` directory.
2. Create a `.env` file (refer to the environment configuration guidelines).
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```

### 2. Frontend Setup
1. Navigate to the `/client` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm start
   ```
