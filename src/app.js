import express from 'express';
import dbConnect from './configs/db.config.js';
import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import { errorHandler } from './middlewares/error.middleware.js';
import { AppError } from './utils/AppError.js';
import cookieParser from "cookie-parser";
import swaggerUi from 'swagger-ui-express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import authRoutes from './routes/auth.route.js';
import restauRoutes from './routes/restau.route.js';
import cuisineRoutes from './routes/cusine.route.js';
import orderRoutes from './routes/order.route.js';


// Get current directory path for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load Swagger JSON
const swaggerDocument = JSON.parse(
    readFileSync(join(__dirname, '../swagger.json'), 'utf8')
);

const app = express();

// Middleware setup
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Database connection
dbConnect();

// Swagger UI setup
const swaggerOptions = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Zomato Clone API Documentation',
    customfavIcon: '/favicon.ico'
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

// Welcome route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to Zomato Clone API',
        documentation: '/api-docs',
        version: '1.0.0'
    });
});


// API routes
app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restauRoutes);
app.use("/api/cuisines", cuisineRoutes);
app.use("/api/orders", orderRoutes);

// Handle 404 errors for undefined routes
app.use((req, res) => {
    throw new AppError("Route not found", 404);
});

// Global error handler
app.use(errorHandler);

export default app;