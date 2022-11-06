window.addEventListener('load', (event) => {
    let EncryptTable = document.getElementById('EncryptTable');
    let CipherTextOutputContainer = document.getElementById('CipherTextOutputContainer');
    let DecryptTable = document.getElementById('DecryptTable');
    let PlainTextOutputContainer = document.getElementById('PlainTextOutputContainer');
    let TableWidget = document.getElementById('TableWidget');
    let hr1 = document.getElementById('hr1');
    let hr2 = document.getElementById('hr2');
    let DecryptButton = document.getElementById('DecryptButton');
    let DecryptTableWidget = document.getElementById('DecryptTableWidget');

    EncryptTable.style.display = 'none';
    CipherTextOutputContainer.style.display = 'none';
    DecryptTable.style.display = 'none';
    PlainTextOutputContainer.style.display = 'none';
    hr1.style.display = 'none';
    hr2.style.display = 'none';
});



// shift-cipher logic
function shiftCipher(message, key) {
  var result = "";
  for (var i = 0; i < message.length; i++) {
    var c = message.charCodeAt(i);
    if (c >= 65 && c <= 90) {
      result += String.fromCharCode((c - 65 + key) % 26 + 65);
    } else if (c >= 97 && c <= 122) {
      result += String.fromCharCode((c - 97 + key) % 26 + 97);
    } else {
      result += message.charAt(i);
    }
  }
  return result;
}



function EncryptShiftCipher()
{
    TableWidget.innerHTML = "";
    hr1.style.display = 'initial';
    hr2.style.display = 'initial';
    CipherTextOutputContainer.style.display = 'initial';
    let key = document.getElementById('ShiftKey').value;
    let message = document.getElementById('PlainText').value;
    let encryptedMessage = shiftCipher(message, Number(key));
    document.getElementById('CipherTextOutput').innerText = encryptedMessage;
    EncryptTable.style.display = 'initial';
    let messageAlphabetsArray = message.split('');
    let encryptedMessageArr = encryptedMessage.split('');

   
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
    TableWidget.appendChild(tr);


    // Encrypt Table Row 2
    let tr2 = document.createElement('tr');
    let th2 = document.createElement('th');
    th2.innerText = 'Numbers';
    tr2.appendChild(th2);
    messageAlphabetsArray.forEach((c) => {
            c = c.charCodeAt(0);
            let td2 = document.createElement('td');
            if (c >= 65 && c <= 90) { td2.innerText = c - 65; }
            else if (c >= 97 && c <= 122) { td2.innerText = c - 97; }
            else { td2.innerText = c; }
            tr2.appendChild(td2);
    });
    TableWidget.appendChild(tr2);


    // Encrypt Table Row 3
    let tr3 = document.createElement('tr');
    let th3 = document.createElement('th');
    th3.innerText = 'Numbers + Key';
    tr3.appendChild(th3);
    messageAlphabetsArray.forEach((c) => {
            c = c.charCodeAt(0);
            let td3 = document.createElement('td');
            if (c >= 65 && c <= 90) { td3.innerText = (c - 65) + Number(key); }
            else if (c >= 97 && c <= 122) { td3.innerText = (c - 97) + Number(key); }
            else { td3.innerText = c; }
            tr3.appendChild(td3);
    });
    TableWidget.appendChild(tr3);


    // Encrypt Table Row 4
    let tr4 = document.createElement('tr');
    let th4 = document.createElement('th');
    th4.innerText = '(Numbers+Key)%26';
    tr4.appendChild(th4);
    messageAlphabetsArray.forEach((c) => {
            c = c.charCodeAt(0);
            let td4 = document.createElement('td');
            if (c >= 65 && c <= 90) { td4.innerText = Number((c - 65) + Number(key)) % 26; }
            else if (c >= 97 && c <= 122) { td4.innerText = Number((c - 97) + Number(key)) % 26; }
            else { td4.innerText = c; }
            tr4.appendChild(td4);
    });
    TableWidget.appendChild(tr4);


    // Encrypt Table Row 5
    let tr5 = document.createElement('tr');
    let th5 = document.createElement('th');
    th5.innerText = 'Cipher Text';
    tr5.appendChild(th5);
    encryptedMessageArr.forEach((c) => {
            let td5 = document.createElement('td');
            td5.innerText = c;
            tr5.appendChild(td5);
    });
    TableWidget.appendChild(tr5);

}

// DecryptShiftCipher()





