const UserController = require('../controllers/users.js');
const { urlsUsers } = require('../utils/urls.js');

module.exports = (app) => {
    
  app.post(urlsUsers.user_register, UserController.register);
  
  app.post(urlsUsers.user_authenticate, UserController.authenticate);

  app.get(urlsUsers.user_verifyToken, UserController.verifyUserToken);

  app.get(urlsUsers.user_getUserByToken, UserController.getUserByToken);
}
  