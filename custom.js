const cth = require("./charTypeHelpers");
const cfh = require("./contractedFormHelpers");
const pre = require("./predefined");

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

function simpleTokenize(text) {
	if (!text || text.trim() == "") return [];
	let tokens = [];		// result
	let register = []; 		// conveying belt
	let textLen = text.length;
	for (let i = 0; i < textLen; i++) {
		let newChar = text.charAt(i);
		register.push(newChar);
		if (i == 0) continue;
		let size = register.length;
		if (cth.compareCharTypes(register[size - 2], register[size - 1]) != 0) {
			tokens.push(register.join("").slice(0, -1));
			register.splice(0, size - 1);
		}
	}
	tokens.push(register.join(""));
	return tokens;
}

function tokenize(text) {
	if (!text || text.trim() == "") return [];
	let tokens = [];		// result
	let register = []; 		// conveying belt
	let detectApostrophe = false;

	let textLen = text.length;
	for (let i = 0; i <= textLen; i++) {
		let newChar = text.charAt(i);
		register.push(newChar);
		if (i == 0) continue;
		let size = register.length;
		if (cth.compareCharTypes(register[size - 2], register[size - 1]) != 0 || cth.isOther(register[size - 1])) {
			let newToken = register.join("");
			if (newChar != "") newToken = newToken.slice(0, -1);
			tokens.push(newToken);
			register.splice(0, size - 1);
			if (detectApostrophe) {
				let potentialContracted = tokens.slice(-3).join("");
				if (cfh.isContractedForm(potentialContracted)) {
					tokens = tokens.slice(0, -3);
					tokens.push(potentialContracted);
				}
				detectApostrophe = false;
			}
		}
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

function compare(text1, text2) {
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
			let r = compare(t1, t2);
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