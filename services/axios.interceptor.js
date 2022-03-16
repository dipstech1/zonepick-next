import axios from 'axios'
import getConfig from 'next/config';

const {publicRuntimeConfig} = getConfig()
const baseUrl = `${publicRuntimeConfig.apiUrl}`;

axios.interceptors.request.use(
    function (config) {
        config.baseURL = baseUrl;
        if (typeof window !== "undefined") {
            const token = window.localStorage.getItem('token')
        config.headers.Authorization =  `Bearer ${token}`;
          }
        
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
