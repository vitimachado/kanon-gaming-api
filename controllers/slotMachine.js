const { hashPassword, compareHash, generateToken, verifyToken, randomArrayValue } = require('../helpers');
const { UserModel } = require('../models/user');
const { returnErrorRequest, returnSuccess } = require('../utils/httpUtil');
const { findUser } = require('./users');

const getCoinsHandler = (req, res, objPlus = {}) => {
  const token = req.headers.authorization;
  verifyToken(token)
    .then(tokenRes => findUserAndRespond(res, tokenRes.email, objPlus))
    .catch((error) => { res.status(401).json({statusCode: "401", error: "Token not ok." }) });
};

exports.getCoins = function(req, res) {
  getCoinsHandler(req, res);
};

exports.setCoins = function(req, res) {
  const token = req.headers.authorization;
  const coins = req.query.coins;
  verifyToken(token)
    .then(tokenRes => findUserAndUpdateCoins(res, tokenRes.email, coins))
    .catch((error) => { res.status(401).json({statusCode: "401", error: "Token not ok." }) });
  
};

const createArraySlotMachine = () => {
  const arraySymbols = ['apple', 'apple', 'banana', 'lemon'];
  return Array.from({ length: 3 }, () => randomArrayValue(arraySymbols));
}

exports.sortMachine = function(req, res) {
  findUserAndMinusCoins(req, -1, getCoinsHandler(req, res, { sortMachine: createArraySlotMachine() }));
};

const findUserAndRespond = (res, email, objPlus = {}) => {
  findUser(email)
  .then(user => {
      if(user) {
        returnSuccess(res, 200, { coins: user.coins, ...objPlus });
      }
      else returnErrorRequest(res, 404, "Error no servidor.");
  } );
}

const findUserAndUpdateCoins = (res, email, coins) => {
  UserModel.updateOne(
    { email },
    { $set: { coins } },
    { upsert: true }
  )
  .then(data => {
      console.log(data);
      findUserAndRespond(res, email);
  });
}

const findUserAndMinusCoins = (req, someNumber, fun = () => null) => {
  const token = req.headers.authorization;
  verifyToken(token)
    .then(tokenRes => 
      UserModel.updateOne(
        { email: tokenRes.email, coins: { $gt: 0 } },
        { $inc: { coins: someNumber } },
        { upsert: true }
      )
      .then(data => {
        console.log(data);
        fun();
      }))
    .catch((error) => { res.status(401).json({statusCode: "401", error: "Token not ok." }) });
  
}