const { hashPassword, compareHash, generateToken, verifyToken, verifyTokenExpirated } = require('../helpers');
const { UserModel } = require('../models/user');
const { returnErrorRequest, returnSuccess } = require('../utils/httpUtil');

exports.register = async (req, res) => {  
    const { name, email, password } = req.body.data;

    const user = await UserModel.findOne({ email }).exec();
    console.log('register', user);
    if(user != null) {
        res.status(409).json({statusCode: "409", error: "This email is already exists." });
        return;
    }

    hashPassword(password)
    .then(hash => {
        console.log('register hash', hash);
        UserModel.create({ name, email, password: hash})
        .then(data => {
            console.log(data);
            res.status(200).json({statusCode: "200", data });
        });
    } )
    .catch(err => {
        console.log('Error', err);
        res.status(400).json({statusCode: "400", error: "Unable to save user." });
    });
};

exports.authenticate = function(req, res) {
    const { email, password } = req.body.data;
    findUserAndRespond(res, email, password);
};

exports.getUserByToken = function(req, res) {
    const token = req.headers.authorization;
    console.log('\n\n\ngetUserByToken 1', req.headers.authorization);
    verifyToken(token)
    .then(tokenRes => findUserAndRespond(res, tokenRes.email, null, true))
    .catch((error) => { res.status(401).json({statusCode: "401", error: "Token not ok." }) });
};

exports.verifyUserToken = function(req, res) {
    const token = req.headers.authorization;
    console.log('verifyToken 1', req.headers.authorization);
    verifyToken(token)
    .then(tokenRes => {
        delete tokenRes._id;
        if(tokenRes && tokenRes.email && !verifyTokenExpirated(tokenRes))
          res.status(202).json({statusCode: "202", data:  { ...tokenRes } });
        else res.status(401).json({statusCode: "401", error: "Session expired." });
    } )
    .catch((error) => { res.status(401).json({statusCode: "401", error: "Token not ok." }) });
};

exports.findUser = (email) => {
  return UserModel.findOne({ email }, { createdAt: 0, _v: 0 })
}

const findUserAndRespond = (res, email, password, notCheckPassword) => {
  this.findUser(email)
  .then(user => {
      if(user && (notCheckPassword || compareHash(user.password, password))) {
        returnSuccess(res, 202, {
          user: {
            coins: user.coins, email: user.email, name: user.name,
          },
          token: generateToken(user._id, user.email) 
        });
      }
      else returnErrorRequest(res, 404, "The user not exist.");
  } );
}