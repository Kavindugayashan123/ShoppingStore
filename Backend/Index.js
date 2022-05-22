const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () =>
{ console.log("MongoDB database connection established successfully")});

// const signUpRouter = require('./routes/signup');
const loginRouter = require('./routes/login');

// app.use('/signup', signUpRouter);
app.use('/login', loginRouter);


app.listen(port, () =>
    {
        console.log('Server is running on port: ${port}');
    });





