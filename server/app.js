import dotenv from 'dotenv';
import express, { response } from 'express'
import bodyParser from 'body-parser';
// import routers from './src/routes/routes.js';
import axios from 'axios';
const app = express();
dotenv.config();

const port = process.env.PORT;


app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Server is working")
})



app.post('/api/indiamart/:key', async (req, res) => {
  try {
    const IndiaMart = req.body;

    // Extract fields from RESPONSE
    const Company = IndiaMart.RESPONSE.SENDER_COMPANY || '';
    const Last_Name = IndiaMart.RESPONSE.SENDER_NAME || 'Indiamart Lead';
    const Mobile = IndiaMart.RESPONSE.SENDER_MOBILE || '';
    const Lead_Source = "IndiaMart";
    const Email = IndiaMart.RESPONSE.SENDER_EMAIL || '';
    const Street = IndiaMart.RESPONSE.SENDER_ADDRESS || '';
    const City = IndiaMart.RESPONSE.SENDER_CITY || '';
    const State = IndiaMart.RESPONSE.SENDER_STATE || '';
    const Zip_Code = IndiaMart.RESPONSE.SENDER_PINCODE || '';
    const Country = lookup.byIso(IndiaMart.RESPONSE.SENDER_COUNTRY_ISO).country || '';
    const Mobile_2 = IndiaMart.RESPONSE.SENDER_MOBILE_ALT || '';
    const Subject = IndiaMart.RESPONSE.SUBJECT || '';
    const Enquiry_Message =
      IndiaMart.RESPONSE.SENDER_EMAIL_ALT +
      "<br/>" +
      IndiaMart.RESPONSE.SENDER_PHONE +
      "<br/>" +
      IndiaMart.RESPONSE.SENDER_PHONE_ALT +
      "<br/>" +
      IndiaMart.RESPONSE.QUERY_PRODUCT_NAME +
      "<br/>" +
      IndiaMart.RESPONSE.QUERY_MESSAGE || '';

    const zohoData = {
      Company,
      Last_Name,
      Mobile,
      Lead_Source,
      Email,
      Street,
      City,
      State,
      Zip_Code,
      Mobile_2,
      Subject,
      Enquiry_Message,
      Country,
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
