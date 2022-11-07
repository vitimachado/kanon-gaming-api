const UserController = require('../controllers/users.js');

module.exports = (app) => {

    app.post("/register", UserController.register);
    
    app.post("/authenticate", UserController.authenticate);

    app.post("/verifyToken", UserController.verifyToken);
    
}
  