import dotenv from 'dotenv';
import express from 'express'
import bodyParser from 'body-parser';
// import axios from 'axios';
const app = express();
dotenv.config();

const port = process.env.PORT;

app.use(bodyParser.json());

// Middleware to check the IndiaMART Push API key
const verifyIndiamartKey = (req, res, next) => {
  const urlSegments = req.originalUrl.split('/');
  const keyFromURL = urlSegments[urlSegments.length - 1]; // Extract key from URL
  
  if (keyFromURL === process.env.INDIAMART_PUSH_API_KEY) {
    next();
  } else {
    res.status(403).send({ code: 403, status: 'Forbidden' });
  }
};

app.use('/indiamart/:key', verifyIndiamartKey); // Use URL parameter to validate key

app.post('/indiamart/:key', async (req, res) => {
  const leadData = req.body;
  console.log('Received Lead Data:', leadData);

  try {
    // Format the lead data for Zoho CRM
    const formattedData = {
      data: {
        "Name": leadData.RESPONSE.SENDER_NAME,
        "Phone": leadData.RESPONSE.SENDER_MOBILE,
        "Email": leadData.RESPONSE.SENDER_EMAIL,
        "Company": leadData.RESPONSE.SENDER_COMPANY,
        "Address": leadData.RESPONSE.SENDER_ADDRESS,
        "City": leadData.RESPONSE.SENDER_CITY,
        "State": leadData.RESPONSE.SENDER_STATE,
        "Pincode": leadData.RESPONSE.SENDER_PINCODE,
        "Country": leadData.RESPONSE.SENDER_COUNTRY_ISO,
        "Product": leadData.RESPONSE.QUERY_PRODUCT_NAME,
        "Message": leadData.RESPONSE.QUERY_MESSAGE
      }
    };

    // // Replace with your Zoho CRM API URL and access token
    // const zohoCRMURL = 'https://www.zohoapis.com/crm/v2/Leads';
    // const accessToken = 'YOUR_ZOHO_ACCESS_TOKEN';

    // // Send lead data to Zoho CRM
    // await axios.post(zohoCRMURL, formattedData, {
    //   headers: {
    //     'Authorization': `Zoho-oauthtoken ${accessToken}`,
    //     'Content-Type': 'application/json'
    //   }
    // });

    console.log(formattedData)

    res.status(200).send({ code: 200, status: 'Success' });
  } catch (error) {
    console.error('Error sending data to Zoho CRM:', error);
    res.status(500).send({ code: 500, status: 'Error' });
  }
});

app.listen(port, () => {
  console.log(`Middleware listening at https://localhost:${port}`);
});
