// All possible meaningful character types for tokenization
const charTypes = {
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

// This function receives a character and determine the value of the type of that character
function getCharTypeValue(char) {
	for (let x in charTypes) {
		if (charTypes[x].pattern.test(char)) {
			return charTypes[x].value;
		}
	}
}

// This function receives 2 characters and returns true if the 2 characters is of the same type, false otherwise
module.exports.compareCharTypes = function(char1, char2) {
	return getCharTypeValue(char1) - getCharTypeValue(char2);
}

// This function receives 1 character and returns true if the character is a Whitespace, false otherwise
module.exports.isWhitespace = function(char) { return char == " "; }

// This function receives 1 character and returns true if the character is an Apostrophe, false otherwise
module.exports.isApostrophe = function(char) { return char == "'"; }

// This function receives 1 character and returns true if the character is not an alphanumeric, a whitespace or an apostrophe, false otherwise
module.exports.isOther = function(char) { return charTypes.Other.pattern.test(char); }