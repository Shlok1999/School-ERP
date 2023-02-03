import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './ManageStudent.css'
function GetStudents() {
  const schoolInfo = localStorage.getItem('school');
  const schoolID = JSON.parse(schoolInfo);
  const results = schoolID.school_regd_id;

  const [standard, setStandard] = useState(0);
  const [section, setSection] = useState("");
  const [students, setStudents] = useState([]);

  const getStudentData = async (e) => {
    e.preventDefault();
    const response = fetch(`http://localhost:2470/api/school/${results}/get-student-by-class`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        standard, section
      })
    })
      .then((res) => res.json())
      .then((res) => {
        setStudents(res.result)
        console.log(res.result)
      })
    // .then((res)=>setStudents(res.result))
  };


  useEffect(() => {
    getStudentData()
  }, []);



  return (
    <>
      <div className="get-student-section">
        <div className='get-students'>
          <div className="form-get-student">
            <form className='get-student-form' onSubmit={getStudentData} method="post">
              <label style={{ textAlign: 'left' }}>Standard</label><br />
              <input type="number" max={12} min={1} name='standard' value={standard} onChange={(e) => setStandard(e.target.value)} /> <br />
              <label style={{ textAlign: 'left' }}>Section</label><br />
              <input type="text" name='section' value={section} onChange={(e) => setSection(e.target.value)} /> <br />
              <input style={{ display: 'none' }} type="text" name='school_regd_id' readOnly value={results} /> <br />
              <button type='submit'>Get Data</button>
            </form>
          </div>

        </div>

        {/* <table>
        <thead>
          <tr> 
            <td>S.No</td>
            <td>Registration Number</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Fee Status</td>
          </tr>
        </thead>

        <tbody>
          {
            students.map((student, i) => {
              return (
                <tr>
                  <td style={{textAlign: 'left'}}>{i+1}</td>
                  <td style={{textAlign: 'left'}}>{student.regdNumber}</td>
                  <td style={{textAlign: 'left'}}>{student.firstname}</td>
                  <td style={{textAlign: 'left'}}>{student.lastname}</td>
                  <td style={{textAlign: 'left'}}>{student.fee_status}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table> */}

        <div className='student-list'>
          <div className="student-list-cards">
            {
              students.map((student, i) => {
                return (
                  <div className='student-card'>
                    <div className="student-card-header">
                      <div className="Sno">{i+1}</div>
                      <div className="regdNumber">{student.regdNumber}</div>
                    </div>
                    <div className="student-mid">
                      <div className="img">
                        <img src={require('./th.jpg')} height={'40px'} alt="" />
                      </div>
                      <div className="name">{student.firstname+' '+ student.lastname}</div>
                    </div>
                    <div className="school-info">
                      <div className="schoolno">{student.school_regdNumber}</div>
                      <div className="fee-status">{student.fee_status}</div>
                    </div>
                    <div className="button-get">
                    <button style={{backgroundColor: 'rgb(94, 94, 255);'}} className='edit-student-info'>Edit Info</button>

                    </div>

                  </div>
                )
              })
            }
          </div>
        </div>






      </div>


    </>
  )
}

export default GetStudents