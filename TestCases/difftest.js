const Diff = require('../diff');

text1 = "I would not say, I couldn't have done the repair without you.";
text2 = "I wouldn't say I could not have done the repair without you.";

console.log(Diff.diffWords(text1, text2));