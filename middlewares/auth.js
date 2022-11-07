const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { checkIfStringStartsWith } = require("../utils/strings");

const ignorePaths = ['/api/v1/countrybyname', '/api/v1/countriesbynames', '/api/v1/allCountries']

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
console.log('authHeader', req.originalUrl)

  if(checkIfStringStartsWith(req.originalUrl, ignorePaths)) return next();  
  //return next();  
  if (!authHeader) {
    return res.status(401).send({ error: "Nenhuma token enviada" });
  }

  const [scheme, token] = authHeader.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, "secret150");

    req.userId = decoded.id;
    req.username = decoded.username;
    res.userId = decoded.id;
    res.username = decoded.username;
    //console.log('rrrrrrreeeeeeesssssssssss+', res)

    return next();
  } catch (err) {
    return res.status(401).send({ error: "Token inválida" });
  }
};
