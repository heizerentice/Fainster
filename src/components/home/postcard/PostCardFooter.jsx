import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Send from '../../../images/send.svg'
import LikeButton from '../../LikeButton'
import { useDispatch, useSelector } from 'react-redux'
import { likePost, unlikePost } from '../../../redux/actions/postAction'

const PostCardFooter = ({post, theme}) => {
    const [readMore, setReadMore] = useState(false)  
    const [isLike, setIsLike] = useState(false)
    const [loadLike, setLoadLike] = useState(false)
    const dispatch = useDispatch()
    const { auth } = useSelector(state => state)

    const handleLike = async () => {
        if(loadLike) return
        setIsLike(true)
        setLoadLike(true)
        await dispatch(likePost({post, auth}))
        setLoadLike(false)
    }

    const handleUnlike = async () => {
        if(loadLike) return
        setIsLike(false)
        setLoadLike(true)
        await dispatch(unlikePost({post, auth}))
        setLoadLike(false)
    }

    useEffect(() => {
        if(post.likes.find(like => like._id === auth.user._id))
            setIsLike(true)
    }, [post.likes, auth.user._id])

    return (
        <div className='post-card-footer'>
            <div className='card-footer-menu'>
                <div>
                    <LikeButton isLike={isLike} handleLike={handleLike} handleUnlike={handleUnlike}/>

                    <Link to={`/post/${post._id}`} className='text-dark'>
                        <i className="fa-regular fa-comment"></i>
                    </Link>

                    <img src={Send} alt='Send'/>
                </div>
                
                <i className="fa-regular fa-bookmark"></i>
            </div>

            <div className='d-flex justify-content-between'>
                <h6 style={{cursor: 'pointer', paddingLeft: '10px'}}>
                    {post.likes.length} likes
                </h6>
                <h6 style={{cursor: 'pointer'}}>
                    {post.comments.length} comments
                </h6>
            </div>

            <div 
                className='post-card-content'
                style={{
                    filter: theme ? 'invert(1)' : 'invert(0)',
                    color: theme ? 'white' : '#111',
                }}
            >
                <span className='post-card-content-name'>{post.user.username}</span>
                <span className='post-card-caption'>
                    {
                        post.content.length < 60 
                        ? 
                        post.content 
                        : 
                        readMore ? post.content + ' ' : post.content.slice(0, 60) + '...'
                    }
                </span>
                {
                    post.content.length > 60 
                    && 
                    <span 
                        className='read-more' 
                        onClick={() => setReadMore(!readMore)}
                    >
                        {readMore ? 'Hide' : 'more'}
                    </span>
                }
            </div>

            
        </div>
    )
}

export default PostCardFooter