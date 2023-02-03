import axios from "axios";

const URL_BASE = "http://localhost:4000"

function createHeaders() {
    const auth = JSON.parse(localStorage.getItem("shf_lifestyle"));
    const config = {
        headers: {
            Authorization: `Bearer ${auth.token}`,
            userId: auth.id
        },
    };
    return config;
};

function postSignUp(body) {
    const signUpAPI = `${URL_BASE}/auth/signUp`;
    return axios.post(signUpAPI, body);
};

export {postSignUp};