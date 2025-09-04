import axios from 'axios';

const API_URL = "http://localhost:8081/api/";

const getAuthHeader = (token) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

const createProblem = (problemData, token) => {
    return axios.post(API_URL + 'problems', problemData, getAuthHeader(token));
};

const getAllProblems = (token) => {
    return axios.get(API_URL + 'problems', getAuthHeader(token));
};

const getMyProblems = (token) => {
    return axios.get(API_URL + 'problems/my', getAuthHeader(token));
};

const updateProblem = (id, problemData, token) => {
    return axios.put(API_URL + `problems/${id}`, problemData, getAuthHeader(token));
};

const updateProblemStatus = (id, newStatus, token) => {
    return axios.patch(API_URL + `problems/${id}/status`, { status: newStatus }, getAuthHeader(token));
};

const deleteProblem = (id, token) => {
    return axios.delete(API_URL + `problems/${id}`, getAuthHeader(token));
};

const ProblemService = {
    createProblem,
    getAllProblems,
    getMyProblems,
    updateProblem,
    updateProblemStatus,
    deleteProblem,
};

export default ProblemService;