function DecryptShiftCipher()
{
  let key = document.getElementById('DecryptShiftCipherKey').value;
  let message = document.getElementById('DecryptCipherTextInput').value;

  console.log(message, key);

  let decryptedMessage = DeShiftCipher(message, Number(key));

  console.log(decryptedMessage);

  PlainTextOutputContainer.style.display = 'initial';

  document.getElementById('ShiftCipherPlainTextOutputLabel').innerText = decryptedMessage;

  DecryptTable.style.display = "initial";

  let messageAlphabetsArray = message.split('');
  DecryptTableWidget.innerHTML = "";

  // Decrypt Table Row 1
  let tr = document.createElement('tr');
    let th = document.createElement('th');
    th.innerText = 'Cipher Text';
    tr.appendChild(th);
    messageAlphabetsArray.forEach((alphabet) => {
        let td = document.createElement('td');
        td.innerText = alphabet;
        tr.appendChild(td);
    });
    DecryptTableWidget.appendChild(tr);



    // Decrypt Table Row 2
    let tr2 = document.createElement('tr');
    let th2 = document.createElement('th');
    th2.innerText = 'Numbers';
    tr2.appendChild(th2);
    messageAlphabetsArray.forEach((c) => {
            c = c.charCodeAt(0);
            let td2 = document.createElement('td');
            if (c >= 65 && c <= 90) { td2.innerText = c - 65; }
            else if (c >= 97 && c <= 122) { td2.innerText = c - 97; }
            else { td2.innerText = c; }
            tr2.appendChild(td2);
    });
    DecryptTableWidget.appendChild(tr2);


    // Decrypt Table Row 3
    let tr3 = document.createElement('tr');
    let th3 = document.createElement('th');
    th3.innerText = 'Numbers - Key';
    tr3.appendChild(th3);
    messageAlphabetsArray.forEach((c) => {
            c = c.charCodeAt(0);
            let td3 = document.createElement('td');
            if (c >= 65 && c <= 90) { td3.innerText = (c - 65) - Number(key); }
            else if (c >= 97 && c <= 122) { td3.innerText = (c - 97) - Number(key); }
            else { td3.innerText = c; }
            tr3.appendChild(td3);
    });
    DecryptTableWidget.appendChild(tr3);


     // Encrypt Table Row 4
     let tr4 = document.createElement('tr');
     let th4 = document.createElement('th');
     th4.innerText = '(Numbers - Key) % 26';
     tr4.appendChild(th4);
     messageAlphabetsArray.forEach((c) => {
             c = c.charCodeAt(0);
             let td4 = document.createElement('td');
             if (c >= 65 && c <= 90) { 
              
              if(Number((c - 65) - Number(key)) % 26 < 0)
              {
                td4.innerText = Number((c - 65) - Number(key)) % 26 + 26;
              }
              else
              {
                td4.innerText = Number((c - 65) - Number(key)) % 26;
              }
            }
             else if (c >= 97 && c <= 122) {
               if(Number((c - 97) - Number(key)) % 26 < 0)
               {
                 td4.innerText = Number((c - 97) - Number(key)) % 26 + 26;
               }
                else
                {
                  td4.innerText = Number((c - 97) - Number(key)) % 26;
                }
              }
             else { td4.innerText = c; }
             tr4.appendChild(td4);
     });
     DecryptTableWidget.appendChild(tr4);



     // Decrypt Table Row 5
    let tr5 = document.createElement('tr');
    let th5 = document.createElement('th');
    th5.innerText = 'Plain Text';
    tr5.appendChild(th5);
    
    messageAlphabetsArray.forEach((c) => {
            c = c.charCodeAt(0);
            let td5 = document.createElement('td');

            if (c >= 65 && c <= 90) { 
              
              if(Number((c - 65) - Number(key)) % 26 < 0)
              {
                // td5.innerText = Number((c - 65) - Number(key)) % 26 + 26;
                td5.innerText = String.fromCharCode(65 + (Number((c - 65) - Number(key)) % 26 + 26));
              }
              else
              {
                td5.innerText = String.fromCharCode(65 + (Number((c - 65) - Number(key)) % 26));
              }
            }
             else if (c >= 97 && c <= 122) {
               if(Number((c - 97) - Number(key)) % 26 < 0)
               {
                 td5.innerText =  String.fromCharCode(97 + (Number((c - 97) - Number(key)) % 26 + 26));
               }
                else
                {
                  td5.innerText = String.fromCharCode(97 +  (Number((c - 97) - Number(key)) % 26));
                }
              }
             else { td5.innerText = String.fromCharCode(c); }

             tr5.appendChild(td5);
    });


    DecryptTableWidget.appendChild(tr5);

}


// DecryptShiftCipher()
function DeShiftCipher(message, key) {
    let decryptedMessage = '';
    message.split('').forEach((c) => {
        c = c.charCodeAt(0);
        if (c >= 65 && c <= 90) { 
              
          if(Number((c - 65) - Number(key)) % 26 < 0)
          {
            decryptedMessage += String.fromCharCode(65 + (Number((c - 65) - Number(key)) % 26 + 26));
          }
          else
          {
            decryptedMessage += String.fromCharCode(65 + (Number((c - 65) - Number(key)) % 26));
          }
        }
         else if (c >= 97 && c <= 122) {
           if(Number((c - 97) - Number(key)) % 26 < 0)
           {
              decryptedMessage +=  String.fromCharCode(97 + (Number((c - 97) - Number(key)) % 26 + 26));
           }
            else
            {
              decryptedMessage += String.fromCharCode(97 +  (Number((c - 97) - Number(key)) % 26));
            }
          }
        else { decryptedMessage += String.fromCharCode(c); }
    });
    return decryptedMessage;
}




