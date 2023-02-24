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

function getExercises(id) {
    const getExercises = `${URL_BASE}/workout/${id}`
    return axios.get(getExercises, createHeaders());
};

function postWorkout(body) {
    const postWorkout = `${URL_BASE}/workout`;
    return axios.post(postWorkout, body, createHeaders());
};

function deleteWorkout(id) {
    const deleteWorkout = `${URL_BASE}/workout/${id}`;
    return axios.delete(deleteWorkout, createHeaders());
}

function postExercise(body, id) {
    const postExercise = `${URL_BASE}/workout/${id}`
    return axios.post(postExercise, body, createHeaders());
};

function updateExercise(body, id) {
    const updateExercise = `${URL_BASE}/workout/exercise/${id}`
    return axios.put(updateExercise, body, createHeaders());
};

function deleteExercise(id) {
    const deleteExercise = `${URL_BASE}/workout/exercise/${id}`
    return axios.delete(deleteExercise, createHeaders());
};

function getAerobicsbyDay(date) {
    const getAerobics = `${URL_BASE}/aerobics/${date}`
    return axios.get(getAerobics, createHeaders());
};

function getAllAerobics() {
    const getAllAerobics = `${URL_BASE}/aerobics`;
    return axios.get(getAllAerobics, createHeaders());
};

function postAerobic(body, date) {
    const postAerobic = `${URL_BASE}/aerobics/${date}`
    return axios.post(postAerobic, body, createHeaders());
};

function updateAerobic(body, date, id) {
    const updateAerobic = `${URL_BASE}/aerobics/${date}/${id}`
    return axios.put(updateAerobic, body, createHeaders());
};

function deleteAerobic(id) {
    const deleteAerobic = `${URL_BASE}/aerobics/${id}`
    return axios.delete(deleteAerobic, createHeaders());
};

function postWaterCount(body,date) {
    const postWaterCount = `${URL_BASE}/water/${date}`
    return axios.post(postWaterCount, body, createHeaders());
};

function getWaterByDay(date) {
    const getWaterbyDay = `${URL_BASE}/water/${date}`
    return axios.get(getWaterbyDay, createHeaders());
};

function increaseWaterCount(body, date) {
    const increaseWater = `${URL_BASE}/water/${date}/increase`
    return axios.put(increaseWater,body, createHeaders());
}

function decreaseWaterCount(body, date) {
    const increaseWater = `${URL_BASE}/water/${date}/decrease`
    return axios.put(increaseWater,body, createHeaders());
}

function getWeights() {
    const getWeights = `${URL_BASE}/weight`
    return axios.get(getWeights, createHeaders());
};

function postWeight(body,date) {
    const postWeight = `${URL_BASE}/weight/${date}`
    return axios.post(postWeight,body, createHeaders());
}

function getMealsByDay(date) {
    const getMealsByDay = `${URL_BASE}/meals/${date}`;
    return axios.get(getMealsByDay, createHeaders());
}

function postMeal(body,date) {
    const postMeal = `${URL_BASE}/meals/${date}`;
    return axios.post(postMeal, body, createHeaders());
}

function deleteFoodByMeal(id) {
    const deleteFoodByMeal = `${URL_BASE}/meals/foodByMeal/${id}`;
    return axios.delete(deleteFoodByMeal, createHeaders());
}

function getFoods(name) {
    const getFoods = `${URL_BASE}/foods/${name}`;
    return axios.get(getFoods, createHeaders());
}

export {
    postSignUp,
    postLogin,
    getWorkouts,
    getExercises,
    postWorkout,
    deleteWorkout,
    postExercise,
    updateExercise,
    deleteExercise,
    getAerobicsbyDay,
    postAerobic,
    updateAerobic,
    deleteAerobic,
    getAllAerobics,
    postWaterCount,
    increaseWaterCount,
    decreaseWaterCount,
    getWaterByDay,
    getWeights,
    postWeight,
    getMealsByDay,
    postMeal,
    deleteFoodByMeal,
    getFoods,
};