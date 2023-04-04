import React from 'react'
import img from '../images/image.jpg'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PostThumb = ({posts, result}) => {
    const { theme } = useSelector(state => state)

    if(result === 0)
    {
        return (
            <div className='share-photos text-center'>
                <img src={img} alt='Image' />
                <h6> Share photos </h6>
            </div>
        )
    }

    return (
        <div className='post-thumb'>
            {
                posts.map(post => (
                    <Link key={post._id} to={`/post/${post._id}`}>
                        <div className='post-thumb-item'>
                            <img 
                                src={post.images[0].url} 
                                alt={post.images[0].url} 
                                style={{filter: theme ? 'invert(1)' : 'invert(0)'}}
                            />
                            <div className='post-thumb-menu'>
                                <i className="fa-solid fa-heart">
                                    <span style={{paddingLeft: '10px'}}>{post.likes.length}</span>
                                </i>
                                <i className="fa-solid fa-comment">
                                    <span style={{paddingLeft: '10px'}}>{post.comments.length}</span>
                                </i>
                            </div>
                        </div>
                    </Link>
                ))

            }
        </div>
    )
}

export default PostThumb