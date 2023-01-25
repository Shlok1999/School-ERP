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
//  SCHOOL0011001
router.post('/add-student', (req, res)=>{
    const id = req.body.id;
    const regdNumber = req.body.regdNumber;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const standard = req.body.standard;
    const section = req.body.section;
    const fee_paid = req.body.fee_paid;
    const total_fees = req.body.total_fees;
    const attendance = req.body.attendance;
    const fee_status = req.body.fee_status;
    const school_regdNumber = req.body.school_regdNumber;

    if(req.session){
        connection.query(`insert into student values (?,?,?,?,?,?,?,?,?,?,?,(select school_regd_id from school_info where school_regd_id = ? ));`,
        [id, regdNumber,password, firstname, lastname, standard, section, fee_paid, total_fees, attendance,fee_status, school_regdNumber],
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

// Get All Students
router.get('/get-all-students', (req, res)=>{
    if(req.session){
        connection.query(`select * from student order by regdNumber`
        , (err, result)=>{
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
})

// Get Students who did not pay full fee
router.get('/get-all-students-unpaid', (req, res)=>{
    if(req.session){
        connection.query(`select * from student where fee_status = 'Not Paid' order by regdNumber`
        , (err, result)=>{
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

router.post('/get-student-by-class', (req, res)=>{
    const {standard, section} = req.body;
    if(req.session){
        connection.query(`select * from student where standard = ? and section = ?;`,
        [standard, section],(err, result)=>{
            if(err){
                res.send(err);
            }
            if(result){
                res.send(result);
            }
            else{
                res.send("Class Not Found");
            }
        })
    }
    else{
        res.send("School Logged Out")
    }
})


// Teacher Section

router.post('/add-teacher', (req, res)=>{
      const {id, regdNumber, firstname, lastname, subject, feedback_score, salary, school_regdNumber} = req.body;
      if(req.session){
        connection.query(`insert into teacher values (?,?,?,?,(select subject_name from subjects where subject_name = ?),?,?,(select school_regd_id from school_info where school_regd_id = ?))
        ;`, [id, regdNumber, firstname, lastname, subject, feedback_score, salary,school_regdNumber], (err, result)=>{
            if(err){
                res.send(err);
            }
            else{
                res.send(result);
            }
        })
      }
      else{
        res.send("Admin Logged Out");
      }
});


// Subject Section
router.post('/add-subjects', (req, res)=>{
    const id = req.body.id;
    const subject_name = req.body.subject_name;
    const subject_code = req.body.subject_code;
    const standard = req.body.standard;
    const school_regdNumber = req.body.school_regdNumber;
    if(req.session){
        connection.query(`insert into subjects values (?,?,?,?,(select school_regd_id from school_info where school_regd_id = ? ));`
        ,[id, subject_name, subject_code, standard,school_regdNumber],
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
        res.send("Admin Logged Out");
    }
});



// Inventory Section
router.post('/add-inventory', (req, res)=>{

});


// Account Section
router.post('/add-account-team', (req, res)=>{

})




module.exports = router;