const cth = require("./charTypeHelpers");
const cfh = require("./contractedFormHelpers");

Array.prototype.replaceSubArray = function(sub, newElem) {
	if (!Array.isArray(sub)) throw new Error("replaceSubArray() receives an Array as the 1st parameter");
	let thisSize = this.length;
	let subSize = sub.length;
	for (let i = 0; i <= thisSize - subSize; i++) {
		if (this[i] === sub[0]) {
			let matchedTokens = 0;
			for (let j = 1; j < subSize; j++)
				if (this[i + j] === sub[j]) matchedTokens++;
			if (matchedTokens === subSize - 1) {
				this.splice(i, subSize, newElem);
				thisSize -= subSize + 1;
			}
		}
	}
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

console.log(tokenize("I wouldn't said \"I could not do that.\""));

function intersectAndGroup(arr1, arr2) {
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
	return intersect;
}

module.exports = function customCompare(text1, text2) {
    let filtered1 = tokenize(text1);
	let filtered2 = tokenize(text2);
	let intersect = intersectAndGroup(filtered1, filtered2);
    let arrayRatio = 0, setRatio = 0, displayRatio = 0;
    if (filtered2.length >= filtered1.length) {
        arrayRatio = intersect.length / filtered1.length;
        setRatio = new Set(intersect).size / new Set(filtered1).size;
        displayRatio = Math.max(arrayRatio, setRatio);
    } else {
        arrayRatio = intersect.length / filtered2.length;
        setRatio = new Set(intersect).size / new Set(filtered2).size;
        displayRatio = Math.max(arrayRatio, setRatio);
    }
    return displayRatio;
}