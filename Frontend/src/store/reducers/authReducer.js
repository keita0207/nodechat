import { REGISTER_FAIL, REGISTER_SUCCESS,
         SUCCESS_MESSAGE_CLEAR, ERROR_CLEAR,
         USER_LOGIN_SUCCESS, USER_LOGIN_FAIL } from '../types/authTypes'
import deCodeToken from 'jwt-decode'


const authState = {
    loading: true,
    authenticate: false,
    error: "",
    successMessage: "",
    myInfo: ""
}

// localStorageに保存されたtokenを解凍? => Redux Store内ではusernam, email等登録した際の情報で保存される様にする。
const tokenDecode = (token) =>{
    const tokenDecoded = deCodeToken(token)
    const expTime = new Date(tokenDecoded.exp * 1000)

    if(new Date() > expTime){
        return null
    }
    return tokenDecoded
}

const getToken = localStorage.getItem('authToken');
console.log(getToken)
// 既に何かしらの登録をregister画面で行っている場合にはtokenが残っているはず。
if(getToken){
    const getInfo = deCodeToken(getToken)
    if(getInfo){
        authState.myInfo = getInfo
        authState.authenticate = true
        authState.loading = false
    }
}

const authReducer = (state = authState, action) =>{
    const { payload, type } = action

    if(type === REGISTER_FAIL || type === USER_LOGIN_FAIL ){
        return{
            ...state,
            // authStateに追加。(initial stateに追加)
            error: payload.error,
            myInfo: "",
            successMessage: "",
            authenticate: false,
            loading: true
        }
    }
    if(type === REGISTER_SUCCESS || type === USER_LOGIN_SUCCESS){
       const myInfo = tokenDecode(payload.token)
       return{
           ...state,
           myInfo: myInfo,
           successMessage: payload.successMessage,
           //error欄を空欄にする。
           error: "",
           authenticate: true,
           loading: false
       }
    }
    if(type === SUCCESS_MESSAGE_CLEAR){
        return {
            ...state,
            successMessage: ""
        }
    }
    if(type === ERROR_CLEAR){
        return {
            ...state,
            error: ""
        }
    }
    return state
}

export default authReducer;