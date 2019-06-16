// Project: 					HVR - Quantitative Text Comparison
// Module: 					    TestCases/DiffTest
// Author: 					    Khang Nguyen, Ruiqi Yu
// Date of Last Modification:	16 June 2019

const Diff = require('../diff');

let texts = [
    {   
        text1 : "I would not say, I couldn't have done the repair without you.",
        text2 : "I wouldn't say I could not have done the repair without you."
    },
    {   
        text1 : "Where were you when we became World Champions? We want to see how you celebrated becoming @NBA Champs.",
        text2 : "Where are you when we become the World Champion? We need to know how you celebrated winning #NBA finals."
    },
    {
        text1 : "At all locations the stations were full of bikes — during one of the busiest three months for usage, according to a Nov. 2018 report on the program.",
        text2 : "At all places were full of bikes — during one of the peak three months for usage, according to a Nov. 2018 report on the program."
    }
];

texts.forEach(t => {
    console.log("TEXT 1: " + t.text1);
    console.log("TEXT 2: " + t.text2);
    console.log("<<< DIFF >>>");
    console.log(Diff.diffWords(t.text1, t.text2));
    console.log('='.repeat(50));
});
