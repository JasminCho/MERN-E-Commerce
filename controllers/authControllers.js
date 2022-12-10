// Handles logic for registration, login and fetching user to check credentials
const User = require('../models/User');
const jwt = require('jsonwebtoken'); // creates JSON Web Tokens to store to verify if user authenticated
const config = require('config'); // access JSON in config folder to store JWT secret code
const bcrypt = require('bcrypt'); // hash pw before saving to db

// registration function
module.exports.signup = (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400).json({msg: 'Please enter all fields'});
    }
    // search email in db
    User.findOne({email})
    .then(user => {
        if (user) return res.status(400).json({msg: 'User already exists'});

        const newUser = new User({ name, email, password });

        // create salt and hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash; // hashed pw
                newUser.save()
                    .then(user => {
                        jwt.sign(
                            { id: user._id },
                            config.get('jwtsecret'),
                            { expiresIn: 3600 },
                            (err, token) => {
                                if (err) throw err;
                                // token response with user details, no pw
                                res.json({ 
                                    token,
                                    user: {
                                        id: user._id,
                                        name: user.name,
                                        email: user.email
                                    }
                                });
                            }
                        )
                    });
            })
        })
    })
}

// login function
module.exports.login = async (req, res) => {
    // deconstruct request body to get email and password
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({msg: 'Please enter all fields'});
    }
    // serach for user using email id
    User.findOne({email})
        .then(user => {
            if (!user) return res.status(400).json({msg: 'User does not exist'});

            // Validate password; compare provided with user's pw in db
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({msg: 'Invalid credentials'});
                    // create signed JWT and return token with user details
                    jwt.sign(
                        { id: user._id },
                        config.get('jwtsecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user._id,
                                    name: user.name,
                                    email: user.email
                                }
                            });
                        }
                    )
                })
        })
}

// get user function
module.exports.get_user = (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
}