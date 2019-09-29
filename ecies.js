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
 
// var jsonObj = JSON.parse(msg);
 
// // convert JSON object to String
// var jsonStr = JSON.stringify(jsonObj , null, 4);

// //var jsons = msg.toString();
// //console.log(JSON.parse(msg).toString());
// for (b in JSON.parse(msg)){
//   console.log(JSON.parse(msg)[b]);
// }
// working string "'{\""+"name\""+":"+"john"+"}'"
  eccrypto.encrypt(publicKeyB, "msg to a").then(function(encrypted) {
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
  eccrypto.encrypt(publicKeyA, Buffer.from("msg to b")).then(function(encrypted) {
    // A decrypting the message.
    eccrypto.decrypt(privateKeyA, encrypted).then(function(plaintext) {
      result+="</h1></div><div><h1>Message to part A:"+plaintext.toString()+'</h1></div>';
      res.send('<div><h1>hello</h1></div><div><h1>'+result);
    });

  });

  var data = [{"id": "1","name":"john","card":"1234123412341234"},{"id": "1","name":"john","card":"1234123412341234"}]
 
  console.log((privateKeyA.toString('hex')+publicKeyA.toString('hex')+privateKeyB.toString()+publicKeyB.toString()).length);
  console.log(publicKeyA.toString().length);
  console.log(publicKeyB.toString().length);
  console.log(privateKeyA.toString().length);
  console.log(privateKeyB.toString().length);
// Encrypt
var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), privateKeyA.toString('hex')+publicKeyA.toString('hex')+privateKeyB.toString()+publicKeyB.toString());
 
// Decrypt
var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), privateKeyA.toString('hex')+publicKeyA.toString('hex')+privateKeyB.toString()+publicKeyB.toString());
var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
 
console.log(decryptedData);

//res.send('Hello' + result);
//console.log(result);
//next();
}

module.exports = eci;
// exports.result= this.result;
