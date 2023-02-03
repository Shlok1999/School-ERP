import React from 'react'
import schoolimg from './th.jpg'
function ManageTeacher({schoolname}) {
  return (
    <div className='manage-students'>
        <div className="school-header">
          <div className="school-name-title">
            <img src={schoolimg} alt="" />
          </div>
          <div className="school-name"><h3>{schoolname}</h3> </div>
        </div>
        <div className="manage-student-header">
            <h2>Manage Teachers</h2>
        </div>

        <div className="manage-student-link">
            <div className="links">
                <div className="student-link"><a href="/get-teacher">Get Teachers</a></div>
                <div className="student-link"><a href="/add-teacher">Add Teacher</a></div>
                <div className="student-link"><a href="/update-teacher">Update Teacher</a></div>
                <div className="student-link"><a href="/remove-teacher">Remove Teacher</a></div>
            </div>
        </div>
    </div>
  )
}

export default ManageTeacher