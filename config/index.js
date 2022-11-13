const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const cors = require('cors');
const authMiddleware = require("../middlewares/auth");

module.exports = function(){
  let app = express();

  app.set('base', '/api/v1');
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "DELETE, POST, GET");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(authMiddleware);

  consign()
   .include('controllers')
   .then('routes')
   .then('models')
   .into(app);

  return app;
}