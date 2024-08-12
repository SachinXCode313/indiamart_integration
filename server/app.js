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
    // const zohoData = {
      
    // };

    // Zoho CRM API endpoint with your API key
    const ZOHO_API_URL = 'https://www.zohoapis.in/crm/v2/functions/indiamart/actions/execute?auth_type=apikey&zapikey=1003.42d93aa3d2208624d972e7a2e316bf1d.7be6d35dbd6a48b2feb7db0705c421b8';

    // Send data to Zoho CRM function via API
    const response = await axios.post(ZOHO_API_URL, RESPONSE, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Response from Zoho CRM:', response.data);



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
