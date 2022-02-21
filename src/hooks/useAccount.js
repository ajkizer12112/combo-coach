import { useState } from 'react';
import axios from 'axios';
import { auth } from '../utils/apiCalls/auth'
import { profile } from '../utils/apiCalls/profile'

const accountInitialState = {
    isAuthenticated: false,
    token: null,
    currentUser: {}
}

const profileInitialState = {
    roundsCompleted: 0,
    maneuverTracker: {},
    completedWorkouts: [],
    loading: true
}

const useAccount = () => {
    const [account, setAccount] = useState(accountInitialState);
    const [userStats, setUserStats] = useState(profileInitialState);

    const setAuthToken = (token) => {
        if (token) {
            axios.defaults.headers.common["x-auth-token"] = token;
        } else {
            delete axios.defaults.headers.common["x-auth-token"];
        }
    };

    const profileFns = {
        saveToken: (token) => {
            localStorage.setItem("boxing-timer-token", token)
            profileFns.authenticateUser()
        },

        authenticateUser: async () => {
            const token = localStorage.getItem("boxing-timer-token");
            if (token) {
                setAuthToken(token);
                const { data: { data: { username, email, _id } } } = await auth.getUserAccountInfo()
                setAccount({ ...account, isAuthenticated: true, currentUser: { username, email, _id }, token: token })
                profileFns.getInfo(_id);
            }
        },

        getInfo: async (id) => {
            try {
                const info = await profile.getUserProfileInfo(id);
                console.log(info.data.data)

                if (!info) return await profile.createProfile(id);

                const completedWorkouts = await profileFns.getCompletedWorkoutsForWeek();


                setUserStats({
                    ...userStats,
                    roundsCompleted: info.data.data.roundsCompleted,
                    maneuverTracker: info.data.data.maneuverTracker,
                    completedWorkouts: completedWorkouts.data.data,
                    loading: false
                })

            } catch (error) {
                console.log(error);
            }
        },

        getCompletedWorkoutsForWeek: async () => {
            try {
                const date = new Date();
                const endDate = date.getDay() + 1;
                const completedWorkouts = await profile.getCompletedWorkouts({ endDate })
                return completedWorkouts
            } catch (error) {
                console.log(error);
            }
        },

        completeWorkout: async (data) => {
            try {
                const { roundsCompleted, maneuverTracker } = data
                const { profileInfo, newWorkout } = await profile.saveCompletedWorkout({ roundsCompleted, maneuverTracker });

                setUserStats({ ...userStats, roundsCompleted: userStats.roundsCompleted + newWorkout.rounds, maneuverTracker: profileInfo.maneuverTracker, completedWorkouts: [...userStats.completedWorkouts, newWorkout] })
            } catch (error) {
                console.log(error);
            }
        }
    }

    const authenticationFns = {
        login: async (body) => {
            try {
                const { data: { token } } = await auth.login(body);
                profileFns.saveToken(token)
            } catch (error) {
                console.log({ error });
            }
        },

        register: async (body) => {
            try {
                const { data: { token } } = await auth.register(body);
                profileFns.saveToken(token)
            } catch (error) {
                console.log({ error })
            }
        },


        logout: () => {
            localStorage.removeItem("boxing-timer-token");

            setAccount({
                ...account,
                token: null,
                user: {},
                isAuthenticated: false
            })

            setUserStats(profileInitialState)
        },
    }

    return { account, authenticationFns, profileFns, userStats }
}

export default useAccount;