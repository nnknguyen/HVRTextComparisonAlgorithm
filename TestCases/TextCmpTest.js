// Project: 					HVR - Quantitative Text Comparison
// Module: 					    TestCases/TextCmpTest
// Author: 					    Khang Nguyen, Ruiqi Yu
// Date of Last Modification:	15 June, 2019

const compareParagraph = require("../custom.js");

var cases = [
    {
        text1: "I would not say, I couldn't have done the repair without you.",
        text2: "I wouldn't say I could not have done the repair without you.",
    },
    {
        text2: "I am hungry and I am going to buy some sandwich from Subway.",
        text1: "I am not hungry because I bought sandwich from Subway."
    },
    {
        text1: "While much of the new subscription products will be available exclusively on Apple devices, the company said it would make its new original television streaming service, Apple TV+, available through smart TVs designed by rivals such as Samsung and on digital media players from Roku and Amazon's Fire TV, starting in the fall. The Canadian version of Apple TV will include the ability to purchase subscriptions to Bell Media's streaming service, Crave, which will continue to hold the rights to paid subscription channels such as HBO and Starz. Radio-Canada and CBC's French language video-on-demand service ICI TOU will also be included.",
        text2: "Revealed the further while Apple much of new subscription Apple services devices, push products will be available exclusively financial on, the United States company said it would allow make its public transit new original television designed announced by rivals three streaming service, Apple TV+, available through Apple Pay smart TVs service starting Apple-branded credit Apple cashback such as Samsung United included experience States French service ICI TOU starting in the fall and on digital partnership media players Goldman Sachs from Roku and Amazon's Fire TV. The Canadian version of hold the rights to paid TV will include titanium card the ability to purchase subscriptions to Bell Media's streaming service, Crave, which will continue most significant to language video-on-demand subscription channels such as HBO and Starz. Radio-Canada and CBC's credit card will also be in 50 years."
    },
    {
        text1: "The letter accuses parents of making false allegations in communications to various parties. It claims they've made defamatory comments, filed malicious complaints and says that they could be banned from the school. It also threatens legal action if they don't refrain from repeating or publishing their comments.",
        text2: "The letter accuses parents of making false allegations in communications to various parties. It threatens legal action if they do not refrain from repeating or publishing their comments. It claims they have made defamatory comments and filed malicious complaints and says that they could be banned from the school."
    },
    {
        text1: "\"There have been situations where people, allegedly, buy narratives,\" Ginsherman said after the mock hearing. \"If you've memorized something, it's very difficult to pick something out of context - you have to go through everything to get to that point where they've memorized an answer. If it's something you have lived, you can answer it spontaneously.\"",
        text2: "Ginsherman said after the mock hearing that there had been situations where people, allegedly, bought narratives. He also quoted \"If you've memorized something, it's very difficult to pick something out of context – you have to go through everything to get to that point where they've memorized an answer. If it is something you've lived, you can answer it spontaneously.\""
    },
    {
        text1: "CBSA is committed to improving its relationship with Indigenous Peoples, which is why just over one year ago it launched the Indigenous Affairs Secretariat (IAS). The IAS collaborates with colleagues across the Agency to build a culture where Indigenous affairs are at the forefront of CBSA considerations, both as a workplace and as a border enforcement agency. The Secretariat leads work to guide the relationship between the Agency and Indigenous communities and travellers so that respect for Indigenous Peoples as well as for the mandate of the CBSA are at equal play.",
        text2: "C.B.S.A. is committed to improving its relationship with Indigenous Peoples, which is why just over one year ago it launched the Indigenous Affairs Secretariat (IAS). The I.A.S collaborates with colleagues across the Agency to build a culture where Indigenous affairs are at the forefront of C.B.S.A. considerations, both as a workplace and as a border enforcement agency. The Secretariat leads work to guide the relationship between the Agency and Indigenous communities and travellers so that respect for Indigenous Peoples as well as for the mandate of the C.B.S.A. are at equal play."
    },
    {
        text1: "Apple Inc., a company that became a trillion-dollar behemoth on the popularity of its sleek and high-priced devices, is banking its future on subscription services.",
        text2: "Apple Inc., a company that became a trillion-dollar behemoth on the popularity of its sleek and high-priced devices, is banking its future on subscription services."
    },
    {
        text1: "While much of the new subscription products will be available exclusively on Apple devices, the company said it would make its new original television streaming service, Apple TV+, available through smart TVs designed by rivals such as Samsung and on digital media players from Roku and Amazon's Fire TV, starting in the fall. The Canadian version of Apple TV will include the ability to purchase subscriptions to Bell Media's streaming service, Crave, which will continue to hold the rights to paid subscription channels such as HBO and Starz. Radio-Canada and CBC's French language video-on-demand service ICI TOU will also be included.",
        text2: "\"Today is going to be a very different kind of event,\" Apple chief executive Tim Cook said as he laid out his plans for Apple's most significant strategic shift since it debuted the iPhone more than a decade ago. By expanding its paid subscription services, Apple is hoping to offset slowing iPhone sales by drawing more revenue from the more than 1.4 billion customers now using an Apple device."
    },
    {
        text1: "While much of the new subscription products will be available exclusively on Apple devices, the company said it would make its new original television streaming service, Apple TV+, available through smart TVs designed by rivals such as Samsung and on digital media players from Roku and Amazon's Fire TV, starting in the fall. The Canadian version of Apple TV will include the ability to purchase subscriptions to Bell Media's streaming service, Crave, which will continue to hold the rights to paid subscription channels such as HBO and Starz. Radio-Canada and CBC's French language video-on-demand service ICI TOU will also be included.",
        text2: "Global iPhone sales have started to show signs of slowing. Apple slashed its revenue forecast for the first time in more than 15 years in January, citing slowing iPhone sales in China, where the company increasingly competes with lower-cost domestic device-makers such as Huawei."
    },
];


cases.forEach(c => c.ratio = compareParagraph(c.text1, c.text2));

for (let c of cases) {
    console.log("==================================================");
    console.log("TEXT 1:");
    console.log(c.text1);
    console.log("_____________")
    console.log("TEXT 2:");
    console.log(c.text2);
    console.log("_____________")
    console.log("<-- RATIO -->");
    console.log(c.ratio);
}