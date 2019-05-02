var contractedForms = /[A-Za-z]+'[A-Za-z]+/;

module.exports.isContractedForm = function(token) {
	if (contractedForms.test(token))
		return true;
	return false;
}