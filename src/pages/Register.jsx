import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import logo from '../images/fainster.png'
import { register } from '../redux/actions/authAction'

const Register = () => {
    const { auth, alert } = useSelector(state => state)
    const history = useHistory()
    const dispatch = useDispatch()
    const initialState = { 
        fullname: '',
        username: '',
        email: '', 
        password: '',
        cf_password: '',
        gender: 'male'
    }
    const [userData, setUserData] = useState(initialState)
    const { fullname, username, email, password, cf_password } = userData
    const [typePass, setTypePass] = useState(false )
    const [typeCfPass, setTypeCfPass] = useState(false)

    const handleChangeInput = (e) => {
      const { name, value } = e.target
      setUserData({...userData, [name]: value})
    }

    const handleSubmit = e => {
      e.preventDefault()
      dispatch(register(userData))
    }

    useEffect(() => {
        if(auth.token) history.push('/')
    }, [auth.token, history])

    return (
      <div className='auth-page'>
          <form onSubmit={handleSubmit}>
            <img src={logo} alt='Logo' className='logo-web'/>
            <p className='signup-desc'>Sign up to see photos and videos from your friends</p>
            <div style={{paddingLeft: '80px'}}> 
              <button className='signup-side '>
                <i className="fa-brands fa-square-facebook"></i>
                <p className='fb-link-signup' style={{}}>Log in with Facebook</p>
              </button>
            </div>
            <div className='lines-box'>
              <div className='line-1'></div>
              <div className='or-box'>OR</div>
              <div className='line-1'></div>
            </div>
            <div className="form-group">
              <input 
                type="fullname" 
                className="form-control"
                id="fullname" 
                name='fullname'
                value={fullname}
                placeholder="Fullname"
                onChange={handleChangeInput}
                style={{border: `${alert.fullname ? '2px solid #EF3B4B' : ''}`}}
              />
              <small className="form-text text-danger">
                  {alert.fullname ? alert.fullname : ''}
              </small>
            </div>
            <div className="form-group">
              <input 
                type="username" 
                className="form-control"
                id="username" 
                name='username'
                value={username.toLowerCase().replace(/ /g, '')}
                placeholder="Username"
                style={{border: `${alert.username ? '2px solid #EF3B4B' : ''}`}}
                onChange={handleChangeInput}
              />
              <small className="form-text text-danger">
                  {alert.username ? alert.username : ''}
              </small>
            </div>
            <div className="form-group">
              <input 
                type="text" 
                className="form-control" 
                id="exampleInputEmail1" 
                name="email"
                onChange={handleChangeInput} 
                placeholder='Mobile number or email address'
                value={email}
                style={{border: `${alert.email ? '2px solid #EF3B4B' : ''}`}} 
              />    
              <small className="form-text text-danger">
                  {alert.email ? alert.email : ''}
              </small>
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
                  style={{border: `${alert.password ? '2px solid #EF3B4B' : ''}`}}
                  onChange={handleChangeInput}
                />
                <small onClick={() => setTypePass(!typePass)}>
                  {typePass? "Hide" : "Show"}
                </small>
              </div>
              <small className="form-text text-danger">
                  {alert.password ? alert.password : ''}
              </small>
            </div>
            <div className="form-group">
              <div className='pass'>
                <input 
                  type={typeCfPass? "text" : "password"}
                  className="form-control" 
                  id="inputCfPassword" 
                  name="cf_password"
                  value={cf_password}
                  placeholder="Confirm password"
                  style={{border: `${alert.cf_password ? '2px solid #EF3B4B' : ''}`}}
                  onChange={handleChangeInput}
                />
                <small onClick={() => setTypeCfPass(!typeCfPass)}>
                  {typeCfPass? "Hide" : "Show"}
                </small>
              </div>
              <small className="form-text text-danger">
                  {alert.cf_password ? alert.cf_password : ''}
              </small>
            </div>
            <div className='row justify-content-between mx-0 mb-1 gender-radio'>
              <label htmlFor='male'> 
                <input 
                  type='radio' 
                  name='gender' 
                  id='male' 
                  defaultChecked
                  value='male'
                  onChange={handleChangeInput}
                /> 
                Male
              </label>
              <label htmlFor='female'> 
                <input 
                  type='radio' 
                  name='gender' 
                  id='female' 
                  value='female'
                  onChange={handleChangeInput}
                /> 
                Female
              </label>
              <label htmlFor='other'> 
                <input 
                  type='radio' 
                  name='gender' 
                  id='other' 
                  value='other'
                  onChange={handleChangeInput}
                /> 
                Other
              </label>
            </div>
            <button 
              type="submit" 
              className="btn btn-login"
              disabled = {email && password ? false : true}
            >
              Sign up
            </button>
            <p className="my-2 btn-transf" style={{paddingLeft: '100px'}}>
              Have an account? <Link to="/Login" className='btn-transf-item'>Sign in</Link>
            </p>
          </form>
          
      </div>
    )
}

export default Register