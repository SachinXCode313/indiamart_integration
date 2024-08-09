import dotenv from 'dotenv';
import express, { response } from 'express'
import bodyParser from 'body-parser';
// import routers from './src/routes/routes.js';
// import axios from 'axios';
const app = express();
dotenv.config();

const port = process.env.PORT;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Server is working")
})

// app.get('/api/indiamart/:key', (req, res) => {
//   const secretKey = req.params.key;
//   res.send(`GET request received with key: ${secretKey}`);
// });

app.post('/api/indiamart/:key', (req, res) => {
  try {
    const secretKey = req.params.key; // Capture the key from the URL
    console.log(`Received key: ${secretKey}`);

    // Check if the request body contains the expected fields
    const { CODE, STATUS, RESPONSE } = req.body;

    if (CODE === 200 && STATUS === 'SUCCESS') {
      console.log('Lead received:', RESPONSE);
      // Respond with a success message
      res.send(Response);
      res.status(200).json({ code: 200, status: 'Success', message: 'Lead received successfully'});
    } else {
      console.error('Failed webhook received:', req.body);
      // Respond with a failure message
      res.status(400).json({ code: 400, status: 'Failure', message: 'Invalid data received' });
    }
  } catch (error) {
    console.error('Error processing webhook:', error);
    // Respond with an error message
    res.status(500).json({ code: 500, status: 'Internal Server Error', message: 'An error occurred' });
  }
});


app.listen(port, () => {
  console.log(`Middleware listening at https://localhost:${port}`);
});
