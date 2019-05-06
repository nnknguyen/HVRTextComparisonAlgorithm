var charTypes = {
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

var getCharTypeValue = function(char) {
	for (let x in charTypes) {
		if (charTypes[x].pattern.test(char)) {
			return charTypes[x].value;
		}
	}
}

module.exports.compareCharTypes = function(char1, char2) {
	return getCharTypeValue(char1) - getCharTypeValue(char2);
}

module.exports.isWhitespace = function(char) { return char == " "; }

module.exports.isApostrophe = function(char) { return char == "'"; }

module.exports.isOther = function(char) { return charTypes.Other.pattern.test(char); }