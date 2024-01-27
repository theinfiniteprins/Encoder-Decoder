function rand() {
    return Math.floor(Math.random() * 1000); 
}

function findChar(c, change) {
    if (c >= 'a' && c <= 'z') {
        change %= 26;
        change += c.charCodeAt(0) - 97;
        change %= 26;
        return String.fromCharCode('a'.charCodeAt(0) + change);
    } else if (c >= 'A' && c <= 'Z') {
        change %= 26;
        change += c.charCodeAt(0) - 65;
        change %= 26;
        return String.fromCharCode('A'.charCodeAt(0) + change);
    } else if (c >= '0' && c <= '9') {
        change %= 10;
        change += c.charCodeAt(0) - 48;
        change %= 10;
        return String.fromCharCode('0'.charCodeAt(0) + change);
    } else {
        c = 37;
        return String.fromCharCode(c);
    }
}

function encode(s, resultElement) {
    let parity = 0;
    for (let i = 0; i < s.length; i++) {
        if (!((s[i] >= 'a' && s[i] <= 'z') || (s[i] >= 'A' && s[i] <= 'Z') || (s[i] >= '0' && s[i] <= '9') || s[i] === ' ')) {
            resultElement.textContent = "Please Enter Valid String";
            return;
        }
        parity += s.charCodeAt(i);
        parity -= 97;
    }

    let ans = "";
    parity = parity % 26;
    let c = String.fromCharCode('a'.charCodeAt(0) + parity);
    ans += c;
    let random = rand() % 5;
    if (random === 0) {
        ans += "x";
        for (let i = 0; i < s.length; i++) {
            let ch = findChar(s[i], i + 1);
            ans += ch;
        }
    } else if (random === 1) {
        ans += "d";
        for (let i = 0; i < s.length; i++) {
            let ch = findChar(s[i], i + 2);
            ans += ch;
        }
    } else if (random === 2) {
        ans += "p";
        for (let i = 0; i < s.length; i++) {
            let ch = findChar(s[i], i + 5);
            ans += ch;
        }
    } else if (random === 3) {
        ans += "t";
        for (let i = 0; i < s.length; i++) {
            let ch = findChar(s[i], i + 6);
            ans += ch;
        }
    } else if (random === 4) {
        ans += "r";
        for (let i = 0; i < s.length; i++) {
            let ch = findChar(s[i], i + 3);
            ans += ch;
        }
    }
    let par = s.length + 96;
    ans += String.fromCharCode(par);
    resultElement.textContent = ans;
}

function findOrg(c, change) {
    if (c >= 'a' && c <= 'z') {
        change %= 26;
        c = String.fromCharCode(c.charCodeAt(0) - change);
        if (c.charCodeAt(0) < 97) c = String.fromCharCode(c.charCodeAt(0) + 26);
        return c;
    } else if (c >= 'A' && c <= 'Z') {
        change %= 26;
        c = String.fromCharCode(c.charCodeAt(0) - change);
        if (c.charCodeAt(0) < 65) c = String.fromCharCode(c.charCodeAt(0) + 26);
        return c;
    } else if (c >= '0' && c <= '9') {
        change %= 10;
        c = String.fromCharCode(c.charCodeAt(0) - change);
        if (c.charCodeAt(0) < 48) c = String.fromCharCode(c.charCodeAt(0) + 10);
        return c;
    } else {
        c = ' ';
        return c;
    }
}

function decode(s, resultElement) {
    let par = s.charCodeAt(s.length - 1);
    let c = s[1];
    let ans = "";

    if (c === 'x') {
        for (let i = 2; i < s.length - 1; i++) {
            let ch = findOrg(s[i], i - 1);
            ans += ch;
        }
    } else if (c === 'd') {
        for (let i = 2; i < s.length - 1; i++) {
            let ch = findOrg(s[i], i);
            ans += ch;
        }
    } else if (c === 'p') {
        for (let i = 2; i < s.length - 1; i++) {
            let ch = findOrg(s[i], i + 3);
            ans += ch;
        }
    } else if (c === 't') {
        for (let i = 2; i < s.length - 1; i++) {
            let ch = findOrg(s[i], i + 4);
            ans += ch;
        }
    } else if (c === 'r') {
        for (let i = 2; i < s.length - 1; i++) {
            let ch = findOrg(s[i], i + 1);
            ans += ch;
        }
    }

    let parity = 0;
    for (let i = 0; i < ans.length; i++) {
        parity += ans.charCodeAt(i);
        parity -= 97;
    }
    parity = parity % 26;
    let ck = String.fromCharCode('a'.charCodeAt(0) + parity);

    if (s[0] !== ck || par !== s.length + 96 - 3) {
        resultElement.textContent = "Incorrect Input: Please Check string again";
        return;
    }

    resultElement.textContent = ans;
}

function processText() {
    let text = document.getElementById('text').value;
    let option = document.getElementById('option').value;
    let resultElement = document.getElementById('result');

    if (option === 'encode') {
        encode(text, resultElement);
    } else if (option === 'decode') {
        decode(text, resultElement);
    }
}
