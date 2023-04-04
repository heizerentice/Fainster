import React from 'react'

const Loading = () => {
    return (
        <div className='position-fixed w-100 h-100 text-center' style={{background: "#0008", zIndex: 10}}> 
            <div className='position-fixed w-100 h-100 container'
            style={{zIndex: 50}}    
            >
                <div className='loader'></div>
            </div>
        </div> 
    )
}

export default Loading