import React from 'react'
import { useSelector} from 'react-redux'

const Carousel = ({images, id}) => {
    const { theme } = useSelector(state => state)
    const isActive = index => {
        if(index === 0)
            return 'active'
    }
    

    return (
        <div id={`images${id}`} className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                {
                    images.map((img, index) => (
                        <li 
                            key={index}
                            data-target={`#images${id}`} 
                            data-slide-to={index} 
                            className={isActive(index)}
                        />
                    ))
                }
            </ol>

            <div className="carousel-inner">
                {
                    images.map((img, index) => (
                        <div key={index} className={`carousel-item ${isActive(index)}`}>
                            <img 
                                className="d-block w-100" 
                                src={img.url} 
                                alt='slide' 
                                style={{filter: theme ? 'invert(1)' : 'invert(0)', width: '465px', height: '585px', borderRadius: '5px'}}
                            />
                        </div>
                    ))
                }
            </div>

            <a className="carousel-control-prev" href={`#images${id}`} role="button" data-slide="prev">
                <i className="fa-solid fa-angle-left" aria-hidden="true" style={{paddingTop: '4px'}}></i>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href={`#images${id}`}  role="button" data-slide="next">
                <i className="fa-solid fa-angle-right" aria-hidden="true" style={{paddingTop: '4px'}}></i>
                <span className="sr-only">Next</span>
            </a>
        </div>
    )
}

export default Carousel