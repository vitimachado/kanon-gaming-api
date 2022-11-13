const { hashPassword, compareHash, generateToken, verifyToken, randomArrayValue } = require('../helpers');
const { UserModel } = require('../models/user');
const { returnErrorRequest, returnSuccess } = require('../utils/httpUtil');
const { slotMachineItems } = require('../utils/urls');
const { findUser } = require('./users');

/**
 *  Method to handle get the coins of user.
 *
 * @param {HTTPResponse} req Request of HTTP query.
 * @param {HTTPResponse} res Response of HTTP query.
 * @param {Object} [objPlus={}] Object to concat on the response data object.
 */
const getCoinsHandler = (req, res, objPlus = {}) => {
  const token = req.headers.authorization;
  verifyToken(token)
    .then(tokenRes => findUserAndRespond(res, tokenRes.email, objPlus))
    .catch((error) => { res.status(401).json({statusCode: "401", error: "Token not ok." }) });
};

/**
 *  Method to get the coins of user.
 *
 * @param {HTTPResponse} req Request of HTTP query.
 * @param {HTTPResponse} res Response of HTTP query.
 */
exports.getCoins = function(req, res) {
  getCoinsHandler(req, res);
};

/**
 *  Method to set the user coins.
 *
 * @param {HTTPResponse} req Request of HTTP query.
 * @param {HTTPResponse} res Response of HTTP query.
 */
exports.setCoins = function(req, res) {
  const token = req.headers.authorization;
  const coins = req.query.coins;
  verifyToken(token)
    .then(tokenRes => findUserAndUpdateCoins(res, tokenRes.email, coins))
    .catch((error) => { res.status(401).json({statusCode: "401", error: "Token not ok." }) });
  
};

/**
 * Method to create Array with random values of slot machine.
 *
 * @return {String[]} Array with random values of slot machine.
 */
const createArraySlotMachine = () => {
  const arraySymbols = [
    slotMachineItems.cherry,
    slotMachineItems.apple,
    slotMachineItems.banana,
    slotMachineItems.lemon
  ];
  return Array.from({ length: 3 }, () => randomArrayValue(arraySymbols));
}

/**
 *  Method to sort items of slot machine and return.
 *
 * @param {HTTPResponse} req Request of HTTP query.
 * @param {HTTPResponse} res Response of HTTP query.
 */
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

/**
 *  Method to find the user and respond.
 *
 * @param {HTTPResponse} res Response of HTTP query.
 * @param {string} email  Email of user.
 * @param {Object} [objPlus={}] Object to concat on the response data object.
 */
const findUserAndRespond = (res, email, objPlus = {}) => {
  findUser(email)
  .then(user => {
      if(user) {
        returnSuccess(res, 200, { coins: user.coins, ...objPlus });
      }
      else returnErrorRequest(res, 404, "Error no servidor.");
  } );
}

/**
 *  Method to find the user and increment the coins.
 *
 * @param {HTTPResponse} res Response of HTTP query.
 * @param {string} email  Email of user.
 * @param {number} coins  Coins of user.
 * @param {Object} [objPlus={}] Object to concat on the response data object.
 */
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

/**
 * Method to find the user and increment the coins
 *
 * @param {string} email Email of user.
 * @param {number} someNumber Number to increment the coins
 * @return {Promise} Return Promises with the respond of update.
 */
const findUserAndIncCoins = (email, someNumber) => {
  return UserModel.updateOne(
    { email, coins: { $gt: 0 } },
    { $inc: { coins: someNumber } },
    { new: true },
  )
}

/**
 *  Calculate the prize coins return.
 *
 * @param {String[]} sortMachineArray Array the strings with the sort items.
 * @return {Number} Numbers of coins to return.
 */
const checkPrize = (sortMachineArray) => {
  return sortMachineArray.filter(item => item === slotMachineItems.cherry).length === 3 ? 50 :
          sortMachineArray.filter(item => item === slotMachineItems.cherry).length === 2 ? 40 :
          sortMachineArray.filter(item => item === slotMachineItems.apple).length === 3 ? 20 :
          sortMachineArray.filter(item => item === slotMachineItems.apple).length === 2 ? 10 :
          sortMachineArray.filter(item => item === slotMachineItems.banana).length === 3 ? 15 :
          sortMachineArray.filter(item => item === slotMachineItems.banana).length === 2 ? 5 :
          sortMachineArray.filter(item => item === slotMachineItems.lemon).length === 3 ? 3 : 0;
}
