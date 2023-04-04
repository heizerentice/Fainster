import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GLOBALTYPES } from '../redux/actions/globalTypes'
import img from '../images/image.jpg'
import Avatar from './Avatar'
import { createPost, updatePost } from '../redux/actions/postAction'

const StatusModal = () => {
    const { auth, theme, status } = useSelector(state => state)
    const dispatch = useDispatch()
    const [content, setContent] = useState('')
    const [images, setImages] = useState([])
    const [tracks, setTracks] = useState('')

    const handleChangeImages = e => {
        const files = [...e.target.files]
        let error = ''
        let newImages = []

        files.forEach(file => {
            if(!file)
                return error = 'File does not exist'
            if(file.type !== 'image/jpg' && file.type !== 'image/png' && file.type !== 'image/jpeg')
                return error = 'Image format is incorrect'
            
            return newImages.push(file)
        })

        if(error)
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: error }
            })
        
        setImages([...images, ...newImages])
    }

    const deleteImage = (index) => {
        const newImages = [...images]
        newImages.splice(index, 1)
        setImages(newImages)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(images.length === 0)
            return dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {error: 'Please add photo'}
            })
        
        if(status.onEdit)
            dispatch(updatePost({content, images, auth, status}))
        else
            dispatch(createPost({content, images, auth}))
        
        setContent('')
        setImages([])
        if(tracks) 
            tracks.stop()
        dispatch({
            type: GLOBALTYPES.STATUS,
            payload: false
        })
    }

    useEffect(() => {
        if(status.onEdit)
        {
            setContent(status.content)
            setImages(status.images)
        }
    }, [status])

    return (
        <div className='status-modal'>
            <span 
                className='status-close' 
                onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: false })} 
            >&times;</span>
            <form onSubmit={handleSubmit}>
                <div className='status-header d-flex'>
                    <h5 className='m-0'>Create new post</h5>
                    <button className='btn-status' type='submit'>Share</button>
                </div>
                <hr />
                <div className='status-container'>
                    <div className='input-images'>
                        <img src={img} alt='img' style={{marginLeft: '110px'}}/>
                        <h6 className='text-center'>Drag photos or videos here</h6>
                        <div className='upload-img'> 
                            <i className="fa-solid fa-camera"></i>
                            <div className='file-upload'>
                                <i className="fa-solid fa-images"></i>
                                <input 
                                    type='file' 
                                    name='file' 
                                    id='file' 
                                    multiple 
                                    accept='image/*'
                                    onChange={handleChangeImages}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='status-caption position-relative'>
                        <textarea 
                            name="content" 
                            value={content}
                            placeholder='Write a caption'
                            onChange={e => setContent(e.target.value)}
                            style={{
                                filter: theme ? 'invert(1)' : 'invert(0)',
                                color: theme ? 'white' : '#111',
                                background: theme ? 'rgba(0,0,0,.03)' : '',
                            }} 
                        />

                        <div className='show-images'>
                            {
                                images.map((img, index) => (
                                    <div key={index} id='file-img'>
                                        <img 
                                            src={ img.url? img.url : URL.createObjectURL(img) }
                                            className='img-thumbnail'
                                            alt='img'
                                            style={{filter: theme ? 'invert(1)' : 'invert(0)'}}
                                        />
                                        <div 
                                            className='text-center'
                                            onClick={() => deleteImage(index)}
                                        >&times;</div>
                                    </div>
                                ))
                            }
                        </div>

                        <div className='status-info d-flex'>
                            <Avatar src={auth.user.avatar} size='medium-avatar'/>
                            <span className='ml-3 pt-0'>{auth.user.username}</span>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default StatusModal