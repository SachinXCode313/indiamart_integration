import dotenv from 'dotenv';
import express from 'express'
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
    const secretKey = req.params.key; // "6dE9KZ2Xg-Yd4X5Ih25PjErINbxsqtpw"
    // Further processing with the secretKey
    res.send(`Received key: ${secretKey}`);
    const { CODE, STATUS, RESPONSE } = req.body;

    if (CODE === 200 && STATUS === 'SUCCESS') {
      res.send('Lead received:', RESPONSE);
      res.status(200).json({ code: 200, status: 'Success' });
    } else {
      console.error('Failed webhook received:', req.body);
      res.status(400).json({ code: 400, status: 'Failure' });
    }
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ code: 500, status: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Middleware listening at https://localhost:${port}`);
});
