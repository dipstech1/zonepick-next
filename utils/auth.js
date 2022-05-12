import {getDataFromLocalstorage} from './storage.util';
export function authCheck(url) {
    const token = getDataFromLocalstorage('token') ;
    const publicPaths = ['/account/login', 'account/signup'];
    const path = url.split('?')[0];
    if (!token && !publicPaths.includes(path)) {
        return false ;
    } else {
        return true ;
    }
}