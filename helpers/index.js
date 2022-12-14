
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");

exports.hashPassword = (password) => { 
  return bcrypt.hash(password, 8);
}

exports.compareHash = (hash, password) => {
  return bcrypt.compareSync(password, hash);//(hash, password);
}

exports.generateToken = (_id, email) => {
  return jwt.sign({ _id, email }, "secret150", {
      expiresIn: 86400
  });
}

exports.verifyToken = async(token) => {
  return await promisify(jwt.verify)(token, "secret150")
}

exports.verifyTokenExpirated = (decoded) => {
  return decoded.exp * 1000 < new Date().getTime();
}

exports.randomArrayValue = (array) => {
  const random = Math.floor(Math.random() * array.length);
  console.log(random, array[random]);
  return array[random];
}