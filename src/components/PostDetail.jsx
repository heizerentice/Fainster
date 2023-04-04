import React from 'react'
import Header from './DetailPost/Header'
import Body from './DetailPost/Body'
import Footer from './DetailPost/Footer'

const PostDetail = ({post}) => {
    
    const isActive = index => {
        if(index === 0)
            return 'active'
    }

    return (
        <div className='post-detail'>
            <div className='detail-box'>
                <div className='img-box '>
                    <div id={`images${post._id}`} className="carousel" data-ride="carousel">
                        <ol className="carousel-indicators">
                            {
                                post.images.map((img, index) => (
                                    <li 
                                        key={index}
                                        data-target={`#images${post._id}`} 
                                        data-slide-to={index} 
                                        className={isActive(index)}
                                    />
                                ))
                            }
                        </ol>

                        <div className="carousel-inner">
                            {
                                post.images.map((img, index) => (
                                    <div key={index} className={`carousel-item ${isActive(index)}`}>
                                        <img 
                                            style={{width: '100%', height: '100%', border: '1px solid #DDDDDD'}}
                                            src={img.url} 
                                            alt='slide' 
                                        />
                                    </div>
                                ))
                            }
                        </div>

                        <a className="carousel-control-prev" href={`#images${post._id}`} role="button" data-slide="prev">
                            <i className="fa-solid fa-angle-left" aria-hidden="true" style={{paddingTop: '4px'}}></i>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href={`#images${post._id}`}  role="button" data-slide="next">
                            <i className="fa-solid fa-angle-right" aria-hidden="true" style={{paddingTop: '4px'}}></i>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
                <div className='post-info-box w-100'>
                    <Header post={post} />
                    <Body post={post} />
                    <Footer post={post} />
                </div>
            </div>
        </div>
    )
}

export default PostDetail