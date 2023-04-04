import React from 'react'
import Avatar from './Avatar'
import { Link } from 'react-router-dom'

const UserCard = ({children, user, handleClose, setShowFollowers, setShowFollowing}) => {
    const handleCloseAll = () => {
        if(handleClose)
            handleClose()
        if(setShowFollowers)
            setShowFollowers(false)
        if(setShowFollowing)
            setShowFollowing(false)
    }

    return (
        <div className='d-flex p-2 align-items-center justify-content-between users-card'>
            <div>
                <Link 
                    to={`/profile/${user._id}`} 
                    className= 'd-flex align-items-center'
                    onClick={handleCloseAll}
                >
                    <Avatar src={user.avatar} size='medium-avatar' />
                    <div className='ml-1 pl-2' style={{transform:'translateY(-2px)'}}>
                        <span className='d-block'>{user.username}</span>
                        <small style={{opacity: 0.5}}>{user.fullname}</small>
                    </div>
                </Link>
            </div>

            {children}
        </div>
    )
}

export default UserCard