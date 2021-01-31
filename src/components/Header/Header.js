import React from 'react'
import './Header.css'

function Header() {
    return (
        <header className='app-header'>
            <div className='app-logo'>
                <div className='app-logo_circle'>
                    <div className='app-logo_circle-inner'>
                    </div>
                </div>
            </div>
            <div className='app-header-info-container'>
                <h1 className='app-header_title'>STUDENTS by&nbsp;<a href='https://github.com/pornoiya' className='author'>@pornoiya</a></h1>
            </div>
        </header>)
}

export default Header