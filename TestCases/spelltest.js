const spell = require('../spellcheck');

let text = "I am no0t hangry because already buyed sandwich from Subway.";

spell(text).then(res => {
    console.log('Original: ' + text);
    console.log('Corrected: ' + res);
}).catch(err => console.log(err));