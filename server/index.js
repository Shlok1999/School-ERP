const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors')

// Third Party API
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}));
require('dotenv').config();

require('./db/conn')

const port = process.env.PORT || 2470;


// Importing Router
const schoolRouter = require('./routes/school.router');
const adminRouter = require('./routes/admin.router');
const studentRouter = require('./routes/student.router');
const teacherRouter = require('./routes/teacher.router');


// Use Router
app.use('/api/admin', adminRouter);
app.use('/api/school', schoolRouter);
app.use('/api/student', studentRouter);
app.use('/api/teacher', teacherRouter);


app.listen(port, ()=>{
    console.log(`http://localhost:${port}`)
})