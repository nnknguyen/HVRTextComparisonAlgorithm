/*module.exports.commonWords = [
	"a", "about", "all", "an", "and", "are", "as", "at",
	"be", "been", "but", "by",
	"call", "can", "come", "could",
	"day", "did", "do", "down",
	"each",
	"find", "first", "for", "from",
	"get", "go",
	"had", "has", "have", "he", "her", "him", "his", "how",
	"I", "if", "in", "into", "is", "it", "its",
	"like", "long", "look",
	"made", "make", "many", "may", "more", "my",
	"no", "not", "now", "number",
	"of", "oil", "on", "one", "or", "other", "out",
	"part", "people",
	"said", "see", "she", "so", "some",
	"than", "that", "the", "their", "them", "then", "there", "these", "they", "this", "time", "to", "two",
	"up", "use",
	"was", "water", "way", "we", "were", "what", "when", "which", "who", "will", "with", "word", "would", "write",
	"you", "your"
];*/

module.exports.charTypes = {
	AlphaNumeric: {
		value: 1,
		pattern: /[\w-]/
	},
	Whitespace: {
		value: 2,
		pattern: /\s/
	},
	Apostrophe: {
		value: 3,
		pattern: /'/
	},
	Other: {
		value: 4,
		pattern: /[^\w-\s']/
	},
};

/*const contractedForms = [
    "i'm", "he's", "she's", "it's", "you're", "we're", "they're",
    "ain't", "isn't", "aren't", "wasn't", "weren't",
    "don't", "doesn't", "didn't",
    "i've", "you've", "we've", "they've",
    "haven't", "hasn't", "hadn't",
    "i'd", "he'd", "she'd", "it'd", "you'd", "we'd", "they'd"
];*/
module.exports.contractedForms = /[A-Za-z]+'[A-Za-z]+/;