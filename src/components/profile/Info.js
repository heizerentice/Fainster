import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '../Avatar'
import EditProfile from './EditProfile'
import FollowButton from '../FollowButton'
import Followers from './Followers'
import Following from './Following'

const Info = () => {
    const { id } = useParams()
    const { auth, profile } = useSelector(state => state)
    const dispatch = useDispatch()

    const [userData, setUserData] = useState([])
    const [onEdit, setOnEdit] = useState(false)
    const [showFollowers, setShowFollowers] = useState(false)
    const [showFollowing, setShowFollowing] = useState(false)
    
    useEffect(() => {
        if(id === auth.user._id) {
            setUserData([auth.user])
        }
        else {
            
            const newData = profile.users.filter(user => user._id === id)
            setUserData(newData)
        }
    }, [id, auth, dispatch, profile.users])

    return (
        <div className='info'>
            {
                userData.map(user => (
                    <div className="info_container" key={user._id}>
                        <Avatar src={user.avatar} size="super-avatar" />

                        <div className='info_content'>
                            <div className='info_content_title'>
                                <h2>{user.username}</h2>
                                {
                                    user._id === auth.user._id
                                    ? 
                                    <button 
                                        className='btn btn-global'
                                        onClick={() => setOnEdit(true)}
                                        style={{marginLeft: '20px'}}
                                    >
                                        Edit Profile
                                    </button>
                                    : 
                                    <FollowButton user={user}/>
                                }
                            </div>
                            <div className='follow_btn'>
                                {/* <span className='mr-4'>
                                    <span>{profile.posts.length}</span> posts
                                </span> */}
                                <span 
                                    className='mr-4'
                                    onClick={() => setShowFollowers(true)}
                                >
                                    <span>{user.followers.length}</span> followers
                                </span>
                                <span 
                                    className='ml-4'
                                    onClick={() => setShowFollowing(true)}
                                >
                                    <span>{user.following.length}</span> following
                                </span>
                            </div>
                            <div className='info_content_bio'>
                                <h6>{user.fullname}</h6>
                                <p>{user.story}</p>
                                <a 
                                    href={user.website} 
                                    target='_blank' 
                                    rel="noreferrer"
                                    style={{color: '#00376B', fontSize: '14px', fontWeight: 600}}
                                >
                                    {user.website}
                                </a>
                            </div>
                            
                        </div>

                        {
                            onEdit && <EditProfile setOnEdit={setOnEdit} />
                        }

                        {
                            showFollowers && <Followers users={user.followers} setShowFollowers={setShowFollowers} />
                        }

                        {
                            showFollowing && <Following users={user.following} setShowFollowing={setShowFollowing}/>
                        }
                    </div>
                ))  
            }
        </div>    
    )
}

export default Info