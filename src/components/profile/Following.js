import React from 'react'
import UserCard from '../UserCard'
import FollowButton from '../FollowButton'
import { useSelector } from 'react-redux'

const Following = ({users, setShowFollowing}) => {
    const { auth } = useSelector(state => state)

    return (
        <div className='follow'>
            <div className='follow-box'>
                <h5 className='text-center'>Following</h5>
                <hr/>
                {
                    users.map(user => (
                        <UserCard 
                            key={user._id} 
                            user={user} 
                            setShowFollowers={setShowFollowing}
                        >
                            {
                                auth.user._id !== user._id && <FollowButton user={user} />
                            }
                        </UserCard>
                    ))
                }
                <h5 
                    className='close'
                    onClick={() => setShowFollowing(false)}
                >
                    &times;
                </h5>
            </div>
        </div>
    )
}

export default Following