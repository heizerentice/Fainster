import React, { useState, useEffect } from 'react'
import Send from '../../images/send.svg'
import LikeButton from '../LikeButton'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { likePost, unlikePost } from '../../redux/actions/postAction'
import InputComment from '../home/InputComment'

const Footer = ({post}) => {
    const dispatch = useDispatch()
    const { auth } = useSelector(state => state)

    const [isLike, setIsLike] = useState(false)
    const [loadLike, setLoadLike] = useState(false)

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
        <div className='post-info-menu' style={{flexGrow: '1'}}>
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
            <h6 style={{cursor: 'pointer', paddingLeft: '10px'}}>
                    {post.likes.length} likes
            </h6>

            <InputComment post={post}/>
        </div>
    )
}

export default Footer