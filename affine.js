window.addEventListener('load', (event) => {

});

a = 2;
b = 3;
message = "ABCD EF"; 

function affineCipher(message, a, b) {
    var result = "";
    for (var i = 0; i < message.length; i++) {
      var c = message.charCodeAt(i);
      if (c >= 65 && c <= 90) {
        result += String.fromCharCode(((c - 65) * a + b) % 26 + 65
          );
      } else if (c >= 97 && c <= 122) {
          result += String.fromCharCode(((c - 97) * a + b) % 26 + 97);
          }
      else {
          result += message.charAt(i);
          }
      }
      return result;
  }
  
  // call function
  
  var encryptedMessage = affineCipher(message, a, b);
  
  console.log(encryptedMessage);