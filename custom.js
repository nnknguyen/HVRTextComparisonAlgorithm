const pre = require("./predefined.js");

function getCharType(char) {
	for (let x in pre.charTypes) {
		if (pre.charTypes[x].pattern.test(char)) {
			return pre.charTypes[x].value;
		}
	}
}

function isContractedForm(token) {
	if (pre.contractedForms.test(token))
		return true;
	return false;
}

function tokenize(text) {
	if (!text || text.trim() == "") return [];
	let tokens = [];
	let register = [];
	let detectApostrophe = false;
	for (let i = 0; i < text.length; i++) {
		register.push(text.charAt(i));
		if (i == 0) continue;
		let size = register.length;
		if (getCharType(register[size - 2]) != getCharType(register[size - 1])) {
			tokens.push(newToken = register.join("").slice(0, -1));
			register.splice(0, size - 1);
			if (detectApostrophe) {
				let potentialContracted = tokens.slice(-3).join("");
				if (isContractedForm(potentialContracted)) {
					tokens = tokens.slice(0, -3);
					tokens.push(potentialContracted);
				}
				detectApostrophe = false;
			}
		}
		if (getCharType(tokens[tokens.length - 1]) == pre.charTypes.Apostrophe.value)
			detectApostrophe = true;
	}
	tokens.push(register.join(""));
	if (detectApostrophe) {
		let potentialContracted = tokens.slice(-3).join("");
		if (isContractedForm(potentialContracted)) {
			tokens = tokens.slice(0, -3);
			tokens.push(potentialContracted);
		}
		detectApostrophe = false;
	}
	return tokens;
}

console.log(tokenize("I weren't there.").filter(c => c != ' '));

/*module.exports = function customCompare(text1, text2) {
    let filtered1 = tokenize(text1);
    let filtered2 = tokenize(text2);
    let arrayRatio = 0;
    let setRatio = 0;
    let displayRatio = 0;
    if (filtered2.length >= filtered1.length) {
        let inter = filtered1.filter(v => filtered2.includes(v));
        arrayRatio = inter.length / filtered1.length;
        setRatio = new Set(inter).size / new Set(filtered1).size;
        displayRatio = Math.max(arrayRatio, setRatio);
    } else {
        let inter = filtered2.filter(v => filtered1.includes(v));
        arrayRatio = inter.length / filtered2.length;
        setRatio = new Set(inter).size / new Set(filtered2).size;
        displayRatio = Math.max(arrayRatio, setRatio);
    }
    return displayRatio;
}*/