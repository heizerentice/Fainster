import React from 'react'
import { useSelector } from 'react-redux'
import PostCard from '../PostCard'

const Posts = () => {
    const { posts } = useSelector(state => state)

    return (
        <div className='posts'>
            {
                posts.posts.map(post => (
                    <PostCard key={post._id} post={post}/>
                ))
            }
        </div>
    )
}

export default Posts