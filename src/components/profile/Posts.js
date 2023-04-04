import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PostThumb from '../PostThumb'

const Posts = () => {
    const { id } = useParams()
    const { profile } = useSelector(state => state)

    const [posts, setPosts] = useState([])
    const [result, setResult] = useState(0)

    useEffect(() => {
        profile.posts.forEach(item => {
            if(item._id === id) {
                setPosts(item.posts)
                setResult(item.result)
            }
        });
    }, [profile.posts, id])

    return (
        <div>
            <PostThumb posts={posts} result={result} />
        </div>
    )
}

export default Posts