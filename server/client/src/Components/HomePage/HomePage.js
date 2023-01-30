import React from 'react'
import './HomePage.css'
function HomePage() {
    return (
        <div className='home-page-section'>
            <div className="header">
                <div className="header-heading">
                    <h1>Open Managed School Management System</h1>
                    <h3>All About Your School Database Management</h3>
                </div>

            </div>
            <hr />

            <div className="motto-section">
                <div className="motto-section-heading">
                    <h1>Our Mission and Values</h1>
                </div>

                <div className="motto-values">
                    <div className="motto-value">
                        <div className="title">User Friendly</div>
                        <div className="para">
                            Our application allows you to add 
                            and store all the infomation related to your
                            school and manages students, teacher and the 
                            attendance updates. 
                        </div>
                    </div>
                    <div className="motto-value">
                        <div className="title">Secured Data</div>
                        <div className="para">
                        Our application allows you to add 
                            and store all the infomation related to your
                            school and manages students, teacher and the 
                            attendance updates. 

                        </div>
                    </div>
                    <div className="motto-value">
                        <div className="title">User Friendly</div>
                        <div className="para">
                        Our application allows you to add 
                            and store all the infomation related to your
                            school and manages students, teacher and the 
                            attendance updates. 
                        </div>
                    </div>
                </div>

            </div>

            <div className="company">
                <div className="company-section-heading">
                    <h3>Powered By</h3>
                    <h1 style={{ fontWeight: '400' }}>Educate Skill & Work India</h1>
                    <p>HEALTH | EDUCATION |TECHNOLOGY</p>
                </div>
                <div className="company-section-image">
                    <img src={require('./NEW-PRACTIS.jpg')} alt="" />
                </div>
            </div>




        </div>
    )
}

export default HomePage