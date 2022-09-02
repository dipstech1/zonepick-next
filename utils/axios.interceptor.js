import axios from 'axios'
import getConfig from 'next/config';
import { getCookie } from 'cookies-next';

const {
    publicRuntimeConfig
} = getConfig()
const baseUrl = `${publicRuntimeConfig.apiUrl}`;

console.log(baseUrl)


axios.interceptors.request.use(
    function (config) {
        config.baseURL = baseUrl;
        if (typeof window !== "undefined") {
            const token = getCookie('token')
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    patch: axios.patch
};