const { db } = require("../config/mongoDb");
const { UserModel } = require("./user");

// Create collection of Models
UserModel.createCollection().then(function (collection) {
  console.log('Collection is created!');
});
