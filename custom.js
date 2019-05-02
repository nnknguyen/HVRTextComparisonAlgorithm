const cth = require("./charTypeHelpers");
const cfh = require("./contractedFormHelpers");

function tokenize(text) {
	if (!text || text.trim() == "") return [];
	let tokens = [];	// result
	let register = []; // Conveying belt
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

console.log(tokenize("He didn't say 'goodbye!' to me!").filter(c => c != ' '));

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