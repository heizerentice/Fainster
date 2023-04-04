import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/fainster1.png'
import Menu from './Menu'
import Search from './Search'


const Header = () => {
    return (
        <div className='header '>
            <nav className="navbar navbar-expand-lg justify-content-between align-middle" style={{backgroundColor: '#fffff'}}>
                <Link 
                    className="/" 
                    to="/"
                    onClick={() => window.scrollTo({top: 0})}
                >
                    <img src={logo} alt='logo'/>
                </Link>
                <Search />
                <Menu />            
            </nav>
        </div>
        
    )
}

export default Header