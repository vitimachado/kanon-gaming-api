const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { verifyTokenExpirated } = require("../helpers");
const { returnErrorRequest } = require("../utils/httpUtil");
const { checkIfStringStartsWith } = require("../utils/strings");
const { urlsCountries, urlsUsers } = require("../utils/urls");

const ignorePaths = [
  urlsCountries.countryByName, urlsCountries.countriesbynames, urlsCountries.allCountries,
  urlsUsers.user_register, urlsUsers.user_authenticate, urlsUsers.user_getUserByToken]

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(checkIfStringStartsWith(req.originalUrl, ignorePaths)) return next();
  if (!authHeader) {
    return returnErrorRequest(res, 401, "Not Authorized");
  }

  try {
    const decoded = await promisify(jwt.verify)(authHeader, "secret150");

    console.log('rrrrrrreeeeeeesssssssssss+', decoded, decoded.exp * 1000 < new Date().getTime())
    if (verifyTokenExpirated(decoded)) {
      return returnErrorRequest(res, 401, "Token expired");
    }

    return next();
  } catch (err) {
    return returnErrorRequest(res, 401, "Token invalid.");
  }
};
