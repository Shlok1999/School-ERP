import './App.css';
import React, { useState } from 'react';
import Navigation from './Components/NavigationAndFooter/Navigation';
import Footer from './Components/NavigationAndFooter/Footer';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';
import SchoolLogin from './Components/School/SchoolLogin';
import SchoolDashboard from './Components/School/SchoolDashboard';
function App() {
  const [school, setLoginSchool]= useState({});

  return (
    <div className="App">
      <Navigation/>
      <Router>
        <Routes>
          <Route exact path='/' element={<HomePage/>}/>
          <Route exact path='/school-login' element=
          {<SchoolLogin setLoginSchool={setLoginSchool}/>}/>
          <Route exact path='/school-dashboard'
          element={school&& school.id?<SchoolDashboard name={"VKV"} />:<SchoolLogin setLoginSchool={setLoginSchool}/>}/>
        </Routes>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
