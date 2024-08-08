import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const corsConfig = {
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

// Middleware to handle JSON request bodies
app.use(express.json());

// Apply CORS configuration to all routes
app.use(cors(corsConfig));

// Test route to check if the server is running
app.get('/test', (req, res) => {
    res.send("Hello, Server IS working :)");
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

// Catch-all 404 handler
app.use((req, res) => {
    res.status(404).send('Sorry, the resource you are looking for does not exist.');
});

// Start the server
try {
    app.listen(port, () => {
        console.log(`Webhook listener is running on port ${port}`);
    });
} catch (error) {
    console.error('Error starting server:', error);
}
