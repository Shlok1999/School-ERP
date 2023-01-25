const router = require('express').Router();
const session = require('express-session');

// Importing MYSQL
const connection = require('../db/conn');

router.use(session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie:{
        maxAge: 60000*60*24
    }
}))

module.exports = router;