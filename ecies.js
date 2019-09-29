var eccrypto = require("eccrypto");
var CryptoJS = require("crypto-js");


console.log('in ECC');
function eci (req, res, next) {
  console.log('in ECC');
 
  var privateKeyA = eccrypto.generatePrivate();
  var publicKeyA = eccrypto.getPublic(privateKeyA);
  var privateKeyB = eccrypto.generatePrivate();
  var publicKeyB = eccrypto.getPublic(privateKeyB);
   
  // Encrypting the message for B.

const msg = "John 22 4432323";
var result="";
  eccrypto.encrypt(publicKeyB,msg).then(function(encrypted) {
    // B decrypting the message.
    console.log(encrypted);
    eccrypto.decrypt(privateKeyB, encrypted).then(function(plaintext) {
      console.log('inside decrypt');
      result+="Message to part B:"+plaintext.toString();
      // res.send("Message to part B:"+plaintext.toString()+"privB"+privateKeyB.toString('hex'));
    }).catch(function() {
      console.log("Decrypt is BAD")});
  }).catch(function() {
    console.log("Encrypt is BAD")});

   
  // Encrypting the message for A.
  eccrypto.encrypt(publicKeyA, Buffer.from(msg)).then(function(encrypted) {
    // A decrypting the message.
    eccrypto.decrypt(privateKeyA, encrypted).then(function(plaintext) {
      result+="</h1></div><div><h1>Message to part A:"+plaintext.toString()+'</h1></div>';
      res.send('<div><h1>hello</h1></div><div><h1>Eccrypto working!</h1></div><div><h1>'+result+'<div><h1>CryptoJS working!</h1></div><div><h1>'+JSON.stringify(decryptedData)+'</h1></div>');
    });

  });

  var data = [{"id": "1","name":"john","card":"1234123412341234"}]

// Encrypt
var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data),"God is Great" );
 
// Decrypt
var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), "God is Great");
var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

}

module.exports = eci;
