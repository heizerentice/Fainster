import React from 'react'
import { useSelector } from 'react-redux'

const LikeButton = ({ isLike, handleLike, handleUnlike }) => {
    const { theme } = useSelector(state => state)

    return (
        <>
            {
                isLike 
                ? 
                    <i 
                        className="fa-solid fa-heart" 
                        onClick={handleUnlike}    
                        style={{ color: '#FF3040', filter: theme ? 'invert(1)' : 'invert(0)', cursor: 'pointer'}}
                    />
                : 
                    <i 
                        className="fa-regular fa-heart" 
                        onClick={handleLike}
                        style={{cursor: 'pointer'}}
                    />
            }
        </>
    )
}

export default LikeButton