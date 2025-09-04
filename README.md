# 🛠️ HandyHub – Your Local Task Solution

**HandyHub** is a full-stack web application designed to seamlessly connect individuals needing help (e.g., home repairs, errands) with skilled local workers. It allows users to post tasks, browse available jobs, and manage listings from a personalized dashboard.

---

## ✨ Features

### 🏠 Frontend
- 🔎 **Task Browse**: View a live list of posted problems.
- 📝 **Task Posting**: Post tasks with category, description, location & contact.
- 📋 **My Tasks Dashboard**: View, update, and delete your own tasks.
- 🔍 **Search & Filter**: Search and filter tasks by keywords or category.
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile.
- 📞 **Contact Page**: Easily get in touch.

### ⚙️ Backend
- 🔗 **RESTful APIs**: Supports full CRUD operations.
- 💾 **Database**: MySQL-backed storage for all problems.
- 🔒 **CORS Configured**: Ensures frontend-backend communication.
- 🛡️ **Planned**: Spring Security + JWT for authentication (coming soon).

---

## 💻 Tech Stack

### 🎨 Frontend
- React.js (with Vite)
- React Router DOM
- Axios
- HTML5 / CSS3

### 🌳 Backend
- Spring Boot
- Spring Data JPA + Hibernate
- MySQL
- Lombok (optional)
- **Planned**: Spring Security + JJWT

---

## 🛠️ Setup and Installation

### ✅ Prerequisites
- Node.js & npm
- JDK 17+
- Maven
- MySQL Server & (optional) MySQL Workbench

---

### 1. 📦 Backend Setup

```bash
git clone https://github.com/adiTyaIcHe07/HandyHub_Project.git
cd HandyHub_Project/backend
```

**MySQL DB Setup**

```sql
CREATE DATABASE handyhub_dbt;
```

**Update `application.properties`:**

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/handyhub_db
spring.datasource.username=User_Name
spring.datasource.password=Your_Password
spring.jpa.hibernate.ddl-auto=update
```

**Run the Backend**

```bash
mvn clean install
mvn spring-boot:run
```

Server runs at: `http://localhost:8080`

---

### 2. 🎯 Frontend Setup

```bash
cd HandyHub_Project/frontend
npm install
```

**Create a `.env` file:**

```env
VITE_APP_API_BASE_URL=http://localhost:8080/api
```

**Start frontend:**

```bash
npm run dev
```

Opens at: `http://localhost:5173`

---

## 🚀 Usage

- **View tasks**: All Problems Page  
- **Post a task**: Post Problem Page  
- **Manage your tasks**: My Problems Page  
- **Contact info**: Contact Us Page

---

## 📂 Project Structure

### 🌐 Frontend (`handyhub-vite-frontend`)

```bash
handyhub-frontend/
│── .idea/
│── node_modules/
│── public/
│── src/
│   ├── assets/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── AuthForm.css
│   │   │   └── AuthForm.jsx
│   │   ├── Navbar.css
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── data/
│   │   └── categories.js
│   │
│   ├── pages/
│   │   ├── AllProblemsPage.css
│   │   ├── AllProblemsPage.jsx
│   │   ├── ContactUsPage.css
│   │   ├── ContactUsPage.jsx
│   │   ├── HomePage.css
│   │   ├── HomePage.jsx
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.css
│   │   ├── LoginPage.jsx
│   │   ├── MyProblemsPage.css
│   │   ├── MyProblemsPage.jsx
│   │   ├── PostProblemPage.css
│   │   ├── PostProblemPage.jsx
│   │   ├── RegisterPage.css
│   │   └── RegisterPage.jsx
│   │
│   ├── services/
│   │   ├── api.js
│   │   ├── auth.service.js
│   │   └── problem.service.js
│   │
│   ├── App.css
│   └── App.jsx
│
│── package.json
│── package-lock.json
│── .gitignore
```

### 📁 Backend (`handyhub-backend`)

```bash
handyhub-backend/
│── .idea/
│── .mvn/
│── target/
│── src/
│   └── main/
│       ├── java/com/handyhub/backend/
│       │   ├── config/
│       │   │   └── WebSecurityConfig.java
│       │   ├── controllers/
│       │   │   ├── AuthController.java
│       │   │   └── ProblemController.java
│       │   ├── exception/
│       │   ├── models/
│       │   │   ├── Problem.java
│       │   │   └── User.java
│       │   ├── payload/
│       │   │   ├── request/
│       │   │   │   ├── LoginRequest.java
│       │   │   │   ├── ProblemRequest.java
│       │   │   │   ├── ProblemStatusUpdateRequest.java
│       │   │   │   └── RegisterRequest.java
│       │   │   └── response/
│       │   │       ├── JwtResponse.java
│       │   │       └── MessageResponse.java
│       │   ├── repository/
│       │   │   ├── ProblemRepository.java
│       │   │   └── UserRepository.java
│       │   ├── security/
│       │   │   └── jwt/
│       │   │       ├── AuthEntryPointJwt.java
│       │   │       ├── AuthTokenFilter.java
│       │   │       └── JwtUtils.java
│       │   ├── services/
│       │   │   ├── ProblemService.java
│       │   │   ├── UserDetailsImpl.java
│       │   │   └── UserDetailsServiceImpl.java
│       │   └── HandyhubBackendApplication.java
│       └── resources/
│           ├── static/
│           ├── templates/
│           └── application.properties
│
│── test/java/com/handyhub/backend/
│   └── HandyhubBackendApplicationTests.java
│
│── .env
│── .gitattributes
│── .gitignore
│── Dockerfile
│── docker-compose.yml
│── HELP.md
│── LICENSE
│── mvnw
│── mvnw.cmd
│── pom.xml
│── README.md
```

---

## 🌱 Future Enhancements

- 🔐 User Authentication & JWT  
- 👥 User Profiles  
- 📩 Direct Messaging / Bidding  
- 🛎️ Notifications  
- 🖼️ Image Uploads  
- 📍 Location-based services (Maps)  
- ⭐ Review & Rating System  
- 📊 Admin Dashboard  

---

## 📄 License

This project is licensed under the MIT License.

---

## 🔗 Built with ❤️ by Aditya Iche – [GitHub](https://github.com/adiTyaIcHe07)
