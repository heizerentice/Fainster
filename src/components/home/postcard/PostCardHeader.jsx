import React from 'react'
import Avatar from '../../Avatar'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { GLOBALTYPES } from '../../../redux/actions/globalTypes'


const PostCardHeader = ({post}) => {
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()

    const handleEditPost = () => {
        dispatch({
            type: GLOBALTYPES.STATUS,
            payload: { ...post, onEdit: true }
        })
    }

    return (
        <div className='post-card-header' style={{ display: 'flex', justifyContent: 'space-between'}}>
            <div className='d-flex'>
                <Avatar src={post.user.avatar} size='medium-avatar' />

                <div className='post-card-name'>
                    <h6 className='m-0'>
                        <Link to={`/profile/${post.user._id}`} className='text-dark'>
                            {post.user.username}
                        </Link>
                    </h6>
                    <small className='text-muted'>
                        { moment(post.createdAt).fromNow() }
                    </small>
                </div>
            </div>

            <div className='nav-item dropdown'>
                <span 
                    className='material-icons' 
                    id='moreLink' 
                    data-toggle='dropdown'
                >
                    more_horiz
                </span>
                
                <div className='dropdown-menu text-center'>
                    {
                        auth.user._id === post.user._id &&
                        <>
                            <span 
                                className='dropdown-item'
                                style={{ 
                                    paddingBottom: '5px',
                                    fontWeight: 700,
                                    color: '#ED4956'
                                }}
                            >
                                Delete
                            </span>
                            <span 
                                className='dropdown-item'
                                style={{padding: '5px 0'}}
                                onClick={handleEditPost}
                            >
                                Edit
                            </span>
                        </>
                    }
                    <span className='dropdown-item'>
                        Copy link
                    </span>
                </div>
            </div>
        </div>
    )
}

export default PostCardHeader