import React from 'react'
import PostCardHeader from './home/postcard/PostCardHeader'
import PostCardBody from './home/postcard/PostCardBody'
import PostCardFooter from './home/postcard/PostCardFooter'
import Comments from './home/Comments'
import InputComment from './home/InputComment'

const PostCard = ({post}) => {
    return (
        <div className='card my-3' style={{ border: 'none'}}>
            <PostCardHeader post={post}/>
            <PostCardBody post={post}/>
            <PostCardFooter post={post}/>

            <Comments post={post}/>
            <InputComment post={post}/>
        </div>
    )
}

export default PostCard