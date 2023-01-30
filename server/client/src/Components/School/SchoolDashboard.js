import React, { useEffect, useState } from 'react'

function SchoolDashboard({name}) {
  // const [schoolData, setSchoolData] = useState({})
  // const school_name = (school_regd_id)=>{
  //   fetch(`http://localhost:2470/api/school/`+ school_regd_id)
  //   .then((res)=>res.json())
  //   .then((data)=>setSchoolData(data))
  //   .catch((err)=>console.log(err.message))
  // }

  // useEffect(()=>{
  //   school_name(schoolData);
  // }, []);
  return (
    <div className='school-dashboard'>
        <h1>You are Logged in {name}  </h1>
    </div>
  )
}

export default SchoolDashboard