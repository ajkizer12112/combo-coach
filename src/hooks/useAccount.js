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


const useAccount = () => {
    const [account, setAccount] = useState({
        isAuthenticated: false,
        token: null,
        currentUser: {},
    });

    const [userStats, setUserStats] = useState({
        roundsCompleted: null
    });

    const authenticationFns = {
        login: async (body) => {
            try {
                const URL = `${mainRoot}/auth/login`;
                const res = await axios.post(URL, body, jsonHeader);
                setAccount({ ...account, isAuthenticated: true, token: res.data.token, currentUser: res.data.user })
                localStorage.setItem("boxing-timer-token", res.data.token)
            } catch (error) {
                console.log({ error });
            }
        },

        getCurrentUser: async () => {
            try {
                const URL = `${mainRoot}/auth/me`
                const res = await axios.get(URL);
                const { username, email, _id } = res.data.data
                profileFns.getInfo(_id);
                return { username, email, _id }
            } catch (error) {
                console.log(error);
            }
        },

        logout: () => {
            localStorage.removeItem("boxing-timer-token");
            setAccount({ ...account, isAuthenticated: false })
        },

        authenticateUser: async () => {
            const token = localStorage.getItem("boxing-timer-token");
            if (token) {
                setAuthToken(token);
                const user = await authenticationFns.getCurrentUser();
                setAccount({ ...account, isAuthenticated: true, currentUser: user, token: token })
            }
        }
    }

    const profileFns = {
        getInfo: async (id) => {
            try {
                const info = await axios.get(`${mainRoot}/profiles/${id}`);
                if (!info) {
                    const newProfile = await axios.post(`${mainRoot}/profiles`, { account_id: id })
                    setUserStats({ ...userStats, roundsCompleted: newProfile.data.data.roundsCompleted })
                } else {
                    setUserStats({ ...userStats, roundsCompleted: info.data.data.roundsCompleted })
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return { account, authenticationFns, profileFns, userStats }
}

export default useAccount;