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

exports.sortMachine = async function(req, res) {
  const token = req.headers.authorization;
  const tokenRes = await verifyToken(token);
  findUser(tokenRes.email)
  .then(user => {
      if(user) {
        const sortMachine = createArraySlotMachine();
        const prize = checkPrize(sortMachine);
        const oldCoins = user.coins - 1;
        findUserAndUpdateCoins(res, tokenRes.email, (user.coins + prize - 1), { sortMachine, prize, oldCoins });
      }
      else returnErrorRequest(res, 404, "Error no servidor.");
  })
  .catch((error) => { res.status(400).json({statusCode: "400", error: "Not Possible to update coins." }) });
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

const findUserAndUpdateCoins = (res, email, coins, objPlus = {}) => {
  UserModel.updateOne(
    { email },
    { $set: { coins } },
    { upsert: true }
  )
  .then(data => {
      console.log(data);
      findUserAndRespond(res, email, objPlus);
  });
}

const findUserAndMinusCoins = (email, someNumber) => {
  return UserModel.updateOne(
    { email, coins: { $gt: 0 } },
    { $inc: { coins: someNumber } },
    { new: true },
  )
}

const checkPrize = (sortMachineArray) => {
  console.log('checkPrize', sortMachineArray);
  return sortMachineArray.filter(item => item === 'cherry').length === 3 ? 50 :
          sortMachineArray.filter(item => item === 'cherry').length === 2 ? 40 :
          sortMachineArray.filter(item => item === 'apple').length === 3 ? 20 :
          sortMachineArray.filter(item => item === 'apple').length === 2 ? 10 :
          sortMachineArray.filter(item => item === 'banana').length === 3 ? 15 :
          sortMachineArray.filter(item => item === 'banana').length === 2 ? 5 :
          sortMachineArray.filter(item => item === 'lemon').length === 3 ? 3 : 0;
}
