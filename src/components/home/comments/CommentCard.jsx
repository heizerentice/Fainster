import React, { useState, useEffect, useRef } from 'react'
import Avatar from '../../Avatar'
import LikeButton from '../../LikeButton'
import CommentMenu from './CommentMenu'
import InputComment from '../InputComment'
import { updateComment, likeComment, unlikeComment } from '../../../redux/actions/commentAction'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'

const CommentCard = ({children, comment, post, commentID}) => {
    const { auth } = useSelector(state => state)
    const inputRef = useRef()
    const dispatch = useDispatch()

    const [content, setContent] = useState('')
    const [readMore, setReadMore] = useState(false)
    const [isLike, setIsLike] = useState(false)
    const [loadLike, setLoadLike] = useState(false)

    const [onEdit, setOnEdit] = useState(false)
    const [onReply, setOnReply] = useState(false)
    
    useEffect(() => {
        setContent(comment.content)
        setIsLike(false)
        setOnReply(false)
        if(comment.likes.find(like => like._id === auth.user._id))
            setIsLike(true)
    }, [comment, auth.user._id])

    const styleCard = {
        opacity: comment._id  ? 1 : 0.5,
        pointerEvents: comment._id ? 'inherit' : 'none'
    }

    const handleLike = async () => {
        if(loadLike) return
        setIsLike(true)

        setLoadLike(true)
        await dispatch(likeComment({comment, post, auth}))
        setLoadLike(false)
    }

    const handleUnlike = async () => {
        if(loadLike) return
        setIsLike(false)

        setLoadLike(true)
        await dispatch(unlikeComment({comment, post, auth}))
        setLoadLike(false)
    }

    const handleUpdateComment = () => {
        inputRef.current.focus()
        if(comment.content !== content)
        {
            dispatch(updateComment({post, comment, content, auth}))
            setOnEdit(false)
        }
        else
            setOnEdit(false)
    }

    const handleReplyComment = () => {
        if(onReply) return setOnReply(false)
        setOnReply({...comment, commentID})
    }

    return (
        <div>
            <div className='comment-card mt-2' style={styleCard}>
                <div>
                    <Link to={`/profile/${comment.user._id}`} className='d-flex'>
                        <Avatar src={comment.user.avatar} size='small-avatar' />
                        <h6 className='mx-1'>{comment.user.username}</h6>
                    </Link>
                </div>

                <div className='comment-content'>
                    <div className='flex-fill'>
                        {
                            onEdit 
                            ? 
                                <input value={content} onChange={(e) => setContent(e.target.value)} ref={inputRef} />
                            :
                                <div className='comment-content-info'>
                                    {
                                        comment.tag && comment.tag._id === comment.user._id 
                                        &&
                                        <Link to={`/profile/${comment.tag._id}`} style={{paddingRight: '5px'}}>
                                            @{comment.tag.username}
                                        </Link>
                                    }
                                    <span> 
                                        {
                                            content.length < 100 
                                            ? 
                                                content 
                                            : 
                                                readMore ? content + ' ' : content.slice(0, 100) + '...'
                                        }
                                    </span>
                                    {
                                        content.length > 100 
                                        &&
                                        <span 
                                            className='read-more' 
                                            onClick={() => setReadMore(!readMore)}
                                        >
                                            { readMore ? 'Hide'  : 'more'}
                                        </span>
                                    }

                                    <LikeButton isLike={isLike} handleLike={handleLike} handleUnlike={handleUnlike} style={{float: 'right'}}/>
                                </div>
                        }
                        <div style={{cursor: 'pointer'}} className='d-flex'>
                            <div>
                                <small className='text-muted mr-3'>
                                    {moment(comment.createdAt).fromNow()}
                                </small>
                                {
                                    comment.likes.length > 0 
                                    &&
                                    <small className='text-muted mr-3'>
                                        {comment.likes.length} likes
                                    </small>
                                }
                                {
                                    onEdit 
                                    ? 
                                        <>
                                            <small className='text-muted mr-3' onClick={handleUpdateComment}>
                                                Update
                                            </small>
                                            <small className='text-muted mr-3' onClick={() => setOnEdit(false)}>
                                                Cancel
                                            </small>
                                        </>
                                    :
                                        <small className='text-muted mr-3' onClick={handleReplyComment}>
                                            {
                                                onReply ? 'Cancel' :'Reply'
                                            }
                                        </small>
                                }
                            </div>
                            <CommentMenu post={post} comment={comment} setOnEdit={setOnEdit}/>
                        </div>
                    </div>
                </div>
            </div>
            {
                onReply 
                &&
                <InputComment post={post} onReply={onReply} setOnReply={setOnReply}>
                    <Link to={`/profile/${onReply.user._id}`} className='mr-2'>
                        @{onReply.user.username} 
                    </Link>
                </InputComment>
            }        
            {children}            
        </div>
    )
}

export default CommentCard