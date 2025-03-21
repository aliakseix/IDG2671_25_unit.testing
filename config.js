const config = {
	"app-port": process.env.APP_PORT,
	"mongo": {
		"protocol": "mongodb",
		"usr": process.env.MONGODB_USER,
		"pwd": process.env.MONGODB_PWD,
		"hostname": process.env.MONGODB_HOSTNAME || "localhost",
		"port": process.env.MONGODB_PORT || 27017,
		"dbName": "idg2671"
	}
};

// export default config;
module.exports = config;