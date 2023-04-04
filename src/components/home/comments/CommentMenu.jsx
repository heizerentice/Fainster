import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteComment } from '../../../redux/actions/commentAction'

const CommentMenu = ({post, comment, setOnEdit}) => {
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()

    const handleDelete = () => {
        if(post.user._id === auth.user._id || comment.user._id === auth.user._id) {
            dispatch(deleteComment({post, auth, comment}))
        }
    }

    const MenuItem = () => {
        return (
            <>
                <div 
                    className='dropdown-item text-center'
                    onClick={() => setOnEdit(true)}
                >
                    <span>
                        Edit
                    </span>
                </div>
                <div className='dropdown-item text-center' onClick={handleDelete}>
                    <span style={{color: '#ed4956', fontWeight: 500}}>
                        Delete
                    </span>
                </div>  
            </>
        )
    }

    return (
        <div className='menu comment-menu'>
            {
                (post.user._id === auth.user._id || comment.user._id === auth.user._id)
                &&
                <div className='nav-item dropdown'>
                    <small style={{cursor: 'pointer'}} id='moreLink' data-toggle='dropdown' className='text-muted'>
                        <i className="fa-solid fa-ellipsis"></i>
                    </small>

                    <div className='dropdown-menu' aria-describedby='moreLink'>
                        {
                                post.user._id === auth.user._id
                            ?
                                ( comment.user._id === auth.user._id 
                                    ? 
                                        MenuItem() 
                                    : 
                                        <div className='dropdown-item text-center'>
                                            <span style={{color: '#ed4956', fontWeight: 500}}>
                                                Delete
                                            </span>
                                        </div>
                                )
                            :
                                comment.user._id === auth.user._id && MenuItem()
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default CommentMenu