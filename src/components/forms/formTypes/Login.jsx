import React, { useState, useContext } from 'react';
import { AccountContext } from '../../../context/AccountContext'

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const { authenticationFns: { login } } = useContext(AccountContext)

    const { username, password } = formData;

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        login(formData);
    }
    return (
        <form onSubmit={submitHandler}>
            <div className="field">
                <label className="label">Username</label>
                <div className="control">
                    <input className="input" onChange={changeHandler} name="username" value={username} type="text" placeholder="Username" />
                </div>
            </div>
            <div className="field">
                <label className="label">Password</label>
                <div className="control">
                    <input className="input" onChange={changeHandler} name="password" value={password} type="password" placeholder="Password" />
                </div>
            </div>
            <button className="button">Login</button>
        </form>
    )
};

export default Login;
