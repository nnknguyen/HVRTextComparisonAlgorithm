const cth = require("./charTypeHelpers");
const cfh = require("./contractedFormHelpers");
const pre = require("./predefined");
const conf = require("./configurable");

// A helper function replaces part of an array with a new element
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
	let dotCounter = 0;				// Counter of the dots without space tokens in between

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
			if (!cth.isEmptyString(newChar)) newToken = newToken.slice(0, -1);
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

				//Reset flag
				detectApostrophe = false;
			}

			size = register.length;
			// Handle Abbreviation case
			if (cth.isWhitespace(register[size - 1]) || cth.isEmptyString(register[size - 1])) {
				if (dotCounter >= 2) {
					let lastWhitespacePos = tokens.lastIndexOf(" ");
					let abbreviation = tokens.slice(lastWhitespacePos + 1).join("");
					tokens = tokens.slice(0, -abbreviation.length)
					tokens.push(abbreviation);
				}

				// Reset dot-counter after 1 abbreviation
				dotCounter = 0;
			}
		}

		let tokenSize = tokens.length;

		// Set flag to true if an Apostrophe token is detected
		if (cth.isApostrophe(tokens[tokenSize - 1]))
			detectApostrophe = true;

		// Increment dot-counter if a dot is detected
		if (cth.isDot(tokens[tokenSize - 1]))
			dotCounter++;

	}
	
	return tokens;
}

// This function recevies 2 tokenized sentences and groups words forming an expanded form
// if the corresponding contracted form exists in the other sentence.
// For e.g., the tokens "are" and "not" are grouped to "are not" in 1 sentence only
// if the other sentence contains "aren't" or "ain't".
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

// This functions receives 2 tokenized sentences
// and returns the calcalated score of the intersection of the 2 sentences.
function calculateIntersectScore(arr1, arr2) {
	let result = 0;

	// Determine the shorter sentence based on number of tokens
	let smaller = Array.from(arr2);
	let larger = Array.from(arr1);
	if (arr1.length < arr2.length) {
		let temp = smaller;
		smaller = larger;
		larger = temp;
	}

	// Go through every tokens in the shorter sentence, assest each token based on a scoring scheme
	// and assign score
	smaller.forEach(token => {
		let scoreScheme = conf.tokenScore.intersection;
		if (larger.includes(token)) {
			if (cth.isOther(token) || cth.isApostrophe(token)) {
				result += scoreScheme.punctuation;
			} else if (pre.isCommonWord(token)) {
				result += scoreScheme.commonWord;
			} else if (cth.isWhitespace(token)) {
				result += scoreScheme.whitespace;
			} else result += scoreScheme.regularWord;

			// Remove from "larger" token has already been accounted for
			let x = larger.indexOf(token);
			larger[x] = null;
		} else {
			// Token that does not exist in the other sentence but has equiavalent (contracted or expanded) form
			// exists in the other sentence.
			let equivalentForms = cfh.getEquivalentForm(token);
			if (equivalentForms) {
				for (let i = 0; i < equivalentForms.length; i++) {
					if (larger.includes(equivalentForms[i])) {
						result += scoreScheme.equivalentForm;
						
						// Remove from "larger" token has already been accounted for
						let x = larger.indexOf(equivalentForms[i]);
						larger[x] = null;

						break;
					}
				}
			} else {
				// Remove all dots in the token
				let dotStripedToken = token.split("").filter(char => !cth.isDot(char)).join("");
				let dotStripedLarger = larger.filter(t => t).map(t => t.split("").filter(char => !cth.isDot(char)).join(""));
				if (dotStripedLarger.includes(dotStripedToken)) {
					result += scoreScheme.abbreviation;

					// Remove from "larger" token has already been accounted for
					let x = dotStripedLarger.indexOf(dotStripedToken);
					larger[x] = null;
				}
			}
		}
	});
	return result;
}

// This function recceives 1 tokenized sentence and returns the score of the sentence alone.
function calculateSentenceScore(arr) {
	let result = 0;
	grouping(arr, arr);
	arr.forEach(token => {
		let scoreScheme = conf.tokenScore.singleSentence;
		if (cth.isOther(token) || cth.isApostrophe(token)) {
			result += scoreScheme.punctuation;
		} else if (pre.isCommonWord(token)) {
			result += scoreScheme.commonWord;
		} else if (cth.isWhitespace(token)) {
			result += scoreScheme.whitespace;
		} else result += scoreScheme.regularWord;
	});
	return result;
}

// This function receives 2 sentences and returns its similarity ratio and the score of the original sentence
function compareSentence(text1, text2) {
    let filtered1 = tokenize(text1);
	let filtered2 = tokenize(text2);
	grouping(filtered1, filtered2);
	let intersectScore = calculateIntersectScore(filtered1, filtered2);
	let ratio = 0;
    if (filtered2.length >= filtered1.length) {
		ratio = intersectScore / calculateSentenceScore(filtered1);
    } else {
		ratio = intersectScore / calculateSentenceScore(filtered2);
	}
	let originalTextScore = calculateSentenceScore(filtered1);
	return {ratio, score: originalTextScore};
}

// This function receives a parahraph and returns an array of all sentencces.
function breakDownToSentences(paragraph) {
    return paragraph.replace(/([.?!])\s+(?=[^a-z])/g, "$1\n").split("\n")
}

// This function receives 2 paragraphs and returns it similarity ratio.
// Use p1 as the original text, p2 as the targeted text
module.exports = function(p1, p2) {
    let original = breakDownToSentences(p1);
	let target = breakDownToSentences(p2);
	if (conf.ignoreCase) {
		original = original.map(sentence => sentence.toLowerCase());
		target = target.map(sentence => sentence.toLowerCase());
	}

	let sentenceScore = 0;
    let sentenceMaxMatchRatio = 0;
    let totalSentenceWeightedScore = 0;
    let totalSentenceWeightedMatchRatio = 0;
    // for each sentence, compare with all sentences in the other paragraph
    for(var i = 0; i < original.length; ++i) {
		// sentence score
		let t1 = original[i];
        for(var j = 0; j < target.length; ++j) {
			let t2 = target[j];
			let r = compareSentence(t1, t2);
			if(r.ratio > conf.sentenceThreshold && r.ratio > sentenceMaxMatchRatio) {
				sentenceMaxMatchRatio = r.ratio;
				sentenceScore = r.score;
			}
		}
		
		// In case there is no corresponding sentence detected...
		if(sentenceMaxMatchRatio == 0) {
			sentenceScore = calculateSentenceScore(tokenize(t1));
		}

		totalSentenceWeightedScore += sentenceScore;
		totalSentenceWeightedMatchRatio += sentenceScore * sentenceMaxMatchRatio;

		sentenceScore = 0;
		sentenceMaxMatchRatio = 0;
	}
	
    return totalSentenceWeightedMatchRatio / totalSentenceWeightedScore;
}
