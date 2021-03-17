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
                <p className='app-header_title'>STUDENTS
                    <span className={'app-header_title__particle'}>by</span>
                    <a href='https://github.com/pornoiya' className='author'>pornoiya</a></p>
            </div>
        </header>)
}

export default Header