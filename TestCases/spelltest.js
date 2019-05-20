const spell = require('../spellcheck');

let text = "I am no0t hangry because I already buyed sandwich from Subway.";

spell(text).then(res => {
    console.log('ORIGINAL: ' + text);
    console.log('CORRECTED: ' + res.correct);
    //console.log('DATA:');
    //console.log(res.json);
}).catch(err => console.log(err));