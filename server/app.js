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



app.post('/api/indiamart/:key', async (req, res) => {
  try {
    const secretKey = req.params.key; // Capture the key from the URL
    console.log(`Received key: ${secretKey}`);

    const { RESPONSE } = req.body;

    // Log the RESPONSE to ensure it contains the expected data
    console.log('RESPONSE:', RESPONSE);

    if (!RESPONSE) {
      return res.status(400).json({ code: 400, status: 'Bad Request', message: 'RESPONSE data is missing' });
    }

    // Extract fields from RESPONSE
    const SENDER_NAME = RESPONSE.SENDER_NAME;
    const SENDER_EMAIL = RESPONSE.SENDER_EMAIL;

    // Log extracted fields
    console.log('SENDER_NAME:', SENDER_NAME);
    console.log('SENDER_EMAIL:', SENDER_EMAIL);

    // Prepare data for Zoho CRM
    const zohoData = {
      SENDER_NAME,
      SENDER_EMAIL,
    };

    // Log zohoData to ensure it's correct
    console.log('zohoData:', zohoData);

    // Send data to Zoho CRM function via API
    const response = await axios.post(process.env.ZOHO_API_URL, zohoData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Response from Zoho CRM:', response.data);

    res.status(200).json({ code: 200, status: 'Success', message: 'Lead received successfully' });
  } catch (error) {
    console.error('Error processing webhook:', error.response ? error.response.data : error.message);
    res.status(500).json({ code: 500, status: 'Internal Server Error', message: 'An error occurred' });
  }
});




app.listen(port, () => {
  console.log(`Middleware listening at https://localhost:${port}`);
});
