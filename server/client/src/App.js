import './App.css';
import React, { useState } from 'react';
import Navigation from './Components/NavigationAndFooter/Navigation';
import Footer from './Components/NavigationAndFooter/Footer';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';
import SchoolLogin from './Components/School/SchoolLogin';
import SchoolDashboard from './Components/School/SchoolDashboard';
import ManageStudent from './Components/School/ManageStudents/ManageStudent';
import AddStudent from './Components/School/ManageStudents/AddStudent';
import GetStudents from './Components/School/ManageStudents/GetStudents';
import UpdateStudent from './Components/School/ManageStudents/UpdateStudent';
import ManageTeacher from './Components/School/ManageTeachers/ManageTeacher';
import AddTeacher from './Components/School/ManageTeachers/AddTeacher';
function App() {
  const [school, setLoginSchool]= useState({});

  const auth = localStorage.getItem('school');
  const result = JSON.parse(auth)
  const schoolRegdNumber = result.school_regd_id

  
  return (
    <div className="App">
      <Navigation/>
      <Router>
        <Routes>
          <Route exact path='/' element={<HomePage/>}/>
          <Route exact path='/school-login' element=
          {<SchoolLogin setLoginSchool={setLoginSchool}/>}/>
          <Route exact path='/school-dashboard'
          element={schoolRegdNumber?<SchoolDashboard name={result.schoolname} />:<SchoolLogin setLoginSchool={setLoginSchool}/>}/>  
          <Route exact path='/manage-students' element={schoolRegdNumber? <ManageStudent schoolname={result.schoolname}/>: <SchoolLogin setLoginSchool={setLoginSchool}/>} />  
          <Route exact path='/get-students' element={schoolRegdNumber? <GetStudents/>: <SchoolLogin setLoginSchool={setLoginSchool}/>} />  
          <Route exact path='/add-student' element={schoolRegdNumber? <AddStudent school_regdNumber={result.school_regd_id}/>: <SchoolLogin setLoginSchool={setLoginSchool}/>} />  
          <Route exact path='/update-student' element={schoolRegdNumber? <UpdateStudent school_regdNumber={result.school_regd_id}/>: <SchoolLogin setLoginSchool={setLoginSchool}/>} />

          <Route exact path='/manage-teachers' element={schoolRegdNumber? <ManageTeacher schoolname={result.schoolname}/>: <SchoolLogin setLoginSchool={setLoginSchool}/>} />
          <Route exact path='/add-teacher' element={schoolRegdNumber? <AddTeacher school_regdNumber={result.school_regd_id}/>: <SchoolLogin setLoginSchool={setLoginSchool}/>} />

        </Routes>

      </Router>
      <Footer/>
    </div>
  );
}

export default App;
