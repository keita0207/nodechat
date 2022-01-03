import axios from 'axios'
import { GET_FRIENDS_SUCCESS, GET_MESSEGES_SUCCESS,
         MESSEGE_SEND_SUCESS, IMAGE_MESSEGE_SEND } from '../types/messengerTypes'

export const getFriends = () => async(dispatch) =>{

        try {
             // get friends from the server.
            const response = await axios.get('/api/messenger/get-friends')
            console.log(response.data)

            dispatch({
                type: GET_FRIENDS_SUCCESS,
                payload: {
                    friends: response.data.friends
                }
            })
        } catch (error) {
            console.log(error.response.data)
        }
};

export const messegeSend = (data) => async(dispatch) =>{
    try {
        const response = await axios.post('/api/messenger/send-messege',data)
        dispatch({
            type: MESSEGE_SEND_SUCESS,
            payload: {
                messege: response.data.messege
            }
        })
    } catch (error) {
        console.log(error.response.data)
    }
}

export const getMessege = (id) =>{
    return async(dispatch) =>{
        try {
            const response = await axios.get(`/api/messenger/get-messege/${id}`)

            dispatch({
                type: GET_MESSEGES_SUCCESS,
                payload: {
                    messege: response.data.messege
                }
            })
        } catch (error) {
            console.log(error.response.data)
        }
    }
}

export const ImageMessegeSend = (data) =>{
    return async(dispatch) =>{
        try {
            const response = await axios.post('/api/messenger/image-messege-send',data)
            dispatch({
                type: IMAGE_MESSEGE_SEND,
                payload: response.data.messege
            })
        } catch (error) {
            console.log(error.response.data)
        }
    }
}