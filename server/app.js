import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const corsConfig = {
    origin: "*", // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Middleware to handle JSON request bodies
app.use(express.json());
app.use(bodyParser.json());

// Handle preflight requests for all routes
app.options('*', cors(corsConfig));

// Test route to check if the server is running
app.get('/test', (req, res) => {
    res.send("Hello Server IS working :)");
});

// Define the route
app.post('/indiamart/:secret_key', (req, res) => {
    try {
        const secretKey = req.params.secret_key;
        const leadData = req.body;

        console.log('Received lead:', leadData);

        // Process lead data (e.g., save to your CRM)
        // Example: saveLeadToCRM(leadData);

        res.status(200).json({ code: 200, status: 'Success' });
    } catch (error) {
        console.error('Error processing lead:', error);
        res.status(500).json({ code: 500, status: 'Error', message: 'Internal Server Error' });
    }
});

// Start the server
try {
    app.listen(port, () => {
        console.log(`Webhook listener is running on port ${port}`);
    });
} catch (error) {
    console.error('Error starting server:', error);
}
