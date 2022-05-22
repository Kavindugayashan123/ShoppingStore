const router = require('express').Router();
// const Signup = require('../model/signup.model');
const {user} = require('../controllers/loginController');

router.post('/login', user.login);
// router.get('/protected', loginController.protected);

module.exports = router;