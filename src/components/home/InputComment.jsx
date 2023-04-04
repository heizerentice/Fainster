import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Avatar from '../Avatar'
import { createComment } from '../../redux/actions/commentAction'

const InputComment = ({children, post, onReply, setOnReply}) => {
    const dispatch = useDispatch()
    const { auth } = useSelector(state => state)
    const [content, setContent] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!content.trim())
        {
            if(setOnReply)
                return 
            setOnReply(false)
            return
        }
        
        setContent('')

        const newComment = {
            content,
            likes: [],
            user: auth.user, 
            createdAt: new Date().toISOString(),
            reply: onReply && onReply.commentID,
            tag: onReply && onReply.user
        }

        dispatch(createComment({post, newComment, auth}))
    }

    return (
        <div className='type-comment-card'>
            <Avatar src={auth.user.avatar} size='medium-avatar'/>
            <form className="comment-input" onSubmit={handleSubmit}>
                {children}
                <input 
                    type="text" 
                    placeholder="Add a comment..."
                    value={content} 
                    onChange={e => setContent(e.target.value)}
                />
                <button type="submit" className="postBtn">
                    Post
                </button>
            </form>
        </div>
        
    )
}

export default InputComment