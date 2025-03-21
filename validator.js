function sanitizeAuthorName(s){
	// convert to string; trim;
	s = s.toString().trim();
	//   Capitalized 1st letters
	let nameParts = s.split(" ");
	nameParts = nameParts.map(namePart => namePart.charAt(0).toUpperCase() + namePart.substr(1).toLowerCase());
	return nameParts.join(" ");
}

function checkIfEmpty(s){
	// 1.1 can't be null
	// 1.2 can't be empty string
	// 1.3 can't be undefined
	return s === undefined || s === null || !s.toString().trim().length;
}

const MAX_NAME_LENGTH = 128;

function validateAuthorName(fullname){
	// 1 - can't be empty
	if(checkIfEmpty(fullname)){
		throw new Error("Author name can't be empty");
	}
	// ensure it's a string for the follow-up validators
	fullname = sanitizeAuthorName(fullname);
	// maxlength 128 characters
	if(fullname.length > MAX_NAME_LENGTH){
		// console.log("length: ", fullname.length, "VS maxLength", MAX_NAME_LENGTH, fullname);
		throw new Error("Author name is unrealistically long.");
	}
	// only alphabetic characters
	const nonAlphaCharRegexp = /[^a-z\-\u00C0-\u017F ]/gui;
	if(nonAlphaCharRegexp.test(fullname)){
		throw new Error("Author name can't have non-alphabetic characters");
	}
	// should contain 2 parts: first and last name
	const nameParts = fullname.split(" ");
	if(nameParts.length < 2){
		throw new Error("Author name should be a full name");
	}
	// no abbreviations: at least 2 characters
	if(nameParts.some( x => x.length < 2)){
		throw new Error("Author name can't contain abbreviations - spell it out");
	}
	return true;
}

function validateURL(){
	// 1 - can't be empty
	return true;
}

// function checkIfLinkAlive(){

// }

module.exports =  {
	validateAuthorName,
	validateURL,
	MAX_NAME_LENGTH
	// checkIfLinkAlive
};