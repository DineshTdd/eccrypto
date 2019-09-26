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
    res.send('Hello world');
    console.log('in ECC');
 
  var privateKeyA = eccrypto.generatePrivate();
  var publicKeyA = eccrypto.getPublic(privateKeyA);
  var privateKeyB = eccrypto.generatePrivate();
  var publicKeyB = eccrypto.getPublic(privateKeyB);
    
    res.send("privatekeyB", privateKeyB.toString('hex'));
    res.send("privatekeyA", privateKeyA.toString('hex'));
   
  // Encrypting the message for B.
  eccrypto.encrypt(publicKeyB, Buffer.from("msg to b")).then(function(encrypted) {
    // B decrypting the message.
    eccrypto.decrypt(privateKeyB, encrypted).then(function(plaintext) {
        console.log("Message to part B:", plaintext.toString(),"privB",privateKeyB.toString('hex'));
    });
  });
 
   
  // Encrypting the message for A.
  eccrypto.encrypt(publicKeyA, Buffer.from("msg to a")).then(function(encrypted) {
    // A decrypting the message.
    eccrypto.decrypt(privateKeyA, encrypted).then(function(plaintext) {
        // res.status(200).send("Message to part A:", plaintext.toString());
        console.log("Message to part A:",plaintext.toString(),"privA",privateKeyA.toString('hex'));
    });
  });
  
    // app.use(eci);
});


// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 4125);
