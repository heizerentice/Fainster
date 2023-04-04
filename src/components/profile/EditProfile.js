import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import { checkImage } from '../../utils/imageUpload'
import { updateProfileUser } from '../../redux/actions/profileAction'

const EditProfile = ({ setOnEdit }) => {
    const initialState = {
        fullname: '', 
        username: '',
        mobile: '',
        website: '', 
        story: '', 
        gender: '', 
        email: ''
    }

    const [userData, setUserData] = useState(initialState)
    const { fullname, username, mobile, email, website, story, gender }  = userData

    const [avatar, setAvatar] = useState('')
    const { auth } = useSelector(state => state)

    const dispatch = useDispatch()

    useEffect(() => {
        setUserData(auth.user)
    }, [auth.user])

    const changeAvatar = (e) => {
        const file = e.target.files[0]

        const err = checkImage(file)
        if(err) return dispatch({
            type: GLOBALTYPES.ALERT, payload: {error: err}
        })
        setAvatar(file)
    }

    const handleInput = (e) => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateProfileUser({userData, avatar, auth}))
    }

    return (
        <div className='edit-profile'>
            <button     
                className='btn btn_close'
                onClick={() => setOnEdit(false)}
            >
                Cancel
            </button>

            <form onSubmit={handleSubmit}>
                <div className="info-avatar">
                    <img 
                        src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} 
                        alt="avatar"
                    />
                    <span>
                        <i className="fas fa-camera" />
                        <p>Change</p>
                        <input type="file" name="file" id="file-up"
                        accept="image/*" onChange={changeAvatar} />
                    </span>
                </div>
                <div className='form-group'>
                    <label htmlFor='fullname'>Name</label>
                    <div className='position-relative'>
                        <input 
                            type='text' 
                            className='form-control position-relative' 
                            id='fullname'
                            name='fullname'
                            value={fullname}
                            onChange={handleInput}
                        />
                        <p>Help people discover your account by using the name that you're known by: either your full name, nickname or business name.</p>
                    </div>
                </div>
                
                <div className='form-group'>
                    <label htmlFor='username'>Username</label>
                    <div className='position-relative'>
                        <input 
                            type='text' 
                            className='form-control' 
                            id='username'
                            name='username'
                            value={username}
                            onChange={handleInput}
                        />
                        <p>In most cases, you'll be able to change your username back to 28th.a_ for another 14 days</p>
                    </div>
                </div>
                <div className='form-group'>
                    <label htmlFor='story'>Bio</label>
                    <div className='position-relative'>
                        <textarea 
                            className='form-control' 
                            id='story'
                            name='story'
                            value={story}
                            cols='30'
                            rows='4'
                            style={{marginBottom: 'auto'}}
                            onChange={handleInput}
                        />
                        <small className="text-danger" style={{right: '2px'}}>{story.length}/200</small>
                    </div>
                </div>
                <div className='form-group'>
                    <label htmlFor='website'>Website</label>
                    <div>
                        <input 
                            type='text' 
                            className='form-control' 
                            id='website'
                            name='website'
                            value={website}
                            onChange={handleInput}
                        />
                        <h4 style={{color: '#8e8e8e', fontSize: '14px', paddingTop: '50px'}}>Personal Information</h4>
                        <p>Provide your personal information, even if the account is used for a business, pet or something else. This won't be part of your public profile</p>
                    </div>
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Email address</label>
                    <div>
                        <input 
                            type='email' 
                            className='form-control' 
                            id='email'
                            name='email'
                            value={email}
                            onChange={handleInput}
                        />
                    </div>
                </div>
                <div className='form-group'>
                    <label htmlFor='mobile'>Phone number</label>
                    <div>
                        <input 
                            type='text' 
                            className='form-control' 
                            id='mobile'
                            name='mobile'
                            value={mobile}
                            onChange={handleInput}
                        />
                    </div>
                </div>
                <div className='form-group'>
                    <label htmlFor='gender'>Gender</label>
                    <div className="input-group-prepend px-0 mb-4">
                        <select 
                            name="gender" 
                            id="gender" 
                            value={gender}
                            className="custom-select text-capitalize"
                            style={{color: '#262626'}}
                            onChange={handleInput}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
                <button 
                    className="btn btn-info" 
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default EditProfile