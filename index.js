const express=require('express');
const morgan=require('morgan');
const bodyParser=require('body-parser');
const app=express();
const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/mydb', {useNewUrlParser: true } );
//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());


//Routes
const route = require('./routes/auth')
app.use('/user', route);
const port= 3000;
app.listen(port);
console.log('Server is running at 3000');
