 
let Toggle = document.getElementById('switch');
let PrimesContainer = document.getElementById('PrimesContainer');
let ModulusNContainer = document.getElementById('ModulusNContainer');
let EncryptButton = document.getElementById('EncryptButton');
let ModulusN = document.getElementById('ModulusN');
let EncryptPrimeP = document.getElementById('EncryptPrimeP');
let EncryptPrimeQ = document.getElementById('EncryptPrimeQ');
let EncryptMessage = document.getElementById('EncryptPlainMessage');
let EncryptExponentE = document.getElementById('EncryptExponentE');
let EncryptCipherMessageContainer = document.getElementById('EncryptCipherMessageContainer');
let EncryptCipherMessageLabel = document.getElementById('EncryptCipherMessageLabel');

Toggle.addEventListener('click', function() {
    if(Toggle.checked === true) {
        PrimesContainer.style.display = 'block';
        ModulusNContainer.style.display = 'none';

    }
    else {
        PrimesContainer.style.display = 'none';
        ModulusNContainer.style.display = 'block';
    }
});

ModulusN.oninput = function () {
    if (this.value.length > 15) {
        this.value = this.value.slice(0,15); 
    }
}

// check if the number is prime
function isPrime(n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;
    for (let i = 5; i * i <= n; i = i + 6)
        if (n % i == 0 || n % (i + 2) == 0)
            return false;
    return true;
}

// find two primes from the modulus
function findPrimes(n) 
{
    let p = 0;
    let q = 0;
    for(let i = 2; i < n; i++) 
    {
        if(n % i === 0) {
            p = i;
            q = n / i;
            break;
        }
    }
    return [p, q];
}

// find the totient of the modulus
function findTotient(p, q) {
    let totient = (p - 1) * (q - 1);
    return totient;
}

// gcd function
function gcd(a, b) {
    if (a == 0)
        return b;
    return gcd(b % a, a);
}

// convert A-Z to 0-25 and a-z to 0-25
function convertToNumbers(message) {
    let numbers = [];
    for(let i = 0; i < message.length; i++) {
        let charCode = message.charCodeAt(i);
        if(charCode >= 65 && charCode <= 90) {
            // pad with 0 if the number is less than 10
            let number = charCode - 65;
            if(number < 10) {
                number = '0' + number;
                numbers.push(number);
            }
            else
            {
                numbers.push((charCode - 65).toString());

            }
        }
        else if(charCode >= 97 && charCode <= 122) {
            // pad with 0 if the number is less than 10
            let number = charCode - 97;
            if(number < 10) {
                number = '0' + number;
                numbers.push(number);
            }
            else
            {
                numbers.push((charCode - 97).toString());
            }
        }
        
    }
    return numbers;
}

function getBlockSize(n)
{
    // get first two digits from n
    let firstTwoDigits = "25";
    // get the length of n
    let nLength = n.toString().length;
    let previous = 0;

    for(let i=1; i < nLength+1; i++)
    {
        let blockSize = parseInt(firstTwoDigits.repeat(i));
        if(blockSize < n)
        {
            previous = blockSize;
        }
    }

    return previous.toString().length;
}

// calculate mod 
// function mod(a, b) {
//     return a - Math.floor(a / b) * b;
// }

// Power function to return value of a ^ b mod n
function power(x, y, p)
{
    let res = 1; // Initialize result
 
    // Update x if it is more
    // than or equal to p
    x = x % p;
 
    while (y > 0) {
        // If y is odd, multiply x
        // with result
        if (y & 1)
            res = (res * x) % p;
 
        // y must be even now
        y = y >> 1; // y = y/2
        x = (x * x) % p;
    }
    return res;
}

// encrypt the message 
function encryptMessage(message, e, n) {
    let encryptedMessage = [];
    let blockSize = getBlockSize(n);
    let numbers = convertToNumbers(message);


    // long string from array
    let longString = numbers.join('');

    // divide the message into blocks
    let blocks = [];
    for(let i = 0; i < longString.length; i += blockSize) {
        blocks.push(longString.slice(i, i + blockSize));
    }

    for(let i = 0; i < blocks.length; i++) {
        let block = blocks[i];
        if(block.length < blockSize) {
            let padding = blockSize - block.length;
            block = block.padEnd(block.length + padding, '0');
            blocks[i] = block;
        }
    }

    console.log(numbers);
    console.log(blockSize);
    console.log(blocks);

    // encrypt blocks
    for(let i = 0; i < blocks.length; i++) {
        let block = blocks[i];
       

        let encryptedChar = power(parseInt(block), e, n);
        console.log(encryptedChar)

        encryptedMessage.push(encryptedChar);
    }

    return encryptedMessage;
}






EncryptButton.addEventListener('click', async function() {
   let n = 0;
   let p = 0;
   let q = 0;
   let e = 0;
   let totient = 0;
   
    if(Toggle.checked === true)
    {
        // Encrypt with primes
        let p = Number(EncryptPrimeP.value);
        let q = Number(EncryptPrimeQ.value);
        if(isPrime(p) && isPrime(q))
        {
            n = p * q;
            ModulusN.value = n;
        }
        else 
        {
            alert('Please Enter Two Prime Numbers');
            return;
        }
    }
   else{
        // Encrypt with modulus
        n = ModulusN.value;
        if(n === '') {
            alert('Please Enter Modulus');
            return;
        }

        if(isPrime(n)) {
            alert('Please Enter a Composite Number');
            return;
        }


        let primes = findPrimes(n);
  
        p = primes[0];
        q = primes[1];
        if(isPrime(p)  && isPrime(q)) {
            EncryptPrimeP.value = p;
            EncryptPrimeQ.value = q;
        } 
        else{
            alert('Please Enter a Valid Modulus');
            return;
        }

        e = EncryptExponentE.value;
        totient = findTotient(p, q);

        // check if e is coprime with totient
        if(gcd(e, totient) !== 1) {
        
            alert('Please Enter a Valid e Value (e and totient must be coprime i.e. gcd(e, totient) = 1)');
            return;
        }

        if(e > totient || e < 2) {
            alert(`Please Enter a Valid e Value (e must be greater than 1 and less than totient ${totient})`);
            return;
        }

        if(e === '') {
            alert('Please Enter e Value');
            return;
        }

        let message = EncryptMessage.value;

        if(message === '') {
            alert('Please Enter a Message');
            return;
        }

        let encryptedMessage = encryptMessage(message, e, n);
        EncryptCipherMessageContainer.style.display = "initial";
        EncryptCipherMessageLabel.innerHTML = encryptedMessage.join(' ');


        


        

    // let message = EncryptMessage.value;
   }

});