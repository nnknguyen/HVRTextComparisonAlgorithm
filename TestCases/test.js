const compareParagraph = require("../custom.js");

var cases = [
    {
        text1: "I would not say, i couldn't have done that.",
        text2: "I wouldn't say I could not have done that.",
    },
    {
        text1: "I am hungry and I am going to buy some sandwich from Subway.",
        text2: "I am not hungry because I already bought sandwich from Subway."
    },
    {
        text1: "While much of the new subscription products will be available exclusively on Apple devices, the company said it would make its new original television streaming service, Apple TV+, available through smart TVs designed by rivals such as Samsung and on digital media players from Roku and Amazon's Fire TV, starting in the fall. The Canadian version of Apple TV will include the ability to purchase subscriptions to Bell Media's streaming service, Crave, which will continue to hold the rights to paid subscription channels such as HBO and Starz. Radio-Canada and CBC's French language video-on-demand service ICI TOU will also be included.",
        text2: "Revealed the further while Apple much of new subscription Apple services devices, push products will be available exclusively financial on, the United States company said it would allow make its public transit new original television designed announced by rivals three streaming service, Apple TV+, available through Apple Pay smart TVs service starting Apple-branded credit Apple cashback such as Samsung United included experience States French service ICI TOU starting in the fall and on digital partnership media players Goldman Sachs from Roku and Amazon's Fire TV. The Canadian version of hold the rights to paid TV will include titanium card the ability to purchase subscriptions to Bell Media's streaming service, Crave, which will continue most significant to language video-on-demand subscription channels such as HBO and Starz. Radio-Canada and CBC's credit card will also be in 50 years."
    },
    {
        text1: "The letter accuses parents of making false allegations in communications to various parties. It claims they've made defamatory comments, filed malicious complaints and says that they could be banned from the school. It also threatens legal action if they don't refrain from repeating or publishing their comments.",
        text2: "The letter accuses parents of making false allegations in communications to various parties. It threatens legal action if they do not refrain from repeating or publishing their comments. It claims they have made defamatory comments, filed malicious complaints and says that they could be banned from the school."
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
console.log(cases);