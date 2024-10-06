const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');

const connectDB = require('./server/database/connection');

const app=express();

dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 3000

app.use(morgan('tiny')); // log request

//mongodb connecti
connectDB();

app.use(bodyparser.urlencoded({extended:true})) //parser request 
//app.use(bodyparser.json())

//set view engine
app.set("view engine","ejs")
//app.set("views",path.resolve(__dirname,"views/ejs"))

// load assests 
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

// load routes
app.use('/',require('./server/routes/router'))

module.exports = app;
app.listen(PORT,()=> {console.log(`server is running on http://localhost:${PORT}`)});