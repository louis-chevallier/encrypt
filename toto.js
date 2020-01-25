
/* 
   var hash = CryptoJS.SHA1("Message");
   console.log(hash)

   var secret = 'secret key 123'

   var data = [{id: 1}, {id: 2}]
   data = "zob"
   // Encrypt
   var ciphertext = CryptoJS.Rabbit.encrypt(JSON.stringify(data), secret,  { outputLength: 16 } );
   console.trace(ciphertext.toString());

   // Decrypt
   var bytes  = CryptoJS.Rabbit.decrypt(ciphertext.toString(), secret);
   var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

   console.trace(decryptedData);
*/
var digits = "0123456789";
var alphas = "abcdefghijklmnopqrstuvwxyz";
var alphaCs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var special = "_&#!?:;$=+-"

var mark = "~"

var tt = [ "christine", "louis", "bernard", "fanny", "solene", "david", "chevallier", "bordeau"];
var conc = ""
for (var i = 0; i < tt.length; i++) {
    var str = tt[i];
    for (var j = 0; j < str.length; j++) {
        c = str.charAt(j)
        if (! conc.includes(String(c))) {
            conc += String(c)
        }
    }
}
conc = conc + conc.toUpperCase()
var enc = digits + alphas + alphaCs + special
//console.log(enc)
cl = conc.length 
Menc = [enc.substring(0, cl), enc.substring(cl, cl*2), enc.substring(cl*2, 9999)]
Menc.push(mark)
var alpha = "";
var alphaC = []
for (var i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
    //console.log("i=" + i)
    n = i - 'a'.charCodeAt(0)
    cc = String("00" + String(n)).slice(-2)
    //console.log("cc=" + cc)
    alphaC.push(cc)
}

e1 = encode("0aA+-")
e2 = encode(e1)
e2 = encode(e2)
d2 = decode(e2)
d1 = decode(d2)
d0 = decode(d1)
//console.log(d0)


function decrypt() {
    todecryptE = document.getElementById('todecrypt');
    toencryptE = document.getElementById('toencrypt');
    toencryptE.value = decode(todecryptE.value)
}

function encrypt()
{
    todecryptE = document.getElementById('todecrypt');
    toencryptE = document.getElementById('toencrypt');
    todecryptE.value = encode(toencryptE.value)
}

seed = 969703
_seed = seed % 2147483647;
if (_seed <= 0) 
    _seed += 2147483646;

function random(c) {
    _seed * 16807 % 2147483647;
    return float(_seed % 2) -0.5
}

function shuffleA(t, c) {
    a = t
    a.sort( () => random(c) ) 
    return a
}

function shuffle(t, c) {
    console.log(c)
    for (var i = 0; i < t.length; i++) {
        t[i] = shuffleA(t[i], c)
    }
    console.log(t)
}


function decodec(c, n, d, enc) {
    console.assert(n < enc.length)
    idx = conc.indexOf(c)
    var res = "?"
    if (idx >= 0) {
        res = enc[n].substring(idx, idx+1)
    }
    return res
}

function encodec(c, n, d, enc) {
    console.assert(n < enc.length)
    idx = enc[n].indexOf(c)
    var res = "?"
    if (idx >= 0) {
        res = d + conc.substring(idx, idx+1)
    } else {
        res = d + encodec(c, n+1, mark)
    }
    return res
}

function encode(t) {
    code = ""
    enc = Menc
    for (var j = 0; j < t.length; j++) {
	c = t.charAt(j)
        ecode = encodec(c, 0, "", enc)
        code += ecode
        enc = shuffle(Menc, c)
    }				
    return code
}

function decode(t) {
    //alert(t)
    code = ""
    var nn=0
    enc = Menc
    for (var j = 0; j < t.length; j++) {
	c = t.charAt(j)
        if (c == mark) {
            nn ++
            if (nn > enc.length) {
                code += mark
                j++
            }
        } else {
            ecode = decodec(c, nn, "", enc)
            code += ecode
            enc = shuffle(enc, ecode)
            nn = 0
        }
    }				
    return code
}


