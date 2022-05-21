const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const signupSchema = new Schema
({
    username: {type: String},
    email: {type: String},
    address: {typeof:String},
    password: {type:String} 
}, {
    timestamps: true,
});
s
const Signup = mongoose.model('Signup', signupSchema);

module.exports = Signup;
