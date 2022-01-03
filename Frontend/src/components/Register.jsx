import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { userRegister } from '../store/action/AuthActions'
import { useAlert } from 'react-alert'
import { SUCCESS_MESSAGE_CLEAR, ERROR_CLEAR } from '../store/types/authTypes';

const Register = ({history}) => {
    const dispatch = useDispatch();
    const {loading,authenticate,error,successMessage,myInfo} = useSelector(state => state.auth)
    const alert = useAlert();

    const [state, setState] = useState({
        username: '',
        email: '',
        password: '',
        confirmpassword: '',
        image: ''
    })

    const [loadImage, setLoadImage] = useState('')

    const inputHandle = (e) =>{
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const fileHandle = (e) =>{
        if(e.target.files.length !== 0){
            setState({
                ...state,
                [e.target.name]: e.target.value
            })
        }

        const reader = new FileReader();
        reader.onload = () =>{
            setLoadImage(reader.result)
        }
        reader.readAsDataURL(e.target.files[0])
    }

    const register = (e) =>{

        const { username, email, password, confirmpassword, image } = state
        e.preventDefault();


        const formData = new FormData();
        formData.append('username', username)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('confirmpassword', confirmpassword)
        formData.append('image', image)

        dispatch(userRegister(formData))
    }

    useEffect(() =>{
        if(authenticate){
            // 既に新規userが作成されている場合(tokenが確認されている場合のみ)は
            // /に強制的に移動される。(Register Componentには行けない様になっている。)
            history.push('/')
        }
        if(successMessage){
            alert.success(successMessage)
            // successMessageが全て表示されたらsuccessMessageを消去する。
            dispatch({ type: SUCCESS_MESSAGE_CLEAR })
        }
        if(error){
            error.map(error => alert.error(error))
            // errorが全て表示されたらerrorを消去する。
            dispatch({ type: ERROR_CLEAR })
        }
    },[successMessage, error])

    return (
        <div className="register">
            <div className="card">
                <div className="card-header">
                    <h3 className="Register">Register</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={register}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text"
                                   name="username"
                                   onChange={inputHandle}
                                   value={state.username}
                                   placeholder="username"
                                   className="form-control"
                                   id="username"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                                <input type="email"
                                    name="email"
                                    onChange={inputHandle}
                                    value={state.email}
                                    placeholder="email"
                                    className="form-control"
                                    id="email"
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password"
                                   name="password"
                                   onChange={inputHandle}
                                   value={state.password}
                                   placeholder="password"
                                   className="form-control"
                                   id="password"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirm password">Confirm Password</label>
                                <input type="password"
                                    name="confirmpassword"
                                    onChange={inputHandle}
                                    value={state.confirmpassword}
                                    placeholder="confirmpassword"
                                    className="form-control"
                                    id="confirmpassword"
                                />
                        </div>
                        <div className="form-group">
                            <div className="file-image">
                                <div className="image">
                                    { loadImage ? <img src={loadImage}/> : ''}
                                </div>
                                <div className="file">
                                    <label htmlFor="image">Select Image</label>
                                    <input type="file"
                                           onChange={fileHandle}
                                           id="image"
                                           name="image"
                                           className="form-control"/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="submit"
                                   value="register"
                                   className="btn"
                            />
                        </div>
                        <div className="form-group">
                            <span>
                                <Link to="/messanger/login">Login</Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
