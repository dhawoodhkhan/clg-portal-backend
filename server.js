const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(cors({origin:['http://localhost:3000','https://dhawoodhkhan.github.io/']}));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
const path = require('path');
app.use('/public/students/', express.static(path.join(__dirname, '/public/students/')));

const loginRoute = require('./routes/loginRoute');
app.use('/api/v1/admin', loginRoute);

const staffRoute = require('./routes/staffRoute');
app.use('/api/v1/staff', staffRoute);

const studentRoute = require('./routes/studentRoute');
app.use('/api/v1/student', studentRoute);

app.use('/*',(req,res)=>{
    res.send("Unauthorized access"); 
});

app.listen(process.env.PORT,() => {
    console.log('listening on port ' + process.env.PORT);
});