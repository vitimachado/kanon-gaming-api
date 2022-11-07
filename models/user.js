
// const DaoModel = require('../models/dao');
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const { promisify } = require("util");

// exports.saveUser = (data) => {   
        
//     return db.collection('users').add(data)
//     .then((cardDoc) => {    
//         console.log('SAVED saveUser.', cardDoc);
//         return cardDoc;    
//     })
//     .catch((error) => { return error; console.error("Error adding document users: ", error); });
// }

// exports.searchCollection = (collection, where, where2, fun) => {  

//     return DaoModel.searchCollection(collection, where, where2, fun);
// }

// exports.searchDocument = (collection, document, fun) => {  

//     return DaoModel.searchDocument(collection, document, fun);
// }

// exports.hashPassword = (password) => { 

//     return bcrypt.hash(password, 8);
// }

// exports.compareHash = (hash, password) => {
//     console.log('compareHash', hash, password)
//     return bcrypt.compareSync(password, hash);//(hash, password);
// }

// exports.generateToken = (id, username) => {
//     return jwt.sign({ id, username }, "secret150", {
//         expiresIn: 86400
//     });
// }

// exports.verifyToken = async(token) => {
//     console.log('verifyToken', token);
//     return await promisify(jwt.verify)(token, "secret150")
// }

