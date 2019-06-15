// Project: 					HVR - Quantitative Text Comparison
// Module: 					    predefined
// Author: 					    Khang Nguyen, Ruiqi Yu
// Date of Last Modification:	15 June 2019

const cfh = require("./contractedFormHelpers");

// Array of common words
// Note: This array includes all contracted, expanded forms
const commonWords = [
	"a", "about", "all", "an", "and", "are", "as", "at",
	"be", "been", "but", "by",
	"call", "can", "come", "could",
	"day", "did", "do", "down",
	"each",
	"find", "first", "for", "from",
	"get", "go",
	"had", "has", "have", "he", "her", "him", "his", "how",
	"i", "if", "in", "into", "is", "it", "its", "I",
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
].concat(cfh.all);

// This function receives a token and returns true if the token exists in the array of common words above
module.exports.isCommonWord = function(token) {
    return commonWords.includes(token);
}