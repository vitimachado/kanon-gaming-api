const { hashPassword, compareHash, generateToken, verifyToken, verifyTokenExpirated } = require('../helpers');
const { UserModel } = require('../models/user');
const { returnErrorRequest, returnSuccess } = require('../utils/httpUtil');
const { findUser } = require('./users');

exports.getCoins = function(req, res) {
  const token = req.headers.authorization;
  verifyToken(token)
    .then(tokenRes => findUserAndRespond(res, tokenRes.email))
    .catch((error) => { res.status(401).json({statusCode: "401", error: "Token not ok." }) });
};

exports.setCoins = function(req, res) {
  const token = req.headers.authorization;
  const coins = req.query.coins;
  verifyToken(token)
    .then(tokenRes => findUserAndUpdateCoins(res, tokenRes.email, coins))
    .catch((error) => { res.status(401).json({statusCode: "401", error: "Token not ok." }) });
  
};

exports.sortMachine = function(req, res) {
  returnSuccess(res, 200, { sortMachine: ['apple', 'apple', 'banana'] });
};

const findUserAndRespond = (res, email) => {
  findUser(email)
  .then(user => {
      if(user) {
        returnSuccess(res, 200, { coins: user.coins });
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
