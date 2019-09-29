const express = require('express');
const eci = require('./ecies');
const app = express();
const eccrypto = require("eccrypto");

app.use((req, res, next)=> {
    console.log('Hello');
    res.setHeader("Access-Control-Allow-Origin", "*"); // accepting all the requests from other servers
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"); // types of headers sent along with response
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS, PUT"); //methods used along with request - response
    next(); // enabling next "app." method
});

app.get('/', (req,res) => {
  app.use(eci);

});


// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 4125);
