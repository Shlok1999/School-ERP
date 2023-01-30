import React, { useState } from 'react'
import './School.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
function SchoolLogin( {setLoginSchool}) {
    const navigate = useNavigate();

    const [school,setSchool] = useState({
        school_regd_id: "",
        password: ""
    });

    const handleChange = (e)=>{
        const {name, value}= e.target
        setSchool({
            ...school,
            [name]: value
        })
    }

    const login = (e)=>{
        e.preventDefault()
        const {school_regd_id, password} = school;
        axios.post(`http://localhost:2470/api/school/login`, school)
        .then((res)=>{
            alert(res.data.message)
            setLoginSchool(res.data.result)
            navigate('/school-dashboard')
            
        })
        .catch(()=>alert("Password Didnt match"))
        

    }

    
    return (
        <div className='school-login-section'>
            <div className="login">
                <h3>School Login Form</h3>
                <form onSubmit={login}  className='login-form' method="post">
                    <div className="regdNumber">
                        <input required name='school_regd_id' 
                        value={school.school_regd_id}
                        onChange={handleChange}
                        type="text" 
                        placeholder='School Registration Number' /> 
                        <br /> <br />
                    </div>
                    <div className="password">
                        <input required name='password' 
                        value={school.password}
                        onChange={handleChange}
                        type="password" 
                        placeholder='Password' /> <br />
                    </div> <br />

                    <button style={{ height: '30px', backgroundColor: 'rgb(42,47,47)', color: 'white' }} type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default SchoolLogin