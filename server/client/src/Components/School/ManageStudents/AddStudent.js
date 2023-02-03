import React, { useEffect, useState } from 'react'
import './ManageStudent.css'
import axios from 'axios'
function AddStudent({ school_regdNumber}) {



    const [student, setStudent] = useState({
        id: 0,
        regdNumber: "",
        password: "",
        firstname: "",
        lastname: "",
        standard: 0,
        section: "",
        fee_paid: 0,
        total_fees: 0,
        fee_status: "Paid",
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

        axios.post(`http://localhost:2470/api/school/${school_regdNumber}/add-student`, student)
        .then((res)=>{
            alert(res.data.messsage); 
            window.location.reload();
           
        })
        alert("Student Posted");
    }
    return (
        <div className='school-add-student-section'>
            <h1>Add Student</h1>
            <div className="add-student-form">
                <div className="login">
                    <h3>Student Form({school_regdNumber})</h3>
                    <form onSubmit={addStudent} className='login-form add-stud-form' method="post">
                        <input type="number" 
                            name="id" 
                            value={student.id}
                            onChange={handleChange} />
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
                        Standard
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

                        Fee Paid
                        <input required type="number"
                            placeholder='fee_paid'
                            name='fee_paid'
                            value={student.fee_paid}
                            onChange={handleChange} />

                        Total Fees
                        <input required type="number"
                            placeholder='total_fees'
                            name='total_fees'
                            value={student.total_fees}
                            onChange={handleChange} />

                        

                        <select value={student.fee_status} onChange={handleChange} required style={{ marginTop: '10px', height: '30px', marginBottom: '10px' }} name="fee_status" >
                            <option value="Paid">Paid</option>
                            <option value="Unpaid">Unpaid</option>
                            <option value="PartiallY paid">Partially Paid</option>
                        </select>
                        

                        <input  required type="text"
                            name='school_regdNumber'
                            value={student.school_regdNumber}
                            

                             />
                        <button style={{ height: '30px', backgroundColor: 'rgb(42,47,47)', color: 'white' }} type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddStudent