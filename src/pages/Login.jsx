import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import logo from '../images/fainster.png'
import fbImage from '../images/fb.png'
import '../styles/Login.css'
import { login } from '../redux/actions/authAction'
import { useDispatch, useSelector } from 'react-redux'


const Login = () => {
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory()

    const initialState = { email: '',  password: ''}
    const [userData, setUserData] = useState(initialState)
    const { email, password } = userData

    const [typePass, setTypePass] = useState(false )

    useEffect(() => {
      if(auth.token) 
        history.push('/')
    }, [auth.token, history])

    const handleChangeInput = (e) => {
      const { name, value } = e.target
      setUserData({...userData, [name]: value})
    }

    const handleSubmit = e => {
      e.preventDefault()
      dispatch(login(userData))
    }

    return (
      <div className='auth-page'>
          <form onSubmit={handleSubmit}>
            <img src={logo} alt='Logo' className='logo-web'/>
            <div className="form-group">
              <input 
                type="email" 
                className="form-control"
                id="inputEmail" 
                aria-describedby="emailHelp" 
                name='email'
                value={email}
                placeholder="Phone number, username or email address"
                onChange={handleChangeInput}
              />
            </div>
            <div className="form-group">
              <div className='pass'>
                <input 
                  type={typePass? "text" : "password"}
                  className="form-control" 
                  id="inputPassword" 
                  name="password"
                  value={password}
                  placeholder="Password"
                  style={{fontSize: '13px'}}
                  onChange={handleChangeInput}
                />
                <small onClick={() => setTypePass(!typePass)}>
                  {typePass? "Hide" : "Show"}
                </small>
              </div>
            </div>
            <button 
              type="submit" 
              className="btn btn-login"
              disabled = {email && password ? false : true}
            >
              Log in
            </button>
            <div className='lines-box'>
              <div className='line-1'></div>
              <div className='or-box'>OR</div>
              <div className='line-1'></div>
            </div>
            <div> 
              <button className='fb-login'>
                <img src={fbImage} alt='Facebook' className='fb-logo'/>
                <p className='fb-link'>Log in with Facebook</p>
              </button>
            </div>
            <button className='btn forgot-password'>Forgotten your password?</button> 
            <p className="my-2 btn-transf " style={{paddingLeft: '90px'}}>
              Don't have an account? <Link to="/Register" className='btn-transf-item'>Sign up</Link>
            </p>
          </form>
          
      </div>
    )
}

export default Login