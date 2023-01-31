import React, { useEffect, useState } from 'react'
import './ManageStudent.css'
import axios from 'axios'
function AddStudent({ school_regdNumber }) {

    

    const [student, setStudent] = useState({
        regdNumber: "",
        password: "",
        firstname: "",
        lastname: "",
        standard: [],
        section: "",
        fee_paid: [],
        total_fees: [],
        attendance: [],
        fee_status: [],
        unit_test_1_percent: 0,
        half_yearly_percent: 0,
        unit_test_2_percent: 0,
        final_exam_percent: 0,
        school_regdNumber: school_regdNumber
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setStudent({
            ...student,
            [name]: value
        })
    }

    const addStudent = (e) => {
        e.preventDefault();

        axios.post(`http://localhost:2470/api/school/${school_regdNumber}/add-student`)
    }
    return (
        <div className='school-add-student-section'>
            <h1>Add Student</h1>
            <div className="add-student-form">
                <div className="login">
                    <h3>Student Form({school_regdNumber})</h3>
                    <form onSubmit={addStudent} className='login-form add-stud-form' method="post">
                        <input required type="text"
                            placeholder='regdNumber'
                            name='regdNumber'
                            value={student.regdNumber}
                            onChange={handleChange} />

                        <input required type="password"
                            placeholder='Password'
                            name='password'
                            value={student.password}
                            onChange={handleChange} />

                        <input required type="text"
                            placeholder='firstname'
                            name='firstname'
                            value={student.firstname}
                            onChange={handleChange} />

                        <input required type="text"
                            placeholder='lastname'
                            name='lastname'
                            value={student.lastname}
                            onChange={handleChange} />

                        <input required type="number"
                            placeholder='standard'
                            name='standard'
                            value={student.standard}
                            onChange={handleChange} />

                        <input required type="text"
                            placeholder='section'
                            name='section'
                            value={student.section}
                            onChange={handleChange} />

                        <input required type="number"
                            placeholder='fee_paid'
                            name='fee_paid'
                            value={student.fee_paid}
                            onChange={handleChange} />

                        <input required type="number"
                            placeholder='total_fees'
                            name='total_fees'
                            value={student.total_fees}
                            onChange={handleChange} />

                        <input required type="number"
                            placeholder='attendance'
                            name='attendance'
                            value={student.attendance}
                            onChange={handleChange} />

                        <select required style={{ marginTop: '10px', height: '30px', marginBottom: '10px' }} name="fee_status" >
                            <option value="Paid">Paid</option>
                            <option value="Unpaid">Unpaid</option>
                            <option value="PartiallY paid">Partially Paid</option>
                        </select>
                        <input style={{display: 'none'}} required type="number"
                            placeholder='unit_test_1_percent'
                            name='unit_test_1_percent'
                            value={student.unit_test_1_percent}
                            onChange={handleChange} />

                        <input style={{display: 'none'}} required type="number"
                            placeholder='half_yearly_percent'
                            name='half_yearly_percent'
                            value={student.half_yearly_percent}
                            onChange={handleChange} />

                        <input style={{display: 'none'}} required type="number"
                            placeholder='unit_test_2_percent'
                            name='unit_test_2_percent'
                            value={student.unit_test_2_percent}
                            onChange={handleChange} />
                        
                        <input style={{display: 'none'}} required type="number"
                            placeholder='final_exam_percent'
                            name='final_exam_percent'
                            value={student.final_exam_percent}
                            onChange={handleChange} />
                        <button style={{ height: '30px', backgroundColor: 'rgb(42,47,47)', color: 'white' }} type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddStudent