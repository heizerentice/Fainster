import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getDetailPost } from '../../redux/actions/postAction'
import Load from '../../images/loading.gif' 
import PostDetail from '../../components/PostDetail'

const DetailPost = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { auth, detailPost } = useSelector(state => state)

    const [post, setPost] = useState([])

    useEffect(() => {
        dispatch(getDetailPost({detailPost, id, auth}))
        if(detailPost.length > 0)  {
            const newArray = detailPost.filter(post => post._id === id)
            setPost(newArray)
        }
    }, [dispatch, id, auth, detailPost])

    return (
        <div className='post'>
            {
                post.length === 0 
                &&
                <img src={Load} alt='Loading' className='d-block mx-auto my-4'/>
            }


            {
                post.map((item) => (
                    <PostDetail key={item._id} post={item} />
                ))
            }
            
        </div>
    )
}

export default DetailPost