import { GLOBALTYPES, EditData, DelData } from './globalTypes'
import { POST_TYPES} from './postAction'
import { postDataAPI, patchDataAPI, deleteDataAPI } from '../../utils/fetchData'

export const createComment = ({post, newComment, auth}) => async (dispatch) => {
    const newPost = {...post, comments: [...post.comments, newComment]}
    
    dispatch({
        type: POST_TYPES.UPDATE_POST,
        payload: newPost
    })

    try {
        const data = { ...newComment, postID: post._id, postUserID: post.user._id}
        const res = await postDataAPI('comment', data, auth.token)
        
        const newData = { ...res.data.newComment, user: auth.user}
        const newPost = {...post, comments: [...post.comments, newData]}

        dispatch({
            type: POST_TYPES.UPDATE_POST,
            payload: newPost
        })
    } 
    catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.message }
        })
    }
}

export const updateComment = ({post, comment, content, auth}) => async (dispatch) => {
    const newComments = EditData(post.comments, comment._id, {...comment, content})
    const newPost = {...post, comments: newComments}
    
    dispatch({
        type: POST_TYPES.UPDATE_POST,
        payload: newPost
    })
    try {
        patchDataAPI(`comment/${comment._id}`, {content}, auth.token)
    } 
    catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.message }
        })
    }
}

export const likeComment = ({post, comment, auth}) => async (dispatch) => {
    const newComment = { ...comment, likes: [...comment.likes, auth.user]}
    const newComments = EditData(post.comments, comment._id, newComment)
    const newPost = {...post, comments: newComments}
    
    dispatch({
        type: POST_TYPES.UPDATE_POST,
        payload: newPost
    })

    try {
        await patchDataAPI(`comment/${comment._id}/like`, null, auth.token)
    } 
    catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.message }
        })
    }
}

export const unlikeComment = ({post, comment, auth}) => async (dispatch) => {
    const newComment = { ...comment, likes: DelData(comment.likes, auth.user._id)}
    const newComments = EditData(post.comments, comment._id, newComment)
    const newPost = {...post, comments: newComments}
    
    dispatch({
        type: POST_TYPES.UPDATE_POST,
        payload: newPost
    })

    try {
        await patchDataAPI(`comment/${comment._id}/unlike`, null, auth.token)
    } 
    catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.message }
        })
    }
}

export const deleteComment = ({post, comment, auth}) => async (dispatch) => {
    const delComment = [...post.comments.filter(cmt => cmt.reply === comment._id), comment]
    const newPost = {
        ...post, 
        comments: post.comments.filter(cmt => !delComment.find(data => cmt._id === data._id))
    }
    
    dispatch({
        type: POST_TYPES.UPDATE_POST,
        payload: newPost
    })

    try {
        delComment.forEach(item => {
            deleteDataAPI(`comment/${item._id}`, auth.token)
        })
    } 
    catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: err.response.data.message }
        })
    }
}