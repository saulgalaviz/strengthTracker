import axios from "axios"; //Axios is 3rd part library that allows us to make http connection for front end

const REST_API_BASE_URL = "http://localhost:8080/api/lifts"; //points to backend API

//REST client code to get all lifts from the REST API
export const listLifts = () => {
    return axios.get(REST_API_BASE_URL);
}
// export const listLifts = () => axios.get(REST_API_BASE_URL);

//REST client code to get matching lifts from the REST API with passed liftName string
export const listMatchingLifts = (liftName) => {
    return axios.get(REST_API_BASE_URL + '/' + liftName);
}

export const createLift = (lift) => axios.post(REST_API_BASE_URL, lift);

export const getLift = (liftId) => axios.get(REST_API_BASE_URL + '/' + liftId);

export const updateLift = (liftId, lift) => axios.put(REST_API_BASE_URL + '/' + liftId, lift);

export const deleteLift = (liftId) => axios.delete(REST_API_BASE_URL + '/' + liftId);