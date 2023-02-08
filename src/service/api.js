import axios from "axios";

const URL_BASE = "http://localhost:4000"

function createHeaders() {
    const auth = JSON.parse(localStorage.getItem("shf_lifestyle"));
    const config = {
        headers: {
            Authorization: `Bearer ${auth.token}`
        },
    };
    return config;
};

function postSignUp(body) {
    const signUpAPI = `${URL_BASE}/auth/signUp`;
    return axios.post(signUpAPI, body);
};

function postLogin(body) {
    const singIn = `${URL_BASE}/auth/`
    return axios.post(singIn, body)
};

function getWorkouts() {
    const getWorkouts = `${URL_BASE}/workout`;
    return axios.get(getWorkouts, createHeaders());
};

function postWorkout(body) {
    const postWorkout = `${URL_BASE}/workout`;
    return axios.post(postWorkout, body, createHeaders());
}

function postExercise(body, id) {
    const postExercise = `${URL_BASE}/workout/${id}`
    return axios.post(postExercise, body, createHeaders());
};

export {
    postSignUp,
    postLogin,
    getWorkouts,
    postWorkout,
    postExercise
};