import dotenv from 'dotenv';
import express, { response } from 'express'
import bodyParser from 'body-parser';
// import routers from './src/routes/routes.js';
// import axios from 'axios';
const app = express();
dotenv.config();

const port = process.env.PORT;
const zohoApiUrl = 'https://www.zohoapis.com/crm/v2/Leads'; // API endpoint for Leads
const zohoAccessToken = process.env.ZOHO_ACCESS_TOKEN;

app.use(bodyParser.json());


app.post('/api/indiamart/:key', async (req, res) => {
  try {
    const secretKey = req.params.key; // Capture the key from the URL
    console.log(`Received key: ${secretKey}`);

    // Ensure `CODE`, `STATUS`, and `RESPONSE` are present in the request body
    const { CODE, STATUS, RESPONSE } = req.body;

    // Log the received fields
    console.log('CODE:', CODE);
    console.log('STATUS:', STATUS);
    console.log('RESPONSE:', RESPONSE);


    // Prepare data for Zoho CR


      res.status(200).json({ code: 200, status: 'Success', message: 'Lead received successfully' });
  } catch (error) {
    console.error('Error processing webhook:', error);
    // Respond with an error message
    res.status(500).json({ code: 500, status: 'Internal Server Error', message: 'An error occurred' });
  }
});



app.listen(port, () => {
  console.log(`Middleware listening at https://localhost:${port}`);
});
