import React from 'react'
import Posts from '../components/home/Posts'
import { useSelector } from 'react-redux'
import loadIcon from '../images/loading.gif'

const Home = () => {
    const { posts } = useSelector(state => state)

    return (
      <div className='home row mx-0'>
          <div className='col-md-8'>
              {
                  posts.loading 
                  ? 
                    <img 
                      src={loadIcon} 
                      alt='loading' 
                      className='d-block mx-auto'
                      style={{width: '100px', height: '100px'}}
                    /> 
                  : 
                    posts.result === 0 ? <h2 className='text-center'>No Post</h2> : <Posts /> 

              }
          </div>
          <div className='col-md-4'></div>
      </div>
    )
}

export default Home