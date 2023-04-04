import React, { useEffect, useState } from 'react'
import CommentCard from './CommentCard'

const CommentDisplay = ({comment, post, replyComment}) => {
    const [showRep, setShowRep] = useState([])
    const [next, setNext] = useState(1)

    useEffect(() => {
        setShowRep(replyComment.slice(replyComment.length - next))
    }, [replyComment, next])

    return (
        <div className='comment-display'>
            <CommentCard comment={comment} post={post} commentID={comment._id}>
                <div className='pl-4'>
                    {
                        showRep.map((item, index) => (
                            item.reply 
                            &&
                            <CommentCard 
                                key={index}
                                comment={item} 
                                post={post} 
                                commentID={comment._id}
                            />
                        ))
                    }

                    {
                        replyComment.length - next > 0 
                        ? 
                            <div 
                                className='p-1 text-muted ml-4' 
                                style={{cursor: 'pointer', fontSize: '14px'}}
                                onClick={() => setNext(replyComment.length)}
                            >
                                View replies ({replyComment.length})
                            </div>
                        : 
                            replyComment.length - 1 && replyComment.length > 0 &&
                            <div 
                                className='p-1 text-muted ml-4' 
                                style={{cursor: 'pointer', fontSize: '14px'}}
                                onClick={() => setNext(1)}
                            >
                                Hide replies
                            </div>
                    }
                </div>
            </CommentCard>
        </div>
    )
}

export default CommentDisplay