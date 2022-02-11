import { useState } from 'react';
import { mainRoot } from '../urls/mainApi';
import axios from 'axios';


const jsonHeader = {
    headers: {
        "Content-Type": "application/json",
    },
};


const accountInitialState = {
    isAuthenticated: false,
    token: null,
    currentUser: {}
}

const profileInitialState = {
    roundsCompleted: 0,
    maneuverTracker: {},
}

const useAccount = () => {
    const [account, setAccount] = useState(accountInitialState);


    const setAuthToken = (token) => {
        if (token) {
            axios.defaults.headers.common["x-auth-token"] = token;
        } else {
            delete axios.defaults.headers.common["x-auth-token"];
        }
    };


    const [userStats, setUserStats] = useState(profileInitialState);

    const authenticationFns = {
        login: async (body) => {
            try {
                const URL = `${mainRoot}/auth/login`;
                const res = await axios.post(URL, body, jsonHeader);
                localStorage.setItem("boxing-timer-token", res.data.token)
                setAuthToken(res.data.token);
                setAccount({ ...account, isAuthenticated: true, token: res.data.token, currentUser: res.data.user })
                authenticationFns.getCurrentUser();

            } catch (error) {
                console.log({ error });
            }
        },

        register: async (body) => {
            try {
                const URL = `${mainRoot}/auth/register`;
                const res = await axios.post(URL, body, jsonHeader);
                localStorage.setItem("boxing-timer-token", res.data.token)
                setAuthToken(res.data.token);
                setAccount({ ...account, isAuthenticated: true, token: res.data.token, currentUser: res.data.user })
                authenticationFns.getCurrentUser();
            } catch (error) {
                console.log({ error })
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
            setAccount({ ...account, token: null, user: {}, isAuthenticated: false })
            setUserStats(profileInitialState)
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
                    const newProfile = await axios.post(`${mainRoot}/profiles`, { account_id: id }, jsonHeader)
                    setUserStats({ ...userStats, roundsCompleted: newProfile.data.data.roundsCompleted, maneuverTracker: newProfile.data.data.maneuverTracker })
                } else {
                    setUserStats({ ...userStats, roundsCompleted: info.data.data.roundsCompleted, maneuverTracker: info.data.data.maneuverTracker })
                }
            } catch (error) {
                console.log(error);
            }
        },
        completeWorkout: async (data) => {
            try {
                const { roundsCompleted, maneuverTracker } = data
                const profile = await axios.put(`${mainRoot}/profiles`, { roundsCompleted, maneuverTracker }, jsonHeader);
                setUserStats({ ...userStats, roundsCompleted: userStats.roundsCompleted + roundsCompleted, maneuverTracker: profile.data.data.maneuverTracker })
            } catch (error) {
                console.log(error);
            }
        }
    }

    return { account, authenticationFns, profileFns, userStats }
}

export default useAccount;