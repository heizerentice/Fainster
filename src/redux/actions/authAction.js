import { GLOBALTYPES } from './globalTypes'
import { postDataAPI } from "../../utils/fetchData"
import valid from '../../utils/valid'

export const login = (data) => async (dispatch) => {
    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: { loading: true }})
        const res = await postDataAPI('Login', data)
        dispatch({
            type: GLOBALTYPES.AUTH, 
            payload: {
                token: res.data.access_token,
                user: res.data.user
            }
        })
        localStorage.setItem('firstLogin', true)

        dispatch({
            type: GLOBALTYPES.ALERT, 
            payload: {
                success: res.data.message
            }
        })
    } 
    catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT, 
            payload: {
                error: err.response.data.message
            }
        })
    }
}

export const refreshToken = () => async (dispatch) => {
    const firstLogin = localStorage.getItem('firstLogin')
    if(firstLogin) {
        dispatch({type: GLOBALTYPES.ALERT, payload: { loading: true } })
        try {
            const res = await postDataAPI('refresh_token')
            dispatch({
                type: GLOBALTYPES.AUTH, 
                payload: {
                    token: res.data.access_token,
                    user: res.data.user
                }
            })

            dispatch({type: GLOBALTYPES.ALERT, payload: {} })
            
        } 
        catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT, 
                payload: {
                    error: err.response.data.message
                }
            })
        }
    }
}

export const register = (data) => async (dispatch) => {
    const check = valid(data)
        if(check.errorLength > 0)
            return dispatch({type: GLOBALTYPES.ALERT, payload: check.errorMessage})
    try {
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})

        const res = await postDataAPI('Register', data)
        dispatch({
            type: GLOBALTYPES.AUTH, 
            payload: {
                token: res.data.access_token,
                user: res.data.user
            }
        })
        localStorage.setItem('register', true)

        dispatch({
            type: GLOBALTYPES.ALERT, 
            payload: {
                success: res.data.message
            }
        })
    } 
    catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT, 
            payload: {
                error: err.response.data.message
            }
        })
    }
}

export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem('firstLogin')
        await postDataAPI('Logout')
        window.location.href = "/"
    } 
    catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT, 
            payload: {
                error: err.response.data.message
            }
        })
    }
}