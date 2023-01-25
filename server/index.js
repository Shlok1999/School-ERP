const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

require('./db/conn')

const port = process.env.PORT || 2470;

app.listen(port, ()=>{
    console.log(`http://localhost:${port}`)
})