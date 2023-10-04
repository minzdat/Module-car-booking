import axios from 'axios';
const API_URL = 'http://localhost:63642/api';

const getToken = () => {
    try {
        return String(localStorage.getItem('Token'));
    } catch (error) {
        return '';
    }
};

const token = getToken();

const request = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
    },
});



export const get = async (endpoint: string, options = {}) => {
    return await request.get(endpoint);
};

export const post = async (endpoint: string, data = {}) => {
    // const token = getToken();
    return await request.post(endpoint, data, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

export const postForm = async (endpoint: string, data = {}) => {
    // const token = getToken();
    return await request.postForm(endpoint, data, {
        headers: {
            Accept: 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    });
};

export const put = async (endpoint: string, data = {}) => {
    // const token = getToken();
    return await request.put(endpoint, data, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

export const putForm = async (endpoint: string, data = {}) => {
    // const token = getToken();
    return await request.putForm(endpoint, data, {
        headers: {
            Accept: 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    });
};

export const patch = async (endpoint: string, data = {}) => {
    // const token = getToken();
    return await request.patch(endpoint, data, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

export const remove = async (endpoint: string, data = {}) => {
    // const token = getToken();
    return await request.delete(endpoint, {
        data,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

export default request;
