import dotenv from 'dotenv';
import express from 'express';
import connectDB from './src/databases/db.js';
import routers from './src/routes/routes.js';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT;

// const corsConfig = {
//     origin: ['http://localhost:3000' , 'https://trip-plan-one.vercel.app'], // Allow requests from this origin
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
//     allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
//     credentials: true, // Allow credentials (cookies, authorization headers, etc.)
// };

// connectDB();

// Middleware to handle JSON request bodies
app.use(express.json());

// CORS configuration
// app.use(cors(corsConfig));

// Handle preflight requests for all routes
// app.options('*', cors(corsConfig));

// Test route to check if the server is running
app.use('/test', (req, res) => {
    res.send("Hello Server IS working 11:)");
});

// API routes
// app.use('/api', routers);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
