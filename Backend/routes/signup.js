const router = require('express').Router();
let Signup = require('../model/signup.model');
const loginController = require('../controllers/loginController');



// router.route('/').get((req, res) => {
//     Signup.find()
//     .then(Signup => res.json(Signup))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

router.post('/', loginController.add );
router.get('/:id', loginController.getback);

// router.route('/login').post((req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;


//     const newSignUp  = new Signup({
//         username,
//         email,
//         address,
//         password,
//     });
    
//     newSignUp.save()
//     .then(() => res.json('New User added successfully!'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/:id').get((req, res) =>{
//     Signup.findById(req.params.id)
//     .then(Signup => res.json(Signup))
//     .catch(err => res.status(400).json('Error: '+ err));
// });

router.route('/:id').delete((req, res) =>{
    Signup.findByIdAndDelete(req.params.id)
    .then(() => res.json('User Deleted Successfully!'))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/update/:id').get((req, res) =>{
    Signup.findById(req.params.id)
    .then(Signup => {
        Signup.username = req.body.username;
        Signup.email = req.body.email;
        Signup.address =  req.body.address;
        Signup.password = req.body.password;
        
        Signup.save()
           .then(() => req.json('User updated Successfully!'))
           .catch(err => req.status(400).json('Error: ' + err));

    })
    .catch(err => res.status(400).json('Error: '+ err));
});

module.exports = router;