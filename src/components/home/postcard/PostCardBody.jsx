import React from 'react'
import Carousel from '../../Carousel'

const PostCardBody = ({post, theme}) => {
    return (
      <div 
        className='post-card-body'
        style={{
          filter: theme ? 'invert(1)' : 'invert(0)',
          color: theme ? 'white' : '#111',
        }}
      >
          {
            post.images.length > 0 && <Carousel images={post.images} id={post._id} />
          }
      </div>
    )
}

export default PostCardBody