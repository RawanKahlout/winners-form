const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const app = express();
const bodyParser = require('body-parser');
const normalizePort = require('normalize-port');
const http = require('http');
const ports = normalizePort('4000' || process.env.port);
const url = "mongodb://localhost:27017/marketingWinner?authSource=CC6Kn63Z{'6G --username admin";
//const url = 'mongodb://localhost/marketingWinner';
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify : false,
    useCreateIndex: true
})
    .then(() => { console.log("coneect"); })
    .catch((err) => {
       console.log(err);
    });

   
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});
app.use('/static', express.static('./public'));
app.set('port', ports);
require('./router/templateParser')(app);
require('./router/winnersData')(app);
require('./router/users')(app);
const server = http.createServer(app);
server.listen(ports);
app.get("/", (req, res) => {
console.log("hala");
return res.status(200).send("hala");
})
