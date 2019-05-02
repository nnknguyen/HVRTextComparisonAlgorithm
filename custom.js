const cth = require("./charTypeHelpers");
const cfh = require("./contractedFormHelpers");

function tokenize(text) {
	if (!text || text.trim() == "") return [];
	let tokens = [];		// result
	let register = []; 		// conveying belt
	let detectApostrophe = false;
	for (let i = 0; i <= text.length; i++) {
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

//console.log(tokenize("He didn't say 'goodbye!' to me!");

Array.prototype.containsSubArray = function(sub) {
	if (!Array.isArray(sub)) throw new Error("containsSubArray() receives an Array");
	let thisSize = this.length;
	let subSize = sub.length;
	for (let i = 0; i < thisSize - subSize; i++) {
		if (this[i] === sub[0]) {
			let matchedTokens = 0;
			for (let j = 1; j < subSize; j++)
				if (this[i + j] === sub[j]) matchedTokens++;
			if (matchedTokens === subSize - 1) return true;
		}
	}
	return false;
}

function intersect(arr1, arr2) {
	return arr1.filter(token => {
		if (arr2.includes(token)) return true;
		let expanded = cfh.getExpandedForm(token);
		if (expanded) {
			for (let i = 0; i < expanded.length; i++) {
				if (arr2.containsSubArray(expanded[i])) return true;
			}
		}
		return false;
	});
}

module.exports = function customCompare(text1, text2) {
    let filtered1 = tokenize(text1);
    let filtered2 = tokenize(text2);
    let arrayRatio = 0;
    let setRatio = 0;
	let displayRatio = 0;
	let inter = intersect(filtered1, filtered2);
    if (filtered2.length >= filtered1.length) {
        arrayRatio = inter.length / filtered1.length;
        setRatio = new Set(inter).size / new Set(filtered1).size;
        displayRatio = Math.max(arrayRatio, setRatio);
    } else {
        arrayRatio = inter.length / filtered2.length;
        setRatio = new Set(inter).size / new Set(filtered2).size;
        displayRatio = Math.max(arrayRatio, setRatio);
    }
    return displayRatio;
}