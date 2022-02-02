import React, { useEffect, useState } from 'react';
import { mainRoot } from '../urls/Auth';
import axios from 'axios';


const jsonHeader = {
    headers: {
        "Content-Type": "application/json",
    },
};

const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common["x-auth-token"] = token;
    } else {
        delete axios.defaults.headers.common["x-auth-token"];
    }
};


const useAuth = () => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        token: null,
        currentUser: {}
    });

    const login = async (body) => {
        try {
            const URL = `${mainRoot}/auth/login`;
            const res = await axios.post(URL, body, jsonHeader);
            setAuth({ ...auth, isAuthenticated: true, token: res.data.token, currentUser: res.data.user })
            localStorage.setItem("boxing-timer-token", res.data.token)
        } catch (error) {
            console.log({ error });
        }
    }

    const getCurrentUser = async () => {
        try {
            const URL = `${mainRoot}/auth/me`
            const res = await axios.get(URL);
            setAuth({ ...auth, currentUser: res.data.data })
        } catch (error) {
            console.log(error);
        }
    }

    const logout = async () => {
        localStorage.removeItem("boxing-timer-token");
        setAuth({ ...auth, isAuthenticated: false })
    }

    const authenticateUser = () => {
        const token = localStorage.getItem("boxing-timer-token");
        if (token) {
            setAuthToken(token);
            const user = getCurrentUser();
            setAuth({ ...auth, isAuthenticated: true, currentUser: user })
        }
    }

    useEffect(() => {
        authenticateUser()
    }, [auth])

    return { auth, login, logout }
}

export default useAuth;