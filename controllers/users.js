const UserModel = require('../models/user');

exports.register = function(req, res) {    

    console.log('register', req.body.data.password);
    const { nome, password } = req.body.data;

    // UserModel.hashPassword(password)
    // .then(hash => {
    //     console.log('register hash', hash);
        
    //     findUser(nome, null)
    //     .then(user => {
    //         console.log('findUser(nome, password)', user);
    //         if(user == null) {
    //             UserModel.saveUser({ nome, hash, creationDate: new Date(), likes: [], votes: {ups:[], downs:[]} })
    //             .then(user => res.status(200).json({statusCode: "201", data: user }) )   
    //             .catch(err => {
    //                 console.log('Error', err);
    //                 res.status(409).json({statusCode: "409", data: "Nome já cadastrado." });
    //             });            
    //         }
    //         else  res.status(409).json({statusCode: "409", data: "Nome já cadastrado." });
    //     } );
    // } )
    // .catch(err => {
    //     console.log('Error', err);
    //     res.status(409).json({statusCode: "409", data: "Nome já cadastrado." });
    // });
};

exports.authenticate = function(req, res) {    

    console.log('authenticate', req.body.data.password);
    const { nome, password } = req.body.data;

    // findUser(nome, null)
    // .then(user => {
    //     console.log('findUser(nome, password)', user);
    //     if(user && UserModel.compareHash(user[0].hash, password))  res.status(202).json({statusCode: "202", data: { ...user[0], token: UserModel.generateToken(user[0].id, user[0].nome) } });
    //     else res.status(409).json({statusCode: "409", data: "Usuário não cadastrado." });
    // } );
};

exports.verifyToken = function(req, res) {    

    console.log('verifyToken', req.body.data);
    // const token = req.body.data;
    // UserModel.verifyToken(token)
    // .then(tokenRes => {
    //     console.log('verifyToken 1', tokenRes);
    //     if(tokenRes && tokenRes.username) res.status(202).json({statusCode: "202", data:  { ...tokenRes } });
    //     else res.status(200).json({statusCode: "200", data:  {} });
    // } )
    // .catch((error) => { res.status(200).json({statusCode: "200", data:  {} }) });
};

exports.findUserById = function(id) {    
    
    console.log('findUserById function', id);

    // return UserModel.searchDocument('users', id, (doc) => {
    //     console.log(doc.id)
    //     return { id: doc.id, ...doc.data() }//{ id: doc.data().id, keywords: doc.data().keywords }
    // }).then(data => {
    //         console.log('getuserById', data);
    //         return data;
    //     }        
    // ).catch(err => {
    //     console.log('Error', err);
    //     return null;
    // });
};

findUser = function(nome, password) {    
    
    let queryPassword = password ? ['password', '==', password] : null;
    console.log('findUser function', nome, password, queryPassword);

    // return UserModel.searchCollection('users', ['nome', '==', nome], queryPassword, (doc) => {
    //     console.log(doc.id)
    //     return { id: doc.id, ...doc.data() }//{ id: doc.data().id, keywords: doc.data().keywords }
    // }).then(data => {
    //         console.log('getuser', data);
    //         return data;
    //     }        
    // ).catch(err => {
    //     console.log('Error', err);
    //     return null;
    // });
};