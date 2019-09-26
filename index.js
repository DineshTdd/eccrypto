const express = require('express');
const path = require('path');
const eccrypto = require("eccrypto");

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/'));
app.get('/', (req,res) => {
    res.send('Hello world');
    // console.log('in ECC');
 
  var privateKeyA = eccrypto.generatePrivate();
  var publicKeyA = eccrypto.getPublic(privateKeyA);
  var privateKeyB = eccrypto.generatePrivate();
  var publicKeyB = eccrypto.getPublic(privateKeyB);
   
  // Encrypting the message for B.
  eccrypto.encrypt(publicKeyB, Buffer.from("msg to b")).then(function(encrypted) {
    // B decrypting the message.
    eccrypto.decrypt(privateKeyB, encrypted).then(function(plaintext) {
      res.send("Message to part B:", plaintext.toString());
    });
  });
   
  // Encrypting the message for A.
  eccrypto.encrypt(publicKeyA, Buffer.from("msg to a")).then(function(encrypted) {
    // A decrypting the message.
    eccrypto.decrypt(privateKeyA, encrypted).then(function(plaintext) {
      res.send("Message to part A:", plaintext.toString());
    });
  });
});
app.use(eci);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 4125);
