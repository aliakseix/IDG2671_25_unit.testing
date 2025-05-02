const config = {
	"app-port": process.env.APP_PORT,
	"mongo": {
		"protocol": "mongodb",
		"usr": process.env.MONGODB_USER,
		"pwd": process.env.MONGODB_PWD,
		"hostname": process.env.MONGODB_HOSTNAME || "localhost",
		"port": process.env.MONGODB_PORT || 27017,
		"dbName": "idg2671"
	},
	__injectNewMongoConfigValues(newMongoConfigObj){
		Object.assign(this.mongo, newMongoConfigObj);
		return this;
	},
	getMongoUri(){
		const m = this.mongo;
    if(process.env.NODE_ENV === "production"){
      return `${m.protocol}://${m.usr}:${m.pwd}@${m.hostname}:${m.port}/`;
    }
		return `${m.protocol}://${m.hostname}:${m.port}/`;
	}
};

// export default config;
module.exports = config;