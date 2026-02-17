# Zomato Clone - Backend Server

This is the backend server for a Zomato Clone application, built using Node.js, Express.js, and MongoDB. It provides RESTful APIs for user authentication and management, serving as the foundation for the Zomato Clone platform.

## 🚀 Features

-   **User Authentication**: Secure user registration and login using JWT (JSON Web Tokens).
-   **Security**: Password hashing with `bcryptjs` for secure storage.
-   **Validation**: Robust request validation using `express-validator`.
-   **Error Handling**: Centralized error handling middleware for consistent API responses.
-   **Database**: MongoDB integration using Mongoose for data modeling.
-   **Logging**: HTTP request logging with `morgan` for development and debugging.

## 🛠️ Tech Stack

-   **Runtime**: [Node.js](https://nodejs.org/)
-   **Framework**: [Express.js](https://expressjs.com/)
-   **Database**: [MongoDB](https://www.mongodb.com/) (with [Mongoose](https://mongoosejs.com/))
-   **Authentication**: [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) & [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
-   **Validation**: [express-validator](https://express-validator.github.io/docs/)
-   **Logging**: [morgan](https://github.com/expressjs/morgan)

## 📂 Project Structure

The project follows a modular MVC-style directory structure within `src/`:

```
src/
├── configs/        # Configuration files (e.g., Database connection)
├── controllers/    # Route logic and request handling
├── middlewares/    # Custom middlewares (Auth, Error handling, Validation)
├── models/         # Mongoose schemas and models
├── routes/         # API route definitions
├── services/       # Business logic (optional abstraction)
├── utils/          # Utility functions and classes (e.g., AppError)
├── validators/     # Request validation rules
└── app.js          # Express app setup
```

## 🔧 Installation & Setup

### Prerequisites

-   Node.js (v14 or higher recommended)
-   MongoDB (running locally or a cloud instance like MongoDB Atlas)

### Steps

1.  **Clone the repository** (if applicable) or navigate to the project directory:
    ```bash
    cd server
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env` file in the root directory and add the following variables:
    ```env
    PORT=3000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

4.  **Run the Server**:
    -   For development (with hot-reload via nodemon):
        ```bash
        npm run dev
    ```
    -   For production:
        ```bash
        npm start
    ```

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Login user and get token | No |
| `GET` | `/api/auth/me` | Get current user profile | Yes (Bearer Token) |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.
