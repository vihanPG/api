const express = require('express');
const cors = require('cors');
const connect=require('./config/db')
 require('dotenv').config();
const authController = require('./controllers/authController');
const information=require('./middlewares/infomation')
const app = express();
app.use(cors());
connect();
app.use(express.json());
app.use('/auth', authController);
app.use('/user',information);
const port=5000;
app.get("/",(req,res)=>{
    res.send("hello there")
})
app.listen(port,()=>{
    console.log(`server listen at ${port}`)
})