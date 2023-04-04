import { combineReducers } from 'redux'
import auth from './authReducer'
import alert from './alertReducer'
import profile from './profileReducer'
import status from './statusReducer'
import posts from './postReducer'
import theme from './themeReducer'
import modal from './modalReducer'
import detailPost from './detailPostReducer'

export default combineReducers({
    auth, 
    alert,
    profile,
    status, 
    posts, 
    theme, 
    modal, 
    detailPost
})