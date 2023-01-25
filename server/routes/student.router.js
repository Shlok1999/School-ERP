const router = require('express').Router();
const session = require('express-session');

// Importing MYSQL
const connection = require('../db/conn');

router.use(session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000 * 60 * 24
    }
}));

router.post('/login', (req, res) => {
    const { regdNumber, password } = req.body;

    if (regdNumber && password) {
        connection.query(`select * from student where regdNumber =? and password = ?;`,
            [regdNumber, password], (err, result) => {
                if (err) {
                    res.send(err);
                }
                if (result) {
                    req.session.loggedin = true;
                    req.session.id = result[0].id;
                    req.session.userData = result[0];
                    res.status(200).send(result)
                }
                else{
                    res.send("Invalid username or password");
                }
            })
    }
    else{
        res.send("Invalid Username or password");
    }
})



module.exports = router;