import axios from 'axios'
import React, { useState } from 'react'

function AddTeacher({school_regdNumber}) {
    const [teacher, setTeachers] = useState({
        id: 0,
        regdNumber: '',
        password: '',
        firstname: '',
        lastname: '',
        subject: '',
        feedback_score: 0,
        salary: 0,
        school_regdNumber: school_regdNumber
       })

    const handleChange = (e)=>{
        const {name, value} = e.target

        setTeachers({
            ...teacher,
            [name]: value
        })
    }

    const addTeacher = (e)=>{
        e.preventDefault();

        axios.post(`http://localhost:2470/api/school/${school_regdNumber}/add-teacher`, teacher)
            .then((res)=>{
                alert(res.data.message)
            })
    }



  return (
    <div className='add-teacher-section'>
        <div className="add-student-form">
                <div className="login">
                    <h3>Teacher Form({school_regdNumber})</h3>
                    <form onSubmit={addTeacher} className='login-form add-stud-form' method="post">
                        <input type="number" 
                            name="id" 
                            value={teacher.id}
                            onChange={handleChange} />
                        <input required type="text"
                            placeholder='regdNumber'
                            name='regdNumber'
                            value={teacher.regdNumber}
                            onChange={handleChange} />

                        <input required type="password"
                            placeholder='Password'
                            name='password'
                            value={teacher.password}
                            onChange={handleChange} />

                        <input required type="text"
                            placeholder='firstname'
                            name='firstname'
                            value={teacher.firstname}
                            onChange={handleChange} />

                        <input required type="text"
                            placeholder='lastname'
                            name='lastname'
                            value={teacher.lastname}
                            onChange={handleChange} />
                        Subject
                        <input required type="text"
                            placeholder='subject'
                            name='subject'
                            value={teacher.subject}
                            onChange={handleChange} />

                        <input required type="number"
                            placeholder='feedback_score'
                            name='feedback_score'
                            value={teacher.feedback_score}
                            onChange={handleChange} />

                        Salary
                        <input required type="number"
                            placeholder='salary'
                            name='salary'
                            value={teacher.salary}
                            onChange={handleChange} />

                        <input  required type="text"
                            name='school_regdNumber'
                            value={teacher.school_regdNumber}
                            onChange={school_regdNumber}
                            

                             />
                        <button style={{ height: '30px', backgroundColor: 'rgb(42,47,47)', color: 'white' }} type="submit">Submit</button>
                    </form>
                </div>
            </div>
    </div>
  )
}

export default AddTeacher