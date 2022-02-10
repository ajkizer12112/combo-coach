import React, { useState, useContext } from 'react';
import { AccountContext } from '../../../context/AccountContext';

const Register = ({ closeModal }) => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirm: ""
    })

    const { authenticationFns: { register } } = useContext(AccountContext)

    const { username, password, passwordConfirm, email } = formData;

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const submitHandler = e => {
        e.preventDefault();
        register(formData);
        closeModal();
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
                <label className="label">Email</label>
                <div className="control">
                    <input className="input" onChange={changeHandler} name="email" value={email} type="email" placeholder="Email" />
                </div>
            </div>
            <div className="field">
                <label className="label">Password</label>
                <div className="control">
                    <input className="input" onChange={changeHandler} name="password" value={password} type="password" placeholder="Password" />
                </div>
            </div>
            <div className="field">
                <label className="label">Confirm Password</label>
                <div className="control">
                    <input className="input" onChange={changeHandler} name="passwordConfirm" value={passwordConfirm} type="password" placeholder="Confirm Password" />
                </div>
            </div>
            <button className="button">Register</button>
        </form>
    )
};

export default Register;
