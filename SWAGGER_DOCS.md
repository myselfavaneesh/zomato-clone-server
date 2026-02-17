# Zomato Clone API - Swagger Documentation

## 📚 Overview

This project includes comprehensive API documentation using **Swagger/OpenAPI 3.0**. The documentation provides an interactive interface to explore and test all API endpoints.

## 🚀 Quick Start

### Access the Documentation

Once the server is running, you can access the Swagger documentation at:

```
http://localhost:3000/api-docs
```

### Start the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 📖 Documentation Structure

### Files

1. **`swagger.json`** - Complete OpenAPI 3.0 specification in JSON format
2. **`src/configs/swagger.config.js`** - Swagger configuration with JSDoc support (optional)
3. **`src/app.js`** - Swagger UI integration

### API Endpoints Documented

#### 🔐 Authentication (`/api/auth`)

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires authentication)

#### 🏪 Restaurants (`/api/restaurants`)

- `GET /api/restaurants` - Get all restaurants (Admin/Owner only)
- `GET /api/restaurants/:id` - Get restaurant by ID
- `POST /api/restaurants` - Create new restaurant (Admin/Owner only)
- `PUT /api/restaurants/:id` - Update restaurant (Admin only)
- `DELETE /api/restaurants/:id` - Delete restaurant (Admin only)

#### 🍕 Cuisines (`/api/cuisines`)

- `POST /api/cuisines` - Create new cuisine (Admin/Owner only)
- `GET /api/cuisines/restaurant/:restaurantId` - Get all cuisines by restaurant
- `GET /api/cuisines/:id` - Get cuisine by ID
- `PUT /api/cuisines/:id` - Update cuisine (Admin/Owner only)
- `DELETE /api/cuisines/:id` - Delete cuisine (Admin/Owner only)

## 🔑 Authentication

The API supports two authentication methods:

### 1. Bearer Token (JWT)

Add the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### 2. Cookie Authentication

The JWT token is automatically stored in an HTTP-only cookie named `token` after login.

### How to Authenticate in Swagger UI

1. Click the **"Authorize"** button (🔒) at the top right
2. Enter your JWT token in the format: `Bearer <token>`
3. Click **"Authorize"**
4. Now you can test protected endpoints

## 📝 Schemas

### User Schema

```json
{
  "_id": "string",
  "name": "string",
  "email": "string",
  "password": "string (hashed)",
  "role": "user | admin | owner",
  "createdAt": "date-time",
  "updatedAt": "date-time"
}
```

### Restaurant Schema

```json
{
  "_id": "string",
  "name": "string",
  "address": "string",
  "phone": "string",
  "description": "string",
  "rating": "number (0-5)",
  "image": "string (URL)",
  "owner": "string (User ID)",
  "createdAt": "date-time",
  "updatedAt": "date-time"
}
```

### Cuisine Schema

```json
{
  "_id": "string",
  "name": "string",
  "description": "string",
  "price": "number",
  "category": "string",
  "image": "string (URL)",
  "restaurant": "string (Restaurant ID)",
  "isAvailable": "boolean",
  "createdAt": "date-time",
  "updatedAt": "date-time"
}
```

## 🎯 Testing the API

### Using Swagger UI

1. Navigate to `http://localhost:3001/api-docs`
2. Select an endpoint
3. Click **"Try it out"**
4. Fill in the required parameters
5. Click **"Execute"**
6. View the response

### Example: Register a User

1. Go to **POST /api/auth/register**
2. Click **"Try it out"**
3. Enter the request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123!",
  "role": "user"
}
```

4. Click **"Execute"**
5. Copy the JWT token from the response
6. Use it for authenticated requests

## 🛠️ Customization

### Update Swagger Configuration

Edit `swagger.json` to:

- Add new endpoints
- Modify schemas
- Update server URLs
- Change API information

### Swagger UI Options

In `src/app.js`, you can customize the Swagger UI:

```javascript
const swaggerOptions = {
  customCss: ".swagger-ui .topbar { display: none }",
  customSiteTitle: "Zomato Clone API Documentation",
  customfavIcon: "/favicon.ico",
};
```

## 📦 Dependencies

- `swagger-ui-express`: ^5.0.1 - Serves Swagger UI
- `swagger-jsdoc`: ^6.2.8 - Generates Swagger spec from JSDoc comments (optional)

## 🌐 API Base URL

- **Development**: `http://localhost:3001`
- **Production**: `https://api.zomatoclone.com` (update as needed)

## 📋 Response Format

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

## 🔒 Security

- JWT tokens expire after a configured time
- Passwords are hashed using bcrypt
- Role-based access control (RBAC)
- HTTP-only cookies for token storage

## 📚 Additional Resources

- [Swagger Documentation](https://swagger.io/docs/)
- [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.0)
- [Express.js](https://expressjs.com/)

## 🤝 Contributing

To add new endpoints to the documentation:

1. Update `swagger.json` with the new endpoint definition
2. Ensure the endpoint follows the existing schema structure
3. Test the endpoint in Swagger UI
4. Update this README if needed

## 📄 License

MIT

---

**Happy Coding! 🚀**
