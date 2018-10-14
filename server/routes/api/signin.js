const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

module.exports = (app) => {
   /* app.get('/api/counters', (req, res, next) => {
             Counter.find()
                .exec()
                .then((counter) => res.json(counter))
                .catch((err) => next(err));
            });
        
            app.post('/api/counters', function (req, res, next) {
            const counter = new Counter();
        
            counter.save()
                .then(() => res.json(counter))
                .catch((err) => next(err));
            }); */

            // sign up
        app.post('api/account/signup', (req, res, next) => {
                const { body } = req;
                const { 
                    firstName,
                    lastName, 
                    password,
                    userType 
                    } = body;
                    let {
                        email
                    } = body;
                    

                if(!firstName){
                    return res.end({
                        success: false, 
                        message: "Error, First Name cannot be left blank"
                    });
                }
                if(!lastName){
                    return res.end({
                        success: false, 
                        message: "Error, Last Name cannot be left blank"
                    });
                }
                if(!email){
                    return res.end({
                        success: false, 
                        message: "Error, First Name cannot be left blank"
                    });
                }
                if(!password){
                    return res.end({
                        success: false, 
                        message: "Error, Password cannot be left blank"
                    });
                }
                if(!userType){
                    return res.end({
                        success: false, 
                        message: "Error, User Type cannot be left blank"
                    });
                }
            

                email = email.toLowerCase();
            
                // verify that email isnt in db
                

                User.find({
                    email: email
                    }, (err, previousUser) => {
                        if(err){
                            return res.end({
                                success: false,
                                message: 'Server Error'
                            });
                        
                        }else if (previousUser.length > 0) {
                            return res.end({
                                success: false,
                                message: 'Account Already Exists'
                            });
                        }
                        
                // construct user object
                const newUser = new User();
                newUser.email = email;
                newUser.firstName = firstName;
                newUser.lastName = lastName;
                newUser.password = newUser.generateHash(password);
                newUser.userType = userType;
                // save it
                newUser.save((err, user) => {
                    if(err){
                        return res.end({
                            success: false,
                            message: 'Server Error'
                        });
                    }
                        return res.end({
                            success: true,
                            message: 'Sign up successful'
                        });
                });
            });
        });

            //sign in
        app.post('api/account/signin', (req, res, next) => {
            const { body } = req;
            const {  
                password,
                } = body;
                let {
                    email
                } = body;

                if(!email){
                    return res.end({
                        success: false, 
                        message: "Error, First Name cannot be left blank"
                    });
                }
                if(!password){
                    return res.end({
                        success: false, 
                        message: "Error, Password cannot be left blank"
                    });
                }
                email = email.toLowerCase();

                // find user and verify password

                User.find({
                    email: email
                }, (err, users) => {
                    if (err){
                        return res.send({
                            success: false, 
                            message: 'Error, server error'
                        });
                    }
                    if (users.length != 1){
                        return res.send({
                            success: false, 
                            message: 'Error, invalid user'
                        });
                    }
                    const user = users[0];
                    if (!user.validPassowrd(password)){
                        if (users.length != 1){
                            return res.send({
                                success: false, 
                                message: 'Error, invalid password'
                            });
                        }
                    }
                    // otherwise correct user

                    const userSession = new UserSession();
                    userSession.userId = user._id;
                    userSession.save((err, doc) => {
                        if (err){
                            return res.send({
                                success: false, 
                                message: 'Error, server error'
                            });
                        }
                        return res.send({
                            success: true,
                            message: 'Valid signin', 
                            token: doc._id   // refers back to user id
                        });
                    });
                });
            });

            //verify
        app.post('api/account/verify', (req, res, next) => {
            const { query } = req;
            const { token } = query;

            UserSession.find({
                _id: token,
                isDeleted: false
            }, (err, sessions) => {
                if(err) {
                    return res.send({
                        success: false, 
                        message: 'Error: server error'
                    });
                }
                if (sessions.length != 1){
                    return res.send({
                        success: false, 
                        message: 'Error: Invalid'
                    });

                }else{
                    return res.send({
                        success: true, 
                        message: 'Success'
                    });
                }
            });
            });
        app.post('api/account/logout', (req, res, next) => {
            const { query } = req;
            const { token } = query;

            UserSession.findOneAndUpdate({
                _id: token,
                isDeleted: false
            }, { 
                $set:{
                    isDeleted:true
                }
            }, null, (err, sessions) => {
                if(err) {
                    return res.send({
                        success: false, 
                        message: 'Error: server error'
                    });
                }
                return res.send({
                        success: true, 
                        message: 'Success'
                    });
                
            });
        });
    };
    

    
