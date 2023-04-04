import { GLOBALTYPES } from "./globalTypes"
import { imageUpload} from '../../utils/imageUpload'
import { getDataAPI, postDataAPI, patchDataAPI } from '../../utils/fetchData'

export const POST_TYPES = {
    CREATE_POST: 'CREATE_POST',
    GET_POSTS: 'GET_POSTS',
    LOADING_POST: 'LOADING_POST', 
    UPDATE_POST: 'UPDATE_POST', 
    GET_DETAIL_POST: 'GET_DETAIL_POST'
}

export const createPost = ({content, images, auth}) => async (dispatch) => {
    let media = []
    try {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { loading: true }
        })
        if(images.length > 0)
            media = await imageUpload(images)
        
        const res = await postDataAPI('posts', { content, images: media }, auth.token)
        dispatch({ 
            type: POST_TYPES.CREATE_POST, 
            payload: { ...res.data.newPost, user: auth.user } 
        })

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { loading: false }
        })
    } 
    catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.message}
        })
    }
}

export const getPosts = (token) => async (dispatch) => {
    try {
        dispatch({
            type: POST_TYPES.LOADING_POST,
            payload: true
        })
        const res = await getDataAPI('posts', token)
        
        dispatch({
            type: POST_TYPES.GET_POSTS,
            payload: res.data
        })
        
        dispatch({
            type: POST_TYPES.LOADING_POST,
            payload: false
        })
    } 
    catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.message}
        })
    }
}

export const updatePost = ({content, images, auth, status}) => async (dispatch) => {
    let media = []
    const newImgUrl = images.filter(img => !img.url)
    const oldImgUrl = images.filter(img => img.url)

    if(status.content === content && newImgUrl.length === 0 & oldImgUrl.length === status.images.length)
        return

    try {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { loading: true }
        })

        if(newImgUrl.length > 0)
            media = await imageUpload(newImgUrl)

        const res = await patchDataAPI(`post/${status._id}`, { 
            content, images: [...oldImgUrl, ...media]
        }, auth.token)

        dispatch({ type: POST_TYPES.UPDATE_POST, payload: res.data.newPost })

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { success: res.data.message }
        })
    } 
    catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.message}
        })
    }
}

export const likePost = ({ post, auth }) => async (dispatch) => {
    const newPost = { ...post, likes: [...post.likes, auth.user]}
    dispatch({
        type: POST_TYPES.UPDATE_POST,
        payload: newPost
    })

    try {
        await patchDataAPI(`post/${post._id}/like`, null, auth.token)
    } 
    catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.message}
        })
    }
}

export const unlikePost = ({ post, auth }) => async (dispatch) => {
    const newPost = { ...post, likes: post.likes.filter(like => like._id !== auth.user._id)}

    dispatch({
        type: POST_TYPES.UPDATE_POST,
        payload: newPost
    })

    try {
        await patchDataAPI(`post/${post._id}/unlike`, null, auth.token)
    } 
    catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.message}
        })
    }
}

export const getDetailPost = ({detailPost, id, auth}) => async (dispatch) => {
    if(detailPost.every(post => post._id !== id))
    {
        try {
            const res = await getDataAPI(`post/${id}`, auth.token)
            dispatch({
                type: POST_TYPES.GET_DETAIL_POST,
                payload: res.data.post
            })
        } 
        catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {error: err.response.data.message}
            })
        }
    }
}