const Diff = require('../diff');

var cases = [
    {
        text1: "I would not say, I couldn't have done the repair without you.",
        text2: "I wouldn't say I could not have done the repair without you.",
    },
    {
        text2: "I am hungry and I am going to buy some sandwich from Subway.",
        text1: "I am not hungry because already bought sandwich from Subway."
    },
];

text1 = "I would not say, I couldn't have done the repair without you.";
text2 = "I wouldn't say I could not have done the repair without you.";

console.log(Diff.diffWords(text1, text2));