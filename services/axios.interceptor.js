import axios from 'axios'
import getConfig from 'next/config';

const {publicRuntimeConfig} = getConfig()
const baseUrl = `${publicRuntimeConfig.apiUrl}`;

axios.interceptors.request.use(
    function (config) {
        config.baseURL = baseUrl;
        // const token = localStorage.getItem('token')
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);


export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    patch: axios.patch
};
