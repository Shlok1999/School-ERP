import React from 'react'
import './Navigation.css'
function Navigation() {
  return (
    <div className='navigation-section'>
        <div className="navigation">
            <div className="logo">
                {/* <img src={require('./NEW-PRACTIS.jpg')} alt="" /> */}
                LOGO
            </div>
            <div className="links">
                <div className="link"><a href="/">Home</a></div>
                <div className="link"><a href="/school-login">School Login</a></div>
                <div className="link"><a href="/">Teacher Login</a> </div>
                <div className="link"><a href="/">Student Login</a> </div>
            </div>
        </div>
    </div>
  )
}

export default Navigation