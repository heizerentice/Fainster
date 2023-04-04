import React, { useState, useEffect } from 'react'
import CommentDisplay from './comments/CommentDisplay'

const Comments = ({post}) => {
    const [comments, setComments] = useState([])
    const [showComments, setShowComments] = useState([])
    const [next, setNext] = useState(1)
    const [replyComment, setReplyComment] = useState([])

    useEffect(() => {
        const newReply = post.comments.filter(cmt => cmt.reply)
        setReplyComment(newReply)
    }, [post.comments])

    useEffect(() => {
        const newComment = post.comments.filter(cmt => !cmt.reply)
        setComments(newComment)
        setShowComments(newComment.slice(newComment.length - next))
    }, [post.comments, next])

    return (
        <div >
            {
                showComments.map((comment, index) => (
                    <CommentDisplay 
                        key={index} 
                        comment={comment} 
                        post={post} 
                        replyComment={replyComment.filter(item => item.reply === comment._id)}
                    />
                ))
            }

            {
                comments.length - next > 0 
                ? 
                    <div 
                        className='p-1 text-muted ml-4' 
                        style={{cursor: 'pointer', fontSize: '14px'}}
                        onClick={() => setNext(comments.length)}
                    >
                        View all {comments.length} comments
                    </div>
                : 
                    comments.length - 1 && comments.length > 0 &&
                    <div 
                        className='p-1 text-muted ml-4' 
                        style={{cursor: 'pointer', fontSize: '14px'}}
                        onClick={() => setNext(1)}
                    >
                        Hide comments
                    </div>
            }
        </div>
    )
}

export default Comments