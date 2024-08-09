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

app.get("/", (req, res) => {
  res.send("Server is working")
})

app.get('/api/oauth/callback', async (req, res) => {
  const authorizationCode = req.query.code;
  const clientId = 'YOUR_CLIENT_ID';
  const clientSecret = 'YOUR_CLIENT_SECRET';
  const redirectUri = 'https://indiamart-integration.vercel.app/oauth/callback';

  try {
    const response = await axios.post('https://accounts.zoho.com/oauth/v2/token', null, {
      params: {
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        code: authorizationCode,
        redirect_uri: redirectUri,
      },
    });

    const { access_token, refresh_token } = response.data;
    // Save access token and refresh token securely
    console.log('Access Token:', access_token);
    console.log('Refresh Token:', refresh_token);

    res.send('Authorization successful. You can now use the API.');
  } catch (error) {
    console.error('Error exchanging authorization code:', error);
    res.status(500).send('An error occurred while exchanging the authorization code.');
  }
});

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


    // Prepare data for Zoho CRM
    const leadData = {
      data: [{
        // Map your incoming data to Zoho CRM Lead fields
        Code: CODE, // Ensure these field names match the API names in Zoho CRM
        Status: STATUS,
        Response: RESPONSE,
      }]
    };

    const response = await axios.post(zohoApiUrl, leadData, {
      headers: {
        'Authorization': `Zoho-oauthtoken ${zohoAccessToken}`,
        'Content-Type': 'application/json',
        'scope': 'ZohoCRM.modules.leads.CREATE' // Ensure the scope is correct for creating leads
      }
    });

    console.log('Zoho CRM Response:', response.data);

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
