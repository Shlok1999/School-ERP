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
                    res.status(200).send(result[0].school_regd_id);
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

// Go to Dashboard

router.get('/:school_regd_id', (req, res)=>{
    const school_regd_id = req.params.school_regd_id;
    if(req.session.loggedin){
        connection.query(`select schoolname from school_info where school_regd_id = ? ;`
        , [school_regd_id], (err, result)=>{
            if(err){
                res.send(err);
            }
            else{
                res.send("Hello "+school_regd_id );
            }
        })
    }
})



// Student Section
//  SCHOOL0011001
router.post('/:school_regd_id/add-student', (req, res)=>{
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

    if(req.session.loggedin){
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
router.get('/:school_regd_id/get-all-students', (req, res)=>{
    const school_regd_id = req.params.school_regd_id;
    if(req.session.loggedin){
        connection.query(`select * from student where school_regdNumber = ? order by regdNumber;`,[school_regd_id]
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
router.get('/:school_regd_id/get-all-students-unpaid', (req, res)=>{
    const school_regd_id = req.params.school_regd_id;
    if(req.session.loggedin){
        connection.query(`select * from student where school_regdNumber = ? and fee_status = 'Not Paid' order by regdNumber`
        ,[school_regd_id], (err, result)=>{
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

router.post('/:school_regd_id/get-student-by-class', (req, res)=>{
    const {standard, section} = req.body;
    const school_regd_id = req.params.school_regd_id;
    if(req.session.loggedin){
        connection.query(`select * from student where standard = ? and section = ? and school_regdNumber =?;`,
        [standard, section, school_regd_id],(err, result)=>{
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

router.post('/:school_regd_id/add-teacher', (req, res)=>{
      const {id, regdNumber, firstname, lastname, subject, feedback_score, salary, school_regdNumber} = req.body;
      
      if(req.session.loggedin){
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
router.post('/:school_regd_id/add-subjects', (req, res)=>{
    const id = req.body.id;
    const subject_name = req.body.subject_name;
    const subject_code = req.body.subject_code;
    const standard = req.body.standard;
    const school_regdNumber = req.body.school_regdNumber;
    if(req.session.loggedin){
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
router.post('/:school_regd_id/add-inventory', (req, res)=>{

});


// Account Section
router.post('/:school_regd_id/add-account-team', (req, res)=>{

})

router.post('/:school_regd_id/add-library-books', (req, res)=>{

})




module.exports = router;