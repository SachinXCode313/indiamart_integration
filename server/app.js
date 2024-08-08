import dotenv from 'dotenv';
import express from 'express'
import bodyParser from 'body-parser';
// import axios from 'axios';
const app = express();
dotenv.config();

const port = process.env.PORT;

app.use(bodyParser.json());



app.post('/indiamart/{Secret_Key}', (req, res) => {
    const { CODE, STATUS, RESPONSE } = req.body;
    
    if (CODE === 200 && STATUS === 'SUCCESS') {
        console.log('Lead received:', RESPONSE);
        // Handle the lead data here
        res.status(200).json({ code: 200, status: 'Success' });
    } else {
        res.status(400).json({ code: 400, status: 'Failure' });
    }
});

app.listen(port, () => {
  console.log(`Middleware listening at https://localhost:${port}`);
});
