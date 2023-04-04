import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProfileUsers } from '../../redux/actions/profileAction'
import Info from '../../components/profile/Info'
import Posts from '../../components/profile/Posts'
import LoadIcon from '../../images/loading.gif'


const Profile = () => {
    const { auth, profile } = useSelector(state => state)
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        if(profile.ids.every(item => item !== id))
            dispatch(getProfileUsers({id, auth}))
    }, [id, auth, profile.ids, dispatch])

    return (
        <div className='profile'>
            <Info />
            {
                    profile.loading 
                ? 
                    <img className='d-block mx-auto my-4' src={LoadIcon} alt='Loading' style={{textAlign: 'center', width: '100px', height: '100px'}}/> 
                : 
                    <Posts />
            }
        </div>
    )
}

export default Profile