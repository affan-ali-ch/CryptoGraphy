window.addEventListener('load', (event) => {
    let EncryptedTextDiv = document.getElementById('EncryptedTextDiv');
    EncryptedTextDiv.style.display = "none";

    let DecryptedTextDiv = document.getElementById('DecryptedTextDiv');
    DecryptedTextDiv.style.display = "none";

    let hr1 = document.getElementById('hr1');
    hr1.style.display = "none";

    let hr2 = document.getElementById('hr2');
    hr2.style.display = "none";


});


function affineCipher(message, a, b) {
    var result = "";
    for (var i = 0; i < message.length; i++) {
      var c = message.charCodeAt(i);
      if (c >= 65 && c <= 90) {
        result += String.fromCharCode((((c - 65) * a + b) % 26) + 65);
      } else if (c >= 97 && c <= 122) {
          result += String.fromCharCode( ( ( ( c - 97 ) * a + b ) % 26 ) + 97);
          }
      else {
          result += message.charAt(i);
          }
      }
      return result;
  }

  
  
 


function EncryptAffineCipher()
{
    let message = document.getElementById('EncryptPlainMessage').value;
    if(message == "")
    {
        alert("Please Enter a Message to Encrypt");
        return;
    }
    let a = document.getElementById('EncryptKey1').value;
    let b = document.getElementById('EncryptKey2').value;

    var encryptedMessage = affineCipher(message, Number(a), Number(b));

    EncryptedTextDiv.style.display = "initial";
    let CipherTextOutputLabel = document.getElementById('CipherTextOutputLabel');
    CipherTextOutputLabel.innerHTML = encryptedMessage;

    hr1.style.display = "block";
    hr2.style.display = "block";

    let messageAlphabetsArray = message.split('');

    let EncryptTableBody = document.getElementById('EncryptTableBody');
    EncryptTableBody.innerHTML = "";
    
    // Encrypt Table Row 1
    let tr = document.createElement('tr');
    let th = document.createElement('th');
    th.innerText = 'Plain Text';
    tr.appendChild(th);
    messageAlphabetsArray.forEach((alphabet) => {
        let td = document.createElement('td');
        td.innerText = alphabet;
        tr.appendChild(td);
    });
    EncryptTableBody.appendChild(tr);


    // Encrypt Table Row 2
    let tr2 = document.createElement('tr');
    let th2 = document.createElement('th');
    th2.innerText = 'X';
    tr2.appendChild(th2);
    messageAlphabetsArray.forEach((c) => {
            c = c.charCodeAt(0);
            let td2 = document.createElement('td');
            if (c >= 65 && c <= 90) { td2.innerText = c - 65; }
            else if (c >= 97 && c <= 122) { td2.innerText = c - 97; }
            else { td2.innerText = c; }
            tr2.appendChild(td2);
    });
    EncryptTableBody.appendChild(tr2);


    // Encrypt Table Row 3
    let tr3 = document.createElement('tr');
    let th3 = document.createElement('th');
    th3.innerText = 'A*X';
    tr3.appendChild(th3);
    messageAlphabetsArray.forEach((c) => {
            c = c.charCodeAt(0);
            let td3 = document.createElement('td');
            if (c >= 65 && c <= 90) { td3.innerText = (c - 65) * Number(a); }
            else if (c >= 97 && c <= 122) { td3.innerText = (c - 97) * Number(a); }
            else { td3.innerText = c; }
            tr3.appendChild(td3);
    });
    EncryptTableBody.appendChild(tr3);


    // Encrypt Table Row 4
    let tr4 = document.createElement('tr');
    let th4 = document.createElement('th');
    th4.innerText = 'AX+B';
    tr4.appendChild(th4);
    messageAlphabetsArray.forEach((c) => {
            c = c.charCodeAt(0);
            let td4 = document.createElement('td');
            if (c >= 65 && c <= 90) { td4.innerText = ((c - 65) * Number(a)) + Number(b); }
            else if (c >= 97 && c <= 122) { td4.innerText = ((c - 97) * Number(a)) + Number(b); }
            else { td4.innerText = c; }
            tr4.appendChild(td4);
    });
    EncryptTableBody.appendChild(tr4);



    // Encrypt Table Row 5
    let tr5 = document.createElement('tr');
    let th5 = document.createElement('th');
    th5.innerText = '(AX+B) % 26';
    tr5.appendChild(th5);
    messageAlphabetsArray.forEach((c) => {
            c = c.charCodeAt(0);
            let td5 = document.createElement('td');
            if (c >= 65 && c <= 90) { td5.innerText = (((c - 65) * Number(a)) + Number(b)) % 26; }
            else if (c >= 97 && c <= 122) { td5.innerText = (((c - 97) * Number(a)) + Number(b)) % 26; }
            else { td5.innerText = c; }
            tr5.appendChild(td5);
    });
    EncryptTableBody.appendChild(tr5);

    let encryptedMessageArr = encryptedMessage.split('');

    // Encrypt Table Row 6
    let tr6 = document.createElement('tr');
    let th6 = document.createElement('th');
    th6.innerText = 'Cipher Text';
    tr6.appendChild(th6);
    encryptedMessageArr.forEach((c) => {
            let td6 = document.createElement('td');
            td6.innerText = c;
            tr6.appendChild(td6);
    });
    EncryptTableBody.appendChild(tr6);
}

function DecryptAffineCipher(message, a, b)
{
    let aInverse = 0;
    for(let i = 0; i < 26; i++)
    {
        if((a * i) % 26 == 1)
        {
            aInverse = i;
            break;
        }
    }
    var result = "";
    for (var i = 0; i < message.length; i++) {
      var c = message.charCodeAt(i);
      if (c >= 65 && c <= 90) 
      {
        if((c - 65 - b) < 0)
        {
            result += String.fromCharCode( ( ( ( (c - 65 - b) + 26 ) * aInverse ) % 26 ) + 65);
        }
        else
        {
            result += String.fromCharCode( ( ( (c - 65 - b) * aInverse ) % 26 ) + 65);
        }
      } 
      else if (c >= 97 && c <= 122) 
      {
        if((c - 97 - b) < 0)
        {
            result += String.fromCharCode( ( ( ( (c - 97 - b) + 26 ) * aInverse ) % 26 ) + 97);
        }
        else
        {
            result += String.fromCharCode( ( ( (c - 97 - b) * aInverse ) % 26 ) + 97);
        }

    }
      else {
          result += message.charAt(i);
          }
      }
      return result;
}

function DecryptAffineCipherButton()
{
    DecryptedTextDiv.style.display = "initial";
    let message = document.getElementById('DecryptCipherTextInput').value;
    if(message == "")
    {
        alert("Please Enter a Message to Decrypt");
        return;
    }
    let a = document.getElementById('DecryptKey1').value;
    if(a == "")
    {
        alert("Please Enter a Key");
        return;
    }
    let b = document.getElementById('DecryptKey2').value;
    if(b == "")
    {
        alert("Please Enter a Key");
        return;
    }
    let decryptedMessage = DecryptAffineCipher(message, a, b);
    PlainTextOutputLabel.innerHTML = decryptedMessage;
}
