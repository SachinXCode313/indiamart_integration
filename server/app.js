import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config()


const app = express();
const port = process.env.PORT ;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

app.use("/test" ,(req,res)=> {
    res.send("WOrking")
})

// Handler function for the webhook listener
app.post('/indiamart/:secret_key', (req, res) => {
    try {
        const secretKey = req.params.secret_key;
        const data = req.body;

        // Log the received data for debugging purposes
        console.log('Received data:', data);
        console.log(secretKey);

        // Define the response object based on the received data
        let response;
        switch (data.CODE) {
            case 200:
                response = { code: 200, status: 'Success' };
                break;
            case 400:
                response = { code: 400, status: 'Missing parameters' };
                break;
            case 500:
                response = { code: 500, status: 'Error in connecting to the URL' };
                break;
            default:
                response = { code: 500, status: 'Unknown error' };
                break;
        }

        // Set the appropriate HTTP status code and response headers
        res.status(response.code).json(response);
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ code: 500, status: 'Error', message: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server started, listening on port ${port}...`);
});
