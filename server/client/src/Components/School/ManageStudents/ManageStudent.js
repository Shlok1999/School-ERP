import React from 'react'
import './ManageStudent.css'
function ManageStudent({schoolname}) {
  return (
    <div className='manage-students'>
        {schoolname}
        <div className="manage-student-header">
            <h2>Manage Students</h2>
        </div>

        <div className="manage-student-link">
            <div className="links">
                <div className="student-link"><a href="/get-students">Get Student</a></div>
                <div className="student-link"><a href="/add-student">Add Student</a></div>
                <div className="student-link"><a href="/update-student">Update Student</a></div>
                <div className="student-link"><a href="/remove-student">Remove Student</a></div>
            </div>
        </div>
    </div>
  )
}

export default ManageStudent