import React, { useState } from 'react'
import Avatar from '../Avatar'
import Comments from '../home/Comments'

const Body = ({post}) => {
    const [readMore, setReadMore] = useState(false)

    return (
        <div className='post-caption-box'>
            <Avatar src={post.user.avatar} size='medium-avatar'/>
            <span className='post-caption-box-name pl-3'>{post.user.username}</span>
            <span className='pl-1' style={{width: '75%'}}>
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

            <Comments post={post} />
        </div>
    )
}

export default Body