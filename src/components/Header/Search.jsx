import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDataAPI } from '../../utils/fetchData'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import UserCard from '../UserCard'
import LoadGif from '../../images/loading.gif'

const Search = () => {
    const [search, setSearch] = useState('')
    const [users, setUsers] = useState([])
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)

    useEffect(() => {
        if(search) {
            setLoad(true)
            getDataAPI(`Search?username=${search}`, auth.token)
            .then(res => setUsers(res.data.users))
            .then(setLoad(false))
            .catch(err => {
                dispatch({
                    type: GLOBALTYPES.ALERT,
                    payload: {error: err.response.data.message}
                })
            })
        }
        else {
            setUsers([])
        }
    }, [search, auth.token, dispatch])

    const handleClose = () => {
        setSearch('')
        setUsers([])
    }

    const handleSearch = async (e) => {
        e.preventDefault()
        if(!search) return

        try {
            setLoad(true)
            const res = await getDataAPI(`Search?username=${search}`, auth.token)
            setUsers(res.data.users)
            setLoad(false)
        } 
        catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {error: err.response.data.message}
            })
        }
    }

    return (
        <form className='search_form' onSubmit={handleSearch}>
            <input 
                type='text' 
                name='search' 
                value={search}
                id= 'search'
                onChange={e => setSearch(e.target.value.toLowerCase().replace(/ /g, ''))}
            />

            <div className='search_icon' style={{ opacity: search ? 0 : 0.3}}>
                <span className='material-icons' style={{fontSize: '15px'}}>search</span>
                <span style={{fontSize: '13px', paddingLeft: '2px'}}>Search</span>
            </div> 
            <div 
                className='close_search'
                style={{ opacity: users.length === 0 ? 0 : 1}}
                onClick= {handleClose}
            >   
                &times;
            </div>

            <button 
                type='submit'
                style={{display: 'none'}}
            >
                Search
            </button>
            {load && <img src={LoadGif} alt="Loading" className='loading'/>}

            <div className='users'>
                {
                    search && users.map(user => (
                        <UserCard  
                            key={user._id} 
                            user={user} 
                            handleClose = {handleClose}
                        />
                    ))
                }
            </div>
        </form>
    )
}

export default Search