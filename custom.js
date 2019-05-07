const cth = require("./charTypeHelpers");
const cfh = require("./contractedFormHelpers");
const pre = require("./predefined");

// A helper function partially replaces an array with a new element
Array.prototype.replaceSubArray = function(sub, newElem) {
	if (!Array.isArray(sub)) throw new Error("replaceSubArray() receives an Array as the 1st parameter");
	let thisSize = this.length;
	let subSize = sub.length;
	let occurence = 0;
	for (let i = 0; i <= thisSize - subSize; i++) {
		if (this[i] === sub[0]) {
			let matchedTokens = 0;
			for (let j = 1; j < subSize; j++)
				if (this[i + j] === sub[j]) matchedTokens++;
			if (matchedTokens === subSize - 1) {
				this.splice(i, subSize, newElem);
				thisSize -= subSize + 1;
				occurence++;
			}
		}
	}
	return occurence;
}

// This function receives a sentence and retruns an array of tokens using a simple method
// This method does not handle exceptional cases
function simpleTokenize(text) {
	if (!text || text.trim() == "") return [];
	let tokens = [];		// result
	let register = []; 		// conveying belt
	let textLen = text.length;
	
	// Loop through every character in the sentence
	for (let i = 0; i < textLen; i++) {
		// Put the character on converying belt
		let newChar = text.charAt(i);
		register.push(newChar);
		if (i == 0) continue;

		// If there is a change in character type, extract the token
		let size = register.length;
		if (cth.compareCharTypes(register[size - 2], register[size - 1]) != 0) {
			// Extract the token except the last character which belongs to the next token
			tokens.push(register.join("").slice(0, -1));
			register.splice(0, size - 1);
		}
	}
	tokens.push(register.join(""));
	return tokens;
}

// This function receives a sentence and retruns an array of tokens using a more complicated method
// This method handles exceptional cases
function tokenize(text) {
	if (!text || text.trim() == "") return [];
	let tokens = [];				// result after tokenization
	let register = [];				// conveying belt - a pipeline of characters 
	let detectApostrophe = false;	// Flag identifies if an Apostrophe token is detected

	// Loop through every character in the sentence
	let textLen = text.length;
	for (let i = 0; i <= textLen; i++) {
		// Put the character on converying belt
		let newChar = text.charAt(i);
		register.push(newChar);
		if (i == 0) continue;

		// If there is a change in character type, extract the token
		let size = register.length;
		if (cth.compareCharTypes(register[size - 2], register[size - 1]) != 0 || cth.isOther(register[size - 1])) {
			// Extract the token except the last character which belongs to the next token
			let newToken = register.join("");
			if (newChar != "") newToken = newToken.slice(0, -1);
			tokens.push(newToken);
			register.splice(0, size - 1);

			// Handle Apostrophe case
			if (detectApostrophe) {
				let potentialContracted = tokens.slice(-3).join("");
				// Join 3 last 3 tokens if its combination creates a contracted form
				if (cfh.isContractedForm(potentialContracted)) {
					tokens = tokens.slice(0, -3);
					tokens.push(potentialContracted);
				}
				detectApostrophe = false;
			}
		}

		// Set flag to true if an Apostrophe token is detected
		if (cth.isApostrophe(tokens[tokens.length - 1]))
			detectApostrophe = true;
	}
	
	return tokens;
}

function grouping(arr1, arr2) {
	for (let i = 0; i < arr1.length; i++) {
		let expandedForms = cfh.getExpandedForm(arr1[i]);
		if (expandedForms) {
			for (let j = 0; j < expandedForms.length; j++) {
				arr2.replaceSubArray(simpleTokenize(expandedForms[j]), expandedForms[j]);
			}
		}
	}
	for (let i = 0; i < arr2.length; i++) {
		let expandedForms = cfh.getExpandedForm(arr2[i]);
		if (expandedForms) {
			for (let j = 0; j < expandedForms.length; j++) {
				arr1.replaceSubArray(simpleTokenize(expandedForms[j]), expandedForms[j]);
			}
		}
	}
}

function calculateIntersectScore(arr1, arr2) {
	let result = 0;
	let smaller = arr2, larger = arr1;
	if (arr1.length < arr2.length) {
		smaller = arr1;
		larger = arr2;
	}
	smaller.forEach(token => {
		if (larger.includes(token)) {
			if (cth.isOther(token) || cth.isApostrophe(token))
				result += 0.4;
			else if (pre.isCommonWord(token))
				result += 0.2;
			else if (cth.isWhitespace(token))
				result += 0;
			else result += 1;
		} else {
			let equivalentForms = cfh.getEquivalentForm(token);
			if (equivalentForms) {
				for (let i = 0; i < equivalentForms.length; i++) {
					if (larger.includes(equivalentForms[i]))
						result += 0.1;
				}
			}
		}
	});
	return result;
}

function calculateSentenceScore(arr) {
	let result = 0;
	grouping(arr, arr);
	arr.forEach(token => {
		if (cth.isOther(token) || cth.isApostrophe(token))
			result += 0.4;
		else if (pre.isCommonWord(token))
			result += 0.2;
		else if (cth.isWhitespace(token))
			result += 0;
		else result += 1;
	});
	return result;
}

function compareSentence(text1, text2) {
    let filtered1 = tokenize(text1);
	let filtered2 = tokenize(text2);
	grouping(filtered1, filtered2);
	let intersectScore = calculateIntersectScore(filtered1, filtered2);
    let ratio = 0, score = 0;
    if (filtered2.length >= filtered1.length) {
		ratio = intersectScore / calculateSentenceScore(filtered1);
    } else {
		ratio = intersectScore / calculateSentenceScore(filtered2);
	}
	score = calculateIntersectScore(filtered1, filtered1);
	return {ratio, score};
}

const THRESHOLD = 0.6;

function breakDownToSentence(text) {
    return text.match( /\(?[^\.\?\!]+[\.!\?]\)?/g ).map(t => t.trim());
}

// Use text1 as the original text
// text2 as the new text
module.exports = function(p1, p2) {
    let original = breakDownToSentence(p1.toLowerCase());
    let target = breakDownToSentence(p2.toLowerCase());
	let sentenceScore = 0;
    let sentenceMaxMatchRatio = 0;
    let totalSentenceWeightedScore = 0;
    let totalSentenceWeightedMatchRatio = 0;
    // for each sentence, compare with all sentences in the other paragraph
    for(var i = 0; i < original.length; ++i) {
        let t1 = original[i];
		// sentence score
        for(var j = 0; j < target.length; ++j) {
			let t2 = target[j];
			let r = compareSentence(t1, t2);
			if(r.ratio > THRESHOLD && r.ratio > sentenceMaxMatchRatio) {
				sentenceMaxMatchRatio = r.ratio;
				sentenceScore = r.score;
			}
		}
		
		if(sentenceMaxMatchRatio == 0) {
			sentenceScore = calculateSentenceScore(tokenize(t1));
		}

		totalSentenceWeightedScore += sentenceScore;
		totalSentenceWeightedMatchRatio += sentenceScore * sentenceMaxMatchRatio;

		sentenceScore = 0;
		sentenceMaxMatchRatio = 0;
    }
    // think about the return format, return a ratio for now
    return totalSentenceWeightedMatchRatio / totalSentenceWeightedScore;
}