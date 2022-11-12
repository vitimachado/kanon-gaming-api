const mongoose = require("mongoose");
require('dotenv').config()

// DB connection
const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("Connected to %s", MONGODB_URL);
})
	.catch(err => {
		console.error("App starting error:", err.message);
		process.exit(1);
	});
const db = mongoose.connection;

module.export = { db };
