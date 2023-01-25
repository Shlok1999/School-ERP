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

router.post('/login', (req, res)=>{
    const regdNumber = req.body.regdNumber;
    const password = req.body.password;

    connection.query(`select * from admin where regdNumber = ? and password = ?`,
    [regdNumber, password], (err, result)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    })

})

router.post('/school-signup', (req, res)=>{
    const id = req.body.id;
    const schoolname = req.body.schoolname;
    const school_address = req.body.school_address;
    const school_regd_id = req.body.school_regd_id;
    const password = req.body.password;

    connection.query(`insert into school values (?,?,?,?,?);`
    ,[id, schoolname, school_address,school_regd_id, password],
    (err, result)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
})




module.exports = router;