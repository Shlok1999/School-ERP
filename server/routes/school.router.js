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
}))

router.post('/login', (req, res) => {
    const school_regd_id = req.body.school_regd_id;
    const password = req.body.password;

    if (school_regd_id && password) {
        connection.query(`select * from school_info where school_regd_id = ? and password = ?`,
            [school_regd_id, password], (err, result) => {
                if (err) {
                    res.send(err);
                }
                if (result) {
                    req.session.loggedin = true;
                    req.session.id = result[0].id;
                    req.session.userData = result[0];
                    res.status(200).send(result)

                    console.log("Admin Logged in")
                }
                else {
                    res.send("Invalid Username or Password")
                }
            })
    }
    else {
        res.send("Invalid Username And Password")
    }
});



// Student Section
router.post('/add-student', (req, res)=>{
    const [id, regdNumber, firstname, lastname,standard, section, fee_paid, total_fees, attendance, fee_status, school_regdNumber] = req.body;
    if(req.session){
        connection.query(`insert into student values (?,?,?,?,?,?,?,?,?,?,(select school_regd_id from school_info where school_regd_id = ? ))
        ;`[id, regdNumber, firstname, lastname, standard, section, fee_paid, total_fees, attendance,fee_status, school_regdNumber],
        (err, result)=>{
            if(err){
                res.send(err);
            }
            else{
                res.send(result);
            }
        })
    }
    else{
        res.send("School Logged Out");
    }
});


// Teacher Section

router.post('/add-teacher', (req, res)=>{
      
});


// Subject Section
router.post('/add-subjects', (req, res)=>{

});



// Inventory Section
router.post('/add-inventory', (req, res)=>{

});


// Account Section
router.post('/add-account-team', (req, res)=>{

})




module.exports = router;