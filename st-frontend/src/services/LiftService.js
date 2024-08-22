import axios from "axios"; //Axios is 3rd part library that allows us to make http connection for front end

const REST_API_BASE_URL = 'http://localhost:8080/api/lifts'; //points to backend API

//REST client code to get all lifts from the REST API
export const listLifts = () => {
    return axios.get(REST_API_BASE_URL);
}