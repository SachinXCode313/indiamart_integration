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

    // Ensure `CODE`, `STATUS`, and `RESPONSE` are present in the request body
    const { CODE, STATUS, RESPONSE } = req.body;

    // Log the received fields
    console.log('CODE:', CODE);
    console.log('STATUS:', STATUS);
    console.log('RESPONSE:', RESPONSE);

    // Prepare data to be sent to Zoho CRM
    const SENDER_NAME = RESPONSE.SENDER_NAME;
    const SENDER_EMAIL = RESPONSE.SENDER_EMAIL;
    
    const zohoData = {
      SENDER_NAME,
      SENDER_EMAIL,
    };

    // Try to send data to Zoho CRM function via API
    try {
      const response = await axios.post(process.env.ZOHO_API_URL, zohoData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Response from Zoho CRM:', response.data);

      // Respond with success if Zoho CRM API call is successful
      res.status(200).json({ code: 200, status: 'Success', message: 'Lead received successfully' });

    } catch (axiosError) {
      console.error('Error sending data to Zoho CRM:', axiosError);

      // Respond with an error message specific to the Zoho CRM API call
      res.status(500).json({ code: 500, status: 'Zoho CRM Error', message: 'Failed to send data to Zoho CRM' });
    }
    
  } catch (error) {
    console.error('Error processing webhook:', error);

    // Respond with an error message for general errors
    res.status(500).json({ code: 500, status: 'Internal Server Error', message: 'An error occurred' });
  }
});




app.listen(port, () => {
  console.log(`Middleware listening at https://localhost:${port}`);
});
