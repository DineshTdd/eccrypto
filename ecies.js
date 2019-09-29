var eccrypto = require("eccrypto");

function eci (req, res, next) {
  console.log('in ECC');
 
  var privateKeyA = eccrypto.generatePrivate();
  var publicKeyA = eccrypto.getPublic(privateKeyA);
  var privateKeyB = eccrypto.generatePrivate();
  var publicKeyB = eccrypto.getPublic(privateKeyB);
  var result="";
   
  // Encrypting the message for B.
  eccrypto.encrypt(publicKeyB, Buffer.from("msg to b")).then(function(encrypted) {
    // B decrypting the message.
    eccrypto.decrypt(privateKeyB, encrypted).then(function(plaintext) {
      result+="    Message to part B:", plaintext.toString();
    });
  });
   
  // Encrypting the message for A.
  eccrypto.encrypt(publicKeyA, Buffer.from("msg to a")).then(function(encrypted) {
    // A decrypting the message.
    eccrypto.decrypt(privateKeyA, encrypted).then(function(plaintext) {
      result+="   Message to part A:", plaintext.toString();
    });
  });
  
res.send(result);
  
// next();
}

module.exports = eci;
