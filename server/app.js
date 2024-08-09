import dotenv from 'dotenv';
import express from 'express'
import bodyParser from 'body-parser';
// import axios from 'axios';
const app = express();
dotenv.config();

const port = process.env.PORT;

app.use(bodyParser.json());

app.get("/",(req,res) => {
    res.send("Server is working")
})

app.use('/api', routers);

app.listen(port, () => {
  console.log(`Middleware listening at https://localhost:${port}`);
});
