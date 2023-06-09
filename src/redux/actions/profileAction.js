import { GLOBALTYPES, DelData } from './globalTypes'
import { getDataAPI, patchDataAPI } from '../../utils/fetchData'
import { imageUpload } from '../../utils/imageUpload'


export const PROFILE_TYPES = {
    LOADING: 'LOADING',
    GET_USER: 'GET_USER',
    FOLLOW: 'FOLLOW',
    UNFOLLOW: 'UNFOLLOW',
    GET_PROFILE: 'GET_PROFILE',
    GET_USER_POSTS: 'GET_USER_POSTS'
}

export const getProfileUsers = ({ id, auth }) => async (dispatch) => {
    dispatch({
        type: PROFILE_TYPES.GET_PROFILE,
        payload: id
    })

    try {
        dispatch({
            type: PROFILE_TYPES.LOADING,
            payload: true
        })
        
        const users = await getDataAPI(`/user/${id}`, auth.token)
        const posts = await getDataAPI(`/user_posts/${id}`, auth.token)

        dispatch({
            type: PROFILE_TYPES.GET_USER,
            payload: users.data
        })

        dispatch({
            type: PROFILE_TYPES.GET_USER_POSTS,
            payload: {...posts.data, _id: id, page: 2}
        })

        dispatch({
            type: PROFILE_TYPES.LOADING,
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

export const updateProfileUser = ({userData, avatar, auth}) => async (dispatch) => {
    if(!userData.fullname)
        return dispatch({type: GLOBALTYPES.ALERT, payload: {error: "Please add your full name."}})

    if(userData.fullname.length > 25)
        return dispatch({type: GLOBALTYPES.ALERT, payload: {error: "Your full name too long."}})

    if(userData.story.length > 200)
        return dispatch({type: GLOBALTYPES.ALERT, payload: {error: "Your story too long."}})

    try {
        let media
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})

        if(avatar) media = await imageUpload([avatar])
        
        const res = await patchDataAPI('user', {
            ...userData,
            avatar: avatar ? media[0].url : auth.user.avatar
        }, auth.token)

        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
                ...auth,
                user: {
                    ...auth.user,
                    ...userData,
                    avatar: avatar ? media[0].url : auth.user.avatar,
                }
            }
        })

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {success: res.data.message}
        })
    } 
    catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT, 
            payload: {error: err.response.data.message}
        })
    }
}

export const follow = ({users, user, auth}) => async (dispatch) => {
    let newUser

    if(users.every(item => item._id !== user._id)) {
        newUser = {...user, followers: [...user.followers, auth.user]}
    }
    else {
        users.forEach(item => {
            if(item._id === user._id) {
                newUser = {...item, followers: [...item.followers, auth.user]}
            }
        });
    }

    dispatch({
        type: PROFILE_TYPES.FOLLOW,
        payload: newUser
    })

    dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
            ...auth,
            user: { ...auth.user, following: [...auth.user.following, newUser]}
        }
    })

    try {
        await patchDataAPI(`user/${user._id}/follow`, null, auth.token)
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT, 
            payload: {error: err.response.data.message}
        })
    }
}

export const unfollow = ({users, user, auth}) => async (dispatch) => {
    let newUser

    if(users.every(item => item._id !== user._id)) {
        newUser = {...user, followers: DelData(user.followers, auth.user._id)}
    }
    else {
        users.forEach(item => {
            if(item._id === user._id) {
                newUser = {...item, followers: DelData(item.followers, auth.user._id)}
            }
        });
    }

    dispatch({
        type: PROFILE_TYPES.FOLLOW,
        payload: newUser
    })

    dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
            ...auth,
            user: { 
                ...auth.user, 
                following: DelData(auth.user.following, newUser._id) 
            }
        }
    })

    try {
        await patchDataAPI(`user/${user._id}/unfollow`, null, auth.token)
    } 
    catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT, 
            payload: {error: err.response.data.message}
        })
    }
}


