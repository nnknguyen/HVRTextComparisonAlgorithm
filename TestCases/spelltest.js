const spell = require('../spellcheck');

let texts = ["I am no0t hangry because I already buyed sandwich from Subway."];

texts.forEach(text => {
    spell(text).then(res => {
        console.log('ORIGINAL: ' + text);
        console.log('CORRECTED: ' + res.correct);
        console.log('DATA:');
        console.log("__________");
        console.log(res.json);
        console.log("==========");
    }).catch(err => console.log(err));
});