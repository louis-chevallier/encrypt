
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
console.log(conc.length)
console.log(conc)
//console.log(enc)
console.log(enc.length)
cl = conc.length 
enc = [enc.substring(0, cl), enc.substring(cl, cl*2), enc.substring(cl*2, 9999)]
console.log(enc)
var alpha = "";
var alphaC = []
for (var i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
    //console.log("i=" + i)
    n = i - 'a'.charCodeAt(0)
    cc = String("00" + String(n)).slice(-2)
    //console.log("cc=" + cc)
    alphaC.push(cc)
}
console.log(alphaC)
function decrypt()
{
    todecryptE = document.getElementById('todecrypt');
    toencryptE = document.getElementById('toencrypt');
    decode(conc, enc, todecryptE, toencryptE, false)
}
function encrypt()
{
    todecryptE = document.getElementById('todecrypt');
    toencryptE = document.getElementById('toencrypt');
    encode(enc, conc, toencryptE, todecryptE, true)
}

function encodec(c, n, d) {
    console.log(["c=" + c, "n=" + n, "d=" + d])
    console.assert(n < enc.length)
    idx = enc[n].indexOf(c)
    var res = "?"
    if (idx >= 0) {
        res = d + conc.substring(idx, idx+1)
    } else {
        res = d + encodec(c, n+1, d + "&")
    }
    console.log("res=" + res)
    return res
}

function encode(from, to, src, txt, lower) {
    var t = src.value
    console.log("t=" + t)
    //alert(t)
    code = ""
    for (var j = 0; j < t.length; j++) {
	c = t.charAt(j)
        code += encodec(c, 0, "")
    }				
    txt.value = code
}


