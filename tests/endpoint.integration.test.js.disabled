const { describe, it, before, after } = require("node:test");
const assert = require("node:assert");
const nock = require("nock");
const mongo = require("mongodb");

const TEST_DB = "some-throw-away-db-name";
const MOCK_API_RESPONSE = {"canWeDoIt":true, "expenses":"You owe us 17000 NOK"};

let server, config, BASE_URL;

before(()=>{
	// here you could also populate the database with some test data -- if needed for your tests
	config = require("../config.js").__injectNewMongoConfigValues({dbName: TEST_DB});
	BASE_URL = "http://localhost:" + config["app-port"];
	server = require("../server.js");
	// mocking network requests
	nock("http://some.3rd.party.api:8092")
		.get("/canWeDoIt")
		// .persist()
		.reply(200, MOCK_API_RESPONSE);
});

after(()=>{
	// DB clean-up
	const MONGO_URL = config.getMongoUri();
	const mongoClient = new mongo.MongoClient(MONGO_URL);
	let connectionRef;
	mongoClient
		.connect() // connecting to MongoDB using MongoDB's nodejs driver
		.then(connection=>{
			connectionRef = connection;
			return connection.db(TEST_DB);
		})
		.then(db=>db.collection("ads").deleteMany({})) // actual clean up -- deleting everyting from the "ads" collection
		.then(()=>connectionRef.close()) // closing connection to MongoDB
		.then(()=>{
			// stopping the server that we've just tested
			server.close(()=>{
				console.log("Server closed");
				process.exit(0);
			});
		});
});

const advertiser2save = {
	fullname: "Jhon Doe",
	name: "Squarespace",
	link: "https://www.squarespace.com/"
};

describe("Integration tests for our server, POST", async()=>{
	it("should create one new advertiser", async()=>{
		const postOptions = {
			body: JSON.stringify(advertiser2save),
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			}
		};
		return fetch(BASE_URL + "/ads", postOptions)
			.then(resp=>{
				resp.text().then(msg => console.log("RESPONSE FROM SERVEr:", msg));
				return assert.strictEqual(resp.ok, true);
			});
	});
});

describe("Integration tests for our server, DELETE", async()=>{
	it("should delete one advertiser", async()=>{
		return fetch(BASE_URL + "/ads/" + advertiser2save.name, {method: "DELETE"})
			.then(resp=>{
				resp.text().then(msg => console.log("RESPONSE FROM SERVEr:", msg));
				return assert.strictEqual(resp.ok, true);
			});
	});
});

