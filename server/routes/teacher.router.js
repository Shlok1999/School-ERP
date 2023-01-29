const router = require('express').Router();
const session = require('express-session');

// Importing MYSQL
const connection = require('../db/conn');

router.use(session({
    secret: process.env.SECRET_KEY_3,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000 * 60 * 24
    }
}));

router.post('/login', (req, res) => {
    const { regdNumber, password } = req.body;
    if (regdNumber && password) {
        connection.query(`select * from teacher where regdNumber = ? and password = ?;`,
            [regdNumber, password], (err, result) => {
                if (err) {
                    res.send(err);
                }
                if (result) {
                    req.session.loggedin = true;
                    req.session.id = result[0].id;
                    req.session.userData = result[0];
                    res.status(200).send(req.session.userData.regdNumber);
                    console.log("Teacher Logged In");
                }
                else {
                    res.send("Invalid Credentials")
                }
            })
    }
    else {
        res.send("Invalid Credentials");
    }
})



// Visit Profile
router.get('/my-profile/:id', (req, res) => {
    const regdNumber = req.params.id;
    if (req.session.loggedin) {
        connection.query(`select * from teacher where regdNumber = ?;`, [regdNumber],
            (err, result) => {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(result);
                }
            })
    }
    else {
        res.send("Student Logged Out")
    }
});

// Edit Profile
router.put('/edit/:id', (req, res) => {
    const regdNumber = req.params.id;
    const { firstname, lastname, password } = req.body;
    if (req.session.loggedin) {
        connection.query(`update teacher set firstname=?, lastname = ?, password = ? where regdNumber = ? ;`,
            [firstname, lastname, password, regdNumber],
            (err, result) => {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(result);
                }
            })
    }
    else {
        res.send("Student Logged Out")
    }
});

router.post('/:student_id/add-attendance', (req, res) => {

    const regdNumber = req.params.student_id;
    const name = req.body.name;
    const subject = req.body.subject;
    const total_lectures = req.body.total_lectures;
    const lectures_attended = req.body.lectures_attended;

    if (req.session.loggedin) {
        connection.query(`insert into attendance values ((select regdNumber from student where regdNumber = ?),(select firstname from student where firstname = ?),(select subject_code from subjects where subject_code = ? ),?,?);`
        ,[regdNumber, name, subject, total_lectures, lectures_attended], 
        (err, result)=>{
            if(err){
                res.send(err);
            }
            else{
               res.send(result)
            }
            
        })
    } else {
        res.send("Teacher Logged Out");
    }
});

// Edit Student
router.put('/:student_id/attendance', (req, res)=>{
    const regdNumber = req.params.student_id;
    const {total_lectures, lectures_attended, school_code} = req.body;

    if(req.session.loggedin){
        connection.query(`update attendance set total_lectures=? and lectures_attended = ? where regdNumber=? and school_code = ?;`,
        [total_lectures, lectures_attended, regdNumber, school_code],
        (err, result)=>{
            if(err){
                res.send(err);
            }
            else{
                res.send(result);
            }
        })
    }

})

// See Notice Board
router.get('/:school_regd_id/notice_board', (req, res)=>{
    const school_regd_id = req.params.id;
    const id = req.body.id;
    if(req.session.loggedin){
        connection.query(`select * from notice_board where school_regd_id = ?;`,[school_regd_id],
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





module.exports = router;