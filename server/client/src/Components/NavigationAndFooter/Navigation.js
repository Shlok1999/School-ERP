import React from 'react'
import './Navigation.css'
function Navigation() {
  return (
    <div className='navigation-section'>
        <div className="navigation">
            <div className="logo">
                <h2>LOGO</h2>
            </div>
            <div className="links">
                <div className="link">Home</div>
                <div className="link">School Login</div>
                <div className="link">Teacher Login</div>
                <div className="link">Student Login</div>
            </div>
        </div>
    </div>
  )
}

export default Navigation