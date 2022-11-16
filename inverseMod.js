// document onload
document.addEventListener('DOMContentLoaded', function() {
    // get int and mod from url
    var urlParams = new URLSearchParams(window.location.search);
    var int = urlParams.get('int');
    var mod = urlParams.get('mod');

    // set int and mod
    document.getElementById("IntegerValueInput").value = int;
    document.getElementById("ModuloValueInput").value = mod;

    // calculate inverse mod
    CalculateInverseMod();
    
});



// calculate non-negative inverse modulo using extended euclidean algorithm
function inverseMod(a, m) {
    var b = a % m;
    for (var x = 1; x < m; x++) {
        if ((b * x) % m == 1) {
            return x;
        }
    }
}



function gcd(a, b) {
    if (a == 0) {
        return b;
    }
    return gcd(b % a, a);
}

function mod(a, m) {
    if (a < 0) {
        return mod(a + m, m);
    }
    return a % m;
}

// findMax function
function findMax(a, b) {
    if (a > b) {
        return a;
    }
    return b;
}

// find min function
function findMin(a, b) {
    if (a < b) {
        return a;
    }
    return b;
}



function CalculateInverseMod()
{

    var a = document.getElementById("IntegerValueInput").value;
    var m = document.getElementById("ModuloValueInput").value;

    

    let OutputContainer = document.getElementById("OutputContainer");
    OutputContainer.style.display = 'initial';

    let OutputLabel = document.getElementById("OutputLabel");


    if(a == "" || m == "")
    {
        // alert("Please Enter Both Values Correctly");
        OutputLabel.innerHTML = "Please Enter Both Values Correctly";
        return;
    }

    if(a < 0 || m < 0)
    {
        // alert("Please Enter Both Values Correctly");
        OutputLabel.innerHTML = "Please Enter Both Values Correctly";
        return;
    }

    if(gcd(a, m) != 1)
    {
        // alert("Inverse Modulo Does Not Exist");
        OutputLabel.innerHTML = "Inverse Modulo Does Not Exist as GCD(" + a + ", " + m + ") = " + gcd(a, m);
        return;
    }


    var result = inverseMod(a, m);
    OutputLabel.innerHTML = result;




    let TableBody = document.getElementById('TableBody');
    TableBody.innerHTML = "";
    

    

    let headings = ["Q", "A", "B", "R", "T1", "T2", "T"];
    
    // Table Row 1
    let tr = document.createElement('tr');

    headings.forEach((alphabet) => {
        let td = document.createElement('th');
        td.innerText = alphabet;
        tr.appendChild(td);
    });
    TableBody.appendChild(tr);



    let max = findMax(a, m);
    m = findMin(a, m);
    a = max;



    let count = 0;
    let t1 = 0;
    let t2 = 1;
    let q = Math.floor(a / m);

    let t = t1 - (t2 * q);

    while(a / m != 'Infinity')
    {
        let tr1 = document.createElement('tr');
        q = Math.floor(a / m);
        let r = a % m;

        if(count == 0)
        {
            t1 = 0;
            t2 = 1;
            count++;
        }
        else{
            t1 = t2;
            t2 = t;
        }
        
        t = t1 - (t2 * q);
        
        let td = document.createElement('td');
        td.innerText = q;
        tr1.appendChild(td);

        let td1 = document.createElement('td');
        td1.innerText = a;
        tr1.appendChild(td1);

        let td2 = document.createElement('td');
        td2.innerText = m;
        tr1.appendChild(td2);

        let td3 = document.createElement('td');
        td3.innerText = r;
        tr1.appendChild(td3);

        let td4 = document.createElement('td');
        td4.innerText = t1;
        tr1.appendChild(td4);

        let td5 = document.createElement('td');
        td5.innerText = t2;
        tr1.appendChild(td5);

        let td6 = document.createElement('td');
        td6.innerText = t;
        tr1.appendChild(td6);

        TableBody.appendChild(tr1);

        a = m;
        m = r;
    }
    let tr1 = document.createElement('tr');

    let td = document.createElement('td');
    td.innerText = "X";
    tr1.appendChild(td);

    let td1 = document.createElement('td');
    td1.innerText = a;
    tr1.appendChild(td1);

    let td2 = document.createElement('td');
    td2.innerText = m;
    tr1.appendChild(td2);

    let td3 = document.createElement('td');
    td3.innerText = "X";
    tr1.appendChild(td3);

    let td4 = document.createElement('td');
    td4.innerText = t2;
    tr1.appendChild(td4);

    let td5 = document.createElement('td');
    td5.innerText = t;
    tr1.appendChild(td5);

    let td6 = document.createElement('td');
    td6.innerText = "X";
    tr1.appendChild(td6);

    TableBody.appendChild(tr1);
}
