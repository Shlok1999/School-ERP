const router = require('express').Router();
const session = require('express-session');

// Importing MYSQL
const connection = require('../db/conn');

router.use(session({
    secret: process.env.SECRET_KEY_2,
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
                    res.status(200).send(req.session.userData.regdNumber);
                    console.log("Student Logged in")
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


// Visit Profile
router.get('/my-profile/:id', (req, res)=>{
    const regdNumber = req.params.id;
    if(req.session.loggedin){
        connection.query(`select * from student where regdNumber = ?;`,[regdNumber],
        (err,result)=>{
            if(err){
                res.send(err);
            }
            else{
                res.send(result);
            }
        })
    }
    else{
        res.send("Student Logged Out")
    }
});

// Edit Profile
router.put('/edit/:id', (req, res)=>{
    const regdNumber = req.params.id;
    const {firstname, lastname, password} = req.body;
    if(req.session.loggedin ){
        connection.query(`update student set firstname=?, lastname = ?, password = ? where regdNumber = ? ;`,
        [firstname, lastname, password, regdNumber],
        (err,result)=>{
            if(err){
                res.send(err);
            }
            else{
                res.send(result);
            }
        })
    }
    else{
        res.send("Student Logged Out")
    }
})
// First Unit Test Result
router.get('/:id/unit-test-1', (req, res)=>{
    const regdNumber = req.params.id;
    if(req.session.loggedin){
        connection.query(`select unit_test_1_percent from student where regdNumber = ?;`,
        [regdNumber], (err, result)=>{
            if(err){
                res.send(err);
            }
            else{
                res.send(result);
            }
        })
    }
    else{
        res.send("Student Logged Out")
    }
});

// Half Yearly Result
router.get('/:id/half-yearly', (req, res)=>{
    const regdNumber = req.params.id;
    if(req.session.loggedin){
        connection.query(`select half_yearly_percent from student where regdNumber = ?;`,
        [regdNumber], (err, result)=>{
            if(err){
                res.send(err);
            }
            else{
                res.send(result);
            }
        })
    }
    else{
        res.send("Student Logged Out")
    }
})

// Get 2nd Unit Test Result
router.get('/:id/unit_test_2', (req, res)=>{
    const regdNumber = req.params.id;
    if(req.session.loggedin){
        connection.query(`select unit_test_2_percent from student where regdNumber = ?;`,
        [regdNumber], (err, result)=>{
            if(err){
                res.send(err);
            }
            else{
                res.send(result);
            }
        })
    }
    else{
        res.send("Student Logged Out")
    }
})
// Get Final Result
router.get('/:id/final', (req, res)=>{
    const regdNumber = req.params.id;
    if(req.session.loggedin){
        connection.query(`select final_exam_percent from student where regdNumber = ?;`,
        [regdNumber], (err, result)=>{
            if(err){
                res.send(err);
            }
            else{
                res.send(result);
            }
        })
    }
    else{
        res.send("Student Logged Out")
    }
});

// Get My Attendance
router.get('/:regdNumber/get-my-attendance', (req, res)=>{
    const regdNumber = req.params.regdNumber
    if(req.session.loggedin){
        connection.query(`select lectures_attended, total_lectures from attendance where regdNumber = ?;`
        ,[regdNumber], (err, result)=>{
            if(err){
                res.send(err)
            }
            else{
                res.send(result);
            }
        })
    }
})






module.exports = router;