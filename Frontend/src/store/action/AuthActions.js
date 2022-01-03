import axios from 'axios'
import { REGISTER_FAIL, REGISTER_SUCCESS,
         USER_LOGIN_SUCCESS, USER_LOGIN_FAIL } from '../types/authTypes'

export const userRegister = (data) =>{
    return async(dispatch) =>{

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            // authRoutes.jsで設定したurlにPOSTしたdataをresponseとして受け取る?
            const response = await axios.post('/api/messenger/user-register',data, config)

            console.log(response.data.token)
            // localStorageにauthTokenの名前としてauthController.jsで作成したtokenを保存する。(id,username,emailが含まれている。)
            localStorage.setItem('authToken', response.data.token)

            dispatch({
                type: REGISTER_SUCCESS,
                payload: {
                    successMessage: response.data.successMessage,
                    token: response.data.token
                }
            })

        } catch (error) {
            // Error Messageをdispatch関数に渡してRedux Storeで管理させる。
            dispatch({
                type: REGISTER_FAIL,
                payload: {
                    error: error.response.data.error.errorMessage
                }
            })
        }
    }
}

export const userLogin = (data) =>{
    return async(dispatch) =>{

        try {
            const config = {
                "Content-Type": "application/json"
            }
            const response = await axios.post('/api/messenger/user-login',data,config)
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: {
                    successMessage: response.data.successMessage,
                    token: response.data.token
                }
            })
        } catch (error) {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: {
                    error: error.response.data.error.errorMessage
                }
            })
        }
    }
}