const compare = require("../custom.js");

var cases = [
    {
        text1: "I would not say I couldn't have done that.",
        text2: "I wouldn't say I could not have done that.",
    },
    {
        text1: "Hey, how've you been for the last 2 years?",
        text2: "Hey! You have been well for the last 2 years?"
    },
    {
        text1: "While much of the new subscription products will be available exclusively on Apple devices, the company said it would make its new original television streaming service, Apple TV+, available through smart TVs designed by rivals such as Samsung and on digital media players from Roku and Amazon's Fire TV, starting in the fall. The Canadian version of Apple TV will include the ability to purchase subscriptions to Bell Media's streaming service, Crave, which will continue to hold the rights to paid subscription channels such as HBO and Starz. Radio-Canada and CBC's French language video-on-demand service ICI TOU will also be included.",
        text2: "\"Today is going to be a very different kind of event,\" Apple chief executive Tim Cook said as he laid out his plans for Apple's most significant strategic shift since it debuted the iPhone more than a decade ago. By expanding its paid subscription services, Apple is hoping to offset slowing iPhone sales by drawing more revenue from the more than 1.4 billion customers now using an Apple device."
    },
    {
        text1: "While much of the new subscription products will be available exclusively on Apple devices, the company said it would make its new original television streaming service, Apple TV+, available through smart TVs designed by rivals such as Samsung and on digital media players from Roku and Amazon's Fire TV, starting in the fall. The Canadian version of Apple TV will include the ability to purchase subscriptions to Bell Media's streaming service, Crave, which will continue to hold the rights to paid subscription channels such as HBO and Starz. Radio-Canada and CBC's French language video-on-demand service ICI TOU will also be included.",
        text2: "Global iPhone sales have started to show signs of slowing. Apple slashed its revenue forecast for the first time in more than 15 years in January, citing slowing iPhone sales in China, where the company increasingly competes with lower-cost domestic device-makers such as Huawei."
    }
];

cases.forEach(c => c.ratio = compare(c.text1, c.text2));
console.log(cases);