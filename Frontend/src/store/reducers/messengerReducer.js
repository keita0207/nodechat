import { GET_FRIENDS_SUCCESS, GET_MESSEGES_SUCCESS, MESSEGE_SEND_SUCESS,
         IMAGE_MESSEGE_SEND
       } from '../types/messengerTypes'

const messengerState = {
    friends: [],
    messege: []
};

const messengerReducer = (state = messengerState, action) =>{
    const { type, payload } = action

    if(type === GET_FRIENDS_SUCCESS){
        return{
            ...state,
            friends: payload.friends
        }
    }
    if(type === GET_MESSEGES_SUCCESS){
        return{
            ...state,
            messege: payload.messege
        }
    }
    if(type === MESSEGE_SEND_SUCESS){
        return{
            ...state,
            // 既存のmessegeのarrayに対して新しいmessegeを追加。pushではない？
            messege: [...state.messege,payload.messege]
        }
    }
    if(type === IMAGE_MESSEGE_SEND){
        return{
            ...state,
            messege: [...state.messege,payload.messege]
        }
    }
    if(type === 'SOCKET_MESSEGE'){
        return{
            ...state,
            messege: [...state.messege,payload.messege]
        }
    }

    return state
}

export default messengerReducer