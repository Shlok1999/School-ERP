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
          <div className="dashboard"><a href="/manage-students">Manage Students</a> </div>
          <div className="dashboard">Manage Teachers</div>
          <div className="dashboard">Manage Subjects</div>
          <div className="dashboard">Notice Board</div>
          <div className="dashboard">Check Library Status</div>
          <div className="dashboard">Manage Inventory</div>

        </div>
    </div>
  )
}

export default SchoolDashboard