import React, { useEffect, useState } from 'react'
import second from './School.css'
const manage = require('./mission.png')
const values = require('./school.png')
const schoollogo = require('./th.jpg')
function SchoolDashboard({name}) {


  return (
    <div className='school-dashboard'>
        <div className="school-header">
          <div className="school-name-title">
            <img src={schoollogo} alt="" />
          </div>
          <div className="school-name"><h3>{name}</h3> </div>
        </div>
        <div className="school-dashboard-sections">
          <div className="dashboard"><a href="/manage-students">Manage Students</a></div>
          <div className="dashboard"><a href="/manage-teachers">Manage Teachers</a></div>
          <div className="dashboard"><a href="/manage-subjects">Manage Subjects</a></div>
          <div className="dashboard"><a href="/manage-notice">Notice Board</a></div>
          <div className="dashboard"><a href="/manage-library">Check Library Status</a></div>
          <div className="dashboard"><a href="/manage-inventory">Manage Inventory</a></div>

        </div>
    </div>
  )
}

export default SchoolDashboard