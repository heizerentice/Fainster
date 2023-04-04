import React, { useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Link } from 'react-router-dom'
import { logout } from '../../redux/actions/authAction'
import Avatar from '../Avatar'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'

const Menu = () => {
    const navLinks = [
        {label: 'Home', icon: 'home', path: '/'},
        {label: 'Message', icon: 'near_me', path: '/Message'},
        {label: 'Discover', icon: 'explore', path: '/Discover'},
        {label: 'Notificatios', icon: 'notifications', path: '/Notify'},
    ]
    const [className, setClassName] = useState('material-icons-outlined')
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()
    const { pathname } = useLocation()

    const isActive = (pn) => {
        if(pn === pathname)
            return 'material-icons'
    }

    const handleSpanClick = () => {
        setClassName('material-icons')
    }

    return (
        <div className="menu">
            <ul className="navbar-nav">
                {
                    navLinks.map((link, index) => {
                        return (
                            <li className="nav-item px-2" key={index}>
                                <Link className="nav-link" to={link.path}>
                                    <span className={`material-icons-outlined ${isActive(link.path)}`}>
                                        {link.icon}
                                    </span>
                                </Link>
                            </li>
                        )
                    })
                }
                <li 
                    className="nav-item px-2"
                    onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })}
                >
                    <div className="nav-link" style={{cursor: 'pointer'}}>
                        <span 
                            className={className}
                            onClick={handleSpanClick}
                        >
                            add_box
                        </span>
                    </div>
                </li>
                <li className="nav-item dropdown nav-item-list">
                    <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" 
                        style={{color: 'black'}}>
                        <Avatar src={auth.user.avatar} size="small-avatar"/>
                    </span>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>Profile <i className="fa-regular fa-user" style={{paddingLeft: '97px'}}></i></Link>
                            <label htmlFor='theme' className="dropdown-item" style={{cursor: 'pointer'}}>
                                Switch apperance 
                                <i className="fa-regular fa-moon" style={{paddingLeft: '25px'}}></i>
                            </label>
                        <div className="dropdown-divider"></div>
                        <Link 
                            className="dropdown-item" 
                            to='/'
                            onClick={() => dispatch(logout())}
                        >
                            Log out 
                            <i className="fa-solid fa-arrow-right-from-bracket" style={{paddingLeft: '87px'}}></i>
                        </Link>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Menu