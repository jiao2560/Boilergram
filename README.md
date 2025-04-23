# Boilergram

**Boilergram** is a full-stack web application designed exclusively for Purdue students to connect, share, and engage with their campus community. Inspired by the social experience of platforms like Instagram and Reddit, Boilergram enables students to post content, comment, follow friends, and stay updated with what's happening across campus — all within a secure, student-authenticated environment.

![Boilergram Screenshot](./assets/screenshot.png) <!-- Add screenshot image if available -->

## 🎯 Purpose

Boilergram aims to enhance student life by offering a centralized space for:
- Sharing updates, photos, and campus events
- Finding and connecting with fellow Boilermakers
- Creating communities based on clubs, interests, or courses

Whether you're looking to promote a club event, find roommates, or simply meet new people, Boilergram makes it easy to socialize beyond the classroom.

---

## 🚀 Features

- 🧑‍🎓 **Purdue-verified Accounts** – Only users with a Purdue email can sign up and verify their profile
- 🖼️ **Photo & Text Posts** – Create posts with rich content
- 💬 **Comments & Likes** – Engage with other users’ posts
- 👥 **Follow System** – Follow friends and see their activity in your feed
- 🔍 **Search & Explore** – Discover users and trending posts
- 🔒 **Secure Auth** – JWT-based session management and password hashing

---

## 🛠️ Tech Stack

| Category       | Tech Used                                  |
|----------------|---------------------------------------------|
| **Frontend**   | React.js, Tailwind CSS                      |
| **Backend**    | Node.js, Express.js                         |
| **Database**   | MongoDB (Mongoose ORM)                      |
| **Auth**       | JSON Web Tokens (JWT), Bcrypt               |
| **Dev Tools**  | Git, ESLint, Prettier, VSCode               |
| **Deployment** | Render (Web App), MongoDB Atlas (DB)        |

---

## 📦 Getting Started

### Prerequisites

- Node.js ≥ 16
- MongoDB (local or Atlas)
- Git

### Local Setup

```bash
# Clone the repo
git clone https://github.com/jiao2560/boilergram.git
cd boilergram

# Install dependencies
npm install

# Create environment config
cp .env.example .env
# Fill in MongoDB URI and JWT secret in .env

# Run the app
npm run dev
