# Travel Package Booking API – Server

This is the backend API for the Travel Package Booking task built with Node.js, Express, and MongoDB. It handles user authentication (JWT + Google OAuth), travel package management, and booking functionalities.

## Tech Stack

- **Node.js + Express.js**
- **MongoDB with Mongoose**
- **JWT for secure authentication**
- **Google OAuth (via Firebase)**
- **bcrypt for password hashing**
- **CORS, dotenv**

## 📁 Project Structure

```
/src
  /controllers     # Route handlers
  /models          # Mongoose schemas
  /routes          # Route definitions
  /middlewares     # Auth, error handling
  /services        # service logic
  app.ts
  server.ts
.env
```

## Authentication

- Email & Password login (with bcrypt hashing)
- Google Login (using Firebase Admin SDK)
- JWT tokens issued on login/signup (stored on client)

## 🧠 Features

### 👤 User
- Signup/Login (Email & Google)
- Search travel packages by location/date
- View package details
- Customize and book packages
- View & update profile
- See list of all bookings filtered by status

### 🛠️ Admin
- Login as admin
- Add/Edit/Delete travel packages
- View all users and their bookings
- View booking analytics
  - Completed / Active / Upcoming
  - Booking count per package

## 📦 API Endpoints

### Auth
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/google-login`

### User
- `GET /api/packages`
- `GET /api/packages/:id`
- `POST /api/bookings`
- `GET /api/user/profile/:id`
- `PUT /api/user/profile/:id`

### Admin
- `POST /api/admin/packages`
- `GET /api/admin/packages`
- `PUT /api/admin/packages/:id`
- `DELETE /api/admin/packages/:id`
- `GET /api/admin/users`
- `GET /api/admin/bookings`

All routes (except `/auth/*`) are protected by JWT middleware.

## ⚙️ Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/mammenmathewz/Travel-Package-Booking-Task---Server.git
cd Travel-Package-Booking-Task---Server
```

2. Install dependencies
```bash
npm install
```

3. Setup environment variables
Create a `.env` file in the root with the following keys:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
```
*Note: For Firebase keys, use proper multiline escaping (\n) or load from serviceAccountKey.json.*

4. Run the server
```bash
npm run dev   
```

## 🧪 Testing API Locally

You can use Postman or ThunderClient to test endpoints. Auth routes will return a JWT to be used in the `Authorization: Bearer <token>` header for protected routes.

## 🌐 Live API

```
https://travel-package-booking-task-server.onrender.com
```

## 🤝 Client Repository

You can find the frontend code here: [https://github.com/mammenmathewz/Travel-Package-Booking-Task---Client](#)



## 📄 License

This project is submitted as part of a technical assessment for Cochin Computing.
