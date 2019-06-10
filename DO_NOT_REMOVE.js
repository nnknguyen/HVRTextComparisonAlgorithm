// const contractedForms = [
//     "i'm", "he's", "she's", "it's", "you're", "we're", "they're",
//     "ain't", "isn't", "aren't", "wasn't", "weren't",
//     "don't", "doesn't", "didn't",
//     "i've", "you've", "we've", "they've",
//     "haven't", "hasn't", "hadn't",
//     "i'd", "he'd", "she'd", "it'd", "you'd", "we'd", "they'd"
// ];

// Array.prototype.containsSubArray = function(sub) {
// 	if (!Array.isArray(sub)) throw new Error("containsSubArray() receives an Array as parameter");
// 	let thisSize = this.length;
// 	let subSize = sub.length;
// 	for (let i = 0; i <= thisSize - subSize; i++) {
// 		if (this[i] === sub[0]) {
// 			let matchedTokens = 0;
// 			for (let j = 1; j < subSize; j++)
// 				if (this[i + j] === sub[j]) matchedTokens++;
// 			if (matchedTokens === subSize - 1) return true;
// 		}
// 	}
// 	return false;
// }

// // Array of all possible contracted forms
// // a.k.a. all keys of the dictionary
// module.exports.contracted = Array.from(contractedToExpanded.keys());

// // Array of all possible expanded forms of contracted forms
// // a.k.a. all values of the dictionary
// module.exports.expanded = [].concat.apply([], Array.from(contractedToExpanded.values()));

// // Array of arrays of equivalent forms
// const equivalentTokenSets = Array.from(contractedToExpanded).map(entry => [].concat.apply([], entry));

// module.exports = function(text1, text2) {
// 	let filtered1 = tokenize(text1);
// 	let filtered2 = tokenize(text2);
// 	let intersect = groupAndIntersect(filtered1, filtered2);
// 	let set1 = new Set(filtered1);
// 	let set2 = new Set(filtered2);
// 	let interSet = new Set(intersect);
// 	return (2 * interSet.size)/(set1.size + set2.size);
// }

// return arr1.filter(token => {
//     if (arr2.includes(token)) return true;
//     let equivalentForms = cfh.getEquivalentForm(token);
//     if (equivalentForms) {
//         for (let i = 0; i < equivalentForms.length; i++) {
//             if (arr2.includes(equivalentForms[i]))  return true;
//         }
//     }
//     return false;
// });

// return paragraph.match( /\(?[^\.\?\!]+[\.!\?]\)?/g ).map(t => t.trim());
