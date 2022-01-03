import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../store/action/AuthActions'
import { useAlert } from 'react-alert'
import { SUCCESS_MESSAGE_CLEAR, ERROR_CLEAR } from '../store/types/authTypes';

const Login = ({history}) => {

    const dispatch = useDispatch();
    const {loading,authenticate,error,successMessage,myInfo} = useSelector(state => state.auth)
    const alert = useAlert();

    const [state, setState] = useState({
        email: "",
        password: ""
    })

    const inputHandle = (e) =>{
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const login = (e) =>{
        e.preventDefault()
        dispatch(userLogin(state))
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
        <div className="login">
            <div className="card">
                <div className="card-header">
                    <h3>Login</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={login}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email"
                                   placeholder="email"
                                   name="email"
                                   id="email"
                                   value={state.email}
                                   onChange={inputHandle}
                                   className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password"
                                   placeholder="password"
                                   name="password"
                                   id="password"
                                   value={state.password}
                                   onChange={inputHandle}
                                   className="form-control"/>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Login" className="btn"/>
                        </div>
                        <div className="form-group">
                            <span>
                                <Link to="/messanger/register">Register your account</Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
