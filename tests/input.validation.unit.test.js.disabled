
const {describe, it} = require("node:test");
const assert = require("node:assert");

const validator = require("../validator");

function makeString(len, s = "x"){
	return (new Array(len))
		.fill(s)
		.join("");
}

describe("Validator for the full user name", ()=>{
	it("should not allow empty inputs", async (t)=>{
		await t.test("including nulls", ()=>{
			assert.throws(()=>validator.validateAuthorName(null));
		});
		await t.test("including undefined", ()=>{
			assert.throws(()=>validator.validateAuthorName(undefined));
		});
		await t.test("including empty strings", ()=>{
			assert.throws(()=>validator.validateAuthorName(""));
		});
		await t.test("including empty strings with only whitespaces in them", ()=>{
			assert.throws(()=>validator.validateAuthorName("   				   "));
		});
		// await t.test("including empty strings with only whitespaces in them, including dashes only", ()=>{
		// 	const expectedError = new Error("Author name can't be empty");
		// 	assert.throws(()=>validator.validateAuthorName("   		--		 --   "), expectedError);
		// });
	});

	it("should not be too long", async (t)=>{
		await t.test("testing just over the limit", ()=>{
			const testSTring = makeString(validator.MAX_NAME_LENGTH + 1);
			const expectedError = new Error("Author name is unrealistically long.");
			assert.throws(()=>validator.validateAuthorName(testSTring), expectedError);
		});

		await t.test("testing just below the limit", ()=>{
			const testSTring = makeString(validator.MAX_NAME_LENGTH - 2);
			// const expectedError = new Error("Author name is unrealistically long.");
			assert.ok(()=>validator.validateAuthorName(testSTring));
		});

		await t.test("testing over the limit - quite a lot, name length:" + validator.MAX_NAME_LENGTH * 10, ()=>{
			const testSTring = makeString(validator.MAX_NAME_LENGTH * 10);
			const expectedError = new Error("Author name is unrealistically long.");
			assert.throws(()=>validator.validateAuthorName(testSTring), expectedError);
		});
	});

	it("should contain only alphabetical chracters", async(t)=>{
		const expectedError = new Error("Author name can't have non-alphabetic characters");
		await t.test("including punctuation", ()=>{
			const testName = "Peter.Pan";
			assert.throws(()=>validator.validateAuthorName(testName), expectedError);
		});

		await t.test("including numbers", ()=>{
			const testName = "Peter Pan the 3rd";
			assert.throws(()=>validator.validateAuthorName(testName), expectedError);
		});

		await t.test("including smileys", ()=>{
			const testName = "Peter 😊 Pan";
			assert.throws(()=>validator.validateAuthorName(testName), expectedError);
		});
	});

	it("should be a full name", async(t)=>{
		const expectedError = new Error("Author name should be a full name");
		await t.test("with at least 1st name and surname", ()=>{
			assert.throws(()=>validator.validateAuthorName("Peter"), expectedError);
			assert.throws(()=>validator.validateAuthorName("PeterPan"), expectedError);
			assert.throws(()=>validator.validateAuthorName("PeterPan "), expectedError);
		});
	});

});
