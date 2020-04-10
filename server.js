'use strict';
var express =  require('express');
var bodyParser = require('body-parser');
var process = require('process');
var port_no = '';
process.env.NODE_ENV = "development"
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//setting view engine
app.set('view engine', 'ejs');

if(app.get('env') == 'development' ){
    port_no = 4000;
}

if(app.get('env') == 'production'){
    port_no = 80;
}



app.get('/' , (req,res) => {
    res.render('index.ejs')
})

app.post("/error/error-testing" , (req,res) => {
    logger.error();
})

app.post("/error/info-testing" , (req,res) => {
    logger.info();
    console.log(req.body)
})

app.post("/error/critical-testing" , (req,res) => {
    logger.critical(req.body);
})

app.post("/error/emergency-testing" , (req,res) => {
    logger.emergency(req.body);
})

//server
const server = app.listen(port_no, function() {
    console.log("APP Server has been started! Running on port " + server.address().port);
})
