let Signup = require('../model/signup.model');
var jwt = require('jsonwebtoken');
const { text } = require('express');

const user={
     add : (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const address = req.body.address;
    const password = req.body.password;


    const newSignUp  = new Signup({
        username,
        email,
        address,
        password,
    });
    
    newSignUp.save()
    .then(() => res.json('New User added successfully!'))
    .catch(err => res.status(400).json('Error: ' + err));
   },

   getback :(req, res) => {
    Signup.findById(req.params.id)
    .then(Signup => res.json(Signup))
    .catch(err => res.status(400).json('Error: '+ err));
   },

   login : (req, res) => {
       const email = req.body.email
       const pw = req.body.password

       Signup.find({email},  (err, docs)=> {
        if (err){
            console.log(err);
            res.json({
                message: "Entered email and password wrong"
            })
        }
        else{

            if(docs[0].password === pw){

                const token =  jwt.sign({ user }, 'my_secret_key');
                res.json({
                    token: token,
                    user:docs[0]
                });


            }
 
        }
    });
    
 
   },

    protected :  (req, res) => {

        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined'){
            const bearer = bearerHeader.split(" ");
            const bearerToken = bearer[1];
            req.token = bearerToken;

        } else {
            res.sendStatus(403);
        }

  jwt.verify(req.token, 'my_secret_key',  (err, data) => {
            if(err){
                res.sendStatus(403);
            } else{
                res.json({
                    text: 'this is protected',
                    data: data
                });
                
            }

        });
    },


//    function ensureToken(req, res, next) {
//        const bearerHeader = req.headers['authorization'];
//        if (typeof bearerHeader !== 'undefined'){
//            const bearer = bearerHeader.split(" ");
//            const bearerToken = bearer[1];
//            req.token = bearerToken;
//            next();
//        } else {
//            res.sendStatus(403);
//        }
//    }

}

module.exports = {
   user
    
};