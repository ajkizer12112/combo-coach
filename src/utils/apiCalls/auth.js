import { mainRoot } from "../urls/mainApi";
import axios from 'axios';

const jsonHeader = {
    headers: {
        "Content-Type": "application/json",
    },
};

export const auth = {
    login: (body) => {
        const URL = `${mainRoot}/auth/login`;
        return axios.post(URL, body, jsonHeader)
    },
    register: (body) => {
        const URL = `${mainRoot}/auth/register`;
        return axios.post(URL, body, jsonHeader);
    },
    getUserAccountInfo: () => {
        const URL = `${mainRoot}/auth/me`
        return axios.get(URL);
    }
};