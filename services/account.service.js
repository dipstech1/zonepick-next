import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';
import { fetchWrapper } from 'helpers';
import Axios from './axios.interceptor'
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));



const login = (username, password) => {
    console.log(username, password);

    return Axios.post(`${baseUrl}api/login`, { username, password })
    .then(user => {
        console.log(user);
        // publish user to subscribers and store in local storage to stay logged in between page refreshes
        userSubject.next(user);
        localStorage.setItem('user', JSON.stringify(user));

        return user;
    });

    // return axios.post(`${baseUrl}api/login`, { username, password })
    //     .then(user => {
    //         // publish user to subscribers and store in local storage to stay logged in between page refreshes
    //         userSubject.next(user);
    //         localStorage.setItem('user', JSON.stringify(user));

    //         return user;
    //     });
}

function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/account/login');
}

function register(user) {
    return fetchWrapper.post(`${baseUrl}/register`, user);
}

export const accountService = {
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
    login,
    logout,
    register,
};
