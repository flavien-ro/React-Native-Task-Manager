const User = require('../models/User');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const { registerValidation, loginValidation } = require('./validation'); 

// REGISTER USER
const register = async (req, res) => {

    // Validation
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // check if is in DB
    const emailExist = await User.findOne({email: req.body.email});

    if (emailExist) {
        return res.status(400).send('Email already exists');
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    // create user
    const user = new User ({
        name: req.body.name,
        email: req.body.email,
        password: hashedPass
    })
    try {
        const savedUser = await user.save();
        res.send({user: user._id, res: "Success"});
    } catch (error) {
        res.status(400).send(error);
    }
};

// LOGIN USER
const login = async (req, res) => {

    // Validation
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // check if email exist
    const user = await User.findOne({email: req.body.email});

    if (!user) {
        return res.status(400).send('Email or password is wrong');
    }

    // check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) {
        return res.status(400).send('Email or password is wrong');
    }

    // Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send({token : token, username: user.name, id: user._id});
};

module.exports = {
    register,
    login
}