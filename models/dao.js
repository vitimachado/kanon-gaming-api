const { db } = require("../config/mongoDb");
const { UserModel } = require("./user");

// Create collection of Models
UserModel.createCollection().then(function (collection) {
  console.log('Collection is created!');
});

// const collectionUsers = db.collection('users');

// async function main() {
//   collectionUsers.insertOne({
//     name: 'Vitor Machado',
//     email: '123@123.com',
//     password: '123456'
//   })
// }

// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());

