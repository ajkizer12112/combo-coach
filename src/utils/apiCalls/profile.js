import { mainRoot, genQueryString } from "../urls/mainApi"
import axios from 'axios';


const jsonHeader = {
    headers: {
        "Content-Type": "application/json",
    },
};

export const profile = {
    createProfile: (account_id) => {
        const URL = `${mainRoot}/profiles`
        return axios.post(URL, { account_id }, jsonHeader)
    },
    getCompletedWorkouts: (queryObj = {}) => {
        const URL = `${mainRoot}/completedWorkouts${genQueryString(queryObj)}`
        return axios.get(URL)
    },
    saveCompletedWorkout: async ({ roundsCompleted, maneuverTracker }) => {
        //sends required data to server and returns response from server
        const profile = await axios.put(`${mainRoot}/profiles`, { roundsCompleted, maneuverTracker }, jsonHeader);
        const newWorkout = await axios.post(`${mainRoot}/completedWorkouts`, { rounds: roundsCompleted }, jsonHeader);
        return { profileInfo: profile.data.data, newWorkout: newWorkout.data.data }
    },
    getUserProfileInfo: (id) => {
        const URL = `${mainRoot}/profiles/${id}`
        return axios.get(URL);
    }
};