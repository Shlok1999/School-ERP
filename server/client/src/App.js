import './App.css';
import React, { useState, useEffect } from 'react';
import Navigation from './Components/NavigationAndFooter/Navigation';
import Footer from './Components/NavigationAndFooter/Footer';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';
import SchoolLogin from './Components/School/SchoolLogin';
import SchoolDashboard from './Components/School/SchoolDashboard';
import ManageStudent from './Components/School/ManageStudents/ManageStudent';
import AddStudent from './Components/School/ManageStudents/AddStudent';
import GetStudents from './Components/School/ManageStudents/GetStudents';
import { json } from 'body-parser';
function App() {
  const [school, setLoginSchool]= useState({});
  const auth = localStorage.getItem('school');
  const result = JSON.parse(auth);
  
  
  return (
    <div className="App">
      <Navigation/>
      <Router>
        <Routes>
          <Route exact path='/' element={<HomePage/>}/>
          <Route exact path='/school-login' element=
          {<SchoolLogin setLoginSchool={setLoginSchool}/>}/>
          <Route exact path='/school-dashboard'
          element={school&& school.id?<SchoolDashboard name={school.schoolname} />:<SchoolLogin setLoginSchool={setLoginSchool}/>}/>
          <Route exact path='/manage-students' element={<ManageStudent schoolname = {result.schoolname}/>}/>
          <Route exact path='/add-student' element={result?<AddStudent school_regdNumber={result.school_regd_id}/>:<HomePage/>}/>
          <Route exact path='/get-students' element={<GetStudents/>}/>

        </Routes>

      </Router>
      <Footer/>
    </div>
  );
}

export default App;
