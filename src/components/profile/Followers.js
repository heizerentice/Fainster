import React from 'react'
import UserCard from '../UserCard'
import FollowButton from '../FollowButton'
import { useSelector } from 'react-redux'

const Followers = ({users, setShowFollowers}) => {
    const { auth } = useSelector(state => state)

    return (
        <div className='follow'>
            <div className='follow-box'>
                <h5 className='text-center'>Followers</h5>
                <hr/>
                {
                    users.map(user => (
                        <UserCard 
                            key={user._id} 
                            user={user} 
                            setShowFollowers={setShowFollowers}
                        >
                            {
                                auth.user._id !== user._id && <FollowButton user={user} />
                            }
                        </UserCard>
                    ))
                }
                <div 
                    className='close'
                    onClick={() => setShowFollowers(false)}
                >
                    &times;
                </div>
            </div>
        </div>
    )
}

export default Followers